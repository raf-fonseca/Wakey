import NavbarItem from "./NavbarItem.jsx";
import Indicator from "./Indicator.jsx";
import { useState } from "react";

const Navbar = ({activePage, setActivePage}) => {
    const [coords, setCoords] = useState({left: 0, width: 0, height: 0})

    const pages = ['Alarm', 'Settings']
    return (
        <nav
            className="
                px-4 py-3
                flex flex-row h-full w-full items-center justify-around
                bg-opacity-5 bg-white rounded-xl
                border-opacity-10 border-white border-solid border
            "
        >
            <Indicator coords={coords} />
            {
                pages.map((p) => {
                    return <NavbarItem 
                        setCoords={setCoords} 
                        setActivePage={setActivePage} 
                        activePage={activePage} 
                        item={p}
                    />
                })
            }
        </nav>
    )
}

export default Navbar;