import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    const [zoom, setZoom] = useState(100);

    // If no data, return null
    if (!data) return null;

    const handleZoomIn = () => {
        if (zoom < 200) setZoom(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        if (zoom > 25) setZoom(prev => Math.max(prev - 25, 25));
    };

    const handleFitToScreen = () => {
        setZoom(100);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = data.imageUrl;
        link.download = data.name || 'image.png';
        link.click();
    };

    return <>
        <div id="window-header">
            <WindowControls target="imgfile" />
            <p className="font-bold text-[#5f6266] flex-1 text-center">{data.name || "Image"}</p>

            {/* Image Controls */}
            <div className="flex items-center gap-2" style={{ pointerEvents: 'auto' }}>
                <button
                    onClick={handleZoomOut}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Zoom Out"
                    disabled={zoom <= 25}
                >
                    <ZoomOut className={`size-4 ${zoom <= 25 ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>

                <span className="text-xs font-medium text-gray-600 min-w-[45px] text-center">
                    {zoom}%
                </span>

                <button
                    onClick={handleZoomIn}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Zoom In"
                    disabled={zoom >= 200}
                >
                    <ZoomIn className={`size-4 ${zoom >= 200 ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>

                <div className="w-px h-4 bg-gray-300 mx-1" />

                <button
                    onClick={handleFitToScreen}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Fit to Screen"
                >
                    <Maximize2 className="size-4 text-gray-600" />
                </button>

                <button
                    onClick={handleDownload}
                    className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    title="Download Image"
                >
                    <Download className="size-4 text-gray-600" />
                </button>
            </div>
        </div>

        <div className="preview overflow-auto">
            <div
                className="flex items-center justify-center min-h-full p-4"
                style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-out'
                }}
            >
                <img
                    src={data.imageUrl}
                    alt={data.name || "Image"}
                    className="max-w-full max-h-full object-contain"
                    style={{ imageRendering: zoom > 100 ? 'crisp-edges' : 'auto' }}
                />
            </div>
        </div>
    </>
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
