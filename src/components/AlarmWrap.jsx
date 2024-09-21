import { useState } from "react";
import Alarm from "./Alarm";
import ModifyAlarm from "../pages/ModifyAlarm";

const AlarmWrap = ({handleToggleActive, setAlarms, alarms, info}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Alarm handleToggleActive={() => handleToggleActive(info.id)} setOpen={setOpen} info={info} />
            <ModifyAlarm setAlarms={setAlarms} alarms={alarms} info={info} open={open} setOpen={setOpen}/>
        </>
    )
}

export default AlarmWrap;