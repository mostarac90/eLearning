import { useParams } from "react-router-dom";

export default function CourseDetailsPage() {
    const { courseId } = useParams();

    return <h1>Course ID: {courseId}</h1>;
}