import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './index.css'
import voltarIcon from '../../public/voltar.svg'
import impressoraIcon from '../../public/impressora.svg'
import ModalComponent from '../modal-component'

function formmatDate (dateString) {
  var date = new Date(dateString)
  var day = date.getDate().toString()
  day = (day.length === 1) ? '0' + day : day
  var mon = (date.getMonth() + 1).toString() // +1 pois no getMonth Janeiro começa com zero.
  mon = (mon.length === 1) ? '0' + mon : mon
  var year = date.getFullYear()
  return day + '/' + mon + '/' + year
}

function formmatHours (dateString) {
  var date = new Date(dateString)
  var hour = date.getHours()
  var min = date.getMinutes()
  return hour.toString() + ':' + min.toString()
}

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
            : <select id={'aprazamento' + index.toString()}>
              {[2, 4, 8, 12, 24].map((h, key) => {
                return (<option key={key} value={h.toString() + '/' + h}>{h.toString() + '/' + h}</option>)
              })}
              </select>}
        </div>
        <div className='card-input'>
          <label htmlFor={'avaliacao' + index.toString()}>Avaliação: </label>
          <input type='text'
            id={'avaliacao' + index.toString()} value={readOnly ? diagnostico.avaliacao : undefined}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}

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
          <input id='dataCriacao' value={formmatDate(props.prescricao.dataCriacao)} readOnly />
        </div>
        <div className='card-input'>
          <label htmlFor='horaCriacao'>Hora: </label>
          <input id='horaCriacao' value={formmatHours(props.prescricao.dataCriacao)} readOnly />
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
            />
          )
        })
      }
      <a onClick={props.onDiagnosticoKey}>Criar novo diagnóstico</a>
    </form>
  )
}

class Prescricao extends Component {
  constructor (props) {
    super(props)
    this.state = {
      diagnosticos: [],
      diagnosticosIndexes: 0,
      enfermeiro: null,
      prescricaoMaisRecente: null,
      modalOpen: false,
      query: ''
    }

    this.onRemoveDiagnostico = this.onRemoveDiagnostico.bind(this)
    this.onDiagnosticoKey = this.onDiagnosticoKey.bind(this)
    this.loadPrescricaoRecente = this.loadPrescricaoRecente.bind(this)
    this.loadDiagnosticos = this.loadDiagnosticos.bind(this)
    this.loadEnfermeiro = this.loadEnfermeiro.bind(this)
    this.loadLoggedEnfermeiro = this.loadLoggedEnfermeiro.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onSelectValue = this.onSelectValue.bind(this)
  }

  onSelectValue (value, index, param) {
    console.log(index, value)
    for (var i = 0; i < this.state.diagnosticos.length; i++) {
      if (this.state.diagnosticos[i].index === parseInt(index)) {
        switch (param) {
          case 'Diagnóstico':
            this.state.diagnosticos[i].nome = value
            break
          case 'Resultado':
            this.state.diagnosticos[i].resultado = value
            break
          case 'Intervenção':
            this.state.diagnosticos[i].intervencao = value
            break
          default:
            console.log('Algum erro ocorreu')
            break
        }
      }
    }
  }

  onOpenModal (e) {
    this.setState({
      query: e.target.id.toString(),
      modalOpen: true
    })
    this.forceUpdate()
  }

  onCloseModal (e) {
    this.setState({
      modalOpen: false,
      query: ''
    })
    this.forceUpdate()
  }

  onDiagnosticoKey (e) {
    this.state.diagnosticos.push({
      index: this.state.diagnosticosIndexes,
      nome: '',
      resultado: '',
      aprazamento: '',
      avaliacao: '',
      intervencao: ''
    })
    this.state.diagnosticosIndexes++

    this.forceUpdate()
  }

  onRemoveDiagnostico (e) {
    var index = e.target.parentNode.getAttribute('data-index')
    var diagnosticos = []
    for (var i = 0; i < this.state.diagnosticos.length; i++) {
      if (this.state.diagnosticos[i].index != index) {
        diagnosticos.push(this.state.diagnosticos[i])
      }
    }
    console.log('Saída', diagnosticos)
    this.setState({ diagnosticos: diagnosticos })
    this.forceUpdate()
  }

  // Carrega diagnóstico e enfermeiro referente a prescrição

  loadDiagnosticos () {
    setTimeout(() => {
      var prescricao = this.props.prescricao
      var diagReq = new XMLHttpRequest()
      diagReq.addEventListener('load', () => {
        var diagnosticos = JSON.parse(diagReq.responseText)
        if (this.props.readOnly === false) {
          for (var i = 0; i < diagnosticos.length; i++) {
            diagnosticos[i].index = i
          }
        }
        this.setState({
          diagnosticos: diagnosticos,
          diagnosticosIndexes: diagnosticos.length
        })
      })
      if (!prescricao && this.state.prescricaoMaisRecente) {
        prescricao = this.state.prescricaoMaisRecente
      } else if (!prescricao) {
        console.log('Não existem prescrições anteriores para este paciente!')
        return 0
      }
      diagReq.open('GET', process.env.REACT_APP_URL + 'paciente/' +
       this.props.paciente.id + '/prescricao/' + prescricao.id)
      diagReq.send()
    })
  }

  loadEnfermeiro () {
    var enfReq = new XMLHttpRequest()
    enfReq.addEventListener('load', () => {
      var enfermeiro = JSON.parse(enfReq.responseText)
      this.setState({ enfermeiro: enfermeiro[0] })
    })
    enfReq.open('GET', process.env.REACT_APP_URL + 'enfermeiro/' +
        this.props.prescricao.coren)
    enfReq.send()
  }

  loadLoggedEnfermeiro () {
    var enfReq = new XMLHttpRequest()
    enfReq.addEventListener('load', () => {
      var enfermeiro = JSON.parse(enfReq.responseText)
      this.setState({ enfermeiro: enfermeiro[0] })
    })
    enfReq.open('GET', process.env.REACT_APP_URL + 'enfermeiro/' +
        '2993201')// TODO enfermeiro temporario usado no login
    enfReq.send()
  }

  // Carrega última prescrição, seu diagnóstico e [TEMP] enfermeiro referente a sessão.
  loadPrescricaoRecente () {
    setTimeout(() => {
      var prescricoesReq = new XMLHttpRequest()
      prescricoesReq.addEventListener('load', () => {
        var prescricoes = JSON.parse(prescricoesReq.responseText)
        this.setState({ prescricaoMaisRecente: prescricoes[0] })
        this.loadDiagnosticos()
      })
      prescricoesReq.open('GET', process.env.REACT_APP_URL + 'paciente/' +
        this.props.paciente.id + '/prescricao')
      prescricoesReq.send()
    })
  }

  componentDidMount () {
    if (this.props.readOnly) {
      this.loadDiagnosticos()
      this.loadEnfermeiro()
    } else {
      this.loadLoggedEnfermeiro()
      this.loadPrescricaoRecente()
    }
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    if (this.state.enfermeiro && this.props.readOnly) {
      return (
        <PrescricaoReadOnly state={this.state} paciente={this.props.paciente} prescricao={this.props.prescricao} />
      )
    } else if (this.state.enfermeiro && !this.props.readOnly) {
      return [
        <PrescricaoWrite
          key={0}
          state={this.state} paciente={this.props.paciente}
          onDiagnosticoKey={this.onDiagnosticoKey}
          onRemoveDiagnostico={this.onRemoveDiagnostico}
          onOpenModal={this.onOpenModal}
        />,
        <ModalComponent
          key={1}
          onCloseModal={this.onCloseModal}
          modalOpen={this.state.modalOpen}
          query={this.state.query}
          onSelectValue={this.onSelectValue}
        />
      ]
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
