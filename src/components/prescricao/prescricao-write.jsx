import React from "react";
import voltarIcon from "../../public/voltar.svg";
import saveIcon from "../../public/save.svg";
import { Link } from "react-router-dom";
import Diagnostico from "./diagnostico.jsx";
import { set } from "lodash";

const PrescricaoWrite = (props) => {
  let [selected, setSelected] = React.useState(0);

  const onChangeDiagnostico = (e) => {
    let inc = e.currentTarget.getAttribute("data-increment") == "+1" ? 1 : -1;
    let value = parseInt(e.currentTarget.getAttribute("data-index")) + inc;
    if (value >= props.state.diagnosticos.length) {
      setSelected(0);
      return;
    }
    if (value < 0) {
      setSelected(props.state.diagnosticos.length - 1);
      return;
    }
    setSelected(value);
    console.log(selected);
  };

  const onAdicionarDiagnostico = (e) => {
    let eCpy = { target: e.target, currentTarget: e.currentTarget };
    props.onAdicionarDiagnostico(eCpy);
    setSelected(props.state.diagnosticos.length - 1);
  };

  return (
    <form className="card col-md-6  ml-auto mr-auto mt-5 p-3">
      <h2>Criar Prescricao</h2>
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
            id="nomeEnfermeiro"
            className="form-control"
            value={props.state.enfermeiro.coren}
            readOnly
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 text-left">
          <label htmlFor="nomePaciente">Paciente: </label>
          <input
            id="nomePaciente"
            className="form-control"
            value={props.paciente.nome}
            readOnly
          />
        </div>
      </div>
      {props.state.diagnosticos.map((item, key) => {
        var index = item.index;
        var diagnostico = item;
        return (
          <Diagnostico
            state={props.state}
            key={key}
            reactKey={key}
            index={index}
            selected={selected == index}
            diagnostico={diagnostico}
            onChangeDiagnostico={onChangeDiagnostico}
            onRemoveDiagnostico={props.onRemoveDiagnostico}
            onOpenModal={props.onOpenModal}
            onChangeValue={props.onChangeValue}
            onAdicionarIntervencao={props.onAdicionarIntervencao}
            onRemoveIntervencao={props.onRemoveIntervencao}
          />
        );
      })}
      <div className="row text-left mt-4">
        <div className="col-md-12 text-left">
          <label htmlFor="observacao">Observação: </label>
          <textarea
            className="form-control"
            onChange={props.onChangeValue}
            id="observacao"
          />
        </div>
      </div>
      <div  onClick={onAdicionarDiagnostico} className="add-insert-button mt-4 micro-btn micro-btn-hover btn btn-primary">
        <span  >
          Criar novo diagnóstico
        </span>
      </div>

      <div className="prescricao-icons">
        <div>
          <figcaption htmlFor="voltar">Voltar:</figcaption>
          <Link to={"/paciente/" + props.paciente.id}>
            <img src={voltarIcon} />
          </Link>
        </div>
        <div>
          <figcaption htmlFor="salvar">Salvar:</figcaption>
          <Link to={"/paciente/" + props.paciente.id} onClick={props.onSave}>
            <img src={saveIcon} />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PrescricaoWrite;
