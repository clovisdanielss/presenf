import React from "react";
const globalState = {
  enfermeiro: {
    "id": 6,
    "coren": "583521",
    "exp": 1596221668,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiY29yZW4iOiI1ODM1MjEiLCJleHAiOjE1OTYyMjIyNjgsImlhdCI6MTU5NjIxODY2OH0.swzGfg5ICOzf5fKmZX7pU8sLdnV-c2IeJ7zG4iNsZFw"
  }
};

const GlobalStateContext = React.createContext(globalState);
const UpdateGlobalStateContext = React.createContext(undefined);

export { GlobalStateContext, UpdateGlobalStateContext, globalState };
