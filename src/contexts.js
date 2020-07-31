import React from "react";
const globalState = {
  enfermeiro: null,
};

const GlobalStateContext = React.createContext(globalState);
const UpdateGlobalStateContext = React.createContext(undefined);

export { GlobalStateContext, UpdateGlobalStateContext, globalState };
