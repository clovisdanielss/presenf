import React from 'react'
const globalState = {
  enfermeiro: {
    "id": 6,
    "coren": "583521",
    "exp": 1596056542,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiY29yZW4iOiI1ODM1MjEiLCJleHAiOjE1OTYwNTcxNDIsImlhdCI6MTU5NjA1MzU0Mn0.U5Ic0gBobkc4m5t_VL_C2clYt4MgL3x48s36zvxniX4"
  }
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}
