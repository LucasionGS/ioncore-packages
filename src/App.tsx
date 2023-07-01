import React from "react"
import { Button } from "@ioncore/theme/index"
import { IoncoreProvider } from "@ioncore/theme/IoncoreProvider"

export default function App() {
  return (
    <IoncoreProvider>
      <div>
        Button:
        <br />
        <Button>Click me</Button>
      </div>
    </IoncoreProvider>
  )
}
