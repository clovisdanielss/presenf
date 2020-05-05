import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import historicoIcon from '../../public/historico.svg'
import prescricaoIcon from '../../public/prescricao.svg'
import voltarIcon from '../../public/voltar.svg'

class Paciente extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='card-container card-container-paciente'>
        <h2>Informação do Paciente</h2>
        <hr/>
        <div className='card-input'>
          <label htmlFor='nomePaciente'>Paciente: </label>
          <input id='nomePaciente' value={this.props.paciente.nome} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor='prontuario'>Prontuario: </label>
          <input id='prontuario' value={this.props.paciente.prontuario} readOnly />
        </div>
        <div className='flex-icons'>
          <div>
            <figcaption htmlFor='prescrever'>Prescrever:</figcaption>
            <Link id='prescrever' to={'/paciente/' + this.props.paciente.id.toString() + '/prescricao'}>
              <img src={prescricaoIcon} />
            </Link>
          </div>
          <div >
            <figcaption htmlFor='historico'>Historico:</figcaption>
            <Link to={'/paciente/' + this.props.paciente.id.toString() + '/prescricao/historico'}>
              <img src={historicoIcon}></img>
            </Link>
          </div>
          <div>
            <figcaption htmlFor='voltar'>Voltar:</figcaption>
            <Link to='/paciente'>
              <img src={voltarIcon}></img>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Paciente
