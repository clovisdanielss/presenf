import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import paciente from "../../public/paciente.png";
import gestao from "../../public/gestao.png";
import { GlobalStateContext } from "../../contexts";
class Pacientes extends Component {
  static contextType = GlobalStateContext;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      pacientes: null,
    };
    this.onTableSearchUpdate = this.onTableSearchUpdate.bind(this);
    this.loadPacientes = this.loadPacientes.bind(this);
  }

  onTableSearchUpdate(event) {
    this.setState({ search: event.target.value });
  }

  loadPacientes() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      var pacientes = JSON.parse(xhr.responseText);
      this.setState({ pacientes: pacientes });
    });
    xhr.open("GET", process.env.REACT_APP_URL + "paciente");
    xhr.setRequestHeader("Authorization", this.context.enfermeiro.token);
    xhr.send();
  }

  componentDidMount() {
    this.loadPacientes();
  }

  render() {
    const loadData = this.props.loadData;
    if (this.state.pacientes) {
      return (
        <div className="card-container card-container-table">
          <h2>Pacientes</h2>
          <hr />
          <div className="width-100">
            <label htmlFor="search-bar">Busca:</label>
            <input
              id="search-bar"
              type="input"
              onChange={this.onTableSearchUpdate}
            />
          </div>
          <hr />
          <div className="wrapper">
            <table>
              <thead>
                <tr>
                  <th>Prontuário: </th>
                  <th>Nome: </th>
                  <th>Clínica: </th>
                  <th>Dias no leito: </th>
                  <th>Dias no hospital: </th>
                </tr>
              </thead>
              <tbody>
                {this.state.pacientes.map((paciente, index) => {
                  var search = new RegExp(this.state.search);
                  if (
                    search.test(paciente.nome) ||
                    search.test(paciente.leito.toString())
                  ) {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return "/paciente/" + paciente.id;
                            }}
                            onClick={() => {
                              loadData(paciente);
                            }}
                          >
                            {paciente.prontuario}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return "/paciente/" + paciente.id;
                            }}
                            onClick={() => {
                              loadData(paciente);
                            }}
                          >
                            {paciente.nome}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return "/paciente/" + paciente.id;
                            }}
                            onClick={() => {
                              loadData(paciente);
                            }}
                          >
                            {paciente.leito}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return "/paciente/" + paciente.id;
                            }}
                            onClick={() => {
                              loadData(paciente);
                            }}
                          >
                            {paciente.diasLeito}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return "/paciente/" + paciente.id;
                            }}
                            onClick={() => {
                              loadData(paciente);
                            }}
                          >
                            {paciente.diasHospital}
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-container loading">
          <div className="container-boxes">
            <div className="box"></div>
            <div className="box"></div>
          </div>
          <h1 className="loading"> Carregando... </h1>
        </div>
      );
    }
  }
}

export default Pacientes;
