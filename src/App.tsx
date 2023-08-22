import React, { useState } from "react"
import { IoncoreProvider } from "@ioncore/theme/IoncoreProvider"
import { Button } from "@ioncore/theme/Button"
import { Paper } from "@ioncore/theme/Paper"
import { Select } from "@ioncore/theme/Select/Select";
import { Checkbox, CheckboxGroup } from "@ioncore/theme/Checkbox";
import useTheme from "@ioncore/theme/hooks/useTheme";
import useDarkTheme from "@ioncore/theme/hooks/useDarkTheme";
import { Input } from "@ioncore/theme/Input/Input";
import { Routes, Router, Textarea } from "@ioncore/theme";
import { Link } from "@ioncore/theme/Link";

const ChangePage = ({ value }: { value: string }) => <div>
  <Link href="/"><Button variant={value == "/" ? "primary" : "secondary"}>Home</Button></Link>
  <Link href="/about"><Button variant={value == "/about" ? "primary" : "secondary"}>About</Button></Link>
  <Link href="/contact"><Button variant={value == "/contact" ? "primary" : "secondary"}>Contact</Button></Link>
  <Link href="/item/1"><Button variant={value == "/item/1" ? "primary" : "secondary"}>Item 1</Button></Link>
  <Link href="/item/2"><Button variant={value == "/item/2" ? "primary" : "secondary"}>Item 2</Button></Link>
  <Link href="/item/3/Another"><Button variant={value == "/item/3" ? "primary" : "secondary"}>Item 3</Button></Link>
</div>

const routes: Routes = [
  {
    path: /^\/$/,
    title: "Home",
    component: () => <div>
      <ChangePage value="/" />
      <h1>Home page</h1>
      <p>This is the home page.</p>
    </div>
  },
  {
    path: /^\/about$/,
    title: "About",
    component: () => <div>
      <ChangePage value="/about" />
      <h1>About page</h1>
      <p>A page to tell you about us.</p>
    </div>
  },
  {
    path: /^\/contact$/,
    title: "Contact",
    component: () => <div>
      <ChangePage value="/contact" />
      <h1>Contact page</h1>
      <p>A page to contact us.</p>
    </div>
  },
  {
    path: /^\/item\/(\w+)(?:\/(\w+))?$/g,
    title: "Contact",
    component: (id, extra) => <div>
      <ChangePage value={"/item/" + id} />
      <h1>Item page</h1>
      <p>Item is {id}</p>
      {extra && <p>Extra is {extra}</p>}
    </div>
  },
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  const [isDark] = useDarkTheme();

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
      <Button style={{ backgroundColor: "#ff0fff", color: "#ff0" }}>Custom</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button icon={"✔"} variant="success">Success</Button>
      <Button icon={"⚠"} variant="warning">Warning</Button>
      <Button icon={"💀"} variant="danger">Danger</Button>
      <br />
      <Button disabled style={{ backgroundColor: "#ff0fff", color: "#ff0" }}>Custom</Button>
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
      <h2>Router</h2>
      <hr />
      <Router pages={routes} />
      <hr />
      The router is a component that can be used to build a website with multiple pages.
      It will automatically update the page title and the URL, when using the <code>Link</code> component.
      <br />
      The content will be updated without reloading the page to maintain a smooth user experience, and the path is updated using the <code>history.pushState</code> API.
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
    const [textarea, setTextarea] = useState("Textarea\nWith multiple lines");
    return (
      <>
        Input is a low-level component that can be used to build other components.
        <br />
        <Input label="Left Label" value={value} onChange={(_, newValue) => setValue(newValue)} />
        <Input label="Center Label" value={value} onChange={(_, newValue) => setValue(newValue)} labelAlign="center" />
        <Input label="Right Label" value={value} onChange={(_, newValue) => setValue(newValue)} labelAlign="right" />
        <br />
        It can be used to build a login form:
        <br />
        <Input label="Username" value={username} onChange={(_, newValue) => setUsername(newValue)} />
        <Input label="Password" value={password} onChange={(_, newValue) => setPassword(newValue)} type="password" />
        <br />
        <Button variant="primary" onClick={() => alert(`Username: ${username}\nPassword: ${password}`)}>Login</Button>
        <br />
        <Input containerStyle={{ width: "100%" }} style={{ width: "100%" }} label="Custom Styled Input" value={value} onChange={(_, newValue) => setValue(newValue)} />
        <br />
        <Textarea label="Textarea" value={textarea} onChange={(_, newValue) => setTextarea(newValue)} />
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
