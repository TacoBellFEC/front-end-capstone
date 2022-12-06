import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import API_KEY from '../../../config';
import { UnderlineTextButton, HelpfulButton } from './QandA.style';

function Answer({ answer }) {
  const { date } = answer;
  const formatDate = format(new Date(date), 'MMMM d, yyyy');
  function handleHelpfulAnswer() {
    const helpfulNum = answer.helpfulness + 1;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/helpful`, helpfulNum, {
      headers:
    {
      Authorization: API_KEY,
    },
    })
      .then((response) => {
        console.log('This is the response in handleHelpful: ', response);
      })
      .catch((error) => {
        console.log('There is an error in handleHelpful: ', error);
      });
  }
  function handleAnswerReport(event) {
    event.preventDefault();
    const reported = { reported: true };
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/report`, reported, {
      headers:
    {
      Authorization: API_KEY,
    },
    })
      .then((response) => {
        console.log('This is the response in handleAnswerReport: ', response);
      })
      .catch((error) => {
        console.log('There is an error in handleAnswerReport: ', error);
      });
  }
  return (
    <div id="answer">
      <br />
      <strong>A: </strong>
      {answer.body}
      <br />
      <br />
      <div id="signature">
        by
        {' '}
        {answer.answerer_name}
        ,
        {' '}
        {formatDate}
        {' '}
        |
        {' '}
        <HelpfulButton
          type="button"
          onClick={() => handleHelpfulAnswer}
        >
          Helpful?
        </HelpfulButton>
        {' '}
        <u>Yes</u>
        {' '}
        (
        {answer.helpfulness}
        ) |
        {' '}
        <UnderlineTextButton
          type="button"
          onClick={() => handleAnswerReport}
        >
          Report
        </UnderlineTextButton>
        <br />
      </div>
    </div>
  );
}

export default Answer;
