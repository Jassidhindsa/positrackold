import { useState, useEffect } from "react";
import { db, storage, firebase } from "../../firebase/initFirebase";
import { doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import Link from "next/link";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "next-share";
import * as htmlToImage from "html-to-image";

function TaskPage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isGood, setIsGood] = useState(false);
  const [writeJournal, setWriteJournal] = useState(false);
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
  const [isConfetti, setIsConfetti] = useState(false);
  const [image, setImage] = useState("");
  const [highlight, setHighlight] = useState("");
  const [takeImage, setTakeImage] = useState(false);
  const [percent, setPercent] = useState(0);
  const [rendered, setRendered] = useState(false);
  const [day, setDay] = useState(0);
  const router = useRouter();

  setInterval(function () {
    setDate(new Date());
  }, 1000);

  useEffect(() => {
    (async () => {
      const docRef = doc(
        db,
        "posiitrack/users/usersList/" +
          `${window.localStorage.getItem("userId")}`
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        window.localStorage.setItem("isAccepted", docSnap.data().isAccepted);
        window.localStorage.setItem("isCompleted", docSnap.data().isCompleted);
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
      } else {
        alert("No such document!");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "posiitrack", "tasksList");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        window.localStorage.setItem("taskName", docSnap.data().name);
      } else {
        alert("No such document!");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "posiitrack", "tasksList");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        window.localStorage.setItem("taskEmoji", docSnap.data().emoji);
      } else {
        alert("No such document!");
      }
    })();
  }, []);

  useEffect(() => {
    if (userId === null) {
      console.log("jddkk");
      router.replace("/taskPage");
    }
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
    const date = window.localStorage.getItem("date");
    const journal = window.localStorage.getItem("journal");
    const isConfetti = window.localStorage.getItem("isConfetti");
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
    if (firstTime !== null) setFirstTime(firstTime);
    if (journal !== null) setJournal(journal);
    if (highlight !== null) setHighlight(highlight);
    if(day !== null) setDay(day);
    if (userId === null) {
      console.log("jddkk");
      router.replace("/taskPage");
    }
    if (isConfetti !== null) setIsConfetti(isConfetti);
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
    window.localStorage.setItem("firstTime", firstTime);
  }, [firstTime]);

  useEffect(() => {
    window.localStorage.setItem("journal", journal);
  }, [journal]);

  useEffect(() => {
    window.localStorage.setItem("isConfetti", isConfetti);
  }, [isConfetti]);

  useEffect(() => {
    window.localStorage.setItem("highlight", highlight);
  }, [highlight]);

  useEffect(() => {
    window.localStorage.setItem("day", day);
  }, [day]);

  function write() {
    const e = document.getElementById("a");
    if (e !== undefined) {
      setJournal(e.value);
      const ref = doc(db, "posiitrack/users/usersList/" + `${userId}`);
      updateDoc(ref, {
        journal: e.value,
      });
    }
  }

  function handleChange(e) {
    console.log(e.target.files[0]);
    try {
      const reference = `/images/${userId}/${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      const storageRef = ref(storage, reference);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setHighlight(url);
            const ref = doc(db, "posiitrack/users/usersList/" + `${userId}`);
            updateDoc(ref, {
              highlight: url,
            });
          });
        }
      );

      console.log("Fetched image copied.");
    } catch (err) {
      console.log("Reger");
      console.error(err.name, err.message);
    }
  }
  function doit() {
    const ref = doc(db, "posiitrack/users/usersList/" + `${userId}`);
    updateDoc(ref, {
      isAccepted: false,
      isCompleted: false,
      highlight: "",
      journal: "",
      day: parseInt(day) + 1,
    });
    setRendered(true);
    setIsAccepted(false);
    setIsCompleted(false);
    router.replace('/taskPage');
  }

  return (
    <div className="w-full block">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.2 rounded dark:bg-green-200">
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

      {!rendered &&
        new Date().getHours() - 23 === 0 &&
        new Date().getMinutes() - 59 === 0 &&
        new Date().getSeconds() - 59 == 0 &&
        doit()}

{!isCompleted && (
        <div className="grid place-items-center h-screen">
          <div
            className="shadow-lg xl:w-1/2 xxxs:h-4/2 xs:h-3/5 xs:w-3/6 sm:w-3/6 md:w-3/6 lg:w-3/6 xxs:w-5/6 bg-gray-50 
                    rounded-lg"
          >
    {/**goood */}
    <div className="text-center p-10">
              <span className="xl:text-4xl lg:text-4xl sm:text-4xl md:text-2xl xs:text-4xl xxs:text-4xl">Day </span>
              <span className="xl:text-4xl lg:text-4xl sm:text-4xl md:text-2xl xs:text-4xl  xxs:text-4xl text-green-700 space-x-1">
                {day}
              </span>
            </div>
            <div className="grid place-items-center 2xl:p-20 xl:p-20 lg:p-20 md:p-19 sm:p-10 xxs:p-10 xs:p-10">
              <div className="text-center">
                <span className="xl:text-4xl lg:text-4xl sm:text-2xl md:text-2xl xs:text-4xl  xxs:text-4xl">{taskEmoji}</span>
                <span className="xl:text-4xl lg:text-4xl sm:text-2xl md:text-2xl xs:text-4xl  xxs:text-4xl">{taskName}</span>
              </div>
            </div>

            <div className="flex xl:space-x-50 lg:space-x-25 md:space-x-15 sm:space-x-5">
              {!isAccepted && (
                <div className="xl:px-10 xl:pt-10 xl:pb-2 md:pb-5 sm:pt-10 sm:px-5 xs:pt-12 xs:pb-5 xs:px-5 xxs:px-5 xxs:pb-5 xxs:pt-12 xxxs:pt-15 xxxs:pb-5">
                  <button
                    type="button"
                    className="bg-green-200 hover:bg-green-300 xl:text-xl lg:text-lg sm:text-sm md:text-lg xxs:text-lg text-green-700 font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      setIsAccepted(true);
                      const ref = doc(
                        db,
                        "posiitrack/users/usersList/" + `${userId}`
                      );
                      updateDoc(ref, {
                        totalTasks: parseInt(totalTasks) + 1,
                        isAccepted: true,
                      });
                      setTotalTasks(parseInt(totalTasks) + 1);
                    }}
                  >
                    Accept Task
                  </button>
                </div>
              )}
              {isAccepted && (
                <div className="px-5 pt-3 pb-2">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      onClick={() => {
                        setTimeout(() => {
                          const ref = doc(
                            db,
                            "posiitrack/users/usersList/" + `${userId}`
                          );
                          updateDoc(ref, {
                            currentStreak: parseInt(currentStreak) + 1,
                            tasksCompleted: parseInt(tasksCompleted) + 1,
                            isCompleted: true,
                          });
                          if (currentStreak + 1 > bestStreak) {
                            updateDoc(ref, {
                              bestStreak: parseInt(currentStreak) + 1,
                            });
                            setBestStreak(parseInt(currentStreak) + 1);
                          }
                          setIsCompleted(true);
                          setCurrentStreak(parseInt(currentStreak) + 1);
                          setTaskCompleted(parseInt(tasksCompleted) + 1);
                          setIsConfetti(true);
                        }, 200);
                      }}
                      className="w-8 h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                    >
                      Time Remaining {24 - date.getHours()} hrs{" "}
                      {60 - date.getMinutes()} min {60 - date.getSeconds()} sec{" "}
                    </label>
                  </div>
                </div>
              )}
            </div>
    {/** good */}
          </div>
        </div>
      )}
      {isCompleted && (
        <div className="grid place-items-center h-screen resize ">
          <div
            id="content"
            className="shadow-lg h-16/10  xl:w-12/2 xxs:3/6 xs:  bg-gray-50 
                       rounded-lg resize"
          >
            {isConfetti && (
              <Confetti
                width={window.innerWidth || 300}
                height={window.innerHeight || 500}
              />
            )}
            <div className="text-center">
              <span className="text-4xl">Day </span>
              <span className="text-4xl text-green-700 space-x-1">
                {day}
              </span>
            </div>
            <div className="grid place-items-center p-4">
              <div className="text-center">
                <span className="text-lg">{taskEmoji}</span>
                <span className="text-lg">{taskName}</span>
              </div>
            </div>
            <div className="grid place-items-center p-4">
              <div className="text-center">
                <span className="text-4xl">STATISTICS</span>
              </div>
            </div>

            <div className="grid place-items-center p-4">
              <div className="text-center lg:space-x-38 space-x-20">
                <span className="xl:text-4xl xxs:text-2xl xs:text-lg text-2xl md:text-2xl lg:text-3xl  text-green-700">
                  {tasksCompleted}
                </span>
                <span className="xl:text-4xl xxs:text-2xl xs:text-lg text-2xl  md:text-2xl lg:text-3xl  text-green-700">
                  {(tasksCompleted / totalTasks) * 100}%
                </span>
                <span className="xl:text-4xl xxs:text-2xl xs:text-lg text-2xl  md:text-2xl lg:text-3xl text-green-700">{currentStreak}</span>
                <span className="xl:text-4xl xxs:text-2xl xs:text-lg text-2xl  md:text-2xl lg:text-3xl text-green-700">{bestStreak}</span>
              </div>
            </div>
            <div className="grid place-items-center p-2">
              <div className="text-center space-x-5">
                <span className="xl:text-sm xxs:text-xxs xxxs:text-xxxs">Tasks Completed</span>
                <span className="xl:text-sm xxs:text-xxs xxxs:text-xxxs">Completion Percentage</span>
                <span className="xl:text-sm xxs:text-xxs xxxs:text-xxxs">Current Streak</span>
                <span className="xl:text-sm xxs:text-xxs xxxs:text-xxxs">Best Streak</span>
              </div>
            </div>

            <div className="grid place-items-center p-5">
              <div className="text-center space-x-5">
                {highlight === "" && (
                  <div>
                    {" "}
                    {!takeImage && (
                      <button
                        type="button"
                        className="bg-white shadow-lg hover:bg-gray text-black font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                          setTakeImage(true);
                        }}
                      >
                        📸 Add Highlight
                      </button>
                    )}
                    {takeImage && (
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleChange}
                      />
                    )}{" "}
                  </div>
                )}
                {highlight !== "" && (
                  <div>
                    <a
                      target="_blank"
                      href={highlight}
                      rel="noreferrer"
                      className="bg-white shadow-lg hover:bg-gray text-black font-bold py-2 px-4 rounded-full"
                    >
                      📸 View Highlight
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="grid place-items-center p-5">
              <div className="text-center space-x-5">
                {!writeJournal && (
                  <button
                    type="button"
                    className="bg-white shadow-lg hover:bg-gray text-black font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      setWriteJournal(true);
                    }}
                  >
                    ✍️ Write Journal
                  </button>
                )}
                {writeJournal && (
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-stone-900 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    placeholder="Write Journal"
                    value={journal}
                    name="a"
                    id="a"
                    onChange={() => {
                      write();
                    }}
                  />
                )}
              </div>
            </div>

            <div className="grid place-items-center p-5">
              <div className="text-center space-x-5">
                {image !== "" && (
                  <div className="space-x-2">
                    <FacebookShareButton
                      url={image}
                      quote={"Positrack Share"}
                      hashtag={"#positrack"}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton url={image}>
                      <FacebookMessengerIcon size={32} round />
                    </FacebookMessengerShareButton>
                    <EmailShareButton subject={"Positrack"} url={image}>
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                    <TwitterShareButton url={image} title={"Positrack Share"}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={image}
                      summary={"totalTasksCompleted: " + `${tasksCompleted}`}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={image}
                      title={"Positrack Share"}
                      separator=":: "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <RedditShareButton url={image} title={"Positrack Share"}>
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </div>
                )}
                {image === "" && (
                  <button
                    type="button"
                    className="bg-green-200 hover:bg-green-300 text-green-700 font-bold py-4 px-8 rounded-full"
                    onClick={() => {
                      htmlToImage
                        .toPng(document.getElementById("content"))
                        .then(async (dataUrl) => {
                          var img = new Image();
                          img.src = dataUrl;
                          try {
                            console.log(dataUrl);
                            console.log(img);
                            const reference = `/images/${userId}/${Math.floor(
                              100000 + Math.random() * 900000
                            )}`;
                            const storageRef = ref(storage, reference);
                            uploadString(storageRef, dataUrl, "data_url").then(
                              (snapshot) => {
                                const gstorage = getStorage();
                                getDownloadURL(ref(gstorage, reference)).then(
                                  (url) => {
                                    console.log(url);
                                    setImage(url);
                                  }
                                );
                              }
                            );

                            console.log("Fetched image copied.");
                          } catch (err) {
                            console.log("Reger");
                            console.error(err.name, err.message);
                          }
                        });
                    }}
                  >
                    Share
                  </button>
                )}
              </div>
            </div>

            <div className="grid place-items-center p-5">
              <div className="text-center space-x-5">
                <span className="text-2xl">
                  Next task in {24 - date.getHours()} hrs and{" "}
                  {60 - date.getMinutes()} min{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
