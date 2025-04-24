import { NextDelivery } from '../../types';

interface Props {
  details: NextDelivery;
}

export const NextDeliveryDetails = ({ details }: Props) => {
  return (
    <div>
      <h1 className="text-base text-[#0D8112] font-bold">{details.title}</h1>
      <p className="text-xs font-light">{details.message}</p>

      <p className="text-[13px] text-[#585858] font-bold py-5">
        Total price: £{details.totalPrice}
      </p>
    </div>
  );
};
