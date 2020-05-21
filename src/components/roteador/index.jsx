/**
Arquivo responsável por rotear cada página.
Todo componente deve estar importado aqui.
**/
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../login'
import Pacientes from '../pacientes'
import Paciente from '../paciente'
import Historico from '../historico'
import Prescricao from '../prescricao'
import React, { Component } from 'react'
import {GlobalStateContext } from '../../contexts.js'

const PrivateRoute = ({ children, ...rest }) => {
  const context = React.useContext(GlobalStateContext)
  const isAuthenticated = () =>{
    if(context.enfermeiro){
      return Math.floor(Date.now()/1000) < context.enfermeiro.exp
    }
    return false
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated()
          ? (children)
          : (<Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
      )}
    />
  )
}

class CustomRouter extends Component {
  static contextType = GlobalStateContext

  constructor (props) {
    super(props)
    this.state = {
      enfermeiro: null,
      paciente: null,
      prescricao: null
    }
    this.loadPaciente = this.loadPaciente.bind(this)
    this.loadPrescricao = this.loadPrescricao.bind(this)
  }

  loadPaciente (paciente) {
    this.setState({
      paciente: paciente
    })
  }

  loadPrescricao (prescricao) {
    this.setState({
      prescricao: prescricao
    })
  }

  render () {
    const data = this.props
    return (
      <Switch>
        <PrivateRoute path='/paciente/:id/prescricao/historico'>
          <Historico loadData={this.loadPrescricao} paciente={this.state.paciente} />
        </PrivateRoute>
        <PrivateRoute path='/paciente/:id/prescricao/:id'>
          <Prescricao readOnly prescricao={this.state.prescricao} paciente={this.state.paciente} />
        </PrivateRoute>
        <PrivateRoute path='/paciente/:id/prescricao'>
          <Prescricao paciente={this.state.paciente} readOnly={false} />
        </PrivateRoute>
        <PrivateRoute path='/paciente/:id'>
          <Paciente paciente={this.state.paciente} />
        </PrivateRoute>
        <PrivateRoute isAuthenticated={this.isAuthenticated} path='/paciente'>
          <Pacientes loadData={this.loadPaciente} />
        </PrivateRoute>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    )
  }
}
export default CustomRouter
