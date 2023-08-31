import React from 'react';
import UndrawWinners from '../assets/undraw_winners.svg';

interface ResultProps {
    correctAnswers: number;
    handleReset: () => void;
}

const QuizResult: React.FC<ResultProps> = ({ correctAnswers, handleReset }) => {
    return (
        <div className='result text-center'>
            <div className='flex justify-center mb-20'><img src={UndrawWinners} alt='' width={238} /></div>
            <h2 className='text-blue-900 font-bold text-5xl mb-1'>Results</h2>
            <p className='text-blue-900 text-lg'>You got <b className='text-green text-4xl'>{correctAnswers}</b> correct answers</p>
            <button onClick={handleReset} className='text-blue-900 border-2 border-blue-900 rounded-xl text-lg py-4 px-16 font-semibold mt-16'>Try again</button>
        </div>
    );
};

export default QuizResult;
