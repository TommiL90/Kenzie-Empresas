import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import styles from "./styles.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef(
  (
    { label, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className={styles.inputContainer}>
      {label ? <label>{label}</label> : null}
      <input className={styles.input} ref={ref} {...rest} />
      {error ? <p className={styles.error}>{error.message}</p> : null}
    </div>
  )
);
/*
interface IInputProps{
    label?: string;
    error?: FieldError;
    type: "text" | "number" | "email" | "password";
    placeholder?: string;
    register: UseFormRegisterReturn<string>;
    disabled?: boolean;
}

export const Input = ({label, error, type, placeholder, register, disabled}: IInputProps) => {
    return(
        <div>
        {label ? <label>{label}</label> : null}
        <input type={type} placeholder={placeholder} disabled={disabled} {...register} />
        {error ? <p>{error.message}</p> : null}
    </div>
    )
}
*/
//`${styles.input} ${error ? styles.error : ""}`