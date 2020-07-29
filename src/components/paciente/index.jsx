import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import historicoIcon from "../../public/historico.svg";
import prescricaoIcon from "../../public/prescricao.svg";
import voltarIcon from "../../public/voltar.svg";

class Paciente extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card col-md-4  ml-auto mr-auto mt-5 p-4">
        <div className="">
          <h2>Informação do Paciente</h2>
        </div>

        <hr />
        <div className="flex-row ">
          <div className="width-100 text-left">
            <label htmlFor="nomePaciente">Paciente: </label>
            <input
              id="nomePaciente"
              className="form-control"
              value={this.props.paciente.nome}
              readOnly
            />
          </div>
        </div>
        <div className="flex-row mb-2">
          <div className="width-100 text-left">
            <label htmlFor="prontuario">Prontuario: </label>
            <input
              id="prontuario"
              className="form-control"
              value={this.props.paciente.prontuario}
              readOnly
            />
          </div>
        </div>
        <div className="flex-icons mt-4">
          <div>
            <figcaption htmlFor="prescrever">Prescrever:</figcaption>
            <Link
              id="prescrever"
              to={
                "/paciente/" + this.props.paciente.id.toString() + "/prescricao"
              }
            >
              <img src={prescricaoIcon} />
            </Link>
          </div>
          <div>
            <figcaption htmlFor="historico">Historico:</figcaption>
            <Link
              to={
                "/paciente/" +
                this.props.paciente.id.toString() +
                "/prescricao/historico"
              }
            >
              <img src={historicoIcon}></img>
            </Link>
          </div>
          <div>
            <figcaption htmlFor="voltar">Voltar:</figcaption>
            <Link to="/paciente">
              <img src={voltarIcon}></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Paciente;
