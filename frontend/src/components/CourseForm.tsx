
import { useCreateCourse } from "../hooks/useCreateCourse";

export default function CourseForm() {
    const {
        mutate,
        isPending,
        isSuccess,
        isError,
        error
    } = useCreateCourse();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const status = formData.get("status") as "draft" | "published";

        mutate({ title, description, status });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                placeholder="Title"
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                required
            />

            <select name="status" defaultValue="draft">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>

            <button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Course"}
            </button>

            {isSuccess && (
                <p>Course created successfully!</p>
            )}

            {isError && (
                <p>Error: {error.message}</p>
            )}
        </form>
    );
}
