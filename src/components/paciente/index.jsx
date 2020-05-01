import React, { Component } from 'react'
import Pacientes from '../pacientes'
import {Link} from 'react-router-dom'

class Paciente extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='card-container'>
        <div>{this.props.data.nome}</div>
        <div>{this.props.data.prontuario}</div>
        <div>
          <Link to='/pacientes/:id/prescricao'>Prescrever</Link>
          <br/>
          <Link to='/pacientes/:id/prescricao/historico'>Histórico</Link>
        </div>
      </div>
    )
  }
}

export default Paciente
