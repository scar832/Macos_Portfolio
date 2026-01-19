import { useState, useMemo } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";
import {
    Grid3x3, List, Filter, Download, Heart, Info, ZoomIn, ZoomOut,
    ChevronLeft, ChevronRight, X, Search, SlidersHorizontal, Share2,
    Smartphone, Image as ImageIcon, Camera, Folder, Star, EyeOff,
    Clock, MapPin, FileImage
} from "lucide-react";

// Sample gallery images with work-related screenshots and generic photos
const GALLERY_IMAGES = [
    {
        id: 1,
        name: "WMS - Design",
        url: "/images/wms1.png",
        thumbnail: "/images/wms1.png",
        dateTaken: "2026-01-18T14:30:00",
        dateModified: "2026-01-18T14:30:00",
        size: "1.8 MB",
        dimensions: "1920x1080",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: true,
        isHidden: false,
        tags: ["design-system", "colors", "ui"],
    },
    {
        id: 2,
        name: "VS Code Extensions",
        url: "/images/extension.png",
        thumbnail: "/images/extension.png",
        dateTaken: "2026-01-17T10:15:00",
        dateModified: "2026-01-17T10:15:00",
        size: "2.1 MB",
        dimensions: "1920x1200",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: true,
        isHidden: false,
        tags: ["vscode", "extensions", "tools"],
    },
    {
        id: 3,
        name: "Brand Guidelines",
        url: "/images/design2.png",
        thumbnail: "/images/design2.png",
        dateTaken: "2026-01-16T16:45:00",
        dateModified: "2026-01-16T16:45:00",
        size: "1.5 MB",
        dimensions: "1680x1050",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: false,
        isHidden: false,
        tags: ["branding", "guidelines", "design"],
    },
    {
        id: 4,
        name: "Figma UI Components",
        url: "/images/design3.png",
        thumbnail: "/images/design3.png",
        dateTaken: "2026-01-15T11:20:00",
        dateModified: "2026-01-15T11:20:00",
        size: "2.3 MB",
        dimensions: "1920x1080",
        location: "screenshots",
        isFromiPhone: true,
        isFavorite: true,
        isHidden: false,
        tags: ["figma", "ui", "components"],
    },
    {
        id: 5,
        name: "GitHub Copilot Setup",
        url: "/images/git.png",
        thumbnail: "/images/git.png",
        dateTaken: "2026-01-14T09:30:00",
        dateModified: "2026-01-14T09:30:00",
        size: "1.2 MB",
        dimensions: "1440x900",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: false,
        isHidden: false,
        tags: ["github", "copilot", "ai"],
    },
    {
        id: 6,
        name: "Design Wireframes",
        url: "/images/design1.png",
        thumbnail: "/images/design1.png",
        dateTaken: "2026-01-13T15:00:00",
        dateModified: "2026-01-13T15:00:00",
        size: "1.9 MB",
        dimensions: "1920x1080",
        location: "iphone",
        isFromiPhone: true,
        isFavorite: true,
        isHidden: false,
        tags: ["wireframes", "design", "mobile"],
    },
    {
        id: 7,
        name: "Sunset Beach Photo",
        url: "/images/sunset.jpg",
        thumbnail: "/images/sunset.jpg",
        dateTaken: "2026-01-12T18:30:00",
        dateModified: "2026-01-12T18:30:00",
        size: "3.2 MB",
        dimensions: "2048x1536",
        location: "camera-roll",
        isFromiPhone: true,
        isFavorite: false,
        isHidden: false,
        tags: ["sunset", "beach", "nature"],
    },
    {
        id: 8,
        name: "Component Library",
        url: "/images/design5.png",
        thumbnail: "/images/design5.png",
        dateTaken: "2026-01-11T13:15:00",
        dateModified: "2026-01-11T13:15:00",
        size: "1.7 MB",
        dimensions: "1920x1080",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: true,
        isHidden: false,
        tags: ["components", "library", "ui"],
    },
    {
        id: 9,
        name: "Mountain Landscape",
        url: "/images/gal2.png",
        thumbnail: "/images/gal2.png",
        dateTaken: "2026-01-10T07:45:00",
        dateModified: "2026-01-10T07:45:00",
        size: "2.8 MB",
        dimensions: "2048x1536",
        location: "camera-roll",
        isFromiPhone: true,
        isFavorite: false,
        isHidden: false,
        tags: ["mountain", "landscape", "nature"],
    },
    {
        id: 10,
        name: "Tailwind Config",
        url: "/images/code.png",
        thumbnail: "/images/code.png",
        dateTaken: "2026-01-09T14:20:00",
        dateModified: "2026-01-09T14:20:00",
        size: "1.1 MB",
        dimensions: "1680x1050",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: false,
        isHidden: false,
        tags: ["tailwind", "config", "code"],
    },
    {
        id: 11,
        name: "City Night Lights",
        url: "/images/citynight.jpeg",
        thumbnail: "/images/citynight.jpeg",
        dateTaken: "2026-01-08T20:00:00",
        dateModified: "2026-01-08T20:00:00",
        size: "2.5 MB",
        dimensions: "1920x1280",
        location: "camera-roll",
        isFromiPhone: false,
        isFavorite: true,
        isHidden: false,
        tags: ["city", "night", "urban"],
    },
    {
        id: 12,
        name: "Typography System",
        url: "/images/design6.png",
        thumbnail: "/images/design6.png",
        dateTaken: "2026-01-07T11:30:00",
        dateModified: "2026-01-07T11:30:00",
        size: "1.6 MB",
        dimensions: "1920x1080",
        location: "iphone",
        isFromiPhone: true,
        isFavorite: true,
        isHidden: false,
        tags: ["typography", "fonts", "design"],
    },
    {
        id: 13,
        name: "Portfolio Screenshot",
        url: "/images/project-1.png",
        thumbnail: "/images/project-1.png",
        dateTaken: "2026-01-06T16:00:00",
        dateModified: "2026-01-06T16:00:00",
        size: "2.0 MB",
        dimensions: "1920x1080",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: false,
        isHidden: false,
        tags: ["portfolio", "project", "web"],
    },
    {
        id: 14,
        name: "Nature Walk",
        url: "/images/walk.jpg",
        thumbnail: "/images/walk.jpg",
        dateTaken: "2026-01-05T10:15:00",
        dateModified: "2026-01-05T10:15:00",
        size: "3.0 MB",
        dimensions: "2048x1536",
        location: "camera-roll",
        isFromiPhone: true,
        isFavorite: false,
        isHidden: false,
        tags: ["nature", "walk", "outdoor"],
    },
    {
        id: 15,
        name: "React Project Setup",
        url: "/images/project-2.png",
        thumbnail: "/images/project-2.png",
        dateTaken: "2026-01-04T09:00:00",
        dateModified: "2026-01-04T09:00:00",
        size: "1.4 MB",
        dimensions: "1680x1050",
        location: "screenshots",
        isFromiPhone: false,
        isFavorite: false,
        isHidden: false,
        tags: ["react", "setup", "project"],
    },
];

