import { useState } from "react";
import SelectDay from "../components/SelectDay.jsx";
import Drawer from "../components/Drawer.jsx";
import HourPicker from "../components/HourPicker.jsx";

const DAYS_ARRAY = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
export const orderDayArr = (arr) => {
    const newArr = [];

    for(const day of DAYS_ARRAY) {
        if(arr.includes(day)) newArr.push(day);
    }

    return newArr;
}

const ModifyAlarm = ({setAlarms, info, open, setOpen}) => {

    const [ title, setTitle ] = useState(info ? info.title : '');
    const [ days, setDays ] = useState(info ? info.days : []);
    const [ prompt, setPrompt ] = useState(info ? info.prompt : '');
    const [ time, setTime ] = useState(info ? [info.time[0], info.time[1], info.time[3], info.time[4]] : ['', '', '', '']);

    const handlePickDay = (checked, day) => {
        setDays(prev => {
            if(!checked) {
                return [...prev, day]
            } else {
                return [...prev].filter(item => item !== day);
            }
        })
    }

    const handleSetAlarm = () => {
        var titleTitle = title;
        if((time[0] > 2 || time[0] < 0) || (time[0] == 2 && time[1] >= 4) || (time[1] < 0) || (time[2] > 5 || time[2] < 0) || (time[3] < 0)) {
            console.log('time error'); 
            return;
        }
        if(!title) titleTitle = 'Alarm';
        if(!prompt) {
            console.log('prompt error');
            return;
        }
        if(!days) {
            console.log('days error');
            return;
        }
        const dayArr = orderDayArr(days);

        const id = (info && info.id) ? info.id : Math.random();
        
        const newAlarm = {title: titleTitle, time: `${time[0]}${time[1]}:${time[2]}${time[3]}`, days: dayArr, prompt: prompt, id: id, enabled: true};

        setAlarms(prev => {
            const idx = [...prev].findIndex(a => a.id === id);
            if(idx === -1) return [newAlarm, ...prev];
            
            var newArr = [...prev];
            newArr[idx] = newAlarm;
            
            return newArr;
        });

        setOpen(false);
    }

    const handleCloseDrawer = () => {
        setTitle((info && info.title) ? info.title : '');
        setDays((info && info.days) ? info.days : []);
        setPrompt((info && info.prompt) ? info.prompt : '');
        setTime((info && info.time) ? [info.time[0], info.time[1], info.time[3], info.time[4]] : ['', '', '', '']);

        setOpen(false);
    }

    return (
        <>
            <Drawer open={open} handleCloseDrawer={handleCloseDrawer} className={"flex flex-col gap-4"}>
                <HourPicker time={time} setTime={setTime} />
                <div
                    className="flex flex-row w-full gap-2 mb-6"
                >
                    <SelectDay day='Mon' days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Tue'days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Wed'days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Thurs'days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Fri'days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Sat'days={days} handlePickDay={handlePickDay}/>
                    <SelectDay day='Sun'days={days} handlePickDay={handlePickDay}/>
                </div>
                <input 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Alarm Name"
                    className="
                        placeholder:opacity-60
                        w-full p-2
                        flex justify-start items-center text-start
                        bg-white bg-opacity-0
                        border border-solid border-white border-opacity-10 rounded-lg
                        focus:bg-opacity-5 focus:border-opacity-20
                        outline-none
                        text-white text-xl font-thin
                        transition-all duration-200 ease-in-out
                    "
                />
                <textarea 
                    type="text"
                    placeholder="Talk to me about..."
                    onChange={e => setPrompt(e.target.value)}
                    value={prompt}
                    className="
                        placeholder:opacity-60
                        w-full p-2
                        flex justify-start items-center text-start
                        bg-white bg-opacity-0
                        border border-solid border-white border-opacity-10 rounded-lg
                        focus:bg-opacity-5 focus:border-opacity-20
                        outline-none
                        text-white text-xl font-thin
                        transition-all duration-200 ease-in-out
                        resize-none
                    "
                />
                <button type="button" className="px-4 py-2 rounded-lg bg-white text-lg" onClick={handleSetAlarm}>Done</button>
            </Drawer>
        </>
    )
}

export default ModifyAlarm;