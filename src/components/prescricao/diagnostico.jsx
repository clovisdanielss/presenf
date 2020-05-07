import React from 'react'
import Intervencaos from './intervencaos.jsx'

const Diagnostico = (props) => {
  var diagnostico = props.diagnostico
  var intervencaos = props.diagnostico.intervencaos
  var index = props.index
  var key = props.reactKey
  var readOnly = diagnostico.index === undefined
  console.log(intervencaos)
  if (!index) {
    index = key
  }
  return (
    <div key={key} data-index={index} className='generated-by-array'>
      <h2 className="diagnostico-header">Diagnóstico {key+1}</h2>
      <hr/>
      {readOnly ? null : <a className="add-remove-button" onClick={props.onRemoveDiagnostico}><b>Remover</b> Diagnóstico</a>}
      <div className='card-input'>
        <label htmlFor={'diagnostico' + index.toString()}>Diagnóstico: </label>
        <input onClick={props.onOpenModal} id={'diagnostico' + index.toString()} value={diagnostico.nome} readOnly />
      </div>
      <Intervencaos
        props={props}
        index={index}
        intervencaos={intervencaos}
        readOnly={readOnly}
      />
      <div className='two-column'>
        <div className='card-input'>
          <label htmlFor={'resultado' + index.toString()}>Resultado: </label>
          <input onClick={props.onOpenModal} id={'resultado' + index.toString()} value={diagnostico.resultado} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor={'avaliacao' + index.toString()}>Avaliação: </label>
          <input
            onChange={props.onChangeValue}
            type='text'
            id={'avaliacao' + index.toString()} value={readOnly ? diagnostico.avaliacao : undefined}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}

export default Diagnostico
