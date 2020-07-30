import React, { Component } from "react";
import Modal from "react-modal";
import "./index.css";
import { Link } from "react-router";
import voltarIcon from "../../public/voltar.svg";
import CustomizeDiagnostico from "../modal-customize-diagnostico";
import { GlobalStateContext } from "../../contexts";
Modal.setAppElement("#root");

class ModalComponent extends Component {
  static contextType = GlobalStateContext;
  constructor(props) {
    super(props);
    this.state = {
      query: {
        id: "",
        name: "",
        index: null,
      },
      search: "",
      cipeData: [],
      customize: false,
      customizeTargetId: undefined,
    };

    this.onAfterOpenModal = this.onAfterOpenModal.bind(this);
    this.onTableSearchUpdate = this.onTableSearchUpdate.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCustomize = this.onCustomize.bind(this);
    this.onCustomizeSearch = this.onCustomizeSearch.bind(this);
    this.onCustomizeSelectValue = this.onCustomizeSelectValue.bind(this);
    this.loadCustomizedEixo = this.loadCustomizedEixo.bind(this);
    this.loadEixo = this.loadEixo.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  onCustomize() {
    this.setState({ customize: !this.state.customize });
  }

  onCloseModal() {
    this.setState({
      search: "",
      customizeTargetId: undefined,
      customize: false,
    });
    this.props.onCloseModal();
  }

  onSelectValue(e) {
    this.props.onSelectValue(
      e.currentTarget.getAttribute("data-value"),
      this.state.query.index,
      this.state.query.name
    );
    this.onCloseModal();
  }

  onCustomizeSelectValue(e) {
    if (this.state.customizeTargetId) {
      document.getElementById(
        this.state.customizeTargetId
      ).value = e.currentTarget.getAttribute("data-value");
    }
  }

  updateQuery() {
    var aux = this.props.query.replace(/\d/g, "");
    var index = this.props.query.replace(/\D/g, "");
    if (aux.length > 0) {
      if (aux == "diagnostico") {
        aux = "diagnóstico";
      } else if (aux == "intervencao") {
        aux = "intervenção";
      }
      var aux2 = "";
      aux2 = aux2.concat(aux[0].toUpperCase());
      for (var i = 1; i < aux.length; i++) {
        aux2 = aux2.concat(aux[i]);
      }
    }
    this.setState({
      query: {
        id: this.props.query,
        name: aux2,
        index: index,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.updateQuery();
    }
  }

  onTableSearchUpdate(event) {
    this.setState({ search: event.target.value });
  }

  onCustomizeSearch(e) {
    this.loadCustomizedEixo(e);
  }

  onAfterOpenModal() {
    this.loadEixo();
  }

  loadEixo() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      var result = JSON.parse(xhr.responseText);
      this.setState({ cipeData: result });
    });
    var eixo = "";
    if (this.state.query.name === "Diagnóstico") {
      eixo = "DC";
    } else if (this.state.query.name === "Intervenção") {
      eixo = "IC";
    } else if (this.state.query.name === "Resultado") {
      eixo = "OC"; // Documento junta diagnósticos e resultados por serem do mesmo eixo
    }
    xhr.open("GET", process.env.REACT_APP_URL + "cipe?eixo=" + eixo);
    xhr.setRequestHeader("Authorization", this.context.enfermeiro.token);
    xhr.send();
  }

  loadCustomizedEixo(e) {
    var xhr = new XMLHttpRequest();
    this.setState({ search: "", customizeTargetId: e.target.id });
    xhr.addEventListener("load", () => {
      var result = JSON.parse(xhr.responseText);
      this.setState({ cipeData: result });
    });
    var eixo = e.target.getAttribute("data-eixo");
    xhr.open("GET", process.env.REACT_APP_URL + "cipe?eixo=" + eixo);
    xhr.setRequestHeader("Authorization", this.context.enfermeiro.token);
    xhr.send();
  }

  /* TODO conteúdo da busca está atrabalhando outros modais. */
  render() {
    var message = "Criar ";
    if (this.state.query && this.state.query.name) {
      message = message.concat(this.state.query.name.toLowerCase());
    }
    return (
      <Modal
        className="container-fluid"
        isOpen={this.props.modalOpen}
        onAfterOpen={this.onAfterOpenModal}
        onRequestClose={this.onCloseModal}
        contentLabel="Example Modal"
      >
        <div className="card-container card-container-table">
          <h2>Criar {this.state.query.name}</h2>
          <hr />
          <div>
            <div className="width-100 img-input">
              <a onClick={this.onCloseModal}>
                <img className="voltar-pequeno" src={voltarIcon} />
                <label>Voltar</label>
              </a>
            </div>
            {this.state.customize ? null : (
              <div className="width-100">
                <label htmlFor="search-bar">Busca:</label>
                <input
                  id="search-bar"
                  type="input"
                  onChange={this.onTableSearchUpdate}
                />
              </div>
            )}
          </div>
          <hr />
          {this.state.customize ? (
            <CustomizeDiagnostico
              onCustomizeSearch={this.onCustomizeSearch}
              onTableSearchUpdate={this.onTableSearchUpdate}
              onSelectValue={this.onSelectValue}
            />
          ) : null}
          <div className="row">
            <div className="wrapper col-md-12">
              <table>
                <thead>
                  <tr>
                    <th>Diagnóstico: </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cipeData.map((doc, index) => {
                    var search = new RegExp(this.state.search);
                    if (search.test(doc["termo "])) {
                      return (
                        <tr
                          key={index}
                          className="tr"
                          data-value={doc["termo "]}
                          onClick={
                            this.state.customize
                              ? this.onCustomizeSelectValue
                              : this.onSelectValue
                          }
                        >
                          <td>{doc["termo "]}</td>
                        </tr>
                      );
                    }
                  })}
                  {this.state.customize ? null : (
                    <tr className="tr">
                      <td>{message}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
