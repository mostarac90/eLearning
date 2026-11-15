import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

export default function CoursesPage() {
    return (
        <>
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
                <CourseList />
            </section>
        </>
    );
}
