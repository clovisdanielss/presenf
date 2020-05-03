/**
Arquivo responsável por rotear cada página.
Todo componente deve estar importado aqui.
**/
import { Switch, Route } from 'react-router-dom'
import Login from '../login'
import Pacientes from '../pacientes'
import Paciente from '../paciente'
import Historico from '../historico'
import Prescricao from '../prescricao'
import React, { Component } from 'react'

class CustomRouter extends Component {
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
        <Route path='/paciente/:id/prescricao/historico'>
          <Historico loadData={this.loadPrescricao} paciente={this.state.paciente}/>
        </Route>
        <Route path='/paciente/:id/prescricao/:id'>
          <Prescricao prescricao={this.state.prescricao} paciente={this.state.paciente}/>  
        </Route>
        <Route path='/paciente/:id'>
          <Paciente paciente={this.state.paciente} />
        </Route>
        <Route path='/paciente'>
          <Pacientes loadData={this.loadPaciente} />
        </Route>
        <Route path='/'>
          <Login parent={this} />
        </Route>
      </Switch>
    )
  }
}
export default CustomRouter
