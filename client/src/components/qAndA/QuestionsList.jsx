import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../../../config';
import QASearchBar from './QASearchBar';
import Question from './Question';
import Modal from './Modal';

function QuestionsList({ productId }) {
  const [questionList, setQuestionList] = useState([]);
  const [renderCount, setRenderCount] = useState(4);
  const [currQuestionList, setCurrQuestionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let count = 0;

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
      headers: { Authorization: API_KEY },
      params: {
        product_id: productId,
        count: 200,
      },
    })
      .then((response) => {
        setQuestionList(response.data);
        setCurrQuestionList(response.data);
      })
      .catch((error) => {
        console.log('There is an error in QuestionsList: ', error);
      });
  }, []);
  return (
    <div id="QuestionsList">
      <QASearchBar
        setCurrQuestionList={setCurrQuestionList}
        questionList={questionList}
      />
      {
        currQuestionList.results !== undefined && currQuestionList.results.length !== 0
          ? (
            <div id="QuestionList">
              {currQuestionList.results.map((question) => {
                count += 1;
                if (count <= renderCount) {
                  return (
                    <Question question={question} />
                  );
                }
                return null;
              })}
              {currQuestionList.results.length > 2 ? (
                <button
                  type="button"
                  onClick={() => {
                    setRenderCount(renderCount + 2);
                  }}
                >
                  More Answered Questions
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setShowModal(true)}
              >
                Add a Question
              </button>
              {showModal
                ? <Modal setShowModal={setShowModal} productId={productId} /> : null}
            </div>
          )
          : (
            <div>
              No Questions Found
              <div>
                <button type="button">Ask a Question</button>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default QuestionsList;
