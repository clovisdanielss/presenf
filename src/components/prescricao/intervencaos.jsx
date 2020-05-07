import React from 'react'

const Intervencaos = (props) => {
  var index = props.index
  var intervencaos = props.intervencaos
  var readOnly = props.readOnly
  props = props.props
  return (
    <div id='intervencaos'>
      {
        intervencaos.map((intervencao, key) => {
          return (
            <div className='generated-by-array' key={key}>
              {
                readOnly ? null:
                <a onClick={props.onRemoveIntervencao} data-index={index} data-intervencao-index={intervencao.index}>Remover intervenção</a>
              }
              <div className='card-input'>
                <label htmlFor={'intervencao' + intervencao.index}>Intervenção: </label>
                <input onClick={props.onOpenModal} id={'intervencao' + intervencao.index} value={intervencao.nome} readOnly />
              </div>
              <div className='two-column'>
                <div className='card-input'>
                  <label htmlFor={'profissional' + intervencao.index}> Profissional: </label>
                  {readOnly ? <input id={'profissional' + intervencao.index} value={intervencao.profissional} readOnly />
                    : <select onChange={props.onChangeValue} id={'profissional' + intervencao.index}>
                      {['Enfermeiro', 'Técnico de Enf.'].map((pro, key) => {
                        return (<option key={key} value={pro}>{pro}</option>)
                      })}
                      </select>}
                </div>
                <div className='card-input'>
                  <label htmlFor={'aprazamento' + intervencao.index}>Aprazamento: </label>
                  {readOnly ? <input id={'aprazamento' + intervencao.index} value={intervencao.aprazamento} readOnly />
                    : <select onChange={props.onChangeValue} id={'aprazamento' + intervencao.index}>
                      <option value='s/a'>s/a</option>
                      {[2, 4, 8, 12, 24].map((h, key) => {
                        return (<option key={key} value={h.toString() + '/' + h}>{h.toString() + '/' + h}</option>)
                      })}
                      </select>}
                </div>
              </div>
            </div>
          )
        })
      }
      {
        readOnly ? null:
        <a data-index={index} onClick={props.onAdicionarIntervencao}>Criar nova intervenção</a>
      }
    </div>
  )
}

export default Intervencaos