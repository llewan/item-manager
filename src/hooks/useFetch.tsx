import { useEffect, useState } from "react";

function useFetch<T extends any>(
  url: string
): { data: T | undefined; loading: boolean; error: Error | undefined } {
  const [state, setState] = useState<{
    data: T | undefined;
    loading: boolean;
    error: Error | undefined;
  }>({
    data: undefined,
    loading: true,
    error: undefined,
  });

  const doFetch = async (abortController: AbortController) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await fetch(url.toString(), {
        signal: abortController.signal,
      });
      const data = await res.json();

      setState((prevState) => ({
        ...prevState,
        data,
        loading: false,
      }));
    } catch (error: unknown) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error:
          error instanceof Error
            ? error.name !== "AbortError"
              ? (error as Error)
              : undefined
            : new Error("Unknown error"),
      }));
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    doFetch(abortController);

    return () => abortController.abort();
  }, [url.toString()]);

  return state;
}

export default useFetch;
