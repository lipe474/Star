import { AxiosError } from "axios";
import { Resident } from "../../data/@types/resident";
import { ApiService } from "../../data/service/Api.Service";

export const listResident = async () => {
    try {
        const response = await ApiService.get(`/residents`);
        return response?.data;
    } catch (error) {
        return error;
    }
}


export const RegisResident = async (obj: Resident) => {
    try {
        return await ApiService.post(`/residents`, {
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
            residence_date: new Date(obj?.residence_date as string).toISOString(),
            phone_number: obj?.phone_number,
            id: '2'
        });

    } catch (error) {
        if (error  instanceof AxiosError) {
            return error?.response
        }
        return
    }
}


export const UpdatedResident = async (obj: Resident, id: string) => {
    try {
        return await ApiService.put(`/residents/${id}`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            nationality: obj?.nationality,
            crm: obj?.crm,
            cpf: obj?.cpf,
            password: obj?.password,
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            especialization: obj?.especialization,
            residence_date: new Date(obj?.residence_date as string).toISOString(),
            phone_number: obj?.phone_number,
            id: '2'
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeleteResident= async (id: string) => {
    try {
        return await ApiService.delete(`/residents/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getByIdResident = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/residents/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}
