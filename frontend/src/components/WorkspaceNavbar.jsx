import React from 'react';
import { Link } from 'react-router-dom';


const WorkspaceNavbar = () => {


  return (
    <div className='h-16 flex items-center justify-between px-4 text-white border-b border-gray-800 bg-[#0f111a]'>
      <div className="flex items-center space-x-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SaaSFlow</span>
          </h1>
        </Link>
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded">
          <span className="text-sm font-semibold">Project Name</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <button className="text-gray-400 hover:text-white" title="History">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <button className="text-gray-400 hover:text-white" title="Branch">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4v2a4 4 0 014 4v10m-9-10v10m-3-4a4 4 0 014-4h14" />
          </svg>
        </button>

        <button className='text-white px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600'>Invite</button>
        <button className='text-white px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-400 to-pink-500'>Publish</button>
      </div>
    </div>
  );
};

export default WorkspaceNavbar;
