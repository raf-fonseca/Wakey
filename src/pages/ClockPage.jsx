import { useState, useEffect } from "react"
import ClockLines from "./ClockLines.jsx"

const getHour = () => {
    const date = new Date;

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if(hour < 10) hour = '0' + `${hour}`;
    if(minute < 10) minute = '0' + `${minute}`;
    if(second < 10) second = '0' + `${second}`;

    return `${hour}:${minute}:${second}`;
}

const ClockPage = ({}) => {
    const [time, setTime] = useState(getHour);

    useEffect(() => {
        setInterval(() => {
            const hour = getHour();
            setTime(hour);
        }, 1000);
        
    }, [])
    

    return (
        <section
            className="flex relative flex-col h-full flex-[0.9] w-full justify-center items-center mt-2  rounded-lg"
        >
            <div
                className="
                    rounded-full bg-white aspect-square w-full
                    flex flex-col justify-center items-center relative
                "
            >
                <ClockLines/>
                <div
                    className="bg-white z-20 aspect-square w-[85%] rounded-full shadow-2xl flex justify-center items-center"
                >
                    <div
                        className="bg-white aspect-square w-[75%] rounded-full shadow-xl flex justify-center items-center"
                    >
                        <div
                            className="bg-white aspect-square w-[60%] rounded-full shadow-lg flex justify-center items-center"
                        >
                        </div>
                    </div>
                </div>
                <h1
                    className="text-black absolute z-30 text-5xl font-thin tracking-wider"
                >
                    {time}
                </h1>
            </div>
            <div
                className="flex "
            >

            </div>


        </section>
    )
}

export default ClockPage