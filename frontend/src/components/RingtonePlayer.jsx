import ring from "../sound/ring.mp3";
import React, { useEffect, useRef } from "react";

const RingtonePlayer = ({ isRinging }) => {
  const audioRef = useRef(new Audio(ring));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isRinging) {
      console.log("Attempting to play ringtone..."); // Debug log
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Ringtone playing successfully");
          })
          .catch((error) => {
            console.error("Error playing ringtone:", error);
          });
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isRinging]);

  return null;
};

export default RingtonePlayer;
