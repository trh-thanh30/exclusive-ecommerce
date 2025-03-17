import React, { useEffect, useState } from "react";

export default function TimeSell() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 23,
    seconds: 56,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="items-center hidden gap-2 md:flex md:gap-4">
      <p className="flex flex-col gap-1">
        <span className="text-xs text-primary-900">Hours</span>
        <span className="text-xs font-semibold md:text-2xl">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
      </p>
      <span className="text-xs font-medium md:text-3xl text-primary-500">:</span>
      <p className="flex flex-col gap-1">
        <span className="text-xs text-primary-900">Minutes</span>
        <span className="text-xs font-semibold md:text-2xl">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
      </p>
      <span className="text-xs font-medium md:text-3xl text-primary-500">:</span>
      <p className="flex flex-col gap-1">
        <span className="text-xs text-primary-900">Seconds</span>
        <span className="text-xs font-semibold md:text-2xl">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
}
