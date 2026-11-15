import { useQuery } from "@tanstack/react-query";
import { getCourseById} from "../api/courseApi";

export function useCourse(courseId: string) {
    return useQuery({
        queryKey: ["courses", courseId],
        queryFn: () => getCourseById(courseId),
        enabled: !!courseId
    });
}