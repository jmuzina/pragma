# React Standards Reference

This document outlines the standards and conventions for developing React components within the Canonical Design System. It aims to ensure consistency, maintainability, readability, and reusability across all React packages.

## Introduction

Our React components and development practices are guided by the following core principles:

* **Simplicity:** Strive for clear, understandable code, APIs, and component structures. Reduce complexity where possible.
* **Performance:** Optimize components for speed and efficiency in both development and production.
* **SSR Compatibility:** Ensure components can be rendered on the server side without issues.
* **Accessibility:** Aim for [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) compliance by default.
* **Modernity:** Embrace forward-looking technologies and best practices in the React ecosystem.

## File and Folder Structure (`react/file-structure`)

### Component Folder Structure (`react/file-structure/component-folder-structure`)
Each component resides in its own PascalCase named folder (e.g., `Button`, `Tooltip`). The standard files within this folder are:

+ `ComponentName.tsx`: The main component implementation.
+ `ComponentName.stories.tsx`: Storybook stories for demonstration and documentation.
+ `ComponentName.tests.tsx`: Unit and integration tests using Vitest and React Testing Library.
+ `index.ts`: The public API of the component, re-exporting the component, types, and related utilities.
+ `styles.css`: Component-specific CSS styles (if applicable).
+ `types.ts`: TypeScript type definitions, primarily for component props.

> ✅ **Do**
> 
> Create a component folder that contains all of the above mentioned files.

> ❌ **Don't**
>
> + Create a component folder that doesn't contain stories `ComponentName.stories.tsx`. 
> + Create a component file where the types are not included in `types.ts` but alongside the object.
> + Create a component folder where the public api is not fully described by `index.ts`. All external imports shall point at "path/to/Component/index.js" or its parents. 


### Subcomponents Location (`react/file-structure/subcomponents`)
For complex components that can be broken down into smaller, manageable parts intended primarily for internal use by the parent component:

* **Location**: A `common/` subdirectory within the parent component's folder.
  *Example:* `src/ui/Tooltip/common/`
* **Naming**: Avoiding prefixing subcomponent names with the parent component's name - we assume the folder structure already provides the domain. However, when reexporting a public interface, the prefix can be added
  *Example:* If `Card` is the parent, a subcomponent might be `CardHeader`.
* **Exports**:
  * Subcomponents shall be re-exported from an `index.ts` file within the `common/` directory (e.g., `common/index.ts`).
  * The parent component's main `index.ts` can then choose to import from `common/index.js` and selectively re-export subcomponents if they are intended for public consumption. Otherwise, they remain internal implementation details.

> ✅ **Do**
> 
> + Create a `MyComponent/common` directory
> + Code Generate, or add manually your subcomponents in that folder
> + Ensure the generated Storybook story file configuration name uses the common domain `MyComponent/common/MySubcomponent`
> + Reexport in `MyComponent/index.ts` the contents of your common directory with a named prefix as ` export { Icon as CardIcon } from "./common/index.js" `


> ❌ **Don't**
>
> + Create subcomponents in a directory other than `common`. 
> + Prefix your subcomponents folder with the name of the parent, for instance `Card/common/CardIcon`

### Custom Hooks (`react/file-structure/hooks`)
- **Local Hooks (Single Component Scope)**:
  - If a hook is used by only one component and has limited applicability to other code, it can be a `<hookName>.ts` file directly within the component's directory.
  - If a component has multiple local hooks, or a local hook requires its own types, create a `hooks/` subdirectory within the component folder (e.g., `src/ui/ComponentName/hooks/`).
  - Inside `hooks/`, each hook can have its own folder with `index.ts`, `types.ts`, and `<hookName>.ts` if complex, or just `<hookName>.ts` if simple.
- **Global Hooks (Reusable Across Packages/Tiers)**:
  - **Location**: Place in a shared `hooks/` directory at the package level, typically `src/ui/hooks/`.
  - **Structure**: Each global hook shall reside in its own named folder (e.g., `src/ui/hooks/useWindowFitment/`). This folder shall contain:
  - `<hookName>.ts`: The hook implementation.
  - `types.ts`: TypeScript definitions for the hook's props and return values.
  - `index.ts`: Re-exports the hook and its types.
      *Example:* `src/ui/hooks/useWindowFitment/`, `src/ui/hooks/useDelayedToggle/`.

### Context Providers (`react/file-structure/context`)
For components managing shared state via Context:

- Files are typically located directly within the component's directory that establishes the context.
  - `Context.tsx`: Defines the React context using `createContext(null)`.
- `Provider.tsx`: The component that will provide the context value and wrap children. It often uses a custom hook to manage its state.
- `types.ts`: Includes type definitions for the context's value (`ContextOptions`).
- A custom hook (e.g., in `hooks/useMyContextState.ts`) is often created to consume the context via `useContext`.

## Component Definition (`react/component`)

### Functional Components (`react/component/functional`)
- All components **must** be functional components.
- Use arrow function syntax for defining components.
  ```typescript
  import type Props from "./types.js";
  import "./styles.css"; // If styles are needed

  const MyComponent = ({ id, className, children, ...props }: Props): React.ReactElement => {
    return (
      <div id={id} className={className} {...props}>
        {children}
      </div>
    );
  };

  export default MyComponent;
  ```
### Naming (`react/component/naming`)
- Component names **must** use PascalCase (e.g., `Button`, `Chip`, `TooltipArea`).

### Props (`react/component/props`)
#### Prop Types (`react/placeholder-path/types`)
- Define props in an interface, typically named `ComponentNameProps`.
- Props interfaces should be clearly documented with JSDoc comments explaining each prop's purpose, possible values, and default behavior.
- If a component is intended to wrap standard HTML elements, its props should extend the relevant HTMLAttributes from React and allow pass-through of standard attributes. 
Ex:
```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";

  // Component-specific props
export interface BaseProps {
  children: ReactNode;
  appearance?: string;
}

// Combine base props with standard button attributes
type Props = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export default Props;
```

#### Standard Base Props (`react/placeholder-path/base`)
Components should support a set of standard base props to ensure a base level of consistency and customizability across all components. 
The following interface is not currently provided by the codebase in one single place, but is provided as a reference for all components to use:

```typescript
export interface StandardComponentProps {
  /** A unique identifier for the component */
  id?: string;
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Inline styles to apply to the component */
  style?: React.CSSProperties;
  /** Content to be rendered inside the component */
  children?: React.ReactNode; // Or a more specific type if children have constraints
}
```

#### Prop Destructuring and Defaults (`react/placeholder-path/destructuring-and-defaults`)
- Destructure props in the component's function signature.
- Provide default values for optional props directly in the destructuring assignment.
  ```typescript
  const Chip = ({
    appearance = "neutral", // Default value
    lead,
    value,
    ...props
  }: ChipPropsType): React.ReactElement => { /* ... */ };
  ```

#### Spreading Props (`react/placeholder-path/spreading`)
- Spread remaining props (`...props`) onto the root HTML element of the component to allow pass-through of standard HTML attributes (e.g., `aria-*`, `data-*`, event handlers). Ensure this is done safely and doesn't override critical internal attributes without intention.

#### `children` Prop (`react/placeholder-path/children`)
- Use `children: React.ReactNode` for components that are designed to wrap arbitrary content.
- Be specific with the type of `children` if the component expects a particular structure or type of child.

### Return Type (`react/component/return-type`)
- Components **must** explicitly type their return value as `React.ReactElement`.

### CSS Class Application (`react/component/css-class`)
- Dynamically build the `className` string, filtering out falsy values, to combine base classes, prop-driven classes, and user-provided classes.
  ```typescript
  className={[
    componentCssClassname, // from the top of the file, i.e., `ds button`
    className // from props.className
  ].filter(Boolean).join(" ")}
  ```
## State Management (`react/state`)

**React component files themselves should be kept as stateless as possible.** This enhances readability, testability, and reusability. Delegate stateful logic to:

1.  **Custom Hooks:** For reusable stateful logic or complex state interactions tied to a component or group of components.
2.  **Context Providers:** For global or tree-wide state that needs to be accessed by many components without prop drilling.

The `Drawer` component (`apps/react/demo/src/ui/Drawer/Drawer.tsx` serves as a good example of this delegation.

### Custom Hooks (`react/state/hooks`)
- **Purpose**: Encapsulate state logic (using React hooks like `useState`, `useEffect`, `useReducer`), side effects, and memoized computations.
- **Return Value**: Hooks should return their values (state and functions) as a single object, memoized with `useMemo` to prevent unnecessary re-renders in consuming components if the hook's internal dependencies haven't changed.

- ```typescript
  // Simplified example structure
  const useMyHook = (props: MyHookProps): MyHookResult => {
    const [value, setValue] = useState(props.initialValue);

    const memoizedFunction = useCallback(() => {
      // ...
    }, [dependencies]);

    return useMemo(() => ({
      value,
      action: memoizedFunction,
    }), [value, memoizedFunction]);
  };
  ```
- **Memoization**:
  - Use `useCallback` to memoize functions returned by or used within hooks.
  - Use `useMemo` to memoize complex calculations or the object returned by the hook.
- **SSR Safety**: For hooks interacting with browser-specific APIs (like `window` or `document`), ensure they are SSR-safe by checking `typeof window === "undefined"` before accessing such APIs. Initialize state to sensible defaults for the server environment.

> ✅ **Do**
> + Use appropriate React hooks to reduce unnecessary re-renders.
> + Memoize the hook return object. 
> ```tsx
>     const useMyHook = ({ prop1, prop2 }: MyHookProps) => {
>       const [someVal, setSomeVal] = useState(prop1);
>       const printPi = useCallback(() => {console.log(MATH.PI)}, []);
>       return useMemo(() => ({
>         someVal,
>         printPi
>       }), [someVal, printPi]);
>     };
>     export default useMyHook;
> + ```

> ❌ **Don't**
> + Clutter the context provider with state management logic
> ```tsx
>     const MyProvider = ({ children, ...initialProps }) => {
>       const [someVal, setSomeVal] = useState(0);
>       const [someOtherVal, setSomeOtherVal] = useState("hello world");
>       const printPi = useCallback(() => {console.log(Math.PI)}, []);
>       const contextValue = useMemo(() => ({
>         someVal,
>         setSomeVal,
>         someOtherVal,
>         setSomeOtherVal,
>         printPi
>       }), [someVal, someOtherVal, printPi]);
>       return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
>     };
>     export default MyProvider;
> + ```



### Context API (`react/state/context`)
- **Purpose**: To share data that can be considered "global" for a tree of React components, such as theme information, user authentication status, or state for a set of related components.
- **Structure**:
  1.  **`types.ts`**: Define an interface for the context's value (e.g., `ContextOptions`).
  2.  **`Context.tsx`**: Create the context using `React.createContext`. Provide a default value that matches the `ContextOptions` type (can be `null` or a meaningful default).
      ```typescript
      // Context.tsx (Example)
      import { createContext } from 'react';
      import type { MyContextOptions } from './types';

      export const MyContext = createContext<MyContextOptions | null>(null);
      ```
  3.  **Custom Hook (Consumer)**: Create a custom hook (e.g., `useMyContext`) that uses `useContext(MyContext)` to access the context value. This hook often includes error handling if used outside a provider.
  4.  **`Provider.tsx`**: Implement the Provider component. This component will manage the state (often via its own custom hook) and provide this state to its children via `MyContext.Provider`.
      ```typescript
      // Provider.tsx (Example)
      import { MyContext } from './Context';
      import { useMyProviderState } from './hooks/useMyProviderState'; // Hook managing the state

      const MyProvider = ({ children, ...initialProps }) => {
        const contextValue = useMyProviderState(initialProps);
        return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
      };
      export default MyProvider;
      ```
  5. **`index.ts`**: Export the Provider component, types, and any associated consumer hooks or components.

> ✅ **Do**
> + Delegate state management to a provider hook
> + Use `index.ts` to export the provider as a component
> ```typescript
>     // types.ts
>     /*
>       The provider component that will be exported by index.ts.
>       You should name this `<ComponentName>Component`, where `<Component>`, is the folder name containing the Provider. 
>     */
>     export type ExampleComponent = ((props: ProviderProps) => ReactElement) & {
>       Comp1: (props: Comp1Props) => ReactElement | null;
>       Comp2: (props: Comp2Props) => ReactElement | null;
>     };
>     export interface ProviderProps {
>       someProviderProp: string;
>       children: React.ReactNode;
>     } 
>     export interface ContextOptions {
>       someVal: number;
>       printPi: () => void;
>     }
>     export type UseProviderStateProps = Omit<ProviderProps, "children">;
>     export type UseProviderStateResult = ContextOptions;      
> ```
> ```tsx                                                    
>     // Context.tsx
>     import type { ContextOptions } from "./types.js";
>     const Context = createContext<ContextOptions | undefined>(undefined);
>     export default Context;
> ```
> ```tsx         
>     // useProviderState.tsx
>     const useProviderState = ({ prop1, prop2 }: UseProviderStateProps): UseProviderStateResult => {
>       const [someVal, setSomeVal] = useState(prop1);
>       const printPi = useCallback(() => {console.log(MATH.PI)}, []);
>       return useMemo(() => ({
>         someVal,
>         printPi
>       }), [someVal, printPi]);
>     };
>     export default useProviderState;
> ```
> ```tsx 
>     // Provider.tsx
>     import Context from "./Context.js";
>     const Provider = ({ children, ...initialProps }) => {
>       const contextValue = useMyProviderState(initialProps);
>       return <Context.Provider value={contextValue}>{children}</Context.Provider>;
>     };
>     export default Provider;
> ```
> ```tsx 
>     // index.ts
>     import type { ExampleComponent } from "./types.js";
>     export * from "./types.js";
>     import Provider from "./Provider.js";
>     import { Comp1 } from "./common/Comp1/index.js";
>     import { Comp2 } from "./common/Comp2/index.js";
>     // Export the provider component with its subcomponents available as properties
>     export const Example = Provider as ExampleComponent;
>     Example.Comp1 = Comp1;
>     Example.Comp2 = Comp2;
>     export default Example;
> ```
> ```tsx
>     // Some component that invokes the context provider
>     const ComponentUsingConext = () : ReactNode => (
>       <Example>
>         {* Any of these components can access the context with `useProviderState()` *}
>         <Example.Comp1/>
>         <Example.Comp2/>
>         <SomeOtherComponent/>
>       </Example>
>     );
> ```

> ❌ **Don't**
> + Clutter the context provider with state management logic
> ```tsx
>     // Provider.tsx
>     const Provider = ({ children, ...initialProps }) => {
>       const [someVal, setSomeVal] = useState(0);
>       const printPi = useCallback(() => {console.log(Math.PI)}, []);
>       const contextValue = useMemo(() => ({
>         someVal,
>         printPi
>       }), [someVal, someOtherVal, printPi]);
>       return <Context.Provider value={contextValue}>{children}</Context.Provider>;
>     };
>     export default Provider;
> ```
> + Declare the context and provider in the same file
> ```tsx
>    // Provider.tsx
>     export const Context = createContext<ContextOptions | undefined>(undefined);
>     export const Provider = ({ children, ...initialProps }) => {
>       const contextValue = useMyProviderState(initialProps);
>       return <Context.Provider value={contextValue}>{children}</Context.Provider>;
>     };
> ```

## Exports (`react/exports`)

Each component directory (and hook directory) **must** have an `index.ts` file. This file serves as the public API for that module.

- Export the default component: `export { default as ComponentName } from "./ComponentName.js";`
- Export named types, especially the primary props interface: `export type { ComponentNameProps } from "./types.js";` (or use `export * from "./types.js";` if all types are public).
- Export any related HOCs, utility functions, or publicly accessible subcomponents.

> ✅ **Do**
>
> + Create an `index.ts` file in every component and hook directory to define its public API.
> + Re-export the default component using the syntax: `export { default as ComponentName } from "./ComponentName.js";`.
> + Re-export all public types, especially the main props interface. Use `export * from "./types.js";` (as shown in your example `index.ts`) for convenience if all types within `types.ts` are intended for public use, or use specific named exports like `export type { ComponentNameProps } from "./types.js";` for more granular control.
> + Export any related HOCs, utility functions, or publicly accessible subcomponents (e.g., those from a `common/` directory if they are part of the public API) from the main `index.ts` file.

> ❌ **Don't**
>
> + Allow external consumers (outside the component's own directory structure) to import components, hooks, or types directly from their implementation files (e.g., `import MyComponent from "./MyComponent/MyComponent.js";` or `import { MyComponentProps } from "./MyComponent/types.js";`). All external imports should point to an `index.ts` file.
> + Forget to export essential types from `index.ts`, which would make it difficult for consumers to use the component effectively with TypeScript.
> + Clutter the `index.ts` file with internal logic or private exports that are not intended for public consumption. Keep it focused on defining the module's public interface.
> + Create an `index.ts` that does not re-export the default component if one exists.

## Higher-Order Components (HOCs) (`react/hoc`)

- When creating HOCs (e.g., `withTooltip.tsx`):
  - The HOC should accept a `ComponentType<TProps>` and any other necessary arguments (like `Message` for `withTooltip`).
  - It should return a new functional component, typically typed as `FC<TProps>`.
  - Set the `displayName` of the wrapped component for easier debugging in React DevTools:
    ```typescript
    WrappedComponent.displayName = \`withMyHOC(${Component.displayName || Component.name || "Component"})\`;
    ```

## Storybook (`react/storybook`)

- **Title**: Use a clear, hierarchical title (e.g., `Button`, `Tooltip/TooltipArea`, `Tooltip/Internals/Tooltip`).
- **`autodocs` Tag**: Include `tags: ["autodocs"]` in the `meta` object to enable automatic documentation generation.
- **Args**: Define default and story-specific arguments (`args`) for props. Use `fn()` from `@storybook/test` to mock callback props and enable spying in tests.
- **Stories**: Each significant variation or state of the component should have its own named story. Use JSDoc comments above stories for descriptions that appear in Storybook.
- **Decorators**: Utilize decorators for providing context, wrapping stories with layout elements, or applying global styles necessary for the component to render correctly.
- **Parameters**: Use `parameters` for configuring story layout (e.g., `layout: "centered"`), backgrounds, or other Storybook addons.
- **MDX**: Use `.mdx` files for dedicated documentation pages that require more narrative content than autodocs provide (e.g., `Configure.mdx`, or usage guidelines).

> ✅ **Do**
>
> + **Use clear, hierarchical titles and enable `autodocs`:**
> + **Import documented component as `Component` for consistency**
>   ```typescript
>   // MyComponent.stories.tsx
>   import type { Meta, StoryObj } from "@storybook/react";
>   import Component from "./MyComponent";
>
>   const meta = {
>     title: "Components/Forms/MyComponent",
>     component: Component,
>     tags: ["autodocs"],
>   } satisfies Meta<typeof Component>;
>
>   export default meta;
>   type Story = StoryObj<typeof meta>;
>   ```
> + **Define stories using CSF3 with `Meta` and `StoryObj` for strong TypeScript support:**
>   ```typescript
>   // MyComponent.stories.tsx (continued)
>   export const Default: Story = {
>     args: {
>       label: "Default Label",
>       disabled: false,
>     },
>   };
>
>   export const Disabled: Story = {
>     args: {
>       label: "Disabled Label",
>       disabled: true,
>     },
>   };
>   ```

> + **Use Template-Based Stories for DRY rendering logic across multiple stories (CSF2/CSF3 hybrid):**
>   *While CSF3 object stories are generally preferred for their conciseness and strong typing, template-based stories can be useful if you have complex rendering logic shared among multiple stories and want to avoid repeating a custom `render` function. This is more common in older Storybook versions (CSF2) but can still be used.*
>   ```typescript
>   // ComplexLayoutComponent.stories.tsx
>   import type { Meta, StoryFn } from "@storybook/react"; // Note StoryFn for template
>   import ComplexLayoutComponent, { ComplexLayoutProps } from "./ComplexLayoutComponent";
>   import { fn } from '@storybook/test';
>
>   const meta = {
>     title: "Components/Layout/ComplexLayoutComponent",
>     component: ComplexLayoutComponent,
>     tags: ["autodocs"],
>   } satisfies Meta<typeof ComplexLayoutComponent>;
>
>   export default meta;
>
>   // Define a template if the rendering logic is complex or needs to be reused
>   const Template: StoryFn<ComplexLayoutProps> = (args) => (
>     <div style={{ border: '2px solid blue', padding: '10px' }}>
>       <p>This is a wrapper from the template.</p>
>       <ComplexLayoutComponent {...args} />
>     </div>
>   );
>
>   export const VariantA = Template.bind({});
>   VariantA.args = {
>     title: "Variant A Title",
>     items: ["Item 1A", "Item 2A"],
>     onItemClick: fn(),
>   };
>
>   export const VariantBWithDifferentItems = Template.bind({});
>   VariantBWithDifferentItems.args = {
>     title: "Variant B Title",
>     items: ["Item 1B", "Item 2B", "Item 3B"],
>     onItemClick: fn(),
>     showBorder: true,
>   };
>   ```
> + **Use Static Stories for fixed, non-interactive examples:**
>   *If a story is purely presentational, has no configurable props (`args`), or you want to show a very specific, hardcoded state of a component without controls, a static story can be the simplest approach. This is less common when aiming for comprehensive documentation via `autodocs` and controls.*
>   ```typescript
>   // IconShowcase.stories.tsx
>   import type { Meta } from "@storybook/react";
>   import { MySpecificIcon, AnotherSpecificIcon } from "./MyIcons"; // Assuming these are components
>   import { ComponentShowcasingIcons } from "./ComponentShowcasingIcons";
>
>   const meta = {
>     title: "Components/Media/IconShowcase",
>     component: ComponentShowcasingIcons, // Optional: component for autodocs context
>     tags: ["autodocs"],
>   } satisfies Meta<typeof ComponentShowcasingIcons>;
>
>   export default meta;
>
>   // Static story: No args, no controls. Just renders the component in a fixed state.
>   export const SpecificIconsDisplay = () => (
>     <div>
>       <h4>Our Brand Icons</h4>
>       <MySpecificIcon color="primary" size={24} />
>       <AnotherSpecificIcon color="secondary" size={32} />
>       <p>These icons are always displayed this way in this context.</p>
>     </div>
>   );
>   // You might not get argTypes table for `SpecificIconsDisplay` itself,
>   // but `autodocs` on `meta.component` would still work for `ComponentShowcasingIcons`.
>
>   // Another example: A component with fixed children for a specific layout demo
>   import { Panel } from './Panel';
>   import { Button } from './Button';
>
>   export const FixedPanelLayout = () => (
>     <Panel title="Fixed Layout Example">
>       <p>This panel demonstrates a specific content arrangement.</p>
>       <Button>Action 1</Button>
>       <Button appearance="secondary">Action 2</Button>
>     </Panel>
>   );
>   FixedPanelLayout.storyName = "Panel with Fixed Content"; // Custom story name
>   ```
> + **Provide default `args` in `meta` and story-specific `args`, using `fn()` for actions:**
>   ```typescript
>   // AnotherComponent.stories.tsx
>   import type { Meta, StoryObj } from "@storybook/react";
>   import { fn } from '@storybook/test'; // Import fn for mocking
>   import AnotherComponent from "./AnotherComponent";
>
>   const meta = {
>     title: "Components/Actions/AnotherComponent",
>     component: AnotherComponent,
>     tags: ["autodocs"],
>     args: { // Default args for all stories of this component
>       onClick: fn(), // Mocked onClick callback
>       buttonText: "Click Me",
>     },
>   } satisfies Meta<typeof AnotherComponent>;
>
>   export default meta;
>   type Story = StoryObj<typeof meta>;
>
>   export const Primary: Story = {
>     // No args needed if defaults are sufficient
>   };
>
>   export const Destructive: Story = {
>     args: {
>       buttonText: "Delete",
>       isDestructive: true, // Story-specific arg
>     },
>   };
>   ```
>
> + **Use JSDoc comments for story descriptions:**
>   ```typescript
>   // MyComponent.stories.tsx (continued)
>
>   /**
>    * This is the primary story for MyComponent, showcasing its most common usage.
>    * It renders with a default label and is enabled.
>    */
>   export const PrimaryInteraction: Story = {
>     args: {
>       label: "Primary Action",
>     },
>   };
>   ```
>
> + **Utilize decorators for context or wrapping (example: a theme provider):**
>   ```typescript
>   // ThemeDecorator.tsx - A hypothetical decorator
>   // import React from 'react';
>   // import { ThemeProvider, myTheme } from './theme'; // Your theme implementation
>   // export const withTheme = (Story) => (
>   //   <ThemeProvider theme={myTheme}>
>   //     <Story />
>   //   </ThemeProvider>
>   // );
>
>   // MyStyledComponent.stories.tsx
>   import type { Meta, StoryObj } from "@storybook/react";
>   import MyStyledComponent from "./MyStyledComponent";
>   // import { withTheme } from './ThemeDecorator'; // Import your decorator
>
>   const meta = {
>     title: "Components/Styled/MyStyledComponent",
>     component: MyStyledComponent,
>     // decorators: [withTheme], // Apply decorator to all stories
>     tags: ["autodocs"],
>   } satisfies Meta<typeof MyStyledComponent>;
>
>   export default meta;
>   type Story = StoryObj<typeof meta>;
>
>   export const DefaultThemed: Story = {
>     args: { children: "I am styled by the theme!" },
>   };
>   ```
>
> + **Use `parameters` for story layout or other configurations:**
>   ```typescript
>   // CenteredComponent.stories.tsx
>   import type { Meta, StoryObj } from "@storybook/react";
>   import CenteredComponent from "./CenteredComponent";
>
>   const meta = {
>     title: "Layout/CenteredComponent",
>     component: CenteredComponent,
>     parameters: {
>       layout: "centered", // Center the component in the Storybook canvas
>     },
>     tags: ["autodocs"],
>   } satisfies Meta<typeof CenteredComponent>;
>
>   export default meta;
>   type Story = StoryObj<typeof meta>;
>
>   export const DefaultCentered: Story = {};
>   ```
> **Disable Chromatic Regression Testing for interactive stories**, and create separate stories that are pre-configured to simulate user interaction. Some stories may not be valuable to regression test (such as a contextual menu or tooltip that is closed by default, but can be opened interactively. 
> ```tsx
>   export const Tooltip: Story = {
>     parameters: {
>       chromatic: { disableSnapshot: true },
>     }
>   };
>   export const TooltipOpen: Story = {
>     args: {
>       // force the tooltip to be opened to regression-test its opened state
>       isVisible: true
>     }
>   }
>   // Hide the opened story from the Storybook UI - it is only needed for regression testing
>   TooltipOpen.tags = ["!dev"];
> ```

> ❌ **Don't**
>
> + **Create monolithic stories; prefer focused stories:**
>   ```typescript
>   export const EverythingAtOnce: Story = {
>     args: {
>       label: "Test",
>       disabled: true,
>       variant: "special",
>       icon: <MyIcon />,
>       onClick: fn(),
>       // ...and 10 other props
>     }
>   };
>   ```