import axiosInstance from "./axios";

export interface Course {
    _id: string;
    title: string;
    description: string;
    status: "draft" | "published";
    createdAt: string;
    updatedAt: string;
}

export interface CreateCourseInput {
    title: string;
    description: string;
    status?: "draft" | "published";
}

export interface UpdateCourseInput {
    title?: string;
    description?: string;
    status?: "draft" | "published";
}

export const getCourses = async () => {
    const response = await axiosInstance.get<Course[]>("/courses");
    return response.data;
};

export const getCourseById = async (id: string) => {
    const response = await axiosInstance.get<Course>(`/courses/${id}`);
    return response.data;
};

export const createCourse = async (
    course: CreateCourseInput
): Promise<Course> => {
    const response = await axiosInstance.post<Course>("/courses", course);
    return response.data;
};

export const updateCourse = async (
    id: string,
    course: UpdateCourseInput
): Promise<Course> => {
    const response = await axiosInstance.put<Course>(`/courses/${id}`, course);
    return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/courses/${id}`);
};