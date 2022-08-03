import * as Yup from 'yup';
import moment from 'moment'
import { VerifyCPF } from '../../../data/utils/masks';
export const schema = Yup.object().shape({
    name: Yup.string().required('Obrigatório'),
    ethnicity: Yup.string().required('Required'),
    nationality: Yup.string().required('Obrigatório'),
    crm: Yup.string().required('Obrigatório'),
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
        }),
    password: Yup.string().required('Obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
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
    especialization: Yup.string().required('Obrigatório'),
    residence_date: Yup.string().required('Obrigatório'),
    phone_number: Yup.string().required('Obrigatório'),
})
export const initialValues = {
    name: '',
    ethnicity: '',
    nationality: '',
    crm: '',
    cpf: '',
    password: '',
    confirmPassword: '',
    marital_status: '',
    birth_date: null,
    address: '',
    city: '',
    state: '',
    gender: '',
    especialization: '',
    residence_date: '',
    phone_number: '',
}



