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
      intervencaosIndexes: 0,
      enfermeiro: null,
      prescricaoMaisRecente: null,
      observacao: '',
      modalOpen: false,
      query: ''
    }

    this.onRemoveDiagnostico = this.onRemoveDiagnostico.bind(this)
    this.onAdicionarDiagnostico = this.onAdicionarDiagnostico.bind(this)
    this.onAdicionarIntervencao = this.onAdicionarIntervencao.bind(this)
    this.onRemoveIntervencao = this.onRemoveIntervencao.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onSelectValue = this.onSelectValue.bind(this)
    this.onChangeValue = this.onChangeValue.bind(this)
    this.onSave = this.onSave.bind(this)
    this.loadPrescricaoRecente = this.loadPrescricaoRecente.bind(this)
    this.loadDiagnosticos = this.loadDiagnosticos.bind(this)
    this.loadEnfermeiro = this.loadEnfermeiro.bind(this)
    this.loadLoggedEnfermeiro = this.loadLoggedEnfermeiro.bind(this)
  }

  // Método para salvar prescrição
  onSave (e) {
    this.state.diagnosticos.map((diagnostico)=>{
      diagnostico.id = null
      diagnostico.idPrescricao = null
      diagnostico.intervencaos.map((intervencao)=>{
        intervencao.id = null
        intervencao.idDiagnostico = null
      })
    })
    var prescricao = {
      coren: this.state.enfermeiro.coren,
      observacao: this.state.observacao,
      diagnosticos: this.state.diagnosticos
    }
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status === 201) {
        alert('Prescrição salva com sucesso!')
      } else if (xhr.readyState == 4) {
        alert('Erro na prescrição!')
      }
    }
    xhr.open('POST', process.env.REACT_APP_URL + 'paciente/' +
       this.props.paciente.id + '/prescricao')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(prescricao))
  }

  // Método para edição realizada pela modal.
  onSelectValue (value, index, param) {
    // console.log('Saída', value, index, param)
    for (var i = 0; i < this.state.diagnosticos.length; i++) {
      if (param === 'Intervenção' || this.state.diagnosticos[i].index === parseInt(index)) {
        var diagnostico = this.state.diagnosticos[i]
        if (param === 'Diagnóstico') {
          diagnostico.nome = value
        } else if (param === 'Resultado') {
          diagnostico.resultado = value
        } else {
          for (var j = 0; j < diagnostico.intervencaos.length; j++) {
            var intervencao = diagnostico.intervencaos[j]
            if (intervencao.index == parseInt(index)) {
              intervencao.nome = value
            }
          }
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

  // Adicionar diagnostico
  onAdicionarDiagnostico (e) {
    this.state.diagnosticos.push({
      index: this.state.diagnosticosIndexes,
      nome: '',
      resultado: '',
      avaliacao: '',
      intervencaos: []
    })
    this.state.diagnosticosIndexes++

    this.forceUpdate()
  }

  // Método para adicionar campo de intervenção.
  onAdicionarIntervencao (e) {
    var index = e.target.getAttribute('data-index').replace(/\D/g, '')
    index = parseInt(index)
    for (var i = 0; i < this.state.diagnosticos.length; i++) {
      if (this.state.diagnosticos[i].index === index) {
        this.state.diagnosticos[i].intervencaos.push({
          index: this.state.intervencaosIndexes,
          aprazamento: 's/a',
          profissional: 'Enfermeiro',
          nome: ''
        })
        this.state.intervencaosIndexes++
      }
    }
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
    this.setState({ diagnosticos: diagnosticos })
    this.forceUpdate()
  }

  // Método para remover intervenção
  onRemoveIntervencao (e) {
    var index = e.target.getAttribute('data-index')
    var indexIntervencao = e.target.getAttribute('data-intervencao-index')
    var intervencaos = []
    for (var i = 0; i < this.state.diagnosticos.length; i++) {
      var diagnostico = this.state.diagnosticos[i]
      if (diagnostico.index == index) {
        for (var j = 0; j < diagnostico.intervencaos.length; j++) {
          if (diagnostico.intervencaos[j].index != indexIntervencao) {
            intervencaos.push(diagnostico.intervencaos[j])
          }
        }
        diagnostico.intervencaos = intervencaos
      }
    }
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
          var intervencaosIndexes = 0
          for (var i = 0; i < diagnosticos.length; i++) {
            diagnosticos[i].index = i
            for (var j = 0; j < diagnosticos[i].intervencaos.length; j++) {
              diagnosticos[i].intervencaos[j].index = intervencaosIndexes
              intervencaosIndexes++
            }
          }
        }
        this.setState({
          diagnosticos: diagnosticos,
          diagnosticosIndexes: diagnosticos.length,
          intervencaosIndexes: intervencaosIndexes
        })
      })
      if (!prescricao && this.state.prescricaoMaisRecente) {
        prescricao = this.state.prescricaoMaisRecente
      } else if (!prescricao) {
        console.log('Não existem prescrições anteriores para este paciente!')
        return 0
      }
      diagReq.open('GET', process.env.REACT_APP_URL + 'paciente/' +
       this.props.paciente.id + '/prescricao/' + prescricao.id + '/diagnostico')
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
          onAdicionarDiagnostico={this.onAdicionarDiagnostico}
          onRemoveDiagnostico={this.onRemoveDiagnostico}
          onAdicionarIntervencao={this.onAdicionarIntervencao}
          onRemoveIntervencao={this.onRemoveIntervencao}
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
