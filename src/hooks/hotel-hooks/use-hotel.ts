import { useEffect, useState } from 'react';

import api from '../../services/api';
import { Hotel } from '../../types/hotel';

const useHotel = (hotelId: string | undefined) => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hotelId) {
      setError('Hotel ID is missing');
      setLoading(false);
      return;
    }

    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (err) {
        setError('Failed to fetch hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  return { hotel, loading, error };
};

export default useHotel;
