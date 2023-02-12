import React from "react";

type Props = {
  name: string;
};

const App = (props: Props) => {
  return (
    <h1>
      Hello {props.name}
    </h1>
  );
};

export default App;
