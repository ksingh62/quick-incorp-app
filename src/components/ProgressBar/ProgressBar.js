import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-lg">
        <div
          className="h-2 bg-sky-400 rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-right text-gray-400 text-sm mt-1">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar;


//https://www.youtube.com/watch?v=MUpVNTGVIPE