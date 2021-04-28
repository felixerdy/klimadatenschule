import { MouseEventHandler } from 'react';

export type ItemRowProps = {
  title: string;
  publisher?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const ItemRow = (props: ItemRowProps) => {
  return (
    <div
      onClick={props.onClick ? props.onClick : () => {}}
      className="rounded-xl bg-gray-50 p-8 my-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      <h1 className="text-xl">{props.title}</h1>
      {props.publisher && (
        <h3 className="text-indigo-700 font-semibold">by {props.publisher}</h3>
      )}
    </div>
  );
};

export default ItemRow;
