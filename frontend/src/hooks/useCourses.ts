import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../api/courseApi";

export function useCourses(page = 1, limit = 10) {
    return useQuery({
        queryKey: ["courses", { page, limit }],
        queryFn: () => getCourses(page, limit)
    });
}