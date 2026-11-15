import { useParams } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";

export default function CourseDetailsPage() {
    const { courseId } = useParams();

    const { data: course, isLoading, isError } = useCourse(courseId!);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading course details.</p>;
    }

    return (
        <div>
            <h1>Course ID: {courseId}</h1>
            <h2>{course?.title}</h2>
            <p>{course?.description}</p>
        </div>
    );
}