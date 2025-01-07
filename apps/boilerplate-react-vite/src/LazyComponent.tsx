import {Button} from "@canonical/ds-react-core";

function LazyComponent() {
  return <Button appearance={"positive"} label={"Click me"} onClick={() => alert("clicked!")}></Button>;
}

export default LazyComponent;