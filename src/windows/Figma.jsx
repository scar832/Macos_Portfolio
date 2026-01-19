import React, { useState } from 'react';
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    MousePointer2, Frame, Square, PenTool, Type,
    Hand, MessageSquare, ChevronDown, Eye, Lock,
    Share2, Play, ZoomIn, ZoomOut, Layers, Component, Grid, Check
} from "lucide-react";

const Figma = () => {
    // State to handle interactivity
    const [activeProject, setActiveProject] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [showZoomMenu, setShowZoomMenu] = useState(false);
    const [notification, setNotification] = useState(null);

    const projects = [
        {
            title: "Simple Restaurant Website",
            category: "Web App",
            year: "2025",
            img: "/images/design4.png",
            layers: ["Login Section", "Homepage", "Food slider",]
        },
        {
            title: "VPN Mobile App",
            category: "Mobile App",
            year: "2024",
            img: "/images/design.png",
            layers: ["Connect", "Location",]
        },
        {
            title: "Fashion Brand Website",
            category: "Web App",
            year: "2023",
            img: "/images/design5.png",
            layers: ["Products Page", "Homepage", "Footer", "Single Item"]
        },
        {
            title: "Bic Store Mobile App",
            category: "Mobile App",
            year: "2023",
            img: "/images/design3.png",
            layers: ["Start Screen", "Product Screen", "Menu Component"]
        },
        {
            title: "VR Showcase Website",
            category: "Web App",
            year: "2024",
            img: "/images/design2.png",
            layers: ["Sidebar Nav", "Sales Chart", "Inventory Grid", "Footer"]
        }, {
            title: "Music Web & Mobile App",
            category: "Web App",
            year: "2025",
            img: "/images/design1.png",
            layers: ["Sidebar Nav", "Sales Chart", "Inventory Grid", "Footer"]
        },
        {
            title: "Spice Brand Website",
            category: "Web App",
            year: "2025",
            img: "/images/design6.png",
            layers: ["Sidebar Nav", "Sales Chart", "Inventory Grid", "Footer"]
        },
    ];

    // Share functionality
    const handleShare = (e) => {
        e.stopPropagation();
        const designUrl = `https://figma.com/design/${projects[activeProject].title.toLowerCase().replace(/\s+/g, '-')}`;
        navigator.clipboard.writeText(designUrl);
        showNotification("Design link copied to clipboard!");
    };

    // Play/Prototype functionality
    const handlePlay = (e) => {
        e.stopPropagation();
        showNotification("Prototype preview mode activated!");
    };

    // Zoom controls
    const handleZoomChange = (newZoom, e) => {
        e.stopPropagation();
        setZoom(newZoom);
        setShowZoomMenu(false);
        showNotification(`Zoom: ${newZoom}%`);
    };

    const toggleZoomMenu = (e) => {
        e.stopPropagation();
        setShowZoomMenu(!showZoomMenu);
    };

    // Notification helper
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 2000);
    };

    return (
        <div className="flex flex-col h-full select-none font-georama text-[14px] text-white">
            {/* Notification Toast */}
            {notification && (
                <div className="absolute top-4 right-4 z-50 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Check size={16} className="text-green-400" />
                    <span className="text-sm">{notification}</span>
                </div>
            )}

            {/* 1. TOP TOOLBAR */}
            <div id="window-header" className="!bg-[#2c2c2c] !border-b-0 px-4 flex items-center h-12 gap-6">
                <WindowControls target="figma" />

                <div className="flex items-center gap-4 ml-4">
                    <MousePointer2 size={18} className="text-blue-500" />
                    <Frame size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    <Square size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    <PenTool size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    <Type size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    <Hand size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    <MessageSquare size={18} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="bg-black/20 px-4 py-1 rounded text-[11px] font-medium border border-white/5">
                        {projects[activeProject].title}
                    </div>
                </div>

                <div className="flex items-center gap-4" style={{ pointerEvents: 'auto' }}>
                    <button
                        className="bg-blue-600 px-3 py-1 rounded text-[11px] font-bold hover:bg-blue-500 transition-colors"
                        onClick={handleShare}
                    >
                        Share
                    </button>

                    <Play
                        size={16}
                        className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                        onClick={handlePlay}
                    />

                    <div className="relative">
                        <div
                            className="flex items-center gap-1 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                            onClick={toggleZoomMenu}
                        >
                            <span className="text-[13px]">{zoom}%</span>
                            <ChevronDown size={12} />
                        </div>

                        {/* Zoom Dropdown Menu */}
                        {showZoomMenu && (
                            <div
                                className="absolute top-8 right-0 bg-[#2c2c2c] rounded-lg shadow-xl border border-white/10 py-2 min-w-[120px] z-50"
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                {[50, 75, 100, 125, 150, 200].map((zoomLevel) => (
                                    <div
                                        key={zoomLevel}
                                        className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-[11px] flex items-center justify-between ${zoom === zoomLevel ? 'text-blue-400' : 'text-white'
                                            }`}
                                        onClick={(e) => handleZoomChange(zoomLevel, e)}
                                    >
                                        <span>{zoomLevel}%</span>
                                        {zoom === zoomLevel && <Check size={12} />}
                                    </div>
                                ))}
                                <div className="border-t border-white/10 my-1" />
                                <div className="px-4 py-2 text-[10px] text-white/40 flex items-center gap-2">
                                    <ZoomIn size={12} />
                                    <span>Scroll to zoom</span>
                                </div>
                            </div>
                        )}
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
                                style={{ pointerEvents: 'auto' }}
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
                    <div className="relative animate-in fade-in zoom-in duration-500" style={{ transform: `scale(${zoom / 100})` }}>
                        <div className="absolute -top-8 left-0 text-[11px] opacity-40 flex gap-4 uppercase font-bold tracking-tighter">
                            <span>{projects[activeProject].category}</span>
                            <span>{projects[activeProject].year}</span>
                        </div>

                        {/* THE DESIGN IMAGE */}
                        <div className="bg-white rounded-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-w-[375px] border border-white/10">
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
                            <p className="text-[13px] opacity-70 leading-relaxed font-roboto">
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