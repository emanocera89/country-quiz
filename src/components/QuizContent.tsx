import React from 'react';
import { Country } from '../types';
import UndrawAdv from '../assets/undraw_adventure.svg'

interface QuestionProps {
    countries: Country[];
    correctOption: number;
    questionType: number;
    selectedOption: number | null;
    handleSelectOption: (index: number) => void;
    getButtonBackgroundColor: (index: number) => string;
}

const QuizContent: React.FC<QuestionProps> = ({
    countries,
    correctOption,
    questionType,
    selectedOption,
    handleSelectOption,
    getButtonBackgroundColor,
}) => {
    return (
        <div className='content pt-10'>
            <img src={UndrawAdv} alt='' className='absolute right-0 top-0' />
            {questionType === 0 &&
                <div className='overflow-hidden rounded mb-7' style={{ width: 84, height: 54 }}>
                    <img className='w-full h-full' src={countries[correctOption]?.flags.svg} alt={countries[correctOption]?.name.common} />
                </div>
            }

            <h2 className='text-2xl font-bold text-blue mb-8'>
                {questionType === 0 ? 'Which country does this flag belong to?' : `${countries[correctOption]?.capital[0]} is the capital of?`}
            </h2>

            <ul className='options-list'>
                {countries?.map((option, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleSelectOption(index)}
                            disabled={selectedOption !== null}
                            className={`border-2 text-lg font-medium px-5 py-3.5 rounded-xl w-full text-left mb-6 enabled:hover:bg-yellow enabled:hover:border-yellow enabled:hover:text-white ${getButtonBackgroundColor(index)}`}
                        >
                            <span className='text-2xl mr-11'>{String.fromCharCode(65 + index)}</span> {option.name.common}
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default QuizContent;