import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../principal/index.css'
import './index.css'
import { UpdateGlobalStateContext } from '../../contexts.js'
// import paciente from '../../../public/paciente.png'
// import gestao from '../../../public/gestao.png'


class Login extends Component {

  static contextType = UpdateGlobalStateContext

  constructor (props) {
    super(props)
    this.state = {
      authenticationRecieved: false,
      requestSent:false,
      coren: '',
      senha: ''
    }
    this.authenticate = this.authenticate.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  authenticate () {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText)
      if (xhr.status === 200 && response.coren) {
        this.context({enfermeiro:response})
        this.setState({ authenticationRecieved: true })
      }
      if (xhr.status === 500 || xhr.status === 401) {
        alert('Usuário ou senha errada!')
      }
    })
    xhr.open('POST', process.env.REACT_APP_URL + 'login')
    xhr.setRequestHeader('Content-Type', 'application/json')
    var login = {
      coren: this.state.coren,
      senha: this.state.senha
    }
    xhr.send(JSON.stringify(login))
    this.setState({requestSent:true})
  }

  componentDidMount(){
    let pwd = document.getElementById('senha')
    pwd.addEventListener('keyup',(event)=>{
      if(event.keyCode === 13){
        event.preventDefault()
        let btn = document.getElementById('login-button')
        btn.click()
      }
    })
  }

  onChangeInput (e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  render () {
    if (this.state.authenticationRecieved) {
      return (
        <Redirect to='/paciente' />
      )
    }
    if (this.state.requestSent){
      return(
        <div className='card-container'>
          <h1> Aguarde enquanto carregamos... </h1>
        </div>
      )
    }
    return (
      <div className='card-container'>
        <div className='card-input'>
          <label htmlFor='coren'>Coren:</label>
          <input onChange={this.onChangeInput} id='coren' />
        </div>
        <div className='card-input'>
          <label htmlFor='password'>Senha:</label>
          <input onChange={this.onChangeInput} id='senha' type='password' />
        </div>
        <button id='login-button' type='input' className='button-link' onClick={this.authenticate}>
              Entrar
        </button>
      </div>
    )
  }
}

export default Login
