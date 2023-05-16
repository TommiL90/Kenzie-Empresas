import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required("precisa um mail cadastrado"),
    password: yup.string().required("precisa sua senha")
})

export type TLoginFormValues = yup.InferType<typeof loginSchema>;