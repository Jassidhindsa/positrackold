import { useState, useEffect } from "react";
import { db } from "../../firebase/initFirebase";
import {
  doc,
  getDoc,
  setDoc,
  setCollection,
  collection,
  updateDoc,
} from "firebase/firestore";
import Router, { useRouter } from "next/router";
import Link from "next/link";

function TaskHomePage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isGood, setIsGood] = useState(false);
  const [date, setDate] = useState(new Date());
  const [firstTime, setFirstTime] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tasksCompleted, setTaskCompleted] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskEmoji, setTaskEmoji] = useState("");
  const [userId, setUserId] = useState("");
  const [journal, setJournal] = useState("");
  const [highlight, setHighlight] = useState("");
  const [day, setDay] = useState(0);
  const [isRender, setIsRender] = useState(false);
  const router = useRouter();

  setInterval(function () {
    setDate(new Date());
  }, 1000);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "posiitrack", "tasksList");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docRef.id);
        window.localStorage.setItem("taskName", docSnap.data().name);
        window.localStorage.setItem("taskEmoji", docSnap.data().emoji);
      } else {
        alert("No such document!");
      }
    })();
  }, []);



  useEffect(() => {
    (async () => {
      if (window.localStorage.getItem("userId") === null) {
        console.log(firstTime);
        let newId = Math.floor(100000 + Math.random() * 900000);
        console.log(newId);
        await setDoc(doc(db, "posiitrack/users/usersList/" + `${newId}`), {
          day: 1,
          tasksCompleted: 0,
          totalTasks: 0,
          currentStreak: 0,
          bestStreak: 0,
          userId: newId,
          isAccepted: JSON.parse(false),
          isCompleted: JSON.parse(false),
          journal: "",
          highlight: "",
        });

        window.localStorage.setItem("userId", newId);
        setFirstTime(false);
        window.localStorage.setItem("firstTime", false);
        console.log(firstTime);
        const docRef = doc(db, "posiitrack/users/usersList/" + `${newId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          window.localStorage.setItem("userId", docSnap.data().userId);
          window.localStorage.setItem("isAccepted", docSnap.data().isAccepted);
          window.localStorage.setItem(
            "isCompleted",
            docSnap.data().isCompleted
          );
          window.localStorage.setItem(
            "tasksCompleted",
            docSnap.data().tasksCompleted
          );
          window.localStorage.setItem(
            "currentStreak",
            docSnap.data().currentStreak
          );
          window.localStorage.setItem("bestStreak", docSnap.data().bestStreak);
          window.localStorage.setItem("totalTasks", docSnap.data().totalTasks);
          window.localStorage.setItem("journal", docSnap.data().journal);
          window.localStorage.setItem("highlight", docSnap.data().highlight);
          window.localStorage.setItem("day", docSnap.data().day);
        } else {
          alert("Ready For Today's task!");
        }
      } else {
        const docRef = doc(
          db,
          "posiitrack/users/usersList/" +
            `${window.localStorage.getItem("userId")}`
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          window.localStorage.setItem("userId", docSnap.data().userId);
          window.localStorage.setItem("isAccepted", docSnap.data().isAccepted);

          window.localStorage.setItem(
            "isCompleted",
            docSnap.data().isCompleted
          );
          window.localStorage.setItem(
            "tasksCompleted",
            docSnap.data().tasksCompleted
          );
          window.localStorage.setItem(
            "currentStreak",
            docSnap.data().currentStreak
          );
          window.localStorage.setItem("bestStreak", docSnap.data().bestStreak);
          window.localStorage.setItem("totalTasks", docSnap.data().totalTasks);
          window.localStorage.setItem("journal", docSnap.data().journal);
          window.localStorage.setItem("highlight", docSnap.data().highlight);
          window.localStorage.setItem("day", docSnap.data().day);
        } else {
          alert("Ready For Today's task!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const val = window.localStorage.getItem("isAccepted");
    const done = window.localStorage.getItem("isCompleted");
    const taskcompleted = window.localStorage.getItem("tasksCompleted");
    const currentStreak = window.localStorage.getItem("currentStreak");
    const bestStreak = window.localStorage.getItem("bestStreak");
    const totalTasks = window.localStorage.getItem("totalTasks");
    const taskName = window.localStorage.getItem("taskName");
    const taskEmoji = window.localStorage.getItem("taskEmoji");
    const userId = window.localStorage.getItem("userId");
    const firstTime = window.localStorage.getItem("firstTime");
    const good = window.localStorage.getItem("isGood");
    const journal = window.localStorage.getItem("journal");
    const highlight = window.localStorage.getItem("highlight");
    const day = window.localStorage.getItem("day");
    if (val !== null) setIsAccepted(JSON.parse(val));
    if (good !== null) setIsGood(JSON.parse(good));
    if (done !== null) setIsCompleted(JSON.parse(done));
    if (taskcompleted !== null) setTaskCompleted(JSON.parse(taskcompleted));
    if (currentStreak !== null) setCurrentStreak(currentStreak);
    if (bestStreak !== null) setBestStreak(bestStreak);
    if (totalTasks !== null) setTotalTasks(totalTasks);
    if (taskName !== null) setTaskName(taskName);
    if (taskEmoji !== null) setTaskEmoji(taskEmoji);
    if (userId !== null) setUserId(userId);
    if (firstTime !== null) setFirstTime(JSON.parse(firstTime));
    if (journal !== null) setJournal(journal);
    if(highlight !== null) setHighlight(highlight);
    if(day !== null) setDay(day);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isAccepted", isAccepted);
  }, [isAccepted]);

  useEffect(() => {
    window.localStorage.setItem("isGood", isGood);
  }, [isGood]);

  useEffect(() => {
    window.localStorage.setItem("isCompleted", isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    window.localStorage.setItem("tasksCompleted", tasksCompleted);
  }, [tasksCompleted]);

  useEffect(() => {
    window.localStorage.setItem("currentStreak", currentStreak);
  }, [currentStreak]);

  useEffect(() => {
    window.localStorage.setItem("bestStreak", bestStreak);
  }, [bestStreak]);

  useEffect(() => {
    window.localStorage.setItem("totalTasks", totalTasks);
  }, [totalTasks]);

  useEffect(() => {
    window.localStorage.setItem(
      "taskName",
      window.localStorage.getItem("taskName")
    );
  }, [taskName]);

  useEffect(() => {
    window.localStorage.setItem(
      "taskEmoji",
      window.localStorage.getItem("taskEmoji")
    );
  }, [taskEmoji]);

  useEffect(() => {
    window.localStorage.setItem(
      "userId",
      window.localStorage.getItem("userId")
    );
  }, [userId]);

  useEffect(() => {
    window.localStorage.setItem(
      "firstTime",
      window.localStorage.getItem("firstTime")
    );
  }, [firstTime]);

  useEffect(() => {
    window.localStorage.setItem("journal", journal);
  }, [journal]);

  useEffect(() => {
    window.localStorage.setItem("highlight", highlight);
  }, [highlight]);

  useEffect(() => {
    window.localStorage.setItem("day", day);
  }, [day]);

  function doit(){
    (async () => {
        const docRef = doc(db, "posiitrack/tasksList");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          window.localStorage.setItem("taskName", docSnap.data().name);
          window.localStorage.setItem("taskEmoji", docSnap.data().emoji);
          setIsRender(true);
        } else {
          alert("No such document!");
        }
      })();
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-green-200">
        <div className="container flex flex-wrap justify-between mx-auto">
          <span className="self-center text-3xl font-semibold whitespace-nowrap font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-neutral-900 to-green-700">
            PosiTrack
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#"
                  className="text-xl block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {taskName}
      {!isRender &&
        new Date().getHours() - 23 === 0 &&
        new Date().getMinutes() - 59 === 0 &&
        new Date().getSeconds() - 59 == 0 &&
        doit()}
      {!isGood && (
        <div className="grid place-items-center h-screen">
          <button
            onClick={() => {
              Router.replace("/taskPage/task");
            }}
          >
            Click Here
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskHomePage;
