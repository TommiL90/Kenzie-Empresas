import styles from "./styles.module.scss"
interface ICompany {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

interface ICardProps {
  data: ICompany;
}

function Card({data}: ICardProps) {
  return (
    <li className={styles.li}>
        <h4>{data.name}</h4>
        <p>{"Setor"}</p>
    </li>
  )
}

export default Card