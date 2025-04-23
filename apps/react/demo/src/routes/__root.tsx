import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useMemo } from "react";

export const Route = createRootRoute({
  component: () => {
    console.log("root route!");
    // const isSsr = useMemo(() => typeof window === "undefined", []);

    return (
      <>
        <Outlet />
        {/*{!isSsr && <TanStackRouterDevtools position={"top-right"} />}*/}
      </>
    );
  },
  // TODO temporary / debugging, make this more professional before you actually merge this
  notFoundComponent: () => <p>we couldn't find that :(</p>,
});
