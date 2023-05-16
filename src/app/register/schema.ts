import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required("Nome é requerido").min(3, "Nome precisa pelo menos 3 letras").max(20, "Nome precisa ser menos de 20 letras"),
    email: yup.string().required("Email é requerido").email("escribir mail en formato correto"),
    password: yup.string().required("Senha é requerida").min(6, " Senha precisa ser oelo menos de 8 caractéres").matches(/(?=.*?[A-Z])/, "Sua senha precisa uma letra maiúscula"),
    repeatPassword: yup.string().required("Senha é requerida").min(6, " Senha precisa ser oelo menos de 8 caractéres").matches(/(?=.*?[A-Z])/, "Sua senha precisa uma letra maiúscula").oneOf([yup.ref("password")], "As senhas não são iguais")
})

export type TRegisterFormValues = yup.InferType<typeof registerSchema>;