import React, {useEffect, Suspense, useState, lazy} from "react";
import canonicalLogo from "./assets/canonical.svg";
import reactLogo from "./assets/react.svg";
import "./Application.css";
import {Button} from "@canonical/ds-react-core";

const DemoComponent = ({ timeout = 2000 }) => {
  const LazyButton = lazy(async () => {
    console.log("waiting for the button");
    await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log("resolving button");

    return {
      default: () => <Button
        appearance={"positive"}
        label={"Click me"}
        onClick={() => alert("clicked!")}
      ></Button>,
    };
  });

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <LazyButton/>
      </Suspense>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://canonical.com"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          <img src={canonicalLogo} className="logo" alt="Canonical logo"/>
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Canonical Design System</h1>
      <h2>React Vite template</h2>
      <DemoComponent/>
      <div className="card">
        <Button
          label={`Count: ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
