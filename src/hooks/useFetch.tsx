import { useEffect, useState } from "react";

/*
  Function that calls the API communication and return the data or error
*/
export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const API_URL: string =
      process.env.REACT_APP_API_HOST || "f1-race-schedule.p.rapidapi.com";
    const API_KEY: string =
      process.env.REACT_APP_API_KEY ||
      "d4d65c17b1mshcee3200b27a2535p161e06jsnb148f3cc728e";

    setData(null);
    setIsPending(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal,
          headers: new Headers({
            "x-rapidapi-host": API_URL,
            "x-rapidapi-key": API_KEY,
          }),
        });

        if (!response.ok) {
          throw new Error("Could not fetch the data.");
        }

        const result = await response.json();
        setData(result);
        setIsPending(false);
        setError(null);
      } catch (error: any) {
        setIsPending(false);
        if (error.name === "AbortError") {
          console.log(error.message);
          setError(error.message);
        } else {
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error };
};
