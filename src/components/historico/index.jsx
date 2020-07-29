import React, { Component } from "react";
import { Link } from "react-router-dom";
import voltarIcon from "../../public/voltar.svg";
import "./index.css";
import util from "../../util.jsx";
import { GlobalStateContext } from "../../contexts";

class Historico extends Component {
  static contextType = GlobalStateContext;

  constructor(props) {
    super(props);
    this.state = {
      historico: null,
      search: "",
    };
    this.tableSearchUpdate = this.tableSearchUpdate.bind(this);
    this.loadHistorico = this.loadHistorico.bind(this);
  }

  loadHistorico() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      var historico = JSON.parse(xhr.responseText);
      this.setState({ historico: historico });
    });
    var url =
      process.env.REACT_APP_URL +
      "paciente/" +
      this.props.paciente.id.toString() +
      "/prescricao";
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", this.context.enfermeiro.token);
    xhr.send();
  }

  componentDidMount() {
    this.loadHistorico();
  }

  tableSearchUpdate(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const loadData = this.props.loadData;
    if (this.state.historico) {
      return (
        <div className="card-container card-container-table">
          <h2>Histórico de Prescrição</h2>
          <hr />
          <div>
            <div className="width-100 img-input">
              <Link
                to={() => {
                  if (this.props.paciente)
                    return "/paciente/" + this.props.paciente.id;
                }}
              >
                <img src={voltarIcon} className="voltar-pequeno" />
                <label>Voltar</label>
              </Link>
            </div>
            <div className="width-100">
              <label htmlFor="search-bar">Busca:</label>
              <input
                id="search-bar"
                type="input"
                onChange={this.tableSearchUpdate}
              />
            </div>
          </div>
          <hr />
          <div className="wrapper">
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
                  var search = new RegExp(this.state.search);
                  if (
                    search.test(util.formmatDate(prescricao.dataCriacao)) ||
                    search.test(util.formmatHours(prescricao.dataCriacao)) ||
                    search.test(prescricao.coren)
                  ) {
                    return (
                      <tr key={index}>
                        <td> {prescricao.coren} </td>
                        <td>
                          {util.formmatDate(prescricao.dataCriacao) || null}
                        </td>
                        <td>
                          {util.formmatHours(prescricao.dataCriacao) || null}
                        </td>
                        <td>
                          {prescricao.observacao.substr(0, 20) + "..." || null}
                        </td>
                        <td>
                          <Link
                            className="link-table"
                            to={() => {
                              return (
                                "/paciente/" +
                                this.props.paciente.id +
                                "/prescricao/" +
                                prescricao.id
                              );
                            }}
                            onClick={() => {
                              loadData(prescricao);
                            }}
                          >
                            Selecionar
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
          <div class="container-boxes">
            <div class="box"></div>
            <div class="box"></div>
          </div>
          <h1 className="loading"> Carregando... </h1>
        </div>
      );
    }
  }
}

export default Historico;
