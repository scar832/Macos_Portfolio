import { useState } from "react";
import {
    Wifi, WifiOff, Volume2, VolumeX, Moon, Sun, Lock,
    Bluetooth, Battery, Monitor, ChevronRight
} from "lucide-react";

const ControlCenter = ({ show, onClose }) => {
    // State for controls
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [dndEnabled, setDndEnabled] = useState(false);
    const [brightness, setBrightness] = useState(80);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    if (!show) return null;

    const handleLockScreen = () => {
        window.location.reload();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[60]"
                onClick={onClose}
            />

            {/* Control Center Panel */}
            <div className="control-center absolute top-full right-0 mt-2 z-[70] w-80">
                <div className="control-panel bg-white/10 backdrop-blur-3xl border border-white/20 rounded-4xl shadow-2xl p-4 flex flex-col gap-3">
                    {/* WiFi & Bluetooth Row */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* WiFi Control */}
                        <button
                            onClick={() => setWifiEnabled(!wifiEnabled)}
                            className={`control-tile group ${wifiEnabled ? 'active' : ''}`}
                        >
                            <div className="flex flex-col items-start h-20">
                                <div className="flex">
                                    <div className={`p-2 rounded-full transition-colors ${wifiEnabled ? 'bg-blue-500' : 'bg-white/20'}`}>
                                        {wifiEnabled ? (
                                            <Wifi className="size-5 text-white" />
                                        ) : (
                                            <WifiOff className="size-5 text-white/60" />
                                        )}
                                    </div>
                                    <p className="text-xs text-white/60">
                                        {wifiEnabled ? "Home Net." : "Off"}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">Wi-Fi</p>
                                </div>
                                <ChevronRight className="size-4 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>

                        {/* Bluetooth Control */}
                        <button
                            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                            className={`control-tile group ${bluetoothEnabled ? 'active' : ''}`}
                        >
                            <div className="flex flex-col items-start h-20">
                                <div className={`p-2 rounded-full transition-colors ${bluetoothEnabled ? 'bg-blue-500' : 'bg-white/20'}`}>
                                    <Bluetooth className={`size-5 ${bluetoothEnabled ? 'text-white' : 'text-white/60'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">Bluetooth</p>
                                    <p className="text-xs text-white/60">
                                        {bluetoothEnabled ? "On" : "Off"}
                                    </p>
                                </div>
                                <ChevronRight className="size-4 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    </div>

                    {/* Do Not Disturb & Dark Mode Row */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Do Not Disturb */}
                        <button
                            onClick={() => setDndEnabled(!dndEnabled)}
                            className={`control-tile group ${dndEnabled ? 'active' : ''}`}
                        >
                            <div className="flex flex-col items-start h-full">
                                <div className={`p-2 rounded-full transition-colors ${dndEnabled ? 'bg-purple-500' : 'bg-white/20'}`}>
                                    <Moon className={`size-5 ${dndEnabled ? 'text-white' : 'text-white/60'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">Focus</p>
                                    <p className="text-xs text-white/60">
                                        {dndEnabled ? "DND" : "Off"}
                                    </p>
                                </div>
                            </div>
                        </button>

                        {/* Dark Mode */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`control-tile group ${darkMode ? 'active' : ''}`}
                        >
                            <div className="flex flex-col items-start h-full">
                                <div className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700' : 'bg-white/20'}`}>
                                    {darkMode ? (
                                        <Moon className="size-5 text-white" />
                                    ) : (
                                        <Sun className="size-5 text-white/60" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white">Display</p>
                                    <p className="text-xs text-white/60">
                                        {darkMode ? "Dark" : "Light"}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Brightness Control */}
                    <div className="control-tile-large rounded-4xl w-full">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-full">
                                <Sun className="size-4 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-white flex-1">Brightness</p>
                            <span className="text-xs text-white/60">{brightness}%</span>
                        </div>
                        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all"
                                style={{ width: `${brightness}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brightness}
                                onChange={(e) => setBrightness(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="control-tile-large rounded-4xl w-full">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="size-4 text-white" />
                                ) : (
                                    <Volume2 className="size-4 text-white" />
                                )}
                            </button>
                            <p className="text-sm font-semibold text-white flex-1">Sound</p>
                            <span className="text-xs text-white/60">{isMuted ? 'Muted' : `${volume}%`}</span>
                        </div>
                        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all"
                                style={{ width: isMuted ? '0%' : `${volume}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setVolume(val);
                                    if (val > 0) setIsMuted(false);
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Battery & Lock Screen Row */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Battery Status */}
                        <div className="control-tile cursor-default">
                            <div className="flex items-start">
                                <div className="p-2 bg-white/60 rounded-full">
                                    <Battery className="size-5 text-green-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-white/60 mt-2">Battery</p>
                                </div>
                            </div>
                        </div>

                        {/* Lock Screen */}
                        <button
                            onClick={handleLockScreen}
                            className="control-tile group hover:bg-red-500/20"
                        >
                            <div className="flex items-start h-full">
                                <div className="p-2 bg-red-500 rounded-full">
                                    <Lock className="size-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white mt-1.5">Lock</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlCenter;
