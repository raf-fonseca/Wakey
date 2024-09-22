import { useEffect, useRef, useLayoutEffect } from "react";

const NavbarItem = ({ setCoords, setActivePage, item, activePage }) => {
  const ref = useRef(null);

  const updateCoords = () => {
    if (!ref.current) return;

    const domItem = ref.current;
    const { left, width, height } = domItem.getBoundingClientRect();

    if (activePage === item) {
      setCoords({ left: left, width: width, height: height });
    }
  };

  useLayoutEffect(() => {
    // Initial calculation on mount
    updateCoords();

    const handleResize = () => {
      updateCoords();
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up the resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activePage]);

  useEffect(() => {
    if (!ref.current) return;

    const domItem = ref.current;
    const { left, width, height } = domItem.getBoundingClientRect();

    const handleSetActivePage = () => {
      setCoords({ left: left, width: width, height: height });
      setActivePage(item);
    };

    domItem.addEventListener("click", handleSetActivePage);

    return () => {
      domItem.removeEventListener("click", handleSetActivePage);
    };
  }, [activePage]);

  return (
    <li
      ref={ref}
      className={`
        text-lg text-white font-thin tracking-wide
        h-full w-full flex items-center justify-center
        transition-all duration-300 ease-in-out hover:pointer
        ${activePage === item ? "opacity-100" : "opacity-60"}
      `}
    >
      {item === "Settings" ? "Clock" : item}
    </li>
  );
};

export default NavbarItem;
