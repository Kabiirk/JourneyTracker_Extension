import React from 'react';

const Login = () => {
  const handleClick = () => {
    chrome.tabs.create({ url: 'http://localhost:3000/login' });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-md rounded p-8 max-w-xs text-center'>
        <h1 className='text-2xl font-semibold mb-6'>User Journey</h1>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
          onClick={handleClick}
        >
          Login to Start Using
        </button>
      </div>
    </div>
  );
};

export default Login;
