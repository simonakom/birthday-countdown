import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'; 
import { useWindowSize } from 'react-use'; 

function Video() {
  return (
    <div className="video">
      <iframe
        width="960"
        height="750"
        src="https://www.youtube.com/embed/Hqa4q2WG6Dk?si=OAUm4sezoIMEZ1DS&autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

const CountdownTimer = () => {
  const { width, height } = useWindowSize(); // Get window size for confetti
  const [targetDate, setTargetDate] = useState(""); //Holds the value of the target date/time entered by the user.
  const [showError, setShowError] = useState(false); //Manages whether to display an error message for invalid input.
  const [showVideo, setShowVideo] = useState(false); //Manages whether to show the video after the countdown ends.
  const [timer, setTimer] = useState({ //Stores the remaining time, until the target date is reached.
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = React.useRef(); //Holds a reference to the setInterval function for updating the countdown timer.

  //calculateTimeRemaining: Computes the remaining time until the target date and updates the timer state accordingly. If the time difference becomes non-positive, it clears the interval and sets showVideo to true to display the video.
  const calculateTimeRemaining = () => { 
    const now = new Date().getTime();
    const difference = new Date(targetDate).getTime() - now;

    if (difference <= 0) {
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(intervalRef.current);
      setShowVideo(true); // Show video when countdown reaches 00:00:00
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimer({ days, hours, minutes, seconds });
    }
  };

  //useEffect: Starts the timer when targetDate changes, and cleans up the interval when the component unmounts.
  useEffect(() => {
    if (targetDate) {
      calculateTimeRemaining();
      intervalRef.current = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [targetDate]);


  const handleInputChange = (event) => { //Updates the targetDate state when the user enters a new date/time.
    setTargetDate(event.target.value);
  };

  const startTimer = () => { // Initiates the countdown timer when the user clicks the "Start Timer" button. If no target date is selected, it sets showError to true to display an error message.
    if (!targetDate) {
      setShowError(true);
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);
  };

  return (
    <div className="p-5 mt-20 mb-28 h-full flex flex-col items-center justify-center text-2xl text-[#ebdddd] overflow-hidden">
      {showVideo ? (
      <>
      <Video />
      <Confetti width={width} height={height} /> 
    </>
      ) : (
        <>
          <img
            className="2xl:w-[16%] xl:w-[18%] lg:w-[30%] md:w-[32%] w-[10%] responsive-img"
            src="../public/happy-birthday.png"
            alt="cake"
          />
          <label className="mx-10 text-2xl my-10 inputs-responsive">
            Birthday date:
            <input
              className="ml-8 p-4 rounded-xl cursor-pointer bg-[#6a515147] shadow-[#794d4df7] shadow-md"
              type="datetime-local"
              value={targetDate}
              onChange={handleInputChange}
            />
            <button
              className="mx-5 px-10 p-4 rounded-xl bg-[#6a515147] shadow-[#794d4df7] shadow-md hover:bg-[#b64646f7] hover:scale-110 transition-all duration-200"
              onClick={startTimer}>Start Timer
            </button>
          </label>

          <div className="flex gap-1 text-[#c2afaff7] inputs-responsive whitespace-nowrap">
            <div className="bg-[#18030347] px-3 py-8 rounded-3xl">
              {timer.days} days
            </div>
            <div className="bg-[#18030347] px-3 py-8 rounded-3xl">
              {timer.hours} hours
            </div>
            <div className="bg-[#18030347] px-3 py-8 rounded-3xl">
              {timer.minutes} minutes
            </div>
            <div className="bg-[#18030347] px-3 py-8 rounded-3xl">
              {timer.seconds} seconds
            </div>
          </div>
          {showError && (
            <p className="mt-10 p-3 rounded-2xl text-red-400 bg-[#b67c7c47] text-xl">Please select a date to start the timer</p>
          )}
        </>
      )}
    </div>
  );
};

export default CountdownTimer;