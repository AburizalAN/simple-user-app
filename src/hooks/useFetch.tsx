import * as React from "react";

const useFetch = (callback: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<object | undefined>(undefined);
  const [data, setData] = React.useState<object | undefined>(undefined);

  const action = async (...args: any[]) => {
    try {
      setIsLoading(true);
      const res = await callback(...args)
      setData(res);
      setError(undefined);
      return res;
    } catch (err: any) {
      setData(undefined);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, action, error };
}

export default useFetch;