import React, { useRef } from "react";
import voltarIcon from "../../public/voltar.svg";
import impressoraIcon from "../../public/impressora.svg";
import { Link } from "react-router-dom";
import Diagnostico from "./diagnostico.jsx";
import util from "../../util.jsx";
import { useReactToPrint } from "react-to-print";
import { Print, NoPrint } from "react-easy-print";

const PrescricaoReadOnly = (props) => {
  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current
  // })
  const handlePrint = () => {
    document.getElementById("toPrint").classList.remove("col-md-6");
    window.print();
    document.getElementById("toPrint").classList.add("col-md-6");
  };

  return (
    <div id="toPrint" className="card col-md-6  ml-auto mr-auto mt-5 p-3">
      <Print>
        <div className="container-fluid">
          <h2>Prescricao</h2>
          <hr />
          <div className="row">
            <div className="col-md-6 text-left">
              <label htmlFor="nomeEnfermeiro">Enfermeiro: </label>
              <input
                id="nomeEnfermeiro"
                className="form-control"
                value={props.state.enfermeiro.nome}
                readOnly
              />
            </div>
            <div className="col-md-6 text-left">
              <label htmlFor="nomeEnfermeiro">Coren: </label>
              <input
                className="form-control"
                id="nomeEnfermeiro"
                value={props.state.enfermeiro.coren}
                readOnly
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 text-left">
              <label htmlFor="dataCriacao">Data: </label>
              <input
                className="form-control"
                id="dataCriacao"
                value={util.formmatDate(props.prescricao.dataCriacao)}
                readOnly
              />
            </div>
            <div className="col-md-6 text-left">
              <label htmlFor="horaCriacao">Hora: </label>
              <input
                className="form-control"
                id="horaCriacao"
                value={util.formmatHours(props.prescricao.dataCriacao)}
                readOnly
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-left">
              <label htmlFor="nomePaciente">Paciente: </label>
              <input className="form-control" id="nomePaciente" value={props.paciente.nome} readOnly />
            </div>
          </div>
          {props.state.diagnosticos.map((diagnostico, key) => {
            return (
              <Diagnostico
                state={props.state}
                key={key}
                reactKey={key}
                diagnostico={diagnostico}
              />
            );
          })}
          <div className="row text-left">
            <div className="col-md-12 ">
              <label htmlFor="observacao">Observação: </label>
              <textarea
                className="form-control"
                id="observacao"
                value={props.prescricao.observacao}
                readOnly
              />
            </div>
          </div>
        </div>
      </Print>
      <NoPrint>
        <div className="prescricao-icons">
          <div>
            <figcaption htmlFor="voltar">Voltar:</figcaption>
            <Link
              to={"/paciente/" + props.paciente.id + "/prescricao/historico"}
            >
              <img src={voltarIcon} />
            </Link>
          </div>
          <div>
            <figcaption htmlFor="imprimir">Imprimir:</figcaption>
            <a href="#">
              <img src={impressoraIcon} onClick={handlePrint} />
            </a>
          </div>
        </div>
      </NoPrint>
    </div>
  );
};

export default PrescricaoReadOnly;
