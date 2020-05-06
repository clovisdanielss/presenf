import React, { Component } from 'react'
import './index.css'
import ModalComponent from '../modal-component'
import PrescricaoReadOnly from './prescricao-read-only.jsx'
import PrescricaoWrite from './prescricao-write.jsx'

class Prescricao extends Component {
  constructor (props) {
    super(props)
    this.state = {
      diagnosticos: [],
      diagnosticosIndexes: 0,
      enfermeiro: null,
      prescricaoMaisRecente: null,
      observacao: '',
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
    this.onChangeValue = this.onChangeValue.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  // Método para salvar prescrição
  onSave (e) {
    var prescricao = {
      coren: this.state.enfermeiro.coren,
      observacao: this.state.observacao,
      diagnosticos: [],
      resultados: [],
      intervencoes: [],
      aprazamentos: [],
      avaliacoes: []
    }
    this.state.diagnosticos.map((diagnostico) => {
      prescricao.diagnosticos.push(diagnostico.nome)
      prescricao.resultados.push(diagnostico.resultado)
      prescricao.intervencoes.push(diagnostico.intervencao)
      prescricao.aprazamentos.push(diagnostico.aprazamento)
      prescricao.avaliacoes.push(diagnostico.avaliacao)
    })
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('save', () => {
      console.log(JSON.parse(xhr.responseText))
    })
    xhr.open('POST', process.env.REACT_APP_URL + 'paciente/' +
       this.props.paciente.id + '/prescricao')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(prescricao))
  }

  // Método para edição realizada pela modal.
  onSelectValue (value, index, param) {
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

  // Método usado pelo aprazamento e avaliação, que não usam modal
  onChangeValue (e) {
    var index = e.target.id.replace(/\D/g, '')
    var param = e.target.id.replace(/\d/g, '')
    if (e.target.id === 'observacao') {
      this.state.observacao = e.target.value
    } else {
      for (var i = 0; i < this.state.diagnosticos.length; i++) {
        if (this.state.diagnosticos[i].index === parseInt(index)) {
          this.state.diagnosticos[i][param] = e.target.value
        }
      }
    }
  }

  onOpenModal (e) {
    this.setState({
      query: e.target.id,
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
          onChangeValue={this.onChangeValue}
          onSave={this.onSave}
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
