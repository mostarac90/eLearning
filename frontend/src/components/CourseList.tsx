import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import CourseEditForm from "./CourseEditForm";
import useDeleteCourse from "../hooks/useDeleteCourse";
import type { Course } from "../api/courseApi";

const statusStyles = {
    draft: "bg-amber-100 text-amber-800",
    published: "bg-emerald-100 text-emerald-800"
};


export default function CourseList() {
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const { data, isLoading, isError, error } = useCourses();
    
       const deleteCourseMutation = useDeleteCourse();
    
        const handleDelete = (course : Course) => {
           if (window.confirm(`Delete "${course.title}"?`)) {
           deleteCourseMutation.mutate(course._id);
         }
        }; 


    if (isLoading) {
        return <p className="text-slate-500">Loading courses...</p>;
    }

    if (isError) {
        return (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                Error: {error?.message}
            </p>
        );
    }

    if (data?.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                No courses found. Create your first course above.
            </p>
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map(course => (
                <li
                    key={course._id}
                    className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                    {editingCourseId === course._id ? (
                        <CourseEditForm
                            course={course}
                            onCancel={() => setEditingCourseId(null)}
                        />
                    ) : (
                        <>
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {course.title}
                                </h3>
                                <span
                                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[course.status]}`}
                                >
                                    {course.status}
                                </span>
                            </div>

                            <p className="mb-6 flex-1 text-sm text-slate-600">
                                {course.description}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingCourseId(course._id)}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(course)}
                                    disabled={deleteCourseMutation.isPending}
                                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
