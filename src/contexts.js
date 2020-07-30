import React from 'react'
const globalState = {
  enfermeiro: {
    "id": 6,
    "coren": "583521",
    "exp": 1596142432,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiY29yZW4iOiI1ODM1MjEiLCJleHAiOjE1OTYxNDMwMzIsImlhdCI6MTU5NjEzOTQzMn0.9PUw7xGoMBt8oT_TCd4oJ1XxEjHh1ApZ12-B6dR0ux4"
  }
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}
