
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../api/courseApi";
import type { UpdateCourseInput } from "../api/courseApi";

type UpdateCourseVariables = {
    id: string;
    data: UpdateCourseInput;
};

export function useUpdateCourse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateCourseVariables) => {
            return updateCourse(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courses"]
            });
        }
    });
}
