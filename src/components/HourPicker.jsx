import { useState } from "react";
import NumberInput from "./NumberInput.jsx";


const HourPicker = ({time, setTime}) => {

    const getInputs = () => {
        const arr = document.querySelectorAll('[id^="hourpick-"]');
        
        if(arr) return arr;
        return false;
    }
    
    return (
        <div
            className="flex flex-row justify-center gap-4 items-center w-[80%] mx-auto"
        >
            {time.map((e, idx) => <NumberInput id={`hourpick-${idx}`} time={time} setTime={setTime} idx={idx} getInputs={getInputs} />)}
        </div>
    )
}

export default HourPicker;