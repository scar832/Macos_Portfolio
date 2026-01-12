import { Navbar, Welcome, Dock, LockScreen } from "#components";
import {Figma, Resume, Safari, Terminal, Vscode} from "#windows";
import {useState} from "react";

import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
    const [isLocked, setIsLocked] = useState(true);
    return (
        <main className="relative w-screen h-screen overflow-hidden">
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
            <Figma />
            <Vscode />
            {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
        </main>
    )
}
export default App
