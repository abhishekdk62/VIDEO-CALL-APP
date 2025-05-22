import React, { useContext, useEffect } from "react";
import { PhoneIncoming } from "lucide-react";
import { SocketContext } from "../socket/socketContext";
const Notification = () => {
  const { answerCall,call, callAccepted } = useContext(SocketContext)

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @keyframes slideFromTop {
        0% {
          opacity: 0;
          transform: translate(-50%, -100%);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
     
      .slide-top {
        position: fixed;
        top: 20px;
        left: 50%;
        z-index: 9999;
        animation: slideFromTop 0.4s ease-out forwards;
      }
    `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="slide-top">
          <div className=" bg-green-900 rounded-2xl border border-white/20 overflow-hidden max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white p-4 flex items-center gap-3">
              <PhoneIncoming className="h-5 w-5 animate-pulse" />
              <h3 className="font-medium text-lg">Incoming Call</h3>
            </div>
             
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-2 rounded-full backdrop-blur-sm">
                    <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold">
                        {call.name ? call.name.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {call.name || "Someone"} is calling...
                    </p>
                    <p className="text-sm text-white/70">Incoming video call</p>
                  </div>
                </div>
                 
                <button
                  onClick={answerCall}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                >
                  <PhoneIncoming className="h-4 w-4" />
                  <span>Answer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      

    </>
  );
};

export default Notification;
