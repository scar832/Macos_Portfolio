import React, { useState } from 'react';
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    MousePointer2, Frame, Square, PenTool, Type,
    Hand, MessageSquare, ChevronDown, Eye, Lock,
    Share2, Play, ZoomIn, Layers, Component, Grid
} from "lucide-react";

const Figma = () => {
    // State to handle interactivity
    const [activeProject, setActiveProject] = useState(0);
    const [zoom, setZoom] = useState(100);

    const projects = [
        {
            title: "FinTech App Redesign",
            category: "Mobile Design",
            year: "2024",
            img: "/images/design1.png",
            layers: ["Navigation Bar", "Transaction List", "Card Component", "User Profile"]
        },
        {
            title: "E-Commerce Dashboard",
            category: "Web App",
            year: "2023",
            img: "/images/design2.png",
            layers: ["Sidebar Nav", "Sales Chart", "Inventory Grid", "Footer"]
        }
    ];

    return (
        <div className="flex flex-col h-full select-none font-georama text-[13px] text-white">
            {/* 1. TOP TOOLBAR */}
            <div id="window-header" className="!bg-[#2c2c2c] !border-b-0 px-4 flex items-center h-12 gap-6">
                <WindowControls target="figma" />

                <div className="flex items-center gap-4 ml-4">
                    <MousePointer2 size={18} className="text-blue-500" />
                    <Frame size={18} className="opacity-60 hover:opacity-100" />
                    <Square size={18} className="opacity-60 hover:opacity-100" />
                    <PenTool size={18} className="opacity-60 hover:opacity-100" />
                    <Type size={18} className="opacity-60 hover:opacity-100" />
                    <Hand size={18} className="opacity-60 hover:opacity-100" />
                    <MessageSquare size={18} className="opacity-60 hover:opacity-100" />
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="bg-black/20 px-4 py-1 rounded text-[11px] font-medium border border-white/5">
                        {projects[activeProject].title}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-blue-600 px-3 py-1 rounded text-[11px] font-bold hover:bg-blue-500 transition-colors">Share</button>
                    <Play size={16} className="opacity-60" />
                    <div className="flex items-center gap-1 opacity-60">
                        <span className="text-[11px]">{zoom}%</span>
                        <ChevronDown size={12} />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-[#1e1e1e]">
                {/* 2. LEFT SIDEBAR (Layers & Assets) */}
                <div className="w-60 border-r border-white/5 flex flex-col bg-[#2c2c2c]/50 backdrop-blur-xl">
                    <div className="flex p-3 gap-4 border-b border-white/5">
                        <span className="font-bold border-b border-blue-500 pb-1">Layers</span>
                        <span className="opacity-40 hover:opacity-80 cursor-pointer">Assets</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="flex items-center gap-2 px-2 py-1.5 mb-2 hover:bg-white/5 rounded cursor-pointer">
                            <ChevronDown size={14} className="opacity-40" />
                            <Layers size={14} className="text-purple-400" />
                            <span className="font-bold uppercase text-[10px] tracking-widest opacity-40">Pages</span>
                        </div>

                        {projects.map((p, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveProject(i)}
                                className={`flex items-center gap-2 px-6 py-1.5 rounded cursor-pointer transition-colors ${activeProject === i ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 opacity-60'}`}
                            >
                                <Grid size={14} />
                                <span>{p.title}</span>
                            </div>
                        ))}

                        <div className="mt-6 px-2 opacity-40 uppercase text-[10px] font-bold tracking-widest mb-2">Artboard Layers</div>
                        {projects[activeProject].layers.map((layer, i) => (
                            <div key={i} className="flex items-center justify-between group px-4 py-1.5 hover:bg-white/5 rounded cursor-default">
                                <div className="flex items-center gap-2">
                                    <Component size={14} className="text-purple-400" />
                                    <span className="opacity-80">{layer}</span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye size={12} />
                                    <Lock size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. THE CANVAS (Showcase Area) */}
                <div className="flex-1 overflow-auto bg-[#1e1e1e] relative p-20 flex justify-center items-start custom-scrollbar">
                    {/* Artboard Shell */}
                    <div className="relative animate-in fade-in zoom-in duration-500">
                        <div className="absolute -top-8 left-0 text-[11px] opacity-40 flex gap-4 uppercase font-bold tracking-tighter">
                            <span>{projects[activeProject].category}</span>
                            <span>{projects[activeProject].year}</span>
                        </div>

                        {/* THE DESIGN IMAGE */}
                        <div className="bg-white rounded-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-w-[375px] min-h-[600px] border border-white/10">
                            <img
                                src={projects[activeProject].img}
                                alt="Work Showcase"
                                className="w-full h-auto"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"; }}
                            />
                        </div>
                    </div>
                </div>

                {/* 4. RIGHT SIDEBAR (Properties) */}
                <div className="w-64 border-l border-white/5 bg-[#2c2c2c]/50 backdrop-blur-xl flex flex-col">
                    <div className="flex p-3 gap-4 border-b border-white/5 justify-around">
                        <span className="font-bold border-b border-blue-500 pb-1">Design</span>
                        <span className="opacity-40">Prototype</span>
                        <span className="opacity-40">Inspect</span>
                    </div>

                    <div className="p-4 space-y-8">
                        {/* Layout Info */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase opacity-40">Layout Specs</h4>
                            <div className="grid grid-cols-2 gap-4 font-roboto text-[11px] opacity-80">
                                <div className="flex justify-between border-b border-white/5 pb-1"><span>W</span><span>1440</span></div>
                                <div className="flex justify-between border-b border-white/5 pb-1"><span>H</span><span>900</span></div>
                                <div className="flex justify-between border-b border-white/5 pb-1"><span>X</span><span>0</span></div>
                                <div className="flex justify-between border-b border-white/5 pb-1"><span>Y</span><span>0</span></div>
                            </div>
                        </div>

                        {/* Visual Quality Note */}
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h4 className="text-blue-400 font-bold mb-1">Senior Expertise</h4>
                            <p className="text-[10px] opacity-70 leading-relaxed font-roboto">
                                Developed with a focus on atomic design systems and scalable component architecture. Curation of 5+ years of digital product experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FigmaWindow = WindowWrapper(Figma, "figma");
export default FigmaWindow;