import React from 'react'
import voltarIcon from '../../public/voltar.svg'
import saveIcon from '../../public/save.svg'
import { Link } from 'react-router-dom'
import Diagnostico from './diagnostico.jsx'

const PrescricaoWrite = (props) => {
  return (
    <form className='card-container card-container-prescricao'>
      <h2>Criar Prescricao</h2>
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
      <div className='card-input'>
        <label htmlFor='nomePaciente'>Paciente: </label>
        <input id='nomePaciente' value={props.paciente.nome} readOnly />
      </div>
      {
        props.state.diagnosticos.map((item, key) => {
          var index = item.index
          var diagnostico = item
          return (
            <Diagnostico
              state={props.state} key={key} reactKey={key} index={index}
              diagnostico={diagnostico}
              onRemoveDiagnostico={props.onRemoveDiagnostico}
              onOpenModal={props.onOpenModal}
              onChangeValue={props.onChangeValue}
              onAdicionarIntervencao={props.onAdicionarIntervencao}
              onRemoveIntervencao={props.onRemoveIntervencao}
            />
          )
        })
      }
      <div className='card-input'>
        <label htmlFor='observacao'>Observação: </label>
        <input onChange={props.onChangeValue} id='observacao' />
      </div>
      <a className="add-remove-button" onClick={props.onAdicionarDiagnostico}><b>Criar</b> novo diagnóstico</a>
      <div className='prescricao-icons'>
        <div>
          <figcaption htmlFor='voltar'>Voltar:</figcaption>
          <Link to={'/paciente/' + props.paciente.id}>
            <img src={voltarIcon} />
          </Link>
        </div>
        <div>
          <figcaption htmlFor='salvar'>Salvar:</figcaption>
          <Link to={'/paciente/' + props.paciente.id} onClick={props.onSave}>
            <img src={saveIcon} />
          </Link>
        </div>
      </div>
    </form>
  )
}

export default PrescricaoWrite