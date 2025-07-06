import React from 'react'

const Footer = () => {
  return (
    <div className=" footer w-full bg-gray-800 text-black font-mono p-5">
      <div className="flex flex-row justify-start items-center gap-6">
        <div className='w-full border-2 rounded-lg p-4 flex justify-center items-center font-mono gap-6'>
        <div className="w-fit   p-5 flex items-start mr-10">
          <ol className='flex items-start flex-col gap-3 p-5 font-bold text-xl'>
            <li><a href="">LinkedIn</a></li>
            <li><a href="">Instagram</a></li>
            <li><a href="">Twitter</a></li>
            <li><a href="">Help</a></li>
          </ol>
        </div>
        
             <div className='w-fit h-fit p-4'>
                <h1 className='font-mono text-blue-900 italic p-4'>Paste.org</h1>
                <p>© 2025 All rights reserved.</p>
             </div>
        </div>
      </div>
    

    </div>
  );
};

export default Footer