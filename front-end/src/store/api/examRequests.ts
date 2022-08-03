import { AxiosError } from "axios";
import { ExamRequest } from "../../data/@types/examsRequest";
import { ApiService } from "../../data/service/Api.Service";

export const listExamRequests = async (id: string) => {
    try {
        const response = await ApiService.get(`/examRequests/all/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const RegisExamRequests = async (obj: ExamRequest, id: string) => {
    try {
        return await ApiService.post(`/examRequests`, {
            exams: obj?.exams,
            date: obj?.date,
            diagnostic_hypothesis: obj?.diagnostic_hypothesis,
            patient_id: id,
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const UpdatedExamRequests = async (obj: ExamRequest, id: string) => {
    try {
        return await ApiService.put(`/examRequests/${id}`, {
            exams: obj?.exams,
            date: obj?.date,
            diagnostic_hypothesis: obj?.diagnostic_hypothesis,
            patient_id: id,
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeleteExamRequests = async (id: string) => {
    try {
        return await ApiService.delete(`/examRequests/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getByIdExamRequests = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/examRequests/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}

