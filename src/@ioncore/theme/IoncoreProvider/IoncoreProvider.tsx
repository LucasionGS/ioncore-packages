import React from "react";

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
  }
}

export const IoncoreContext = React.createContext<IoncoreProviderProps>({
  theme: {
    backgroundColor: "#1f1f1f",
    color: "#fafafa",
  },
});

export function IoncoreProvider(props: IoncoreProviderProps & { children?: React.ReactNode }) {
  const { ...ctx } = React.useContext(IoncoreContext);
  const { children, ...providerProps } = props;
  const newCtx = {
    ...ctx,
    ...providerProps,
  };
  return (
    <IoncoreContext.Provider value={providerProps}>
      {children}
    </IoncoreContext.Provider>
  );
}