
import { useCreateCourse } from "../hooks/useCreateCourse";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

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
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                    <label htmlFor="new-course-title" className={labelClass}>Title</label>
                    <input
                        id="new-course-title"
                        name="title"
                        placeholder="e.g. Introduction to TypeScript"
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="new-course-status" className={labelClass}>Status</label>
                    <select
                        id="new-course-status"
                        name="status"
                        defaultValue="draft"
                        className={inputClass}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="new-course-description" className={labelClass}>Description</label>
                <textarea
                    id="new-course-description"
                    name="description"
                    placeholder="What will students learn in this course?"
                    required
                    rows={3}
                    className={inputClass}
                />
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? "Creating..." : "Create course"}
                </button>

                {isSuccess && (
                    <p className="text-sm text-emerald-700">Course created successfully!</p>
                )}

                {isError && (
                    <p className="text-sm text-red-700">Error: {error.message}</p>
                )}
            </div>
        </form>
    );
}
