import * as Yup from 'yup';
import moment from 'moment'

export const schema = Yup.object().shape({
    name: Yup.string(), //.required('Obrigatório'),
    date: Yup.string().required('Obrigatório')
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
        }).nullable(),
    attachment: Yup.string(), //.required('Obrigatório'),
    status: Yup.string(), //.required('Obrigatório'),
    report: Yup.string(), //.required('Obrigatório')
})
export const initialValues = {
    name: '',
    date: `${moment().format()}`,
    attachment: '',
    status: '',
    report: '',

}