const Gallery = () => {
    const { windows } = useWindowStore();
    const data = windows.photos?.data;

    // State management
    const [selectedLibrary, setSelectedLibrary] = useState("recents");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [filterBy, setFilterBy] = useState("all");
    const [sortBy, setSortBy] = useState("date-desc");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedImages, setSelectedImages] = useState([]);
    const [favoriteImages, setFavoriteImages] = useState(
        GALLERY_IMAGES.filter(img => img.isFavorite).map(img => img.id)
    );
    const [previewImage, setPreviewImage] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter and sort images
    const filteredImages = useMemo(() => {
        let images = [...GALLERY_IMAGES];

        // Library filter
        if (selectedLibrary === "favorites") {
            images = images.filter(img => favoriteImages.includes(img.id));
        } else if (selectedLibrary === "hidden") {
            images = images.filter(img => img.isHidden);
        } else if (selectedLibrary === "albums") {
            // Show subset for demo
            images = images.slice(0, 8);
        }

        // Location filter
        if (selectedLocation !== "all") {
            images = images.filter(img => img.location === selectedLocation);
        }

        // Additional filter
        if (filterBy === "favorites") {
            images = images.filter(img => favoriteImages.includes(img.id));
        } else if (filterBy === "screenshots") {
            images = images.filter(img => img.location === "screenshots");
        }

        // Search filter
        if (searchQuery) {
            images = images.filter(img =>
                img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Sort
        images.sort((a, b) => {
            switch (sortBy) {
                case "date-desc":
                    return new Date(b.dateTaken) - new Date(a.dateTaken);
                case "date-asc":
                    return new Date(a.dateTaken) - new Date(b.dateTaken);
                case "name":
                    return a.name.localeCompare(b.name);
                case "size":
                    return parseFloat(b.size) - parseFloat(a.size);
                default:
                    return 0;
            }
        });

        return images;
    }, [selectedLibrary, selectedLocation, filterBy, sortBy, favoriteImages, searchQuery]);

    // Group images by date
    const groupedImages = useMemo(() => {
        const groups = {};
        filteredImages.forEach(img => {
            const date = new Date(img.dateTaken);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 7);

            let groupKey;
            if (date.toDateString() === today.toDateString()) {
                groupKey = "Today";
            } else if (date.toDateString() === yesterday.toDateString()) {
                groupKey = "Yesterday";
            } else if (date >= lastWeek) {
                groupKey = "Last 7 Days";
            } else {
                groupKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(img);
        });
        return groups;
    }, [filteredImages]);

    // Toggle favorite
    const toggleFavorite = (imageId) => {
        setFavoriteImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        );
    };

    // Toggle selection
    const toggleSelection = (imageId) => {
        setSelectedImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        );
    };

    // Download image
    const downloadImage = (image) => {
        const link = document.createElement('a');
        link.href = image.url;
        link.download = image.name;
        link.click();
    };

    // Zoom controls
    const handleZoomIn = () => {
        if (zoomLevel < 200) setZoomLevel(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        if (zoomLevel > 25) setZoomLevel(prev => Math.max(prev - 25, 25));
    };

    // Navigate preview
    const navigatePreview = (direction) => {
        if (!previewImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === previewImage.id);
        const newIndex = direction === "next"
            ? (currentIndex + 1) % filteredImages.length
            : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setPreviewImage(filteredImages[newIndex]);
        setZoomLevel(100);
    };

    return <>
        <div id="window-header">
            <WindowControls target="photos" />
            <h2 className="font-bold text-sm text-center flex-1">Photos</h2>

            {/* Header Controls */}
            <div className="flex items-center gap-2" style={{ pointerEvents: 'auto' }}>
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-7 pr-2 py-1 text-xs rounded bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 w-32"
                    />
                </div>

                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded overflow-hidden">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                        title="Grid View"
                    >
                        <Grid3x3 className="size-3.5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-1 border-l border-gray-300 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                        title="List View"
                    >
                        <List className="size-3.5" />
                    </button>
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer"
                >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="name">Name</option>
                    <option value="size">Size</option>
                </select>

                {/* Filter */}
                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer"
                >
                    <option value="all">All Photos</option>
                    <option value="favorites">Favorites</option>
                    <option value="screenshots">Screenshots</option>
                </select>

                <div className="w-px h-4 bg-gray-300" />

                {/* Info Toggle */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`p-1.5 rounded transition-colors ${showDetails ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-gray-600"}`}
                    title="Show Details"
                >
                    <Info className="size-4" />
                </button>
            </div>
        </div>

        <div className="flex h-full overflow-hidden">
            {/* Sidebar */}
            <div className="gallery-sidebar w-48 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto">
                {/* Libraries */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Libraries
                    </h3>
                    <ul className="space-y-1">
                        <li
                            onClick={() => setSelectedLibrary("recents")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLibrary === "recents" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <Clock className="size-4" />
                            <span className="text-sm font-medium">Recents</span>
                        </li>
                        <li
                            onClick={() => setSelectedLibrary("favorites")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLibrary === "favorites" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <Heart className="size-4" />
                            <span className="text-sm font-medium">Favorites</span>
                            <span className="ml-auto text-xs text-gray-500">{favoriteImages.length}</span>
                        </li>
                        <li
                            onClick={() => setSelectedLibrary("albums")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLibrary === "albums" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <Folder className="size-4" />
                            <span className="text-sm font-medium">Albums</span>
                        </li>
                        <li
                            onClick={() => setSelectedLibrary("hidden")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLibrary === "hidden" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <EyeOff className="size-4" />
                            <span className="text-sm font-medium">Hidden</span>
                        </li>
                    </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300" />

                {/* Locations */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Locations
                    </h3>
                    <ul className="space-y-1">
                        <li
                            onClick={() => setSelectedLocation("all")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLocation === "all" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <ImageIcon className="size-4" />
                            <span className="text-sm font-medium">All Photos</span>
                        </li>
                        <li
                            onClick={() => setSelectedLocation("camera-roll")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLocation === "camera-roll" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <Camera className="size-4" />
                            <span className="text-sm font-medium">Camera Roll</span>
                        </li>
                        <li
                            onClick={() => setSelectedLocation("screenshots")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLocation === "screenshots" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <FileImage className="size-4" />
                            <span className="text-sm font-medium">Screenshots</span>
                        </li>
                        <li
                            onClick={() => setSelectedLocation("iphone")}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedLocation === "iphone" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                        >
                            <Smartphone className="size-4 text-blue-500" />
                            <span className="text-sm font-medium">My iPhone</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Gallery Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Image Grid */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    {Object.entries(groupedImages).map(([groupName, images]) => (
                        <div key={groupName} className="mb-6">
                            {/* Group Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-sm font-bold text-gray-700">{groupName}</h3>
                                <div className="h-px flex-1 bg-gray-200" />
                                <span className="text-xs text-gray-500">{images.length} items</span>
                            </div>

                            {/* Images */}
                            <div className={viewMode === "grid"
                                ? "grid grid-cols-4 gap-3"
                                : "flex flex-col gap-2"
                            }>
                                {images.map(image => (
                                    <div
                                        key={image.id}
                                        className="gallery-card group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                                        onClick={() => {
                                            setPreviewImage(image);
                                            setZoomLevel(100);
                                        }}
                                    >
                                        {/* Image */}
                                        <div className={viewMode === "grid" ? "aspect-square" : "h-20 flex items-center gap-3 p-2"}>
                                            <img
                                                src={image.thumbnail}
                                                alt={image.name}
                                                className={viewMode === "grid"
                                                    ? "w-full h-full object-cover"
                                                    : "h-full w-20 object-cover rounded"
                                                }
                                            />
                                            {viewMode === "list" && (
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate">{image.name}</p>
                                                    <p className="text-xs text-gray-500">{image.size} • {image.dimensions}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* iPhone Badge */}
                                        {image.isFromiPhone && (
                                            <div className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                                                <Smartphone className="size-3 text-white" />
                                            </div>
                                        )}

                                        {/* Hover Actions */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all opacity-0 group-hover:opacity-100">
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                {/* Favorite */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(image.id);
                                                    }}
                                                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <Heart
                                                        className={`size-3.5 ${favoriteImages.includes(image.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                                                    />
                                                </button>

                                                {/* Download */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        downloadImage(image);
                                                    }}
                                                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <Download className="size-3.5 text-gray-600" />
                                                </button>
                                            </div>

                                            {/* Selection Checkbox */}
                                            <div className="absolute bottom-2 left-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedImages.includes(image.id)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        toggleSelection(image.id);
                                                    }}
                                                    className="size-4 rounded cursor-pointer"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {filteredImages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ImageIcon className="size-16 mb-4" />
                            <p className="text-lg font-medium">No Photos Found</p>
                            <p className="text-sm">Try adjusting your filters or search</p>
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                {showDetails && previewImage && (
                    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto custom-scrollbar">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Details
                        </h3>

                        {/* Thumbnail */}
                        <div className="mb-4 rounded-lg overflow-hidden bg-gray-200">
                            <img
                                src={previewImage.thumbnail}
                                alt={previewImage.name}
                                className="w-full aspect-square object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Name</p>
                                <p className="text-sm font-medium text-gray-800">{previewImage.name}</p>
                            </div>

                            {previewImage.isFromiPhone && (
                                <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                                    <Smartphone className="size-4 text-blue-600" />
                                    <p className="text-xs font-medium text-blue-700">Imported from: My iPhone</p>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-gray-500 mb-1">Date Taken</p>
                                <p className="text-sm text-gray-700">
                                    {new Date(previewImage.dateTaken).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                                <p className="text-sm text-gray-700">{previewImage.dimensions}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">File Size</p>
                                <p className="text-sm text-gray-700">{previewImage.size}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">Location</p>
                                <p className="text-sm text-gray-700 capitalize">{previewImage.location.replace('-', ' ')}</p>
                            </div>

                            {previewImage.tags && previewImage.tags.length > 0 && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Tags</p>
                                    <div className="flex flex-wrap gap-1">
                                        {previewImage.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Preview Modal */}
        {previewImage && (
            <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
                {/* Close Button */}
                <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="size-6 text-white" />
                </button>

                {/* Navigation */}
                <button
                    onClick={() => navigatePreview("prev")}
                    className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <ChevronLeft className="size-6 text-white" />
                </button>

                <button
                    onClick={() => navigatePreview("next")}
                    className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <ChevronRight className="size-6 text-white" />
                </button>

                {/* Image */}
                <div className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh] overflow-auto">
                    <img
                        src={previewImage.url}
                        alt={previewImage.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-200"
                        style={{
                            transform: `scale(${zoomLevel / 100})`,
                        }}
                    />
                </div>

                {/* Controls Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
                    {/* Zoom Out */}
                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 25}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                    >
                        <ZoomOut className="size-5 text-white" />
                    </button>

                    {/* Zoom Level */}
                    <span className="text-white font-medium min-w-[50px] text-center text-sm">
                        {zoomLevel}%
                    </span>

                    {/* Zoom In */}
                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 200}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                    >
                        <ZoomIn className="size-5 text-white" />
                    </button>

                    <div className="w-px h-5 bg-white/20" />

                    {/* Download */}
                    <button
                        onClick={() => downloadImage(previewImage)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Download className="size-5 text-white" />
                    </button>

                    {/* Favorite */}
                    <button
                        onClick={() => toggleFavorite(previewImage.id)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Heart
                            className={`size-5 ${favoriteImages.includes(previewImage.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                        />
                    </button>

                    {/* Share */}
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Share2 className="size-5 text-white" />
                    </button>
                </div>

                {/* Image Name */}
                <div className="absolute top-4 left-4 text-white">
                    <p className="font-medium">{previewImage.name}</p>
                    {previewImage.isFromiPhone && (
                        <div className="flex items-center gap-1 mt-1">
                            <Smartphone className="size-3" />
                            <span className="text-xs text-blue-300">From My iPhone</span>
                        </div>
                    )}
                </div>
            </div>
        )}
    </>;
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
