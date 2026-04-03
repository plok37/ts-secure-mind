"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen({ loading }: { loading: boolean }) {
  const [show, setShow] = useState(loading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setShow(true);
      setProgress(0);
      interval = setInterval(() => {
        setProgress((p) => (p < 80 ? p + Math.random() * 10 : p));
      }, 100);
    } else {
      setProgress(100);
      setTimeout(() => setShow(false), 600); // allow animation out
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-end justify-center transition-transform duration-1300 ${
        show ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
      style={{ background: '#f7f7f7' }}
    >
      <div className="w-full h-full flex flex-col items-center justify-end pb-32">
        <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-a-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-gray-500 font-semibold">Loading...</span>
      </div>
    </div>
  );
}