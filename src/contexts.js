import React from 'react'
const globalState = {
  enfermeiro: {
    "id": 6,
    "coren": "583521",
    "exp": 1596136977,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiY29yZW4iOiI1ODM1MjEiLCJleHAiOjE1OTYxMzc1NzcsImlhdCI6MTU5NjEzMzk3N30.iBWpOVgoo46JjMsOt_xo2YiQlY3DuHHMOb13ibumuGI"
  }
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}
