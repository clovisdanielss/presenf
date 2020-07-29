import React, { Component } from 'react'
import './index.css'
class CustomizeDiagnostico extends Component {
  constructor (props) {
    super(props)
    this.onSelectValue = this.onSelectValue.bind(this)
  }

  onSelectValue (e) {
    var data = ''
    var tags = ['action', 'client', 'focus', 'judge', 'localization', 'resources', 'time']
    tags.map((item) => {
      item = item + '-bar'
      data += document.getElementById(item).value + ' '
    })
    e.target.setAttribute('data-value', data)
    this.props.onSelectValue(e)
  }

  render () {
    return (<div className='modal-menu'>
      <div className='width-100-group'>
        <div className='width-100'>
          <label htmlFor='action-bar'>Ação:</label>
          <input data-eixo='A' id='action-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
        <div className='width-100'>
          <label htmlFor='client-bar'>Cliente:</label>
          <input data-eixo='C' id='client-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
        <div className='width-100'>
          <label htmlFor='focus-bar'>Foco:</label>
          <input data-eixo='F' id='focus-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
        <div className='width-100'>
          <label htmlFor='judge-bar'>Juízo:</label>
          <input data-eixo='J' id='judge-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
      </div>
      <div className='width-100-group'>
        <div className='width-100'>
          <label htmlFor='localization-bar'>Localização:</label>
          <input data-eixo='L' id='localization-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
        <div className='width-100'>
          <label htmlFor='resources-bar'>Recursos:</label>
          <input data-eixo='R' id='resources-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
        <div className='width-100'>
          <label htmlFor='time-bar'>Tempo:</label>
          <input data-eixo='T' id='time-bar' type='input' onClick={this.props.onCustomizeSearch} onChange={this.props.onTableSearchUpdate} />
        </div>
      </div>
      <div>
        <button className='modal-button' onClick={this.onSelectValue}>Confirmar</button>
      </div>
      <hr />
    </div>)
  }
}

export default CustomizeDiagnostico
