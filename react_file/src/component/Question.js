import React from "react";
import ReactDOM from "react-dom/client";
export let Question = (prop) => {
  return (
    <div className="quiz">
      <h2>{prop.question}</h2>
      <div className="quiz_btn">
        <button
          onClick={(event) => prop.changeClass(event, prop.name)}
          name={prop.name}
          ref={prop.ref1}
        >
          {prop.opt1}
        </button>
        <button
          onClick={(event) => prop.changeClass(event, prop.name)}
          name={prop.name}
          ref={prop.ref2}
        >
          {prop.opt2}
        </button>
        <button
          onClick={(event) => prop.changeClass(event, prop.name)}
          name={prop.name}
          ref={prop.ref3}
        >
          {prop.opt3}
        </button>
        <button
          onClick={(event) => prop.changeClass(event, prop.name)}
          name={prop.name}
          ref={prop.ref4}
        >
          {prop.opt4}
        </button>
      </div>
    </div>
  );
};
