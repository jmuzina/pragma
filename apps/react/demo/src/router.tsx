import { createRouter as createReactRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.js";
import {
  dehydrate,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SuperJSON } from "superjson";

export function createRouter() {
  return createReactRouter({
    routeTree,
    // serializer: SuperJSON,
    // defaultPreload: "intent",
    // Wrap: ({children}: { children: ReactNode }) => <QueryClientProvider
    //   client={queryClient}>{children}</QueryClientProvider>,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
