import { useState, useEffect } from 'react';
import { db } from '../../firebase/initFirebase'
import { doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore"; 
import { useRouter } from 'next/router';

function TaskPage() {


    const[isAccepted, setIsAccepted] = useState(false);
    const[isGood, setIsGood] = useState(false);
    const[date, setDate] = useState(new Date());
    const[firstTime, setFirstTime] = useState(true);
    const[isCompleted, setIsCompleted] = useState(false);
    const[tasksCompleted, setTaskCompleted] = useState(0);
    const[currentStreak, setCurrentStreak] = useState(0);
    const[bestStreak, setBestStreak] = useState(0);
    const[totalTasks, setTotalTasks] = useState(0);
    const[taskName, setTaskName] = useState("");
    const[taskEmoji, setTaskEmoji] = useState("");
    const[userId, setUserId] = useState("");
    const router = useRouter();


    setInterval( function(){
        setDate(new Date());
    },
        1000)

    useEffect(() => {
            (async () => {
                const docRef = doc(db, "posiitrack", "tasksList");
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    console.log(docRef.id);
                  window.localStorage.setItem("taskName",docSnap.data().name);
                } else {
                  alert("No such document!");
                }
            })();
          
          }, []);

    useEffect(() =>{
            (async () => {
                const docRef = doc(db, "posiitrack", "tasksList");
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                  window.localStorage.setItem("taskEmoji", docSnap.data().emoji);
                } else {
                  alert("No such document!");
                }
            })();
          
          }, []
    );

    useEffect(() => {
        if(userId === null){
            console.log('jddkk');
            router.replace('/taskPage');
        }
   }, []
    );

    useEffect(() => {
        const val = window.localStorage.getItem('isAccepted');
        const done = window.localStorage.getItem('isCompleted');
        const taskcompleted = window.localStorage.getItem('tasksCompleted');
        const currentStreak = window.localStorage.getItem('currentStreak');
        const bestStreak = window.localStorage.getItem('bestStreak');
        const totalTasks = window.localStorage.getItem('totalTasks');
        const taskName = window.localStorage.getItem('taskName');
        const taskEmoji = window.localStorage.getItem('taskEmoji');
        const userId = window.localStorage.getItem('userId');
        const firstTime = window.localStorage.getItem('firstTime');
        const good = window.localStorage.getItem('isGood');
        if(val !== null) setIsAccepted(JSON.parse(val));
        if(good !== null) setIsGood(JSON.parse(good));
        if(done !== null) setIsCompleted(JSON.parse(done));
        if(taskcompleted !== null) setTaskCompleted(taskcompleted);
        if(currentStreak !== null) setCurrentStreak(currentStreak);
        if(bestStreak !== null) setBestStreak(bestStreak);
        if(totalTasks !== null) setTotalTasks(totalTasks);
        if(taskName !== null) setTaskName(taskName);
        if(taskEmoji !== null) setTaskEmoji(taskEmoji);
        if(userId !== null) setUserId(userId);
        if(firstTime !== null) setFirstTime(firstTime);
        if(userId === null){
            console.log('jddkk');
            router.replace('/taskPage');
        }
        }, [])

    useEffect(() => {
        window.localStorage.setItem('isAccepted', isAccepted);
    }, [isAccepted])

    useEffect(() => {
         window.localStorage.setItem('isGood', isGood);
    }, [isGood])

    useEffect(() => {
        window.localStorage.setItem('isCompleted', isCompleted);
    }, [isCompleted])

    useEffect(() => {
        window.localStorage.setItem('tasksCompleted', tasksCompleted);
    }, [tasksCompleted])

    useEffect(() => {
        window.localStorage.setItem('currentStreak', currentStreak);
    }, [currentStreak])

    useEffect(() => {
        window.localStorage.setItem('bestStreak', bestStreak);
    }, [bestStreak])

    useEffect(() => {
        window.localStorage.setItem('totalTasks', totalTasks);
    }, [totalTasks])

    useEffect(() => {
        window.localStorage.setItem('taskName', window.localStorage.getItem('taskName'));
    }, [taskName])

    useEffect(() => {
        window.localStorage.setItem('taskEmoji', window.localStorage.getItem('taskEmoji'));
    }, [taskEmoji])

    useEffect(() => {
        window.localStorage.setItem('userId', window.localStorage.getItem('userId'));
    }, [userId])

    useEffect(() => {
        window.localStorage.setItem('firstTime', firstTime);
    }, [firstTime])



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

