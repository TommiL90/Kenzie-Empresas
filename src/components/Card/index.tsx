interface ICompany {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

interface ICardProps {
  data: ICompany;
}

function Card({ data }: ICardProps) {
  return (
    <li className=" flex h-28 w-full flex-col justify-between border border-color-brand-1 p-4">
      <h4 className="text-xl font-bold text-color-grey-1 mb-4">{data.name}</h4>
      <p className="flex min-w-[6rem] w-max px-2 items-center justify-center rounded-2xl border border-color-brand-1 bg-color-grey-6 py-1 text-color-brand-1 text-base">
        {data.category_id}
      </p>
    </li>
  );
}

export default Card;
