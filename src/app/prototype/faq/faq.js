'use client'
import React from 'react';
import Searchbar from './Searchbar';
import Question from './Question';
import { questions } from './questions'; // Import questions from the file

function FAQ({ data }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(data || questions);
  const [activeQuestionId, setActiveQuestionId] = React.useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = (data || questions).filter((item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  const toggleQuestion = (id) => {
    setActiveQuestionId(activeQuestionId === id ? null : id);
  };

  return (
    <div className='container mx-auto p-8 text-center'>
      <h2 className="text-primary text-2xl font-semibold mb-8">How can we help you?</h2>
      <Searchbar onSearchChange={handleSearchChange} />
      <section className='faq mt-12'>
        {searchResults.map((item) => (
          <Question
            key={item.id}
            question={item.question}
            answer={item.answer}
            isActive={activeQuestionId === item.id}
            onToggle={() => toggleQuestion(item.id)}
          />
        ))}
      </section>
    </div>
  );
}

export default FAQ;
