import React from "react";
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
    <div key={key} data-index={index} className="generated-by-array mt-4">
      <h2 className="diagnostico-header">Diagnóstico {key + 1}</h2>
      <hr />
      {readOnly ? null : (
        <a className="add-remove-button" onClick={props.onRemoveDiagnostico}>
          <b>Remover</b> Diagnóstico
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
      <div className="row">
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
