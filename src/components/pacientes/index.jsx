import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css'
import paciente from '../../../public/paciente.png';
import gestao from '../../../public/gestao.png'


class Pacientes extends Component{
	state = {
		pacientes:[],
	};

	constructor(props){
		super(props);
		this.state = {
			search:"",
			pacientes:[],
		}
		this.tableSearchUpdate = this.tableSearchUpdate.bind(this)
	}

	tableSearchUpdate(event){
		this.setState({search:event.target.value});
		console.log(this.state)
		this.forceUpdate()
	}

	componentDidMount(){
		setTimeout(()=>{
			var xhr = new XMLHttpRequest()
			xhr.addEventListener('load', () => {
				var pacientes = JSON.parse(xhr.responseText)
				this.setState({pacientes:pacientes})
			})
			xhr.open('GET',process.env.REACT_APP_URL+'paciente')
			xhr.send()
		},5)	
	}

	render(){
		const loadData = this.props.loadData
		return (
			<div className="card-container card-container-table">
				<div className="card-input">
					<label htmlFor="search-bar">Busca:</label>
					<input id="search-bar" type="input" onChange={this.tableSearchUpdate}/>
				</div>
				<hr/>
				<table>
					<thead>
					<tr>
						<td>Prontuário: </td>
						<td>Nome: </td>
						<td>Clínica: </td>
						<td>Dias no leito: </td>
						<td>Dias no hospital: </td>
						<td>Prescrição Enf.: </td>
					</tr>
					</thead>
					<tbody>
					{this.state.pacientes.map((paciente,index)=> {
						var search = new RegExp(this.state.search)
						if(search.test(paciente["nome"]) || 
							search.test(paciente["leito"].toString())){
						return(
						<tr key = {index}>
							<td>{paciente["prontuario"]}</td>
							<td>{paciente["nome"]}</td>
							<td>{paciente["leito"]}</td>
							<td>{paciente["diasLeito"]}</td>
							<td>{paciente["diasHospital"]}</td>
							<td><Link className="link-table" to={()=>{return "/paciente/"+paciente["id"]}}
							 onClick={()=>{loadData(paciente)}}>Selecionar</Link></td>
						</tr>
						);
					}})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Pacientes;