import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { ChevronLeft, ChevronRight, PanelLeft, Plus, SearchIcon, Share, ShieldHalf, LayoutGrid } from "lucide-react";

const Safari = () => {
    const [url, setUrl] = useState("");

    const favorites = [
        { name: "GitHub", url: "https://github.com/scar832/", icon: "/icons/tech/github2.png" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "/icons/tech/linkedin.png" },
        { name: "Twitter", url: "https://twitter.com", icon: "/icons/tech/twitter.png" },
        { name: "Dribbble", url: "https://dribbble.com", icon: "/icons/tech/dribbble.png" },
        { name: "Gmail", url: "mailto:sedemboafo@gmail.com", icon: "/icons/tech/gmail.png" },
        { name: "npm", url: "https://dribbble.com", icon: "/icons/tech/npm.png" },
    ];

    return (
        <>
            <div id="window-header">
                <div className="flex items-center gap-4">
                    <WindowControls target="safari" />
                    <PanelLeft size={18} className="text-white hover:text-slate-800 cursor-pointer ml-4" />
                    <div className="flex items-center gap-4 mr-2">
                        <ChevronLeft size={20} className="text-slate-400 cursor-not-allowed" />
                        <ChevronRight size={20} className="text-slate-400 cursor-not-allowed" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="search select-text cursor-text bg-black/10 backdrop-blur-md border border-white/20 focus-within:bg-white/20 focus-within:border-white/40">
                        <SearchIcon className="size-4 text-white/50" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/40 select-text cursor-text"
                        />
                    </div>
                    <ShieldHalf size={20} className="text-green-600" />
                </div>

                <div className="flex items-center gap-4">
                    <Share size={18} className="text-white hover:text-slate-800 cursor-pointer" />
                    <Plus size={18} className="text-white hover:text-slate-800 cursor-pointer" />
                    <LayoutGrid size={18} className="text-white hover:text-slate-800 cursor-pointer" />
                </div>
            </div>

            <div className="safari-content">
                <div className="relative z-10 w-full max-w-2xl mt-5">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Favorites</h2>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-8 justify-items-center">
                        {favorites.map((fav) => (
                            <a href={fav.url} target="_blank" rel="noopener noreferrer">
                                <div key={fav.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="size-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white transition-all group-hover:scale-105 backdrop-blur-md">
                                        <img src={fav.icon} className="size-8 object-contain" alt={fav.name} />
                                    </div>
                                    <span className="text-xs font-medium text-white">{fav.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>


                    <div className="mt-20">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Privacy Report</h2>
                        <div className="w-full p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-4">
                            <div className="size-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <ShieldHalf className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">24 Trackers Prevented</p>
                                <p className="text-xs text-slate-500">In the last seven days, Safari prevented trackers from profiling you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;