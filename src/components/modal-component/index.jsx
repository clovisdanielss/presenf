import React, { Component } from 'react'
import Modal from 'react-modal'
import './index.css'
import { Link } from 'react-router'
import voltarIcon from '../../../public/voltar.svg'

Modal.setAppElement('#root')

class ModalComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        id: '',
        name: '',
        index: null
      },
      search: '',
      cipeData: []
    }

    this.onAfterOpenModal = this.onAfterOpenModal.bind(this)
    this.onTableSearchUpdate = this.onTableSearchUpdate.bind(this)
    this.onSelectValue = this.onSelectValue.bind(this)
  }

  onSelectValue (e) {
    this.props.onSelectValue(e.target.id, this.state.query.index, this.state.query.name)
    this.props.onCloseModal()
  }

  shouldComponentUpdate (newProps, newState) {
    if (newProps.query === this.state.query.id) {
      return false
    } else {
      return true
    }
  }

  componentDidUpdate () {
    var aux = this.props.query.replace(/\d/g, '')
    var index = this.props.query.replace(/\D/g, '')
    if (aux.length > 0) {
      if (aux == 'diagnostico') {
        aux = 'diagnóstico'
      } else if (aux == 'intervencao') {
        aux = 'intervenção'
      }
      var aux2 = ''
      aux2 = aux2.concat(aux[0].toUpperCase())
      for (var i = 1; i < aux.length; i++) {
        aux2 = aux2.concat(aux[i])
      }
    }
    this.setState({
      query: {
        id: this.props.query,
        name: aux2,
        index: index
      }
    })
  }

  onTableSearchUpdate (event) {
    this.setState({ search: event.target.value })
    this.forceUpdate()
  }

  onAfterOpenModal () {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      var result = JSON.parse(xhr.responseText)
      this.setState({ cipeData: result })
      this.forceUpdate()
    })
    var eixo = ''
    if (this.state.query.name === 'Diagnóstico') {
      eixo = 'DC'
    } else if (this.state.query.name === 'Intervenção') {
      eixo = 'IC'
    } else if (this.state.query.name === 'Resultado') {
      eixo = 'OC'
    }
    xhr.open('GET', process.env.REACT_APP_URL + 'cipe?eixo=' + eixo)
    xhr.send()
  }

  render () {
    return (
      <Modal
        className='modal'
        isOpen={this.props.modalOpen}
        onAfterOpen={this.onAfterOpenModal}
        onRequestClose={this.props.onCloseModal}
        contentLabel='Example Modal'
      >
        <div className='card-container card-container-table'>
          <h2>Criar {this.state.query.name}</h2>
          <hr />
          <div>
            <div className='card-input img-input'>
              <a onClick={this.props.onCloseModal}>
                <img src={voltarIcon} width='30' />
                <label>Voltar</label>
              </a>
            </div>
            <div className='card-input'>
              <label htmlFor='search-bar'>Busca:</label>
              <input id='search-bar' type='input' onChange={this.tableSearchUpdate} />
            </div>
          </div>
          <hr />
          <div className='wrapper'>
            <table>
              <thead>
                <tr>
                  <th>Diagnóstico: </th>
                  <th>Seleção: </th>
                </tr>
              </thead>
              <tbody>
                {this.state.cipeData.map((doc, index) => {
                  var search = new RegExp(this.state.search)
                  if (search.test(doc['termo '])) {
                    return (
                      <tr key={index}>
                        <td>{doc['termo ']}</td>
                        <td id={doc['termo ']} onClick={this.onSelectValue}>
                      Selecionar
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalComponent
