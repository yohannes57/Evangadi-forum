import React, { useEffect, useState } from "react";
import "./AnsQuestion.css";
import Question from "../Community/Question";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function AnsQuestion(props) {
  let { questionId } = useParams(); 
  const [answer, setAnswer] = useState({});
  const [prevAnswers, setPrevAnswers] = useState();

  // get access to the data on state
  const location = useLocation();
  const { question, currentUserId } = location.state;
  console.log("Location data", question);

  const handleChange = async (e) => {
    // console.log(e.target.value);
    await setAnswer({
      answer: e.target.value,
      questionId: question.question_id,
      userId: currentUserId,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(">>>>> post answer -1");
    try {
      // console.log(">>>>> post answer 0");
      // console.log(answer);
      // await axios.post("http://localhost:3001/api/questions", {
      //   answer: answer.answer,
      // });
      await axios.post("http://localhost:3001/api/answers", {
        answer: answer.answer,
        questionId: answer.questionId,
        userId: answer.userId,
      });
      // console.log(">>>>> post answer 1");
      // console.log(">>>>>>>>  your answer is submitted");
      window.location.reload(false);

      // If set to true, the browser will do a complete
      //  page refresh from the server and not from the
      // cached version of the page.
    } catch (err) {
      // console.log(">>>>>>>> ERROR  your answer is not submitted");
      console.log("Answers can't be submitted: ", err);
    }
  };

  useEffect(() => {
    // setAskedQuestion(question);
    const fetchAnswers = async () => {
      const answers = await axios.get(`http://localhost:3001/api/answers/${questionId}`);
      // console.log(answers.data); 
      // console.log(answers.data.data);
      setPrevAnswers(() => {
        return answers.data?.data;
      });
      // console.log(">>>>>>prevAnswers ", prevAnswers);
    };
    try {
      fetchAnswers();
      // console.log(">>>>> Successfully fetched answers.");
      // console.log(answer.data);
      } catch (err) {
      // console.log(">>>>> Can't fetch answers.");
    }
  }, []);
  return (
    <div className="answer">
      <div className="answer__top">
        <div className="answer__header">
          <p>Question</p>
          {/* <p>'the question goes here?'{questionId}</p> */}
          <p>{question.question}</p>
          <p>{question.question_description}</p>
        </div>

        <div className="answer__title">
          {prevAnswers?.length !== 0 && <h4>Answer From The Community</h4>}
        </div>
        <div className="answer__list">
          <div>
            {prevAnswers?.map((prevAnswer) => (
              <div key={prevAnswer.answer_id}>
                <Question show={prevAnswer} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="answer__bottom">
        <div>
          <center>
            <div className="abtext">Answer The top Question</div>
          </center>
          <center>
            <div className="answerext">Answer The top Question</div>
          </center>

          <div className="answer__form">
            <form onSubmit={handleSubmit}>
              <textarea
                onChange={handleChange}
                name="answerField"
                placeholder="Your Answer ..."
                style={{
                  border: "1px solid rgb(191, 191, 191)",
                  borderRadius: "5px ",
                  width: "100%",
                  resize: "none",
                  height: "150px",
                }}
              ></textarea>
              <button className="answer__formBtn">Post your Answer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnsQuestion;