{!isCompleted && (  <div className="grid place-items-center h-screen">
     <div className="shadow-lg w-1/2 h-1/2 bg-gray-50 
                    rounded-lg space-y-100">
        <div className="text-center p-10">
            <span className="text-4xl">Day </span>
            <span className="text-4xl text-green-700 space-x-1">{date.getDay() - (new Date()).getDay()}</span>
            </div>
            <div className='grid place-items-center p-20'>
                <div className="text-center">
                <span className="text-4xl">{taskEmoji}</span>
                <span className="text-4xl">{taskName}</span>
                </div>
            </div>

            <div className="flex space-x-50">
    
                {!isAccepted && (
 <div className="px-5 pt-3 pb-2">
 <button type="button"className="bg-green-200 hover:bg-green-300 text-green-700 font-bold py-2 px-4 rounded-full" onClick={() => { setIsAccepted(true);
  const ref = doc(db, "posiitrack/users/usersList/"+`${userId}`);
  updateDoc(ref, {
    totalTasks: totalTasks+1
  });
  setTotalTasks(totalTasks+1);
    }}>Accept Task</button>
 </div>
                )}

                {isAccepted && (
                  <div className="px-5 pt-3 pb-2">
                  <div className="flex items-center mb-4">
   <input id="default-checkbox" type="checkbox" value="" onClick={() => {setTimeout(() => {
    const ref = doc(db, "posiitrack/users/usersList/"+`${userId}`);
    updateDoc(ref, {
      currentStreak: currentStreak + 1,
      tasksCompleted: tasksCompleted + 1,
    });
    if(currentStreak + 1 > bestStreak){
        updateDoc(ref, {
            bestStreak: currentStreak+1
          });
        setBestStreak(currentStreak+1)
    }
    setIsCompleted(true); 
    setCurrentStreak(currentStreak + 1); 
    setTaskCompleted(tasksCompleted + 1); 
    }, 200)}} className="w-8 h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
   <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Time Remaining {24 - date.getHours()} hrs  {60 - date.getMinutes()} min   {60 - date.getSeconds()} sec  </label>
</div>
</div>
                )}
               
       
   
                <div className="pb-2 px-20 pt-3 pb-2"></div>
                <div className="pb-2 px-10 
                pt-3 pb-2"></div>
                <div className="pb-2 px-10 pt-3 pb-2">Contributed By ABC</div>
            </div>
    
             </div>
         </div>  
       )}
{isCompleted && (   <div className="grid place-items-center h-screen">
        <div className="shadow-lg h-3/4  w-2/5  bg-gray-50 
                       rounded-lg">
           <div className="text-center">
               <span className="text-4xl">Day </span>
               <span className="text-4xl text-green-700 space-x-1">{date.getDay() - (new Date()).getDay()}</span>
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
                   <span className="text-4xl text-green-700">{tasksCompleted}</span>
                   <span className="text-4xl text-green-700">{(tasksCompleted/totalTasks)*100}%</span>
                   <span className="text-4xl text-green-700">{currentStreak}</span>
                   <span className="text-4xl text-green-700">{bestStreak}</span>
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
                   <span className="text-2xl">Next task in {24 - date.getHours()} hrs and  {60 - date.getMinutes()} min </span>
                   </div>
               </div>
       
                </div>

            </div> )} 
    
      </div>
        
           ) 
    }
    





export default TaskPage;