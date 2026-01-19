import React, { useState } from 'react';
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    Files, Search, GitBranch, Play, LayoutGrid, Settings,
    FileText, ChevronDown, ChevronRight, FolderOpen,
    CheckCheck, Info, Bell, Terminal, GitFork,
} from "lucide-react";

const Vscode = () => {
    const [expanded, setExpanded] = useState({
        public: true,
        src: true,
        components: false,
        constants: false,
        hoc: false,
        store: false,
        windows: false
    });

    const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    return (
        <>
            {/* Header / Title Bar */}
            <div id="window-header" className="bg-transparent! border-b-0!">
                <WindowControls target="vscode" />
                <div className="flex-1 flex justify-center">
                    <div className="bg-black/20 px-10 py-1 rounded-md text-[11px] text-white/40 border border-white/5">
                        README.md — MacOs Portfolio
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* ACTIVITY BAR */}
                <div className="activity-bar w-12 flex flex-col items-center py-4 gap-5 bg-black/20 border-r border-white/5">
                    <Files size={20} className="text-white border-l-2 border-white pl-1" />
                    <Terminal className="text-white/30 hover:text-white cursor-pointer" />
                    <LayoutGrid size={20} className="text-white/30 hover:text-white cursor-pointer" />
                    <Search size={20} className="text-white/30" />
                    <GitFork size={20} className="text-white/30"/>
                    <Play size={20} className="text-white/30" />
                    {/* Gemini AI Icon */}
                    <div className="relative group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-400 group-hover:text-blue-300 transition-colors">
                            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="mt-auto"><Settings size={20} className="text-white/30" /></div>
                </div>

                {/* SIDEBAR: PROJECT EXPLORER */}
                <div className="sidebar w-60 bg-black/10 border-r border-white/5 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-center px-4 py-2 uppercase text-[9px] font-bold tracking-widest text-white/40">
                        Explorer
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white/5 text-white/90 text-[11px] font-bold">
                        <ChevronDown size={14} />
                        <span>MacOs Portfolio</span>
                    </div>
                    <Folder name="public" isOpen={expanded.public} onToggle={() => toggle('public')}>
                        <File name="files" isFolder />
                        <File name="icons" isFolder />
                        <File name="images" isFolder />
                        <File name="macbook.png" isImage />
                        <File name="vite.svg" isSvg />
                    </Folder>

                    <Folder name="src" isOpen={expanded.src} onToggle={() => toggle('src')}>
                        <Folder name="components" isOpen={expanded.components} onToggle={() => toggle('components')} nested>
                            <File name="Dock.jsx" />
                            <File name="index.js" />
                            <File name="LockScreen.jsx" />
                            <File name="Navbar.jsx" />
                            <File name="Text.txt" />
                            <File name="Welcome.jsx" />
                            <File name="WindowControls.jsx" />
                        </Folder>
                        <Folder name="constants" isOpen={expanded.constants} onToggle={() => toggle('constants')} nested>
                            <File name="index.js" />
                        </Folder>
                        <Folder name="hoc" isOpen={expanded.hoc} onToggle={() => toggle('hoc')} nested>
                            <File name="WindowWrapper.jsx" />
                        </Folder>
                        <Folder name="store" isOpen={expanded.store} onToggle={() => toggle('store')} nested>
                            <File name="window.js" />
                        </Folder>
                        <Folder name="windows" isOpen={expanded.windows} onToggle={() => toggle('windows')} nested>
                            <File name="Figma.jsx" />
                            <File name="index.js" />
                            <File name="Removed.txt" />
                            <File name="Resume.jsx" />
                            <File name="Safari.jsx" />
                            <File name="Terminal.jsx" />
                            <File name="Vscode.jsx" />
                        </Folder>
                        <File name="App.jsx" />
                        <File name="index.css" />
                        <File name="main.jsx" />
                        <File name="README.md" active />
                    </Folder>

                    <File name=".gitignore" className="opacity-50" />
                </div>

                {/* 3. Editor (Markdown View) */}
                <div className="editor">
                    <div className="tabs">
                        <div className="tab">
                            <FileText size={14} className="text-orange-400" />
                            README.md
                        </div>
                    </div>

                    <div className="readme-content scrollbar-hide">
                        <div className="mb-6 flex flex-wrap">
                            <span className="badge">React 19</span>
                            <span className="badge">GSAP</span>
                            <span className="badge">Tailwind v4</span>
                            <span className="badge">Liquid Glass UI</span>
                        </div>

                        <h1 className="flex gap-3">
                            MacOs Portfolio
                            <span className="text-sm h-[23px] mt-3 font-mono font-normal bg-green-500/20 text-green-400 px-2 py-1 rounded">v1.0.4</span>
                        </h1>
                        <p className="text-sm">A premium OS-style portfolio illustration built with a "Liquid Glass" design system. This project simulates a high-end macOS-inspired environment in the browser.</p>

                        <h2 className="text-blue-400 flex items-center gap-2">
                            <Info size={18} /> Overview
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                                <h4 className="text-white font-bold mb-2 text-sm">Frontend Architecture</h4>
                                <p className="text-sm opacity-60">High-performance React components with GSAP orchestration.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                                <h4 className="text-white font-bold mb-2 text-sm">System Design</h4>
                                <p className="text-sm opacity-60">Optimized data stores and cross-platform mobile logic.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-colors">
                                <h4 className="text-white font-bold mb-2 text-sm">Design Sense</h4>
                                <p className="text-sm opacity-60">Custom Tailwind v4 backdrop-filters and saturation layers for authentic glassmorphism[To mimic a liquid glass UI system.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors">
                                <h4 className="text-white font-bold mb-2 text-sm">Window Logic (HOC)</h4>
                                <p className="text-sm opacity-60">A robust Higher-Order Component system managing window focus, z-index, and GSAP Draggable constraints.</p>
                            </div>

                        </div>

                        <h2>🚀 Features</h2>
                        <ul className="list-disc ml-5 space-y-2 text-sm opacity-80">
                            <li><strong>Draggable Windows:</strong> Full GSAP implementation for window physics.</li>
                            <li><strong>Terminal Simulator:</strong> Custom typewriter engine with system fetch scripts.</li>
                            <li><strong>Interactive Safari:</strong> Bento-style discovery and favorites.</li>
                            <li><strong>Glassmorphism:</strong> Heavy backdrop filters with saturation optimization.</li>
                        </ul>

                        <h2>🛠 Tech Stack</h2>
                        <p className="text-sm">Built with <code>React</code>, styled with <code>TailwindCSS</code>, and powered by <code>GSAP</code> for silky-smooth animations.</p>

                        <h2 className="text-lg font-bold text-blue-400 mt-10 mb-4 font-roboto">Development</h2>
                        <div className="p-4 bg-black/40 font-roboto rounded-lg border border-white/5 text-green-400">
                            <p className="opacity-50 text-xs mb-1"># Clone the repository</p>
                            <p className="mb-4 text-xs">git clone https://github.com/scar832/Macos_Portfolio.git</p>
                            <p className="opacity-50 text-xs mb-1"># Install dependencies</p>
                            <p className="mb-4 text-xs">npm install</p>
                            <p className="opacity-50 text-xs mb-1"># Launch dev server</p>
                            <p className="text-xs">npm run dev</p>
                        </div>

                        <h2>📬 Contact</h2>
                        <p>Feel free to reach out via the <strong>Messages</strong> app or find me on <strong>LinkedIn</strong>.</p>
                    </div>
                </div>

            </div>
            <div className="h-6 border-t border-white/5 flex items-center justify-between px-3 text-[10px] text-white">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
                        <GitBranch size={12} />
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1 hover:bg-white/10 px-1">
                        <Info size={12} />
                        <span>0 Errors</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span>Spaces: 4</span>
                    <span>UTF-8</span>
                    <div className="flex items-center gap-1">
                        <CheckCheck size={12} />
                        <span>Prettier</span>
                    </div>
                    <Bell size={12} />
                </div>
            </div>
        </>
    );
};

// --- HELPER COMPONENTS ---

const Folder = ({ name, children, isOpen, onToggle, nested = false }) => (
    <div className={`${nested ? 'ml-3' : ''}`}>
        <div onClick={onToggle} className="flex items-center gap-1 px-3 py-1 hover:bg-white/5 cursor-pointer text-[14px] text-white">
            {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            <FolderOpen size={12} className="text-blue-400" />
            <span>{name}</span>
        </div>
        {isOpen && <div>{children}</div>}
    </div>
);

const File = ({ name, active = false, isFolder = false, isImage = false, isSvg = false, className = "" }) => (
    <div className={`flex items-center gap-2 px-7 py-0.5 text-[13px] cursor-pointer hover:bg-white/5 ${active ? 'bg-blue-500/20 text-white' : 'text-white/60'} ${className}`}>
        {isFolder ? <FolderOpen size={12} className="text-slate-400" /> : <FileText size={12} className={active ? "text-orange-400" : "text-blue-300"} />}
        <span className="truncate">{name}</span>
    </div>
);

const VscodeWindow = WindowWrapper(Vscode, "vscode");
export default VscodeWindow;