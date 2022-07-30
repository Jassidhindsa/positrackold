

function taskcompletedPage() {
  

    return (
       <div><nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-green-200">
            <div className="container flex flex-wrap justify-between mx-auto">
                <span className="self-center text-3xl font-semibold whitespace-nowrap font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-neutral-900 to-green-700">PosiTrack</span>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <a href="#" className="text-xl block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
          <div className="grid place-items-center h-screen">
        <div className="shadow-lg h-3/4  w-2/5  bg-gray-50 
                       rounded-lg">
           <div className="text-center">
               <span className="text-4xl">Day </span>
               <span className="text-4xl text-green-700 space-x-1">75</span>
               </div>
               <div className='grid place-items-center p-4'>
                   <div className="text-center">
                   <span className="text-lg">🌲</span>
                   <span className="text-lg">Go for a walk without technology</span>
                   </div>
               </div>
               <div className='grid place-items-center p-4'>
                   <div className="text-center">
                   <span className="text-4xl">STATISTICS</span>
                   </div>
               </div>

               <div className='grid place-items-center p-4'>
                   <div className="text-center space-x-20">
                   <span className="text-4xl text-green-700">22</span>
                   <span className="text-4xl text-green-700">33%</span>
                   <span className="text-4xl text-green-700">34</span>
                   <span className="text-4xl text-green-700">55</span>
                   </div>
               </div>
               <div className='grid place-items-center p-2'>
                   <div className="text-center space-x-5">
                   <span className="text-sm">Tasks Completed</span>
                   <span className="text-sm">Completion Percentage</span>
                   <span className="text-sm">Current Streak</span>
                   <span className="text-sm">Best Streak</span>
                   </div>
               </div>

               <div className='grid place-items-center p-5'>
                   <div className="text-center space-x-5">
                   <button type="button" className="bg-white shadow-lg hover:bg-gray text-black font-bold py-2 px-4 rounded-full">📸 Add Highlight</button>
                   </div>
               </div>

               <div className='grid place-items-center p-5'>


                   <div className="text-center space-x-5">
                   <button type="button" className="bg-white shadow-lg hover:bg-gray text-black font-bold py-2 px-4 rounded-full">✍️ Write Journal</button>
                   </div>
               </div>

               <div className='grid place-items-center p-5'>
                   <div className="text-center space-x-5">
                   <button type="button" className="bg-green-200 hover:bg-green-300 text-green-700 font-bold py-4 px-8 rounded-full">Share</button>
                   </div>
               </div>

               <div className='grid place-items-center p-5'>
                   <div className="text-center space-x-5">
                   <span className="text-2xl">Next task in 3 hrs and 4 mins</span>
                   </div>
               </div>
       
                </div>

            </div> 
           </div> 
    )
   }
   
   export default taskcompletedPage;