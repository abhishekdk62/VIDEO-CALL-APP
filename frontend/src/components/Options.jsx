import React, { useState, useContext } from "react";
import { Copy, Phone, PhoneOff, User } from "lucide-react";
import { SocketContext } from "../socket/socketContext";
import { CopyToClipBoard } from "react-copy-to-clipboard";

const Options = ({ children }) => {
  const { me, callAccepted, name, setName,stream, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    console.log("my socket id is", me);
    navigator.clipboard.writeText(me);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6 flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium transition transform hover:scale-105 ${
                copied
                  ? "bg-emerald-400/20 text-emerald-100 border border-emerald-400/30"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              <Copy className="h-5 w-5" />
              <span>{copied ? "Copied!" : "Copy Your ID"}</span>
            </button>
          </div>
        </div>
        <div className="flex-1 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6 flex flex-col gap-4">
            <input
              type="text"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              placeholder="Enter friend's ID to call"
              className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            />
            {callAccepted && !callEnded ? (
              <button
                onClick={leaveCall}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-red-600 hover:bg-red-500 text-red-100 border border-white rounded-xl font-medium transition transform hover:scale-105"
              >
                <PhoneOff className="h-5 w-5" />
                <span>Hang Up</span>
              </button>
            ) : (
              <button
                onClick={() => callUser(idToCall)}
                disabled={!idToCall || !stream}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl font-medium transition transform disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                <span>Call</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
