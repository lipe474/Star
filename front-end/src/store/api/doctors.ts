import { AxiosError } from "axios";
import { Doctor } from "../../data/@types/doctor";
import { ApiService } from "../../data/service/Api.Service";

export const listDoctors = async () => {
    try {
        const response = await ApiService.get(`/medics`);
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const RegisDoctor = async (obj: Doctor) => {
    try {
        return await ApiService.post(`/medics`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            nationality: obj?.nationality,
            crm: obj?.crm,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            password: obj?.password,
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            especialization: obj?.especialization,
            phone_number: obj?.phone_number,
        });

    } catch (error) {
        if (error  instanceof AxiosError) {
            return error?.response
        }
        return
    }
}


export const UpdatedDoctors = async (obj: Doctor, id: string) => {
    try {
        return await ApiService.put(`/medics/${id}`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            nationality: obj?.nationality,
            crm: obj?.crm,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            password: obj?.password,
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            especialization: obj?.especialization,
            phone_number: obj?.phone_number,
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeleteDoctors= async (id: string) => {
    try {
        return await ApiService.delete(`/medics/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getByIdDoctors = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/medics/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}
