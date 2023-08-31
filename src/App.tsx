import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Country } from './types'
import UndrawWinners from './assets/undraw_winners.svg'
import UndrawAdv from './assets/undraw_adventure.svg'

const MAX_QUESTIONS = 4

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const initialData = useRef<Country[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [totalAnswers, setTotalAnswers] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [correctOption, setCorrectOption] = useState<number>(0)
  const [questionType, setQuestionType] = useState<number>(0)


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        initialData.current = data;
        //setCountries(getRandomOptions(data));
        getRandomOptions(data);
      })
  }, []);

  const getRandomOptions = (data: Country[]) => {
    if (data.length > 0) {
      const randomIndices: number[] = [];
      while (randomIndices.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);

        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      const selectedRandomCountries = randomIndices.map(index => data[index]);
      setCorrectOption(Math.floor(Math.random() * 4))
      setQuestionType(Math.floor(Math.random() * 2))
      setTotalAnswers(totalAnswers + 1)
      setCountries(selectedRandomCountries)
      setSelectedOption(null)
    }
  }

  const handleSelectOption = (index: number) => {
    index === correctOption && setCorrectAnswers(correctAnswers + 1)
    setSelectedOption(index);
  }


  const getButtonBackgroundColor = (index: number): string => {
    if (selectedOption !== null) {
      if (index === correctOption) {
        return 'bg-green border-green text-white';
      } else if (index === selectedOption && index !== correctOption) {
        return 'bg-red border-red text-white';
      }
    }
    return 'border-violet text-violet';
  };

  const handleReset = () => {
    setCorrectAnswers(0)
    setTotalAnswers(0)
  }


  return (
    <div className='rounded bg-violet min-h-screen flex justify-center align-middle flex-col'>
      <div className='flex flex-col m-auto w-full relative pt-4' style={{ maxWidth: 464 }}>
        <h1 className="text-4xl uppercase text-white font-bold mb-2.5">Country Quiz</h1>
        

        <div className='bg-white rounded-3xl p-8'>

          {totalAnswers <= MAX_QUESTIONS ?

            <div className='content pt-10'>
              <img src={UndrawAdv} alt='' className='absolute right-0 top-0' />
              { // if question type === 0 show image
                questionType === 0 &&
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
                      {option.name.common}
                    </button>
                  </li>
                ))}
              </ul>

            </div>
            :
            <div className='result text-center'>
              <div className='flex justify-center mb-20'><img src={UndrawWinners} alt='' width={238} /></div>
              <h2 className='text-blue-900 font-bold text-5xl mb-1'>Results</h2>
              <p className='text-blue-900 text-lg'>You got <b className='text-green text-4xl'>{correctAnswers}</b> correct answers</p>
              <button onClick={handleReset} className='text-blue-900 border-2 border-blue-900 rounded-xl text-lg py-4 px-16 font-semibold mt-16'>Try again</button>
            </div>
          }

          <div className='flex'>
            {selectedOption !== null && totalAnswers <= MAX_QUESTIONS &&
              <button
                className='bg-yellow px-9 py-3.5 text-white rounded-xl ml-auto text-lg font-bold'
                onClick={() => getRandomOptions(initialData.current)}
              >Next</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
