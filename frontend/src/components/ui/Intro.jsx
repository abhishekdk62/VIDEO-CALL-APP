// DebugIntro.jsx
import React from "react";
import SplitText from "../elements/SplitText";
import { Video } from "lucide-react";

export default function DebugIntro() {
  console.log("🔍 DebugIntro mounted with SplitText");
  return (
    <div className="h-screen w-full bg-green-500 flex items-center flex-col justify-center">
       <div className="flex mb-2 justify-center items-center gap-4">
             {/* <div className="flex justify-center mb-8">
          <Video className="h-24 w-24 mt- text-white animate-pulse" />
        </div> */}
      <SplitText
        text="VIBECALL"
        className="text-7xl text-white font-semibold"
        delay={50}
        animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        onLetterAnimationComplete={() =>
          console.log("✨ SplitText animation done")
        }
      />
       </div>
<div>
          <p className="text-xl text-white/90 font-light">Connecting hearts, one call at a time</p>

</div>
    </div>
  );
}
