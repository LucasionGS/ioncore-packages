import React from "react";
import useDarkTheme from "../hooks/useDarkTheme";

/**
 * Theme provider for `@ioncore/theme`
 */
export interface IoncoreProviderProps {
  theme?: {
    /**
     * The color displayed behind the content
     * @default "#1f1f1f"
     */
    backgroundColor?: string;
    /**
     * The color of the text
     * @default "#fafafa"
     */
    color?: string;
    /**
     * The color scheme
     * @default "default"
     */
    scheme?: "auto" | "dark" | "light";
  }
}

const defaultProviderProps: IoncoreProviderProps = {
  theme: {
    backgroundColor: "#1f1f1f",
    color: "#fafafa",
  },
};

export const IoncoreContext = React.createContext<IoncoreProviderProps>(defaultProviderProps);

export function IoncoreProvider(props: IoncoreProviderProps & { useDefault?: boolean, children?: React.ReactNode }) {
  const { ...parentCtx } = React.useContext(IoncoreContext);
  const isDark = useDarkTheme();
  const { children, useDefault = false, ...providerProps } = props;
  const ctx = {
    ...(useDefault ? defaultProviderProps : parentCtx),
    ...providerProps,
  };

  const colorScheme: "light" | "dark" = ctx?.theme?.scheme == null ? "light" : ctx.theme.scheme === "auto" ? (isDark ? "dark" : "light") : ctx.theme.scheme;

  return (
    <IoncoreContext.Provider value={ctx}>
      <div className={`ic-provider--${colorScheme}`}>
        {children}
      </div>
    </IoncoreContext.Provider>
  );
}