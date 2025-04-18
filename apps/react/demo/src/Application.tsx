import {
  RouterProvider,
  createRouter as createTanstackRouter,
} from "@tanstack/react-router";
import { useExampleRHFInterface } from "hooks/index.js";
import { FormProvider } from "react-hook-form";
import { routeTree } from "./routeTree.gen.js";
import Showcase from "./ui/Showcase/Showcase.js";

/*
  Create a router factory that client & server can use to create their own router instances
  @see https://tanstack.com/router/latest/docs/framework/react/guide/ssr#router-creation
 */
export const createRouter = () => createTanstackRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

function App({ router }) {
  const { methods } = useExampleRHFInterface();

  return (
    <FormProvider {...methods}>
      <form className="h-100">
        {/*<RouterProvider router={router} />*/}
        <Showcase />
        {/*<p>test</p>*/}
      </form>
    </FormProvider>
  );
}

export default App;
