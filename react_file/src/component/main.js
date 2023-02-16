import React, { createContext, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { Start } from "./Start";
import { Quiz } from "./Quiz";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
export const Questions = createContext(null);
export let Main = () => {
  //create a refrence to be assigned to correct button elements
  const right1 = useRef("correct");
  const right2 = useRef("correct");
  const right3 = useRef("correct");
  const right4 = useRef("correct");
  const right5 = useRef("correct");
  //Generate a random number btw 0-3 for the placement of right answers

  const [questiongroups, setQuestionGroups] = useState([]);
  const [selected, setSelected] = useState({});
  const [correct, setCorrect] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [start, setStart] = useState(false);
  const [countright, setCountRight] = useState(0);
  const [wrong, setWrong] = useState(true);
  const [load, setLoad] = useState(false);
  const [questiontype, setQuestionType] = useState(
    "https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple"
  );
  const difficulty = useRef("medium");
  //creating a context component to be passed to sub-component component
  let startQuiz = useCallback(async () => {
    let getQust = async () => {
      let question = await fetch(
        questiontype + "&difficulty=" + difficulty.current + "&type=multiple"
      );
      let response = await question.json();
      //for each object from the fetch response array we want to place the correct answer at a random spot in the answer array then create an array of object
      let groups = response.results.map((ele, ind) => {
        ele.incorrect_answers.splice(
          Math.floor(Math.random() * 4),
          0,
          ele.correct_answer
        );
        console.log(ele.question);
        return {
          group: ind + 1,
          isSelected: false,
          key: ind,
          question: decodeURIComponent(ele.question),
          opt1: ele.incorrect_answers[0],
          opt2: ele.incorrect_answers[1],
          opt3: ele.incorrect_answers[2],
          opt4: ele.incorrect_answers[3],
        };
      });
      //set a state for corect options and group no
      let correctArr = response.results.map((ele, ind) => ({
        [`group${ind + 1}`]: ele.correct_answer,
      }));

      setCorrect(correctArr);
      setQuestionGroups(groups);
      changeLoad();
    };
    changeLoad();
    getQust();
    setStart((prev) => !prev);
  });

  //Function to add a selected class to the clicked if the group no is false
  const changeClass = (event, no) => {
    let getGroup = questiongroups.filter((ele) => ele.group === no);
    if (getGroup[0].isSelected === false) {
      event.target.classList.add("clicked");
      setQuestionGroups((prev) =>
        prev.map((ele, ind) =>
          ele.group === no ? { ...ele, isSelected: !ele.isSelected } : ele
        )
      );
      setSelected((prev) => ({
        ...prev,
        [`ans${no}`]: event.target.textContent,
      }));
    }
    //Removes element from selected elements and changes selected group bck to false when user tries to change option
    else {
      const choosen = `ans${no}`;
      if (event.target.textContent === selected[choosen]) {
        event.target.classList.remove("clicked");
        setQuestionGroups((prev) =>
          prev.map((ele, ind) =>
            ele.group === no ? { ...ele, isSelected: !ele.isSelected } : ele
          )
        );
        setSelected((prev) => ({ ...prev, [choosen]: "" }));
      }
    }
  };
  //Show the correct answer and wrong answers users chose
  let handleSubmit = () => {
    right1.current.classList.add("correct");
    right2.current.classList.add("correct");
    right3.current.classList.add("correct");
    right4.current.classList.add("correct");
    right5.current.classList.add("correct");
    let chose = document.querySelectorAll(".clicked");
    if (chose.length > 0) {
      let keyy = [
        right1.current.textContent,
        right2.current.textContent,
        right3.current.textContent,
        right4.current.textContent,
        right5.current.textContent,
      ];
      chose.forEach((ele, ind) => {
        if (!keyy.includes(ele.textContent)) {
          ele.classList.add("wrong");
        }
      });
    }
    const correctEle = [
      right1.current,
      right2.current,
      right3.current,
      right4.current,
      right5.current,
    ];
    let correctNo = correctEle.filter((ele) => ele.classList.length === 2);
    setCountRight(correctNo.length);
    setSubmit((prev) => !prev);
  };
  useEffect(() => {
    setWrong((prev) => !prev);
  }, [submit]);
  //sends user back start page and remove previous classes
  const newQuiz = () => {
    right1.current.classList.remove("correct");
    right2.current.classList.remove("correct");
    right3.current.classList.remove("correct");
    right4.current.classList.remove("correct");
    right5.current.classList.remove("correct");
    let chose = document.querySelectorAll(".clicked");
    if (chose.length > 0) {
      chose.forEach((ele) => {
        ele.classList.remove("clicked");
      });
    }
    let wrong = document.querySelectorAll(".wrong");
    if (wrong.length > 0) {
      wrong.forEach((ele) => {
        ele.classList.remove("wrong");
      });
    }
    setCountRight(0);
    setStart((prev) => !prev);
    setSubmit((prev) => !prev);
  };
  //Preloader function before every new fetch loads
  let changeLoad = useCallback(() => {
    setLoad((prev) => !prev);
  }, []);
  //Change the question category
  const changeCategory = useCallback((event) => {
    switch (event.target.value) {
      case "Science":
        setQuestionType("https://opentdb.com/api.php?amount=5&category=17");
        break;
      case "General Knowledge":
        setQuestionType(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium"
        );
        break;
      case "Computers":
        setQuestionType("https://opentdb.com/api.php?amount=5&category=18");
        break;
      case "Mathematics":
        setQuestionType("https://opentdb.com/api.php?amount=5&category=19");
        break;
      case "Politics":
        setQuestionType("https://opentdb.com/api.php?amount=5&category=24");
        break;
      case "Celebrities":
        setQuestionType("https://opentdb.com/api.php?amount=5&category=26");
        break;
      default:
        setQuestionType("https://opentdb.com/api.php?amount=5&category=9");
        break;
    }
  });
  //Change The Difficulty
  let Difficulty = (event) => {
    switch (event.target.value) {
      case "easy":
        difficulty.current = "easy";
        break;
      case "medium":
        difficulty.current = "medium";
        break;
      case "hard":
        difficulty.current = "hard";
        break;
      default:
        difficulty.current = "easy";
        break;
    }
  };
  return (
    <Questions.Provider
      value={{
        prop1: questiongroups,
        prop2: changeClass,
        prop3: correct,
        prop4: selected,
        right1: right1,
        right2: right2,
        right3: right3,
        right4: right4,
        right5: right5,
        submit: handleSubmit,
        new: newQuiz,
        done: submit,
        checkWrong: wrong,
        right: countright,
        load: load,
      }}
    >
      {start ? (
        <Quiz />
      ) : (
        <Start
          category={changeCategory}
          startQuiz={startQuiz}
          difficulty={Difficulty}
        />
      )}
    </Questions.Provider>
  );
};
