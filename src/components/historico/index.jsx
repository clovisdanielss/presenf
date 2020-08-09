import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
      prescricao: false,
      search: "",
    };
    this.onTableSearchUpdate = this.onTableSearchUpdate.bind(this);
    this.loadHistorico = this.loadHistorico.bind(this);
    this.onSelect = this.onSelect.bind(this);
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

  onSelect(e) {
    let id = e.currentTarget.getAttribute("data-index");
    let prescricao = null;
    this.state.historico.map((p) => {
      if (p.id == id) {
        prescricao = p;
      }
    });
    this.setState({ prescricao });
    this.props.loadData(prescricao);
  }

  componentDidMount() {
    this.loadHistorico();
  }

  onTableSearchUpdate(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.state.prescricao) {
      return (
        <Redirect
          to={
            "/paciente/" +
            this.props.paciente.id +
            "/prescricao/" +
            this.state.prescricao.id
          }
        ></Redirect>
      );
    }
    const loadData = this.props.loadData;
    if (this.state.historico) {
      return (
        <div className="card-container card-container-table">
          <h2>Histórico de Prescrição</h2>
          <hr />
          <div className="flex-center">
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
            <div
              className="col-md-4"
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Busca:</span>
                </div>
                <input
                  id="search-bar"
                  type="input"
                  className="form-control"
                  onChange={this.onTableSearchUpdate}
                />
              </div>
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
                      <tr
                        key={index}
                        data-index={prescricao.id}
                        className="tr"
                        onClick={this.onSelect}
                      >
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
