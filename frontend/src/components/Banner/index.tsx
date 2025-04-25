import { useParams } from 'react-router-dom';

import './index.css';
import { Buttons } from './Buttons';
import { FreeGiftBanner } from './FreeGiftBanner';
import { NextDeliveryDetails } from './NextDeliveryDetails';

import { useNextDelivery } from '../../hooks/useGetNextDelivery';

export const Banner = () => {
  const { id } = useParams();

  const { data: nextDeliveryData, error, loading } = useNextDelivery(id);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!nextDeliveryData || loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center mt-[49px]">
      <div
        className="relative flex md:w-[752px] w-[90%]
		bg-white  border border-[#C6C6C6] rounded-sm "
      >
        {nextDeliveryData.freeGift && <FreeGiftBanner />}

        <div className="image absolute md:w-[339px] w-[53px] md:h-[224px] h-[53px] md:rounded-none rounded-full md:static left-1/2 top-[-25px] transform md:transform-none md:-translate-0 -translate-x-1/2 "></div>

        <div className="px-5 pt-10 pb-7 md:text-left text-center flex flex-col justify-between ">
          <NextDeliveryDetails details={nextDeliveryData} />
          <Buttons />
        </div>
      </div>
    </div>
  );
};
