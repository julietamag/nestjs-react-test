import { useEffect, useState } from 'react';
import axios from 'axios';
import { NextDelivery } from '../types';

export const useNextDelivery = (
  id?: string,
): {
  data: NextDelivery | null;
  error: string | null;
  loading: boolean;
} => {
  const [data, setData] = useState<NextDelivery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/comms/your-next-delivery/${id}`,
        );

        setData(data);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  return { data, loading, error };
};
