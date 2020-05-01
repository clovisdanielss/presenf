/**
Arquivo responsável por rotear cada página.
Todo componente deve estar importado aqui.
**/
import { Switch, Route } from 'react-router-dom'
import Login from '../login'
import Pacientes from '../pacientes'
import Paciente from '../paciente'
import React, { Component } from 'react'

class CustomRouter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      enfermeiroId: null,
      enfermeiroCoren: null
    }
    this.loadData = this.loadData.bind(this)
  }

  loadData (data) {
    this.setState({
      data: data
    })
  }

  render () {
    const data = this.props
    return (
      <Switch>
        <Route path='/pacientes/:id'>
          <Paciente data={this.state.data} />
        </Route>
        <Route path='/pacientes'>
          <Pacientes loadData={this.loadData} />
        </Route>
        <Route path='/'>
          <Login parent={this} />
        </Route>
      </Switch>
    )
  }
}
export default CustomRouter
