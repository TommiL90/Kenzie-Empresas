import React from "react";
import styles from "./styles.module.scss";

interface Ibutton {
  children: React.ReactNode;
}

const Button = ({ children }: Ibutton) => {
  return (
    <button
      type="submit"
      className="flex h-12 w-full items-center justify-center border border-color-brand-1 bg-color-brand-1 text-base font-semibold text-color-grey-5 hover:border-color-brand-2 hover:bg-color-brand-2">
      {children}
    </button>
  );
};

export default Button;
