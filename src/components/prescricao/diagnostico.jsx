import React from 'react'

const Diagnostico = (props) => {
  var diagnostico = props.diagnostico
  var index = props.index
  var key = props.reactKey
  var readOnly = diagnostico.index === undefined
  if (!index) {
    index = key
  }
  return (
    <div key={key} data-index={index} className='generated-by-array'>
      {readOnly ? null : <a className='on-remove' onClick={props.onRemoveDiagnostico}>Remover Diagnóstico</a>}
      <div className='card-input'>
        <label htmlFor={'diagnostico' + index.toString()}>Diagnóstico: </label>
        <input onClick={props.onOpenModal} id={'diagnostico' + index.toString()} value={diagnostico.nome} readOnly />
      </div>
      <div className='two-column'>
        <div className='card-input'>
          <label htmlFor={'resultado' + index.toString()}>Resultado: </label>
          <input onClick={props.onOpenModal} id={'resultado' + index.toString()} value={diagnostico.resultado} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor={'intervencao' + index.toString()}>Intervenção: </label>
          <input onClick={props.onOpenModal} id={'intervencao' + index.toString()} value={diagnostico.intervencao} readOnly />
        </div>
      </div>
      <div className='two-column'>
        <div className='card-input'>
          <label htmlFor={'aprazamento' + index.toString()}>Aprazamento: </label>
          {readOnly ? <input id={'aprazamento' + index.toString()} value={diagnostico.aprazamento} readOnly />
            : <select onChange={props.onChangeValue} id={'aprazamento' + index.toString()}>
              <option value='s/a'>s/a</option>
              {[2, 4, 8, 12, 24].map((h, key) => {
                return (<option key={key} value={h.toString() + '/' + h}>{h.toString() + '/' + h}</option>)
              })}
              </select>}
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