import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function formmatDate (dateString) {
  var date = new Date(dateString)
  var day = date.getDate().toString()
  day = (day.length == 1) ? '0' + day : day
  var mon = (date.getMonth() + 1).toString() // +1 pois no getMonth Janeiro começa com zero.
  mon = (mon.length == 1) ? '0' + mon : mon
  var year = date.getFullYear()
  return day + '/' + mon + '/' + year
}

function formmatHours (dateString) {
  var date = new Date(dateString)
  var hour = date.getHours()
  var min = date.getMinutes()
  return hour.toString() + ':' + min.toString()
}

class Prescricao extends Component {
  constructor (props) {
    super(props)
    this.state = {
      diagnosticos: [],
      enfermeiro: null
    }
  }

  componentDidMount () {
    setTimeout(() => {
      var diagReq = new XMLHttpRequest()
      diagReq.addEventListener('load', () => {
        var diagnosticos = JSON.parse(diagReq.responseText)
        this.setState({ diagnosticos: diagnosticos })
      })
      diagReq.open('GET', process.env.REACT_APP_URL + 'paciente/' +
       this.props.paciente.id + '/prescricao/' + this.props.prescricao.id)
      diagReq.send()
      var enfReq = new XMLHttpRequest()
      enfReq.addEventListener('load', () => {
        var enfermeiro = JSON.parse(enfReq.responseText)
        this.setState({ enfermeiro: enfermeiro[0] })
      })
      enfReq.open('GET', process.env.REACT_APP_URL + 'enfermeiro/' +
        this.props.prescricao.coren)
      enfReq.send()
    })
  }

  render () {
    if (this.state.enfermeiro) {
      return (
        <div className='card-container card-container-prescricao'>
          <h2>Prescricao</h2>
          <hr />
          <div className='two-column'>
            <div className='card-input'>
              <label htmlFor='nomeEnfermeiro'>Enfermeiro: </label>
              <input id='nomeEnfermeiro' value={this.state.enfermeiro.nome} readOnly />
            </div>
            <div className='card-input'>
              <label htmlFor='nomeEnfermeiro'>Coren: </label>
              <input id='nomeEnfermeiro' value={this.state.enfermeiro.coren} readOnly />
            </div>
          </div>
          <div className='two-column'>
            <div className='card-input'>
              <label htmlFor='dataCriacao'>Data: </label>
              <input id='dataCriacao' value={formmatDate(this.props.prescricao.dataCriacao)} readOnly />
            </div>
            <div className='card-input'>
              <label htmlFor='horaCriacao'>Hora: </label>
              <input id='horaCriacao' value={formmatHours(this.props.prescricao.dataCriacao)} readOnly />
            </div>
          </div>
          <div className='card-input'>
            <label htmlFor='nomePaciente'>Paciente: </label>
            <input id='nomePaciente' value={this.props.paciente.nome} readOnly />
          </div>
          {this.state.diagnosticos.map((diagnostico, index) => {
            return [
              <div key={(index) * 3} className='card-input'>
                <label htmlFor={'nomeDiagnostico' + index.toString()}>Diagnóstico: </label>
                <input id={'nomeDiagnostico' + index.toString()} value={diagnostico.nome} readOnly />
              </div>,
              <div key={1 + (index) * 3} className='two-column'>
                <div className='card-input'>
                  <label htmlFor={'resultado' + index.toString()}>Resultado: </label>
                  <input id={'resultado' + index.toString()} value={diagnostico.resultado} readOnly />
                </div>
                <div className='card-input'>
                  <label htmlFor={'intervencao' + index.toString()}>Intervenção: </label>
                  <input id={'intervencao' + index.toString()} value={diagnostico.intervencao} readOnly />
                </div>
              </div>,
              <div key={2 + (index) * 3} className='two-column'>
                <div className='card-input'>
                  <label htmlFor={'aprazamento' + index.toString()}>Aprazamento: </label>
                  <input id={'aprazamento' + index.toString()} value={diagnostico.aprazamento} readOnly />
                </div>
                <div className='card-input'>
                  <label htmlFor={'avaliacao' + index.toString()}>Avaliação: </label>
                  <input id={'avaliacao' + index.toString()} value={diagnostico.avaliacao} readOnly />
                </div>
              </div>
            ]
          })}
          <div className='card-input'>
            <label htmlFor='observacao'>Observação: </label>
            <input id='observacao' value={this.props.prescricao.observacao} readOnly />
          </div>
        </div>
      )
    } else {
      return (
        <div className='card-container'>
          <h2>Carregando...</h2>
        </div>
      )
    }
  }
}

export default Prescricao
