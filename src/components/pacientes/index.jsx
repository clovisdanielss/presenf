import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../principal/index.css'
import './index.css'
import paciente from '../../../public/paciente.png';
import gestao from '../../../public/gestao.png'

var pacientes_data=[
	{
		'id': 1,
		'prontuario':19025,
		'nome':"Alberto Sabino",
		'leito':"302",
		'diasHospital':30,
		'diasLeito':10,
	},
	{
		'id':2,
		'prontuario':33000,
		'nome':"Everardo Sabino",
		'leito':"502",
		'diasHospital':100,
		'diasLeito':25,
	},
	{
		'id':3,
		'prontuario':76665,
		'nome':"Alberto Queiroz",
		'leito':"503",
		'diasHospital':300,
		'diasLeito':100,
	},
	{
		'id':4,
		'prontuario':18452,
		'nome':"José Amancio",
		'leito':"303",
		'diasHospital':10,
		'diasLeito':10,
	},
]



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
			this.setState({pacientes:pacientes_data});
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
							<td><Link className="link-table" to={()=>{return "/pacientes/"+paciente["id"]}}
							 onClick={()=>{console.log("Debug!");loadData(paciente)}}>Selecionar</Link></td>
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