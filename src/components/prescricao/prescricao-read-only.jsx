import React from 'react'
import voltarIcon from '../../public/voltar.svg'
import impressoraIcon from '../../public/impressora.svg'
import { Link } from 'react-router-dom'
import Diagnostico from './diagnostico.jsx'
import util from '../../util.jsx'

const PrescricaoReadOnly = (props) => {
  return (
    <div className='card-container card-container-prescricao'>
      <h2>Prescricao</h2>
      <hr />
      <div className='two-column'>
        <div className='card-input'>
          <label htmlFor='nomeEnfermeiro'>Enfermeiro: </label>
          <input id='nomeEnfermeiro' value={props.state.enfermeiro.nome} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor='nomeEnfermeiro'>Coren: </label>
          <input id='nomeEnfermeiro' value={props.state.enfermeiro.coren} readOnly />
        </div>
      </div>
      <div className='two-column'>
        <div className='card-input'>
          <label htmlFor='dataCriacao'>Data: </label>
          <input id='dataCriacao' value={util.formmatDate(props.prescricao.dataCriacao)} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor='horaCriacao'>Hora: </label>
          <input id='horaCriacao' value={util.formmatHours(props.prescricao.dataCriacao)} readOnly />
        </div>
      </div>
      <div className='card-input'>
        <label htmlFor='nomePaciente'>Paciente: </label>
        <input id='nomePaciente' value={props.paciente.nome} readOnly />
      </div>
      {
        props.state.diagnosticos.map((diagnostico, key) => {
          return (<Diagnostico state={props.state} key={key} reactKey={key} diagnostico={diagnostico} />)
        })
      }
      <div className='card-input'>
        <label htmlFor='observacao'>Observação: </label>
        <input id='observacao' value={props.prescricao.observacao} readOnly />
      </div>
      <div className='prescricao-icons'>
        <div>
          <figcaption htmlFor='voltar'>Voltar:</figcaption>
          <Link to={'/paciente/' + props.paciente.id + '/prescricao/historico'}>
            <img src={voltarIcon} />
          </Link>
        </div>
        <div>
          <figcaption htmlFor='imprimir'>Imprimir:</figcaption>
          <a href='#'>
            <img src={impressoraIcon} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default PrescricaoReadOnly
