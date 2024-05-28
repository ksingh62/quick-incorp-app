import React from 'react';

const Question = ({ question, answer, isActive, onToggle }) => {
  return (
    <div className="question-wrapper w-2/3 border-b border-details mx-auto p-4 transition-all duration-1000">
      <div className='question flex justify-between cursor-pointer' onClick={onToggle}>
        <h3 className="text-primary text-base font-medium">{question}</h3>
        <svg className={`w-4 h-6 fill-secondary transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} viewBox="0 0 320 512" title="angle-down">
          <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
        </svg>
      </div>
      <div className={`${isActive ? 'answer active block pt-6 font-light text-sm leading-6 text-secondary animate-slidein' : 'answer hidden'}`}>{answer}</div>
    </div>
  );
};

export default Question;
