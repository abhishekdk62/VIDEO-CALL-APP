import React, { useState, useEffect, useContext } from "react";
import {
  Video,
  Users,
  MessageCircle,
  Bell,
  Menu,
  X,
  User,
  Copy,
  Phone,
  PhoneOff,
  PhoneIncoming,
} from "lucide-react";
import { SocketContext } from "../socket/socketContext";
const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {!callAccepted && stream && (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white p-4 flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-lg">{name || "You"}</h3>
              </div>

              <div className="relative aspect-video bg-black/20 backdrop-blur-sm">
                {stream ? (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center">
                    <div className="text-center text-white/70">
                      <User className="h-16 w-16 mx-auto mb-4" />
                      <p>Camera Feed</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Your Camera</span>
                  <span className="bg-red-500 text-emerald-100 text-xs px-2 py-1 rounded-full border border-emerald-400/30">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two screen layout when on call */}
      {callAccepted && !callEnded && (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
          {/* Your Camera */}
          <div className="w-full md:w-1/2 max-w-lg">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white p-4 flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-lg">{name || "You"}</h3>
              </div>
              <div className="relative aspect-video bg-black/20 backdrop-blur-sm">
                {stream ? (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center">
                    <div className="text-center text-white/70">
                      <User className="h-16 w-16 mx-auto mb-4" />
                      <p>Camera Feed</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Your Camera</span>
                  <span className="bg-red-500 text-emerald-100 text-xs px-2 py-1 rounded-full border border-emerald-400/30">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remote Camera */}
          <div className="w-full md:w-1/2 max-w-lg">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white p-4 flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-lg">{call.name || "Caller"}</h3>
              </div>
              <div className="relative aspect-video bg-black/20 backdrop-blur-sm">
                <video
                  playsInline
                  muted
                  ref={userVideo}
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Remote Camera</span>
                  <span className="bg-blue-700 text-emerald-100 text-xs px-2 py-1 rounded-full border border-emerald-400/30">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
