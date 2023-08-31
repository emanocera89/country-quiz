import { useEffect, useState, useRef } from 'react'
import { Country } from './types'
import { AppContainer, QuizContent, QuizResult } from './components'

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
    <AppContainer>
      <h1 className="text-4xl uppercase text-white font-bold mb-2.5">Country Quiz</h1>
      <div className='bg-white rounded-3xl p-8'>
        {totalAnswers <= MAX_QUESTIONS ? (
          <QuizContent
            countries={countries}
            correctOption={correctOption}
            questionType={questionType}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectOption}
            getButtonBackgroundColor={getButtonBackgroundColor}
          />
        ) : (
          <QuizResult correctAnswers={correctAnswers} handleReset={handleReset} />
        )}
        <div className='flex'>
          {selectedOption !== null && totalAnswers <= MAX_QUESTIONS && (
            <button
              className='bg-yellow px-9 py-3.5 text-white rounded-xl ml-auto text-lg font-bold'
              onClick={() => getRandomOptions(initialData.current)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
