import React from "react";
import voltarIcon from "../../public/voltar.svg";
import Intervencaos from "./intervencaos.jsx";

const Diagnostico = (props) => {
  var diagnostico = props.diagnostico;
  var intervencaos = props.diagnostico.intervencaos;
  var index = props.index;
  var key = props.reactKey;
  var readOnly = diagnostico.index === undefined;
  if (!index) {
    index = key;
  }
  return (
    <div
      key={key}
      data-index={index}
      className="generated-by-array mt-4"
      style={readOnly ? null : props.selected ? null : { display: "none" }}
    >
      <h2 className="diagnostico-header">Diagnóstico {key + 1}</h2>
      {readOnly ? null : (
        <div>
          <div
            className="abs-rt-0"
            onClick={props.onChangeDiagnostico}
            data-index={index}
            data-increment="+1"
          >
            <img
              style={{
                width: "25px",
                transform: "rotate(180deg)",
              }}
              src={voltarIcon}
            />
          </div>
          <div
            className="abs-lt-0"
            onClick={props.onChangeDiagnostico}
            data-index={index}
            data-increment="-1"
          >
            <img
              style={{
                width: "25px",
              }}
              src={voltarIcon}
            />
          </div>
        </div>
      )}
      <hr />
      {readOnly ? null : (
        <a className="add-remove-button" onClick={props.onRemoveDiagnostico}>
          Remover Diagnóstico
        </a>
      )}
      <div className="row">
        <div className="col-md-12 text-left">
          <label htmlFor={"diagnostico" + index.toString()}>
            Diagnóstico:{" "}
          </label>
          <input
            onClick={props.onOpenModal}
            id={"diagnostico" + index.toString()}
            className="form-control"
            value={diagnostico.nome}
            readOnly
          />
        </div>
      </div>
      <Intervencaos
        props={props}
        index={index}
        intervencaos={intervencaos}
        readOnly={readOnly}
      />
      {readOnly ? null : (
        <div className="add-insert-button mt-4 micro-btn micro-btn-hover btn btn-primary" data-index={index} onClick={props.onAdicionarIntervencao}>
          <span>
            Criar nova intervenção
          </span>
        </div>
      )}
      <div className="row mt-4">
        <div className="col-md-6 text-left">
          <label htmlFor={"resultado" + index.toString()}>Resultado: </label>
          <input
            onClick={props.onOpenModal}
            id={"resultado" + index.toString()}
            value={diagnostico.resultado}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col-md-6 text-left">
          <label htmlFor={"avaliacao" + index.toString()}>Avaliação: </label>
          <input
            onChange={props.onChangeValue}
            type="text"
            id={"avaliacao" + index.toString()}
            className="form-control"
            value={readOnly ? diagnostico.avaliacao : undefined}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default Diagnostico;
