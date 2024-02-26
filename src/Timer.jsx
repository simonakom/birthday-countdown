import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'; 
import { useWindowSize } from 'react-use'; 
import ReactCurvedText from 'react-curved-text';

function Video() {
  return (
    <div className="video">
    <iframe 
      width="960" 
      height="750" 
      src="https://www.youtube.com/embed/Jguqnlymeuk?si=W98ONFXeXBGXVLqp&autoplay=1" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
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

  const startTimer = () => {
    // Initiates the countdown timer when the user clicks the "Start Timer" button.
    if (!targetDate) {
      setShowError(true); // Show error message if no target date is selected
      return;
    }
    setShowError(false); // Hide error message if target date is selected
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);
  };

  return (
    <div className="p-5 mb-28 h-full flex flex-col items-center justify-center text-xl text-[#ebdddd] overflow-hidden">
      {showVideo ? (
      <>
      <Video />
      <Confetti width={width} height={height} /> 
    </>
      ) : (
        <>
      <ReactCurvedText
    width={970}
    height={180}
    cx={width > 768 ? 490 : (width > 520 ? 510 : 475)}
    cy={width > 768 ? 20 : (width > 520 ? 30 : 50)}
    rx={width > 768 ? 310 : (width > 520 ? 280 : 200)}
    ry={width > 768 ? 120 : (width > 520 ? 100 : 70)}
    startOffset={50}
    reversed={false}
    text="🎊  Happy Birthday Countdown !  🎉"
    textProps={{
        style: { 
          fontSize: width > 768 ? 42 : (width > 520 ? 35 : 25), 
            fill: '#c2afaff7' 
        }
    }}
    textPathProps={null}
    tspanProps={null}
    ellipseProps={null}
    svgProps={null}
/>
            <img
            className="2xl:w-[28%] responsive-img bg-[#6a515147] shadow-[#794d4df7] shadow-md rounded-3xl"
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc0b3dzNWJnMDl2c211Ymh1ejBwN2xqMXg2bnRpejA4ZnZpbmo1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Im6d35ebkCIiGzonjI/giphy.gif"
            alt="cake"
          />
          <label className="mx-10 text-2xl my-10 inputs-responsive">
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
          {showError && (
            <p className="mb-10 p-3 rounded-2xl text-red-400 bg-[#b67c7c47] text-xl">Please select a birth date to start the timer</p>
          )}

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
        </>
      )}
    </div>
  );
};

export default CountdownTimer;