import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants/index.js";
import {Check, Flag} from "lucide-react";
import {WindowControls} from "#components/index.js";

import React, { useState, useEffect } from 'react';

const Terminal = ({ isOpen }) => {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setVisibleLines(0);

            const startTimeout = setTimeout(() => {
                let currentLine = 0;
                const interval = setInterval(() => {
                    if (currentLine < techStack.length) {
                        setVisibleLines(prev => prev + 1);
                        currentLine++;
                    } else {
                        clearInterval(interval);
                    }
                }, 150);

                return () => clearInterval(interval);
            }, 500);

            return () => clearTimeout(startTimeout);
        } else {

            setVisibleLines(0);
        }
    }, [isOpen]);

    return (
        <div className="relative group">
            <div className="scanlines" />

            <div className="terminal-header">
                <WindowControls target="terminal" />
                <div className="flex-1 text-center text-[11px] font-medium text-white/40 tracking-wide uppercase">
                    zsh — 80x24
                </div>
            </div>

            <div className="terminal-body">
                {/* Left Side: Brand / ASCII */}
                <div className="flex flex-col items-center text-blue-400 opacity-80 select-none">
                    <pre className="text-[10px] leading-none mb-4 font-bold animate-pulse">
                        {`
   _  _ 
  ( \/ )
   \  / 
    \/  
   JOEL
                        `}
                    </pre>
                    <div className="flex gap-1.5 flex-wrap w-8 justify-center">
                        <div className="size-2 rounded-full bg-red-500/40" />
                        <div className="size-2 rounded-full bg-green-500/40" />
                        <div className="size-2 rounded-full bg-yellow-500/40" />
                        <div className="size-2 rounded-full bg-blue-500/40" />
                    </div>
                </div>

                {/* Right Side: Data */}
                <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="mb-4">
                        <span className="text-green-400 font-bold">joel@macbook-pro</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$ ./fetch_stack.sh</span>
                    </div>

                    <div className="space-y-1">
                        {techStack.slice(0, visibleLines).map(({ category, items }) => (
                            <div key={category} className="flex animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="text-blue-300 font-bold w-24 shrink-0">{category}:</span>
                                <span className="text-slate-300">{items.join(", ")}</span>
                            </div>
                        ))}
                    </div>

                    {/* Only show footnote when typing is finished */}
                    {visibleLines === techStack.length && (
                        <div className="pt-4 border-t border-white/10 mt-4 animate-in fade-in zoom-in duration-500">
                            <div className="footnote pb-3">
                                <p className="flex items-center gap-1.5 text-[12px] text-green-400">
                                    <Check size={16} /> {techStack.length} of {techStack.length} stacks loaded successfully
                                </p>
                                <p className="text-white/60 flex items-center gap-3 text-[12px] mt-1">
                                    <Flag size={14} fill="white" className="opacity-50" />
                                    Render time: 6ms
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-widest">
                                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                Process Complete — 100% Signal
                            </div>
                        </div>
                    )}

                    {visibleLines === techStack.length && (
                        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">
                                Environment Assets:
                            </p>
                            <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                {techStack.flatMap(stack => stack.items).map((item, index) => (
                                    <div key={index} className="group relative">
                                        {/* Icon Container */}
                                        <div className="size-9 flex-center bg-white/10 rounded-lg border border-white/10 hover:bg-white/20 hover:border-white/40 transition-all duration-300">

                                            <img
                                                src={`/icons/tech/${item.toLowerCase().replace(/[ (.,)]/g, '')}.png`}
                                                className="size-6 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                                                alt={item}
                                                onError={(e) => { e.target.src = "/icons/tech/default.svg"; }} // Fallback
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <span className="text-green-400 font-bold">joel@macbook-pro</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$ </span>
                        {visibleLines === techStack.length && (
                            <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse align-middle" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow;