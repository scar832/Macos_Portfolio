import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ChevronUp, Flashlight, Camera, Lock, Play, SkipBack, SkipForward, } from 'lucide-react';

const LockScreen = ({ onUnlock }) => {
    const screenRef = useRef(null);
    const [time, setTime] = useState(new Date());

    // Update clock every minute
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const el = screenRef.current;

        // GSAP Draggable for the "Swipe Up" logic
        const draggable = Draggable.create(el, {
            type: "y",
            bounds: { top: -window.innerHeight, left: 0, height: window.innerHeight * 2, width: window.innerWidth },
            onDrag: function () {
                // Dim the opacity as the user drags up
                const progress = Math.abs(this.y) / window.innerHeight;
                gsap.set(el, { opacity: 1 - progress });
            },
            onRelease: function () {
                // If dragged more than 200px, unlock. Otherwise, snap back.
                if (this.y < -200) {
                    gsap.to(el, {
                        y: -window.innerHeight,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power4.in",
                        onComplete: onUnlock
                    });
                } else {
                    gsap.to(el, { y: 0, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
                }
            }
        });

        return () => draggable[0].kill();
    }, [onUnlock]);

    return (
        <section
            ref={screenRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-16 select-none cursor-grab active:cursor-grabbing"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(60px) saturate(180%)", // The "Liquid Glass" core
            }}
        >
            {/* Top: Status & Clock */}
            <div className="flex flex-col items-center gap-2 mt-10">
                <div className="flex items-center gap-2 text-white/60 mb-2 opacity-50">
                    <Lock size={14} />
                    <span className="text-sm font-semibold uppercase tracking-widest">Encrypted Session</span>
                </div>
                <h1 className="text-8xl font-medium text-white/90 tracking-tighter drop-shadow-2xl">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </h1>
                <p className="text-xl text-white/80 font-medium">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Middle: Notifications / Centerpiece */}
            <div className="w-full max-w-md px-6 space-y-6">
                {/* 1. The Curly Signature */}
                <div className="text-center animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h2 className="font-['Dancing_Script'] text-5xl text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Joel's Portfolio
                    </h2>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="flex gap-3">
                        <div className="size-10 bg-blue-500 rounded-xl flex-center shadow-lg">
                            <span className="text-white font-bold text-xs">W</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold text-[16]">Welcome to my portfolio</span>
                                <span className="text-white/90 text-[12px]">Just now</span>
                            </div>
                            <p className="text-white/70 text-sm mt-1">System ready. All tech stacks have been deployed successfully. Explore...</p>
                        </div>
                    </div>
                </div>

            </div>



            {/* Bottom: Quick Actions & Swipe Bar */}
            <div className="w-full px-12 flex justify-between items-end">
                <button className="size-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex-center text-white hover:bg-white/20 transition-all">
                    <Flashlight size={20} />
                </button>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-1 animate-bounce opacity-50">
                        <ChevronUp size={20} className="text-white" />
                        <span className="text-[12px] text-white font-bold uppercase tracking-[0.2em]">Swipe Up To Open</span>
                    </div>
                    {/* Home Indicator */}
                    <div className="w-36 h-1.5 bg-white/30 rounded-full" />
                </div>

                <button className="size-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex-center text-white hover:bg-white/20 transition-all">
                    <Camera size={20} />
                </button>
            </div>
        </section>
    );
};

export default LockScreen;