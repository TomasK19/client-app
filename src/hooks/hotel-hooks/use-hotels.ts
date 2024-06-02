import { useState, useEffect } from "react";
import axios from "axios";
import { Hotel } from "../../types/hotel";
import api from "../../services/api";

interface UseHotelsResult {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const useHotels = (): UseHotelsResult => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get<Hotel[]>("/hotels/all");
        console.log("API Response:", response.data); // Log the API response
        setHotels(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error fetching hotels", err);
          setError(
            "Error fetching hotels: " +
              (err.response?.data?.message || err.message)
          );
        } else {
          console.error("Unexpected error fetching hotels", err);
          setError("Error fetching hotels: " + (err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return { hotels, loading, error };
};

export default useHotels;
