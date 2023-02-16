import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Question } from "./Question";
import { Questions } from "./main";

export let Quiz = () => {
  let questions = useContext(Questions);
  const Quizzical = questions.prop1.map((ele, ind) => {
    let getCorrect = `group${ind + 1}`;
    return (
      <Question
        key={ele.key}
        question={ele.question}
        name={ele.group}
        changeClass={questions.prop2}
        opt1={ele.opt1}
        opt2={ele.opt2}
        opt3={ele.opt3}
        opt4={ele.opt4}
        click={questions.done}
        ref1={
          ele.opt1 === questions.prop3[ind][getCorrect]
            ? questions[`right${ind + 1}`]
            : null
        }
        ref2={
          ele.opt2 === questions.prop3[ind][getCorrect]
            ? questions[`right${ind + 1}`]
            : null
        }
        ref3={
          ele.opt3 === questions.prop3[ind][getCorrect]
            ? questions[`right${ind + 1}`]
            : null
        }
        ref4={
          ele.opt4 === questions.prop3[ind][getCorrect]
            ? questions[`right${ind + 1}`]
            : null
        }
      />
    );
  });
  return (
    <div className="quiz_main">
      {questions.load ? (
        <div className="load">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      ) : null}
      <div className="quiz_body">{Quizzical}</div>
      <div className="score">
        {questions.checkWrong ? (
          <h1>You score {questions.right} Of 5</h1>
        ) : null}
        {!questions.done ? (
          <button onClick={questions.submit} id="end">
            Submit Answers
          </button>
        ) : (
          <button onClick={questions.new} id="end">
            Take Another Quiz
          </button>
        )}
      </div>
    </div>
  );
};
