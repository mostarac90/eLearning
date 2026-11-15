import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import {
    GOOGLE_LOGIN_URL,
    getAuthErrorMessage,
    login,
    register
} from "../api/authApi";
import type { AuthResponse } from "../api/authApi";
import { setToken } from "../auth/tokenStorage";

type Mode = "signin" | "signup";

const features = [
    {
        title: "Courses in one place",
        text: "Create, organise and publish your courses from a single dashboard."
    },
    {
        title: "Track progress",
        text: "See active courses and assignments at a glance."
    },
    {
        title: "Learn anywhere",
        text: "Works on desktop, tablet and phone."
    }
];

const errorMessages: Record<string, string> = {
    google: "Google sign-in failed. Please try again or use your email and password."
};

const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export default function LoginPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState<Mode>("signin");

    const urlError = errorMessages[searchParams.get("error") ?? ""];

    const onAuthSuccess = (data: AuthResponse) => {
        setToken(data.token);
        navigate("/", { replace: true });
    };

    const loginMutation = useMutation({ mutationFn: login, onSuccess: onAuthSuccess });
    const registerMutation = useMutation({ mutationFn: register, onSuccess: onAuthSuccess });

    const activeMutation = mode === "signin" ? loginMutation : registerMutation;
    const isPending = activeMutation.isPending;
    const errorMessage = activeMutation.isError
        ? getAuthErrorMessage(activeMutation.error)
        : urlError;

    const switchMode = (next: Mode) => {
        setMode(next);
        loginMutation.reset();
        registerMutation.reset();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        if (mode === "signin") {
            loginMutation.mutate({ email, password });
        } else {
            const name = String(formData.get("name") ?? "");
            registerMutation.mutate({ name, email, password });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">

            {/* Landing / brand panel */}
            <section className="relative flex flex-col justify-between overflow-hidden bg-[#062a5c] px-6 py-10 text-white sm:px-12 lg:py-14">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="relative flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
                        <img src={logo} alt="" className="h-full w-auto" />
                    </span>
                    <span className="text-2xl font-bold">EasyLearning</span>
                </div>

                <div className="relative my-10 max-w-lg lg:my-0">
                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                        Learning made <span className="text-orange-400">easy</span>.
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">
                        Build courses, follow your progress and keep everything you
                        learn in one simple place.
                    </p>

                    <ul className="mt-10 hidden space-y-5 sm:block">
                        {features.map(feature => (
                            <li key={feature.title} className="flex gap-4">
                                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-semibold">{feature.title}</p>
                                    <p className="text-sm text-slate-300">{feature.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative hidden text-sm text-slate-400 lg:block">
                    © {new Date().getFullYear()} EasyLearning
                </p>
            </section>

            {/* Login card */}
            <section className="flex items-center justify-center px-4 py-10 sm:px-8">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {mode === "signin" ? "Welcome back" : "Create your account"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {mode === "signin"
                            ? "Sign in to continue to your dashboard."
                            : "Get started with EasyLearning in a few seconds."}
                    </p>

                    <div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-medium">
                        {(["signin", "signup"] as const).map(tab => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => switchMode(tab)}
                                className={`rounded-md py-2 transition ${
                                    mode === tab
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                {tab === "signin" ? "Sign in" : "Create account"}
                            </button>
                        ))}
                    </div>

                    <a
                        href={GOOGLE_LOGIN_URL}
                        className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </a>

                    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        or with email
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "signup" && (
                            <div>
                                <label htmlFor="name" className={labelClass}>Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    minLength={3}
                                    className={inputClass}
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={labelClass}>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                                required
                                className={inputClass}
                            />
                        </div>

                        {errorMessage && (
                            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending
                                ? mode === "signin" ? "Signing in..." : "Creating account..."
                                : mode === "signin" ? "Sign in" : "Create account"}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
    );
}
