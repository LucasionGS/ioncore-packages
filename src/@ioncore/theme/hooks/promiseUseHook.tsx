import React from "react";

/**
 * Converts a promise to a hook.
 * @returns A hook function that returns a tuple of the promise result and a refresh function. Defaults to null until the promise is resolved.
 * @example
 * const fetchUser = (userId) => fetch(`/api/user/${userId}`).then(res => res.json());
 * const useUser = promiseUseHook(fetchUser); // useUser is now a hook and can be used in a component
 * 
 * const MyComponent = () => {
 *   const [user, refreshUser] = useUser(123); // user is null until the promise is resolved and UI is updated.
 *   return <div>
 *     <p>User is {user?.name}</p>
 *     <button onClick={refreshUser}>Refresh</button>
 *   </div>
 * }
 */
export function promiseUseHook<T, const TArgs extends any[]>(fn: (...args: TArgs) => PromiseLike<T>, defaultValue: T | null = null) {
  return function useHook(...args: TArgs) {
    const [state, setState] = React.useState<T | null>(defaultValue);
    const refresh = (...args: TArgs) => {
      fn(...args).then(setState);
    }
    React.useEffect(() => {
      refresh(...args);
    }, []);
    return [state, refresh] as const;
  }
}