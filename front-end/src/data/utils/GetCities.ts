
export const GetCities = async (id: string) => {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
        return response.json()
    }
    catch (e) {
        return e
    }
}

export const GetAllCities = async (id: string) => {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/distritos`)
        return response.json()
    }
    catch (e) {
        return e
    }
}




