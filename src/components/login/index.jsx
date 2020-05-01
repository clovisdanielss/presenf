import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../principal/index.css'
import './index.css'
// import paciente from '../../../public/paciente.png'
// import gestao from '../../../public/gestao.png'

class Login extends Component {
  render () {
    return (
      <div className='card-container'>
        <div className='card-input'>
          <label htmlFor='coren'>Coren:</label>
          <input id='coren' />
        </div>
        <div className='card-input'>
          <label htmlFor='password'>Senha:</label>
          <input id='password' />
        </div>
        <Link className='body-text big-body-text' to='/pacientes'>
          <button type='input'className='button-link'>
              Entrar
          </button>
        </Link>  
      </div>
    )
  }
}

export default Login
