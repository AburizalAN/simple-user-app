import useSWR from "swr";
import * as React from "react";

const useSWRHandler = (
  uri: string | null,
  fetcher: () => void,
  options: object = {},
) => {
  const swr = useSWR(uri, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 0,
    ...options,
  });
  const { error } = swr;
  return swr;
}

export default useSWRHandler;