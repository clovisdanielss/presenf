import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/principal'
import { GlobalStateContext, UpdateGlobalStateContext, globalState } from './contexts.js'
import PrintProvider from 'react-easy-print'

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
    <PrintProvider>
      <Main />
    </PrintProvider>
  </GlobalStateProvider>,
  document.getElementById('root')
)
