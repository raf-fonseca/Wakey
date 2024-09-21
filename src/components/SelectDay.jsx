import { useState, useEffect } from "react";


const SelectDay = ({day, days, handlePickDay}) => {
    const [formChecked, setFormChecked] = useState(false);

    var daySym = day[0].toUpperCase();
    if(day === 'Thurs') daySym = 'Th';
    if(day === 'Sun') daySym = 'U';

    useEffect(() => {
        if(!days.includes(day)) setFormChecked(false);
        else if(days.includes(day)) setFormChecked(true);
    }, [days])

    const classNameDefault = 'bg-opacity-0 border-opacity-20 font-thin opacity-100';
    const classNamePicked = 'bg-opacity-10 border-opacity-40 font-light opacity-100';
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    handlePickDay(formChecked, day);
                    setFormChecked(!days.includes(day));
                }}
                className={`
                    rounded-md flex-1 relative bg-white text-white
                    p-1 border-solid border border-white 
                    overflow-hidden text-lg
                    h-full aspect-square
                    transition-all ease-in-out duration-300
                    
                    ${days.includes(day) ? classNamePicked : classNameDefault}
                `}
            >
                <div
                    className={`absolute top-0 left-0 h-full w-full bg-carouselGradient opacity-30`}
                ></div>
                {daySym}
            </button>
        </>
    )
}

export default SelectDay;