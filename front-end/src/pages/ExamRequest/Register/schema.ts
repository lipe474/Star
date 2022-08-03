import * as Yup from 'yup';
import moment from 'moment'

export const schema = Yup.object().shape({
    exams: Yup.string().required('Obrigatório'),
    date: Yup.string().required('Obrigatório'),
    diagnostic_hypothesis: Yup.string().required('Obrigatório')
})
export const initialValues = {
    exams: "",
    diagnostic_hypothesis: "",
    date: `${moment().format()}`,
    patient_id: "",
    id: "",

}



