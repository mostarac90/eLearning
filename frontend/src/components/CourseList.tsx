import { useState } from "react";
import CourseEditForm from "./CourseEditForm";
import useDeleteCourse from "../hooks/useDeleteCourse";
import type { Course } from "../api/courseApi";
import { Link } from "react-router-dom";

const statusStyles = {
    draft: "bg-amber-100 text-amber-800",
    published: "bg-emerald-100 text-emerald-800"
};

interface CourseListProps {
    courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
   
    
       const deleteCourseMutation = useDeleteCourse();
    
        const handleDelete = (course : Course) => {
           if (window.confirm(`Delete "${course.title}"?`)) {
           deleteCourseMutation.mutate(course._id);
         }
        }; 

    return (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
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
                                <h3><Link to={`/courses/${course._id}`} className="text-lg font-semibold text-slate-900">
                                    {course.title}
                                </Link></h3>
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
