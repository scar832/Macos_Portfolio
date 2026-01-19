import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { ChevronLeft, ChevronRight, PanelLeft, Plus, SearchIcon, Share, ShieldHalf, LayoutGrid, X, Home, User, Clock, ArrowLeft } from "lucide-react";

const Safari = () => {
    const [url, setUrl] = useState("");
    const [showTooltip, setShowTooltip] = useState(null);
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [activeTab, setActiveTab] = useState("home"); // "home" or "about"

    const favorites = [
        { name: "GitHub", url: "https://github.com/scar832/", icon: "/icons/tech/github.png" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "/icons/tech/linkedin.png" },
        { name: "Twitter", url: "https://twitter.com", icon: "/icons/tech/twitter.png" },
        { name: "Dribbble", url: "https://dribbble.com", icon: "/icons/tech/dribbble.png" },
        { name: "Gmail", url: "mailto:sedemboafo@gmail.com", icon: "/icons/tech/gmail.png" },
        { name: "npm", url: "https://npmjs.com", icon: "/icons/tech/npm.png" },
    ];

    const recentTabs = [
        { id: "home", title: "Favorites & Privacy", icon: "Home", timestamp: "Active" },
        { id: "about", title: "About Boafo Joel", icon: "User", timestamp: "Recently Viewed" },
    ];

    // Handle search on Enter key
    const handleSearch = (e) => {
        if (e.key === "Enter" && url.trim()) {
            const searchUrl = url.startsWith("http")
                ? url
                : `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            window.open(searchUrl, "_blank");
            setUrl("");
        }
    };

    // Share functionality
    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: "My Portfolio",
                text: "Check out my portfolio!",
                url: window.location.href,
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                setShowTooltip("share");
                setTimeout(() => setShowTooltip(null), 2000);
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShowTooltip("share");
            setTimeout(() => setShowTooltip(null), 2000);
        }
    };

    // New tab functionality
    const handleNewTab = (e) => {
        e.stopPropagation();
        window.open(window.location.href, "_blank");
        setShowTooltip("newtab");
        setTimeout(() => setShowTooltip(null), 2000);
    };

    // Show all tabs functionality
    const handleShowTabs = (e) => {
        e.stopPropagation();
        setShowTooltip("tabs");
        setTimeout(() => setShowTooltip(null), 2000);
    };

    // Toggle side panel
    const toggleSidePanel = (e) => {
        e.stopPropagation();
        setShowSidePanel(!showSidePanel);
    };

    // Switch tab
    const switchTab = (tabId) => {
        setActiveTab(tabId);
        setShowSidePanel(false);
    };

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case "Home": return <Home size={16} />;
            case "User": return <User size={16} />;
            default: return <Home size={16} />;
        }
    };

    return (
        <>
            <div id="window-header">
                <div className="flex items-center gap-4">
                    <WindowControls target="safari" />
                    <PanelLeft
                        size={18}
                        className={`cursor-pointer ml-4 transition-colors ${showSidePanel ? 'text-blue-500' : 'text-white hover:text-slate-800'
                            }`}
                        onClick={toggleSidePanel}
                    />
                    <div className="flex items-center gap-4 mr-2">
                        {activeTab !== "home" && (
                            <ArrowLeft
                                size={20}
                                className="text-white hover:text-slate-800 cursor-pointer transition-colors"
                                onClick={() => setActiveTab("home")}
                                style={{ pointerEvents: 'auto' }}
                            />
                        )}
                        <ChevronLeft size={20} className="text-slate-400 cursor-not-allowed" />
                        <ChevronRight size={20} className="text-slate-400 cursor-not-allowed" />
                    </div>
                </div>

                <div className="flex items-center gap-3" style={{ pointerEvents: 'auto' }}>
                    <div
                        className="search select-text cursor-text bg-black/10 backdrop-blur-md border border-white/20 focus-within:bg-white/20 focus-within:border-white/40"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SearchIcon className="size-4 text-white/50" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search or enter website..."
                            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/40 select-text cursor-text"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <ShieldHalf size={20} className="text-green-600" />
                </div>

                <div className="flex items-center gap-4" style={{ pointerEvents: 'auto' }}>
                    <div className="relative">
                        <Share
                            size={18}
                            className="text-white hover:text-slate-800 cursor-pointer transition-colors"
                            onClick={handleShare}
                        />
                        {showTooltip === "share" && (
                            <div className="absolute top-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                                Link copied!
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <Plus
                            size={18}
                            className="text-white hover:text-slate-800 cursor-pointer transition-colors"
                            onClick={handleNewTab}
                        />
                        {showTooltip === "newtab" && (
                            <div className="absolute top-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                                New tab opened!
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <LayoutGrid
                            size={18}
                            className="text-white hover:text-slate-800 cursor-pointer transition-colors"
                            onClick={handleShowTabs}
                        />
                        {showTooltip === "tabs" && (
                            <div className="absolute top-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                                Tab overview
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="safari-content relative">
                {/* Side Panel */}
                <div
                    className={`absolute top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-2xl transition-transform duration-300 z-40 ${showSidePanel ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    style={{ pointerEvents: showSidePanel ? 'auto' : 'none' }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <div className="p-4 border-b border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-800">Tabs & History</h3>
                            <X
                                size={18}
                                className="text-slate-600 hover:text-slate-800 cursor-pointer"
                                onClick={toggleSidePanel}
                            />
                        </div>
                    </div>

                    <div className="p-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Clock size={12} />
                            Recent Tabs
                        </h4>

                        <div className="space-y-2">
                            {recentTabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    onClick={() => switchTab(tab.id)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${activeTab === tab.id
                                            ? 'bg-blue-100 border border-blue-300'
                                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-600'}`}>
                                            {getIconComponent(tab.icon)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${activeTab === tab.id ? 'text-blue-900' : 'text-slate-800'
                                                }`}>
                                                {tab.title}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">{tab.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-2xl mt-5 mx-auto">
                    {activeTab === "home" ? (
                        <>
                            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Favorites</h2>

                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-8 justify-items-center">
                                {favorites.map((fav) => (
                                    <a
                                        key={fav.name}
                                        href={fav.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ pointerEvents: 'auto' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                            <div className="size-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white transition-all group-hover:scale-105 backdrop-blur-md">
                                                <img src={fav.icon} className="size-8 object-contain" alt={fav.name} />
                                            </div>
                                            <span className="text-sm font-medium text-black">{fav.name}</span>
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
                        </>
                    ) : (
                        /* About Me Article */
                        <article className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header */}
                            <header className="border-b border-slate-200 pb-6 mb-6">
                                <h1 className="text-4xl font-bold text-slate-900 mb-3">Boafo Joel</h1>
                                <p className="text-lg text-blue-600 font-medium">UI/UX Designer & Frontend Developer</p>
                                <p className="text-sm text-slate-600 mt-2">Accra, Ghana | Computer Engineering Student</p>
                            </header>

                            {/* Professional Summary */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Professional Summary
                                </h2>
                                <p className="text-slate-700 leading-relaxed mb-3">
                                    Versatile UI/UX Designer with <strong>5 years of experience</strong> and Frontend Developer with <strong>2 years of experience</strong>,
                                    specializing in creating intuitive, user-centered digital experiences. Currently pursuing <strong>Computer Engineering</strong> with
                                    aspirations to transition into <strong>Embedded Systems Engineering</strong>, combining software expertise with hardware innovation.
                                </p>
                                <p className="text-slate-700 leading-relaxed">
                                    Proven track record of delivering high-quality design solutions and responsive web applications for multiple organizations,
                                    with a strong foundation in both creative design thinking and technical implementation.
                                </p>
                            </section>

                            {/* Core Competencies */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Core Competencies
                                </h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        "UI/UX Design & Prototyping",
                                        "Frontend Development (React.js)",
                                        "Responsive Web Design",
                                        "Design Systems & Components",
                                        "User Research & Testing",
                                        "Figma, Adobe XD, Sketch",
                                        "HTML5, CSS3, JavaScript",
                                        "Git Version Control"
                                    ].map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Professional Experience */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Professional Experience
                                </h2>

                                <div className="space-y-6">
                                    {/* d3v.labs */}
                                    <div className="border-l-2 border-blue-600 pl-4">
                                        <h3 className="text-lg font-bold text-slate-800">UI/UX Designer & Frontend Developer</h3>
                                        <p className="text-sm text-blue-600 font-medium mb-2">d3v.labs | 2019 - 2023</p>
                                        <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                                            <li>Designed and developed user interfaces for 10+ web applications, improving user engagement by 40%</li>
                                            <li>Collaborated with cross-functional teams to translate business requirements into intuitive design solutions</li>
                                            <li>Implemented responsive designs using React.js, ensuring seamless experiences across all devices</li>
                                            <li>Conducted user research and usability testing to validate design decisions and iterate on prototypes</li>
                                        </ul>
                                    </div>

                                    {/* Previous Companies */}
                                    <div className="border-l-2 border-slate-300 pl-4">
                                        <h3 className="text-lg font-bold text-slate-800">UI/UX Designer</h3>
                                        <p className="text-sm text-slate-600 font-medium mb-2">Various Tech Companies (3 organizations) | 2020 - 2024</p>
                                        <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                                            <li>Created design systems and component libraries for consistent brand experiences</li>
                                            <li>Delivered 20+ design projects ranging from mobile apps to enterprise dashboards</li>
                                            <li>Mentored junior designers on best practices and industry-standard design workflows</li>
                                            <li>Increased client satisfaction ratings by 35% through iterative design processes</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Education
                                </h2>
                                <div className="border-l-2 border-blue-600 pl-4">
                                    <h3 className="text-lg font-bold text-slate-800">Computer Engineering (In Progress)</h3>
                                    <p className="text-sm text-slate-600 font-medium mb-2">Regional Maritime University | Expected Graduation: 2027</p>
                                    <p className="text-slate-700 text-sm">
                                        Specializing in embedded systems and hardware-software integration, with coursework in
                                        digital logic, microprocessor systems, signal processing, and real-time operating systems.
                                    </p>
                                </div>
                            </section>

                            {/* Career Goals */}
                            <section className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Career Objectives
                                </h2>
                                <p className="text-slate-700 leading-relaxed">
                                    Aspiring to bridge the gap between software and hardware by pursuing a career in <strong>Embedded Systems Engineering</strong>.
                                    Leveraging extensive design and frontend development experience to create innovative IoT solutions, smart devices,
                                    and next-generation embedded applications that seamlessly integrate form, function, and user experience.
                                </p>
                            </section>

                            {/* Footer */}
                            <footer className="border-t border-slate-200 pt-6 mt-8">
                                <p className="text-xs text-slate-500 text-center">
                                    Last updated: January 2026 | Available for freelance projects and collaborations
                                </p>
                            </footer>
                        </article>
                    )}
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;