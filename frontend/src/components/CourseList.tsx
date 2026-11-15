import { useCourses } from "../hooks/useCourses";

export default function CourseList() {
    const { data, isLoading, isError, error } = useCourses();

    if (data?.length === 0) {
        return <p>No courses found</p>;
}

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <ul>
            {data?.map(course => (
                <li key={course._id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </li>
            ))}
        </ul>
    );
}