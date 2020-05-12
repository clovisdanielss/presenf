import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/principal'
import './index.css'
import { GlobalStateContext, UpdateGlobalStateContext, globalState } from './contexts.js'

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    globalState)
  return (
    <GlobalStateContext.Provider value={state}>
      <UpdateGlobalStateContext.Provider value={setState}>
        {children}
      </UpdateGlobalStateContext.Provider>
    </GlobalStateContext.Provider>
  )
}

ReactDOM.render(
  <GlobalStateProvider>
    <Main />
  </GlobalStateProvider>,
  document.getElementById('root')
)
