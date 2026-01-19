import { navIcons, navLinks } from "#constants";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import ControlCenter from "./ControlCenter";
import { useState } from "react";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const [showControlCenter, setShowControlCenter] = useState(false);

    return (
        <nav
            onMouseLeave={() => setShowControlCenter(false)}
            className="relative"
        >
            <div>
                <img src="/images/logo.svg" alt="logo" className="invert" />
                <p className="font-bold text-white mx-2">Joel's Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindow(type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="relative">
                <ul
                    onMouseEnter={() => setShowControlCenter(true)}
                >
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className="icon-hover invert" alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format("ddd MMM D h:mm A")}</time>

                {/* Control Center */}
                <ControlCenter
                    show={showControlCenter}
                    onClose={() => setShowControlCenter(false)}
                />
            </div>
        </nav>
    )
}
export default Navbar
