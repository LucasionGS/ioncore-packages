import React, { useState } from "react"
import { IoncoreProvider } from "@ioncore/theme/IoncoreProvider"
import { Button } from "@ioncore/theme/Button"
import { Paper } from "@ioncore/theme/Paper"
import { Select } from "@ioncore/theme/Select/Select";
import { Checkbox, CheckboxGroup } from "@ioncore/theme/Checkbox";
import useTheme from "@ioncore/theme/hooks/useTheme";
import useDarkTheme from "@ioncore/theme/hooks/useDarkTheme";
import { Input } from "@ioncore/theme/Input/Input";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  const isDark = useDarkTheme();

  const content = (
    <Paper square>
      <Select onChange={x => setTheme(x as any)} value={theme} options={[
        { label: "OS Theme: " + (isDark ? "Dark" : "Light"), value: "auto" },
        { label: "🌞", value: "light" },
        { label: "🌑", value: "dark" }
      ]} />
      <br />
      <h1>Documentation</h1>
      <h2>Buttons</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button icon={"✔"} variant="success">Success</Button>
      <Button icon={"⚠"} variant="warning">Warning</Button>
      <Button icon={"💀"} variant="danger">Danger</Button>
      <br />
      <Button disabled variant="primary">Primary</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled icon={"✔"} variant="success">Success</Button>
      <Button disabled icon={"⚠"} variant="warning">Warning</Button>
      <Button disabled icon={"💀"} variant="danger">Danger</Button>
      <h2>Select</h2>
      {/* <code>{`<Select defaultValue="Two" options={["One", "Two", "Three"]} />`}</code> */}
      <Select defaultValue="Two" options={["One", "Two", "Three"]} />
      You can make it a vertical select by passing the <code>direction</code> as <code>"vertical"</code> prop:
      <Select direction="vertical" defaultValue="Two" options={["One", "Two", "Three"]} />
      <h2>Checkbox</h2>
      <CheckboxGroup>
        <Checkbox alwaysShowTick label="Checkbox 1 with tick" />
        <Checkbox label="Checkbox 2 without tick" />
      </CheckboxGroup>

      <CheckboxGroup>
        <Checkbox alwaysShowTick />
        <Checkbox />
      </CheckboxGroup>
      <h2>Paper</h2>
      <PaperDisplay />
      <h2>Input</h2>
      <InputDisplay />
    </Paper>
  );

  function PaperDisplay() {
    const [square, setSquare] = useState(false);
    return (
      <Paper square={square}>
        This is a paper component.
        It can contain any content and will have a shadow. It can also be square by passing the <code>square</code> prop. It is currently <b>{square ? "square" : "rounded"}</b>.
        <br />
        Check the corners when you toggle the checkbox below. The square is useful for when you want the paper to fit the screen exactly.
        <br />
        <Checkbox alwaysShowTick label="Square" checked={square} onChange={setSquare} />
      </Paper>
    );
  }

  function InputDisplay() {
    const [value, setValue] = useState("");
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");
    return (
      <>
        Input is a low-level component that can be used to build other components.
        <br />
        <Input label="This is a label" value={value} onChange={(_, newValue) => setValue(newValue)} />
        <br />
        <br />
        It can be used to build a login form:
        <br />
        <Input label="Username" value={username} onChange={(_, newValue) => setValue(newValue)} />
        <Input label="Password" value={password} onChange={(_, newValue) => setValue(newValue)} type="password" />
      </>
    );
  }

  return (
    <div>
      <IoncoreProvider theme={{ scheme: theme }}>
        {content}
      </IoncoreProvider>
    </div>
  )
}
