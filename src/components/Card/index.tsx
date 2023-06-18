interface ICompany {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

interface ICardProps {
  data: ICompany;
}

function Card({ data }: ICardProps) {
  return (
    <li className=" flex h-28 w-full flex-col justify-between border border-color-brand-1 p-4">
      <h4 className="mb-4 text-xl font-bold text-color-grey-1">{data.name}</h4>
      <p className="flex w-max min-w-[6rem] items-center justify-center rounded-2xl border border-color-brand-1 bg-color-grey-6 px-2 py-1 text-base text-color-brand-1">
        {data.categoryId}
      </p>
    </li>
  );
}

export default Card;
