import { useEffect, useRef, useLayoutEffect } from "react";

const NavbarItem = ({setCoords, setActivePage, item, activePage}) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if(!ref.current) return;

        const domItem = ref.current;
        const {left, width, height} = domItem.getBoundingClientRect();

        if(activePage === item) setCoords({left: left, width: width, height: height});
    }, [])

    useEffect(() => {
        if(!ref.current) return;

        const domItem = ref.current;

        const {left, width, height} = domItem.getBoundingClientRect();

        const handleSetActivePage = () => {
            setCoords({left: left, width: width, height: height});
            setActivePage(item);
            console.log(domItem.getBoundingClientRect());
            console.log('called');
        }
        
        domItem.addEventListener('click', handleSetActivePage);

        return () => {
            domItem.removeEventListener('click', handleSetActivePage);
        }

    }, [activePage]);

    return (
        <li
            ref={ref}
            className={`
                text-lg text-white font-thin tracking-wide
                h-full w-full flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${activePage === item ? 'opacity-100' : 'opacity-60'}
            `}
        >
            {item === 'Settings' ? 'Clock' : item}
        </li>
    )
}

export default NavbarItem;