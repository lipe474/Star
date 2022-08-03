import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    cpf: Yup.string().required('Cpf é obrigatório'),
    password: Yup.string().required('Senha obrigatório'),
    id: Yup.string()
})

export const initialValues = {
    cpf: '',
    password: '',
    id: '1'
}


