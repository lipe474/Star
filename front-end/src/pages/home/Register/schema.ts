import * as Yup from 'yup';
import moment from 'moment'
import { VerifyCPF } from '../../../data/utils/masks';
export const schema = Yup.object().shape({
    name: Yup.string().required('Obrigatório'),
    ethnicity: Yup.string().required('Required'),
    nationality: Yup.string().required('Obrigatório'),
    cpf: Yup.string().required('Obrigatório')
        .test('cpf', cpf => {
            if (cpf && VerifyCPF(`${cpf}`)) {
                return true
            } else {
                return new Yup.ValidationError(
                    'Cpf inválido',
                    null,
                    'cpf',
                )
            }
        })
    ,
    birth_date: Yup.string()
        .required('Obrigatório')
        .test('birth_date', obj => {
            if (obj && moment(obj).isValid()) {
                return true
            } else {
                return new Yup.ValidationError(
                    'Data inválido',
                    null,
                    'birth_date',
                )
            }
        }).nullable()
    ,
    marital_status: Yup.string().required('Obrigatório'),
    address: Yup.string().required('Obrigatório'),
    state: Yup.string().required('Obrigatório'),
    city: Yup.string().required('Obrigatório'),
    gender: Yup.string().required('Obrigatório'),
    phone_number: Yup.string().required('Obrigatório'),
})
export const initialValues = {
    name: '',
    ethnicity: '',
    nationality: '',
    cpf: '',
    birth_date: '',
    marital_status: '',
    address: '',
    state: '',
    city: '',
    gender: '',
    phone_number: '',
}



