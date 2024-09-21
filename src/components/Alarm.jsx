import SlideButton from "./SlideButton.jsx";

const Alarm = ({info, handleToggleActive, setOpen}) => {
    const active = info.enabled;

    const days = info.days.map((day, index) => {
        // if(day === 'Monday') day = 'Mon';
        // else if(day === 'Tuesday') day = 'Tue';
        // else if(day === 'Wednesday') day = 'Wed';
        // else if(day === 'Thursday') day = 'Thurs';
        // else if(day === 'Friday') day = 'Fri';
        // else if(day === 'Saturday') day = 'Sat';
        // else if(day === 'Sunday') day = 'Sun';

        if(info.days[index + 1]) return day + ', ';
        else return day;
    });

    return (
        <li
            className={`
                w-full min-h-fit relative
                px-4 py-3
                bg-white 
                rounded-lg border border-white border-solid border-opacity-20
                flex flex-row justify-between items-center gap-1
                transition-all duration-300 ease-in-out
                ${active ? 'bg-opacity-10 opacity-100' : 'bg-opacity-5 opacity-60'}
            `}
        >
            <div
                className="
                    flex flex-col items-start justify-center
                    flex-[0.6]
                "
            >
                <h3
                    className="text-base font-thin tracking-wider text-white opacity-40 mb-1"
                >
                    {info.title}
                </h3>
                <h1
                    className="text-4xl text-white font-thin tracking-widest"
                >
                    {info.time}
                </h1>
                <p
                    className="text-sm font-thin tracking-wider text-white opacity-80"
                >
                    {days}
                </p>
            </div>
            <div
                style={{transform: 'translate(-50%, -50%)'}}
                className="absolute text-white left-[50%] top-[50%] opacity-40 font-thin text-2xl w-full h-full flex justify-center items-center z-10"
                onClick={() => setOpen(true)}
            >
                +
            </div>
            <div
                className="
                    flex-[0.4] w-full h-full z-20
                    flex flex-col items-end justify-center
                "
            >
                <SlideButton onClick={handleToggleActive} active={info.enabled}/>
            </div>
        </li>
    )
}

export default Alarm;