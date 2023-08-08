import { useEffect, useState } from "react";

export default function usePromise<T>(fn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    loading: boolean;
    error: any;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    fn()
      .then((data) => {
        setState({ loading: false, error: null, data });
      })
      .catch((error) => {
        setState({ loading: false, error, data: null });
      });
  }, deps);

  return state;
}