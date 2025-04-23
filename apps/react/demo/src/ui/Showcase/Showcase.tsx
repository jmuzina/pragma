import { Example } from "./common/index.js";
import "./styles.css";
import { FormProvider } from "react-hook-form";
import { useExampleRHFInterface } from "../../hooks/index.js";

const Showcase = () => {
  return <p>This is a test paragraph</p>;
  const { methods } = useExampleRHFInterface();
  return (
    <FormProvider {...methods}>
      <form>
        <Example>
          <div className="example">
            <Example.Renderer className="renderer" />
            <Example.Controls className="controls" />
          </div>
        </Example>
      </form>
    </FormProvider>
  );
};

export default Showcase;
