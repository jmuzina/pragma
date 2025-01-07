import React, {lazy, Suspense, useState} from "react";
import canonicalLogo from "./assets/canonical.svg";
import reactLogo from "./assets/react.svg";
import "./Application.css";
import { Button } from "@canonical/ds-react-core";

const SlowComponent = React.lazy(() =>
  import("./LazyComponent.js").then((module) => {
    return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
      setTimeout(() => {
        resolve(module);
      }, 2000);
    });
  })
);

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
          <img src={canonicalLogo} className="logo" alt="Canonical logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Canonical Design System</h1>
      <h2>React Vite template</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <SlowComponent/>
      </Suspense>
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
