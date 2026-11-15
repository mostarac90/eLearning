
import { useState } from "react";
import type { Course } from "../api/courseApi";
import { useUpdateCourse } from "../hooks/useUpdateCourse";

interface CourseEditFormProps {
    course: Course;
    onCancel: () => void;
}

const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export default function CourseEditForm({
    course,
    onCancel
}: CourseEditFormProps) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [status, setStatus] = useState<"draft" | "published">(course.status);

    const updateCourseMutation = useUpdateCourse();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateCourseMutation.mutate({
            id: course._id,
            data: {
                title,
                description,
                status
            }
        }, {
            onSuccess: () => onCancel()
        });
    };

    const titleId = `title-${course._id}`;
    const descriptionId = `description-${course._id}`;
    const statusId = `status-${course._id}`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor={titleId} className={labelClass}>Title</label>
                <input
                    id={titleId}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor={descriptionId} className={labelClass}>Description</label>
                <textarea
                    id={descriptionId}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor={statusId} className={labelClass}>Status</label>
                <select
                    id={statusId}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className={inputClass}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={updateCourseMutation.isPending}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {updateCourseMutation.isPending ? "Saving..." : "Save"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>
            </div>

            {updateCourseMutation.isError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {updateCourseMutation.error.message}
                </p>
            )}
        </form>
    );
}
