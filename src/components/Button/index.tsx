import React from "react";
import styles from "./styles.module.scss"

interface Ibutton {
  children: React.ReactNode;
}

const Button = ({ children }: Ibutton) => {
  return <button type="submit" className={styles.button}>{children}</button>;
};

export default Button;
