import React from "react";
import { RouterContext } from "../Router/Router";


export function useRouter() {
  return React.useContext(RouterContext);
}
