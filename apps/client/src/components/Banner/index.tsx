import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import './index.css';
import { Buttons } from './Buttons';
import { FreeGiftBanner } from './FreeGiftBanner';
import { NextDeliveryDetails } from './NextDeliveryDetails';

import { NextDelivery } from '../../types';

export const Banner = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<NextDelivery | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/comms/your-next-delivery/${id}`,
        );

        setUserData(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError('No data found');
          } else {
            setError('Something went wrong');
          }
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    fetchUserData();
  }, [id]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!userData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center mt-[49px]">
      <div
        className="relative flex md:w-[752px] w-[90%]
		bg-white  border border-[#C6C6C6] rounded-sm "
      >
        {userData.freeGift && <FreeGiftBanner />}

        <div className="image absolute md:w-[339px] w-[53px] md:h-[224px] h-[53px] md:rounded-none rounded-full md:static left-1/2 top-[-25px] transform md:transform-none md:-translate-0 -translate-x-1/2 "></div>

        <div className="px-5 pt-10 pb-7 md:text-left text-center flex flex-col justify-between ">
          <NextDeliveryDetails details={userData} />
          <Buttons />
        </div>
      </div>
    </div>
  );
};
