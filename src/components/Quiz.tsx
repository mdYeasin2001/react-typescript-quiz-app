import React, { useEffect, useState } from 'react';
import QuizCard from './QuizCard';

interface IState {
    quiz: {
        category: string,
        correct_answer: string,
        difficulty: string,
        incorrect_answers: string[],
        question: string,
        type: string,
        answers: string[]
    }[],
    userAns: {
        answer: string,
        is_correct: boolean,
        correct_answer: string,
        question: string,
    }[]

}
interface IData {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
    answers: string[]
}
const Quiz = () => {
    const [quiz, setQuiz] = useState<IState['quiz']>([]);
    const [quizNum, setQuizNum] = useState(0);
    const [userAns, setUserAns] = useState<IState['userAns']>([]);
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(true);
    const [text, setText] = useState('Start Quiz')

    console.log('answers', quiz);
    console.log('user ans', userAns);

    useEffect(() => {

    }, []);

    const handleNext = () => {
        if (quizNum + 1 === 10) {
            setEnd(true);
            setText('Start Again')
        } else {
            setQuizNum((prev => prev + 1));
        }
    }
    const handleClickAns = (value: string) => {
        const newAns = {
            answer: value,
            is_correct: quiz[quizNum].correct_answer === value,
            correct_answer: quiz[quizNum].correct_answer,
            question: quiz[quizNum].question,
        }
        if (quiz[quizNum].correct_answer === value) {
            setScore(prev => prev + 1);
        }
        setUserAns((prev) => [...prev, newAns])
    }
    const startQuiz = () => {
        setQuiz([]);
        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                data.results.map((q: IData) => q.answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5));
                setQuiz(data.results)
            })
        setEnd(false);
        setQuizNum(0);
        setScore(0);
        setUserAns([]);
    }
    return (
        <div className="container">
            {end ?
                <button className="btn btn-success" onClick={startQuiz}>{text}</button>
                :
                ''
            }
            {!end && quiz.length > 0 && <p>Number of Quiz: {quizNum + 1} / {quiz.length}</p>}
            {end && <p>Your Score: {score}</p>}
            {!end &&
                <QuizCard
                    question={quiz?.[quizNum]?.question}
                    answers={quiz?.[quizNum]?.answers}
                    handleClickAns={handleClickAns}
                    disabledAnswering={quizNum + 1 <= userAns.length}
                    correct_answer={quiz?.[quizNum]?.correct_answer}
                    userAns={userAns[quizNum]}
                />
            }
            {
                !end && quiz.length > 0 &&
                <button className="btn btn-success" disabled={quizNum + 1 !== userAns.length} onClick={handleNext}>
                    {quizNum + 1 === 10 ? 'Finish Quiz' : 'Next Quiz'}
                </button>
            }
        </div >
    );
};

export default Quiz;