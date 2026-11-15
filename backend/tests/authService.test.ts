import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { hashPassword } from "../src/utils/passwordUtils.js";
import { AppError, StatusCode } from "../src/utils/AppError.js";

// The service talks to MongoDB through the user repository, so we replace the
// repository with mocks. With ES modules this must happen before the service is
// imported, which is why the service is loaded with a dynamic import below.
const getUserByEmail = jest.fn<(email: string) => Promise<FakeUserDoc | null>>();
const createUser = jest.fn<(data: Record<string, unknown>) => Promise<FakeUserDoc>>();

jest.unstable_mockModule("../src/repositories/userRepository.js", () => ({
    getUserByEmail,
    createUser
}));

const { registerUser, loginUser } = await import("../src/services/authService.js");

// Minimal stand-in for a Mongoose document: the service only calls toObject()
type FakeUserDoc = Record<string, unknown> & { toObject: () => Record<string, unknown> };

function fakeUserDoc(fields: Record<string, unknown>): FakeUserDoc {
    return { ...fields, toObject: () => ({ ...fields }) };
}

async function expectAppError(promise: Promise<unknown>, message: string, statusCode: StatusCode) {
    const error = await promise.catch((err: unknown) => err);
    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({ message, statusCode });
}

beforeEach(() => {
    getUserByEmail.mockReset();
    createUser.mockReset();
});

describe("registerUser", () => {
    it("creates the user with a normalized email and a hashed password", async () => {
        getUserByEmail.mockResolvedValue(null);
        createUser.mockImplementation(async (data) => fakeUserDoc({ _id: "user-1", ...data }));

        await registerUser("Jane Doe", "  Jane@Example.COM ", "secret123");

        expect(getUserByEmail).toHaveBeenCalledWith("jane@example.com");
        expect(createUser).toHaveBeenCalledTimes(1);

        const savedData = createUser.mock.calls[0][0];
        expect(savedData).toMatchObject({ name: "Jane Doe", email: "jane@example.com" });
        expect(savedData).not.toHaveProperty("password");
        expect(typeof savedData.passwordHash).toBe("string");
        expect(savedData.passwordHash).not.toBe("secret123");
    });

    it("does not return the password hash", async () => {
        getUserByEmail.mockResolvedValue(null);
        createUser.mockImplementation(async (data) => fakeUserDoc({ _id: "user-1", ...data }));

        const user = await registerUser("Jane Doe", "jane@example.com", "secret123");

        expect(user).toEqual({ _id: "user-1", name: "Jane Doe", email: "jane@example.com" });
        expect(user).not.toHaveProperty("passwordHash");
    });

    it("throws 409 Conflict when the email is already registered", async () => {
        getUserByEmail.mockResolvedValue(fakeUserDoc({ _id: "existing", email: "jane@example.com" }));

        await expectAppError(
            registerUser("Jane Doe", "jane@example.com", "secret123"),
            "User already exists",
            StatusCode.CONFLICT
        );
        expect(createUser).not.toHaveBeenCalled();
    });
});

describe("loginUser", () => {
    let storedUser: FakeUserDoc;

    beforeEach(async () => {
        storedUser = fakeUserDoc({
            _id: "user-1",
            name: "Jane Doe",
            email: "jane@example.com",
            passwordHash: await hashPassword("secret123")
        });
    });

    it("returns the user without the password hash when the password is correct", async () => {
        getUserByEmail.mockResolvedValue(storedUser);

        const user = await loginUser("jane@example.com", "secret123");

        expect(user).toEqual({ _id: "user-1", name: "Jane Doe", email: "jane@example.com" });
        expect(user).not.toHaveProperty("passwordHash");
    });

    it("normalizes the email before looking up the user", async () => {
        getUserByEmail.mockResolvedValue(storedUser);

        await loginUser("  JANE@example.com ", "secret123");

        expect(getUserByEmail).toHaveBeenCalledWith("jane@example.com");
    });

    it("throws 401 when no user has that email", async () => {
        getUserByEmail.mockResolvedValue(null);

        await expectAppError(
            loginUser("nobody@example.com", "secret123"),
            "Invalid email or password",
            StatusCode.UNAUTHORIZED
        );
    });

    it("throws 401 when the password is wrong", async () => {
        getUserByEmail.mockResolvedValue(storedUser);

        await expectAppError(
            loginUser("jane@example.com", "wrong-password"),
            "Invalid email or password",
            StatusCode.UNAUTHORIZED
        );
    });

    it("throws 401 for a social-login user who has no password", async () => {
        getUserByEmail.mockResolvedValue(
            fakeUserDoc({ _id: "user-2", email: "social@example.com", googleId: "google-123" })
        );

        await expectAppError(
            loginUser("social@example.com", "anything"),
            "Invalid email or password",
            StatusCode.UNAUTHORIZED
        );
    });
});
