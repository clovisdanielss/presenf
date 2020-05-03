import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import voltarIcon from '../../../public/voltar.svg'
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

class Historico extends Component {
  constructor (props) {
    super(props)
    this.state = {
      historico: [],
      search: ''
    }
    this.tableSearchUpdate = this.tableSearchUpdate.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      var xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        var historico = JSON.parse(xhr.responseText)
        this.setState({ historico: historico })
      })
      var url = process.env.REACT_APP_URL + 'paciente/' +
        this.props.paciente.id.toString() + '/prescricao'
      xhr.open('GET', url)
      xhr.send()
    }, 5)
  }

  tableSearchUpdate (event) {
    this.setState({ search: event.target.value })
    console.log(this.state)
    this.forceUpdate()
  }

  render () {
    const loadData = this.props.loadData
    return (
      <div className='card-container card-container-table'>
        <h2>Histórico de Prescrição</h2>
        <hr/>
        <div>
          <div className='card-input img-input'>
            <Link to={() => { if (this.props.paciente) return '/paciente/' + this.props.paciente.id }}>
              <img src={voltarIcon} width='30' />
              <label>Voltar</label>
            </Link>
          </div>
          <div className='card-input'>
            <label htmlFor='search-bar'>Busca:</label>
            <input id='search-bar' type='input' onChange={this.tableSearchUpdate} />
          </div>
        </div>
        <hr />
        <table>
          <thead>
            <tr>
              <td>Coren: </td>
              <td>Data Prescrição: </td>
              <td>Hora Prescrição: </td>
              <td>Observação: </td>
              <td>Selecionar</td>
            </tr>
          </thead>
          <tbody>
            {this.state.historico.map((prescricao, index) => {
              var search = new RegExp(this.state.search)
              if (search.test(formmatDate(prescricao.dataCriacao)) ||
                  search.test(formmatHours(prescricao.dataCriacao)) ||
                  search.test(prescricao.coren)) {
                return (
                  <tr key={index}>
                    <td> {prescricao.coren} </td>
                    <td>{formmatDate(prescricao.dataCriacao) || null}</td>
                    <td>{formmatHours(prescricao.dataCriacao) || null}</td>
                    <td>{prescricao.observacao.substr(0, 20) + '...' || null}</td>
                    <td>
                      <Link
                        className='link-table' to={() => { return '/paciente/' + this.props.paciente.id + '/prescricao/' + prescricao.id }}
                        onClick={() => { loadData(prescricao) }}
                      >
                         Selecionar
                      </Link>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Historico
