import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/principal'
import './index.css'

const globalState = {
  enfermeiro: null
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}
