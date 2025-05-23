import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer/simplepeer.min.js";

export const SocketContext = createContext();
const socket = io("http://localhost:8080");

 const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // 1. Get local media
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((mediaStream) => setStream(mediaStream))
    .catch((err) => console.error("getUserMedia failed:", err));

    // 2. Register socket listeners once
    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("callaccepted", ({ signal, name }) => {
      setCall(prevCall => ({
        ...prevCall,
        name: name // Update the call object with the receiver's name
      }));
      setCallAccepted(true);
      if (connectionRef.current) {
        connectionRef.current.signal(signal);
      }
    });

    return () => {
      // cleanup listeners on unmount
      socket.off("me");
      socket.off("calluser");
      socket.off("callaccepted");
    };
  }, []);



useEffect(() => {
  if (stream && myVideo.current) {
    myVideo.current.srcObject = stream;
  }
}, [callAccepted,stream]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { 
        signal: data, 
        to: call.from,
        name: name // Make sure to send the local user's name
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log("Person to call is",id);
    
      if (!stream) {
    console.warn("⚠️ callUser() called but no local stream ready yet");
    return;
  }

    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default ContextProvider