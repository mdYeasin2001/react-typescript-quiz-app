import React from 'react';

interface IProps {
    question: string,
    answers: string[],
    handleClickAns: any,
    disabledAnswering: boolean,
    correct_answer: string,
    userAns: {
        answer: string,
        is_correct: boolean,
        correct_answer: string,
        question: string,
    }
}

const QuizCard = ({ question, answers, handleClickAns, disabledAnswering, correct_answer, userAns }: IProps) => {

    return (
        <div>
            <h1 className="fw-normal fs-3 text-warning">{question}</h1>
            {answers?.map(ans =>
                <div key={ans}>
                    <button
                        disabled={disabledAnswering}
                        onClick={() => handleClickAns(ans)}
                        className={
                            `
                            btn mb-2
                            ${!disabledAnswering ? 'btn-info' : userAns.answer !== ans ? 'btn-info': userAns.answer === ans && userAns.is_correct === true ? 'btn-success': userAns.answer === ans && userAns.is_correct === false ? 'btn-danger': ''}
                            `
                        }
                    >
                        {ans}
                    </button>
                </div>)}
        </div>
    );
};

export default QuizCard;