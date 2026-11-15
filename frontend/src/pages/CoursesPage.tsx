import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import { useState } from "react";
import { useCourses } from "../hooks/useCourses";

export default function CoursesPage() {

    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, error } = useCourses(page, limit);

    const courses = data?.courses ?? [];
    const totalPages = data?.totalPages ?? 1;


    return (
        <>

            {isLoading && (
                <p className="text-slate-500">Loading courses...</p>
            )}
            {isError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    Error: {error?.message}
                </p>
            )}

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Courses
            </h2>

            <p className="text-slate-500 mb-8">
                Create new courses and manage existing ones.
            </p>

            <section className="mb-10">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    Create a course
                </h3>
                <CourseForm />
            </section>

            <section>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    Available courses
                </h3>
                <CourseList courses={courses} />
            </section>

        <div className="flex items-center justify-between mt-4">
            <button
                disabled={page === 1}
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
                Previous
            </button>

            <span className="text-sm text-slate-600">
                Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
                <span className="font-semibold text-slate-900">{Math.max(totalPages, 1)}</span>
            </span>

            <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
                Next
            </button>

           
        </div>

        </>
    );
}
