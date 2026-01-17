import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";
import { BookOpen, FileText, Type, Moon, Sun, Copy, Check, Clock, BookMarked } from "lucide-react";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    // Interactive states
    const [fontSize, setFontSize] = useState("normal"); // "small", "normal", "large"
    const [viewMode, setViewMode] = useState("reader"); // "reader" or "document"
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    // If no data, return null
    if (!data) return null;

    // Calculate metadata
    const totalWords = data.description?.reduce((acc, para) =>
        acc + para.split(/\s+/).length, 0) || 0;
    const readingTime = Math.ceil(totalWords / 200); // Average reading speed: 200 words/min

    // Font size classes
    const fontSizeClasses = {
        small: "text-sm leading-relaxed",
        normal: "text-base leading-relaxed",
        large: "text-lg leading-loose"
    };

    // Copy to clipboard function
    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return <>
        <div id="window-header" className={isDarkTheme ? "!bg-slate-800 !border-slate-700" : ""}>
            <WindowControls target="txtfile" />
            <h2 className={isDarkTheme ? "!text-white" : ""}>{data.name || "Text File"}</h2>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <button
                    onClick={() => setViewMode(viewMode === "reader" ? "document" : "reader")}
                    className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    title={viewMode === "reader" ? "Document Mode" : "Reader Mode"}
                >
                    {viewMode === "reader" ?
                        <FileText className="size-4 text-slate-600" /> :
                        <BookOpen className="size-4 text-blue-600" />
                    }
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                    className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    title={isDarkTheme ? "Light Mode" : "Dark Mode"}
                >
                    {isDarkTheme ?
                        <Sun className="size-4 text-yellow-500" /> :
                        <Moon className="size-4 text-slate-600" />
                    }
                </button>

                {/* Font Size Controls */}
                <div className="flex items-center gap-1 ml-2 border-l pl-2 border-slate-300">
                    <button
                        onClick={() => setFontSize("small")}
                        className={`px-2 py-1 text-xs font-bold rounded transition-colors ${fontSize === "small" ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-slate-600"
                            }`}
                    >
                        A-
                    </button>
                    <button
                        onClick={() => setFontSize("normal")}
                        className={`px-2 py-1 text-sm font-bold rounded transition-colors ${fontSize === "normal" ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-slate-600"
                            }`}
                    >
                        A
                    </button>
                    <button
                        onClick={() => setFontSize("large")}
                        className={`px-2 py-1 text-base font-bold rounded transition-colors ${fontSize === "large" ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-slate-600"
                            }`}
                    >
                        A+
                    </button>
                </div>
            </div>
        </div>

        <div className={`flex h-full overflow-hidden ${isDarkTheme ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-blue-50"}`}>
            {/* Sidebar with metadata (Document Mode) */}
            {viewMode === "document" && (
                <div className={`w-48 border-r ${isDarkTheme ? "bg-slate-800 border-slate-700" : "bg-white/80 backdrop-blur-sm border-slate-200"} p-4 flex flex-col gap-4`}>
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                            Metadata
                        </h3>

                        <div className="space-y-3">
                            {/* File Type */}
                            <div className="flex items-center gap-2">
                                <FileText className={`size-4 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                                <div>
                                    <p className={`text-[10px] ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>Type</p>
                                    <p className={`text-xs font-medium ${isDarkTheme ? "text-slate-300" : "text-slate-700"}`}>Text Document</p>
                                </div>
                            </div>

                            {/* Reading Time */}
                            <div className="flex items-center gap-2">
                                <Clock className={`size-4 ${isDarkTheme ? "text-purple-400" : "text-purple-600"}`} />
                                <div>
                                    <p className={`text-[10px] ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>Reading Time</p>
                                    <p className={`text-xs font-medium ${isDarkTheme ? "text-slate-300" : "text-slate-700"}`}>{readingTime} min</p>
                                </div>
                            </div>

                            {/* Word Count */}
                            <div className="flex items-center gap-2">
                                <BookMarked className={`size-4 ${isDarkTheme ? "text-green-400" : "text-green-600"}`} />
                                <div>
                                    <p className={`text-[10px] ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>Words</p>
                                    <p className={`text-xs font-medium ${isDarkTheme ? "text-slate-300" : "text-slate-700"}`}>{totalWords}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={`border-t ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`} />

                    {/* Info Badge */}
                    <div className={`p-3 rounded-lg ${isDarkTheme ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-100"}`}>
                        <p className={`text-[10px] font-medium ${isDarkTheme ? "text-blue-400" : "text-blue-700"}`}>
                            📖 Document view provides additional context and metadata
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${viewMode === "reader" ? "flex justify-center" : ""
                }`}>
                <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${viewMode === "reader" ? "max-w-2xl w-full p-12" : "p-8"
                    }`}>
                    {/* Optional Image */}
                    {data.image && (
                        <div className="mb-8 flex justify-center animate-in fade-in zoom-in duration-700">
                            <img
                                src={data.image}
                                alt={data.name}
                                className="max-w-xs rounded-2xl shadow-2xl ring-1 ring-black/5"
                            />
                        </div>
                    )}

                    {/* Optional Subtitle */}
                    {data.subtitle && (
                        <h3 className={`text-2xl font-bold mb-6 pb-3 border-b ${isDarkTheme
                            ? "text-slate-200 border-slate-700"
                            : "text-slate-800 border-slate-200"
                            }`}>
                            {data.subtitle}
                        </h3>
                    )}

                    {/* Description Paragraphs */}
                    {data.description && Array.isArray(data.description) && (
                        <div className="space-y-2">
                            {data.description.map((paragraph, index) => (
                                <div
                                    key={index}
                                    className={`group relative p-4 rounded-lg transition-all duration-300 ${isDarkTheme
                                        ? "hover:bg-slate-800/50"
                                        : "hover:bg-white/60 hover:shadow-md"
                                        }`}
                                >
                                    <p className={`${fontSizeClasses[fontSize]} ${isDarkTheme ? "text-slate-300" : "text-slate-700"
                                        } font-georama`}>
                                        {paragraph}
                                    </p>

                                    {/* Copy Button - Shows on Hover */}
                                    <button
                                        onClick={() => copyToClipboard(paragraph, index)}
                                        className={`absolute top-2 right-2 p-2 rounded-md transition-all ${isDarkTheme
                                            ? "bg-slate-700 hover:bg-slate-600"
                                            : "bg-white hover:bg-slate-50"
                                            } shadow-sm opacity-0 group-hover:opacity-100`}
                                        title="Copy paragraph"
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="size-3 text-green-500" />
                                        ) : (
                                            <Copy className="size-3 text-slate-500" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer Info */}
                    <div className={`mt-12 pt-6 border-t text-center ${isDarkTheme ? "border-slate-700" : "border-slate-200"
                        }`}>
                        <p className={`text-xs ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>
                            {totalWords} words · {readingTime} min read · {data.description?.length || 0} paragraphs
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
