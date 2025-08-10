'use client';

import React, { forwardRef } from "react";

interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const MacOSWindow = forwardRef<HTMLDivElement, MacOSWindowProps>(
  ({ title = "Untitled", children, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          w-full
          apple-glass apple-glass-hover
          ${className || ""}
        `}
      >
        {/* Window Header - Darker and more opaque */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-gray-800/80 to-gray-900/60 border-b border-white/15">
          <div className="flex space-x-3">
            <button className="group w-4 h-4 bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-red-400">
              <svg className="w-2.5 h-2.5 text-red-100 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="group w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-yellow-400">
              <svg className="w-2.5 h-2.5 text-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <button className="group w-4 h-4 bg-green-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-green-400">
              <svg className="w-2.5 h-2.5 text-green-100 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>
          <p className="text-apple text-base font-semibold tracking-wide">{title}</p>
          <div className="w-6" />
        </div>
        
        {/* Window Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    );
  }
);

MacOSWindow.displayName = "MacOSWindow";

export default MacOSWindow;
