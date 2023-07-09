import React from "react";
import { IoncoreContext } from "../IoncoreProvider";

export default function useTheme() {
  return React.useContext(IoncoreContext)
}