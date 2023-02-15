import React from "react";
import ReactDOM from "react-dom/client";
export let Start = (prop) => {
  return (
    // prettier-ignore
    <div className="start">
      <div className="main_start">
        <h1>Quizzical</h1>
        <h1>Quizzical is brought to you by Deestar</h1>
        <button onClick={prop.startQuiz}>Start your Quiz</button>
        <label className="label"> Select A Category
        <select onChange={prop.category}>
          <option>Science</option>
          <option>General Knowledge</option>
          <option>Computers</option>
          <option>Mathematics</option>
          <option>Politics</option>
          <option>Celebrities</option>
        </select>
        </label>
        <label className="label"> How smart Are You
        <select onChange={prop.difficulty}>
          <option>Choose A Difficulty</option>
          <option>easy</option>
          <option>medium</option>
          <option>hard</option>
          </select>
        </label>
      </div>
    </div>
  );
};
