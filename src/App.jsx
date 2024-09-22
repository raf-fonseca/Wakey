import { useState, useEffect } from "react";
import Navbar from './components/Navbar.jsx';
import ClockPage from "./pages/ClockPage.jsx";
import AlarmsPage from "./pages/AlarmsPage.jsx";
import AlarmPage from "./pages/AlarmPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import { ALARM_ARRAY } from "./alarm.js";

function App() {
  const [alarms, setAlarms ] = useState(ALARM_ARRAY);
  const [activePage, setActivePage] = useState('Alarm');
  const [alarmActive, setAlarmActive] = useState({bool: false, alarm: undefined});

  const checkAlarm = () => {
    const date = new Date;
    var minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    var hours = date.getHours().toString();
    hours = hours.length === 1 ? `0${hours}` : hours;

    const time = `${hours}:${minutes}`;
    const alarm = alarms.find(alarm => alarm.time === time);

    if(!alarm || alarm.enabled == false) {
      //console.log('no alarm')
      return;
    } else {
      setAlarmActive({bool: true, alarm: alarm})
      //console.log('yipie')
    };
  }

  useEffect(() => {
    setInterval(() => {
      checkAlarm();
      // console.log(alarms)
    }, 1000);
  }, [alarms]);

  return (
    <main
      className="max-h-full relative h-dvh flex flex-col justify-start items-center gap-4 bg-[#1f1f1f] overflow-hidden xl:px-80 xl:pb-10 xl:pt-5 lg:px-60 md:px-40 md:pb-5 sm:px-10 pb-3 px-4 "
    >
      {alarmActive.bool && <AlarmPage alarmActive={alarmActive} setAlarmActive={setAlarmActive} />}
      <div
        className="h-full flex-[0.1] w-full min-h-max mt-2" 
      >
        <Navbar activePage={activePage} setActivePage={setActivePage}/>
      </div>
        <AlarmsPage activePage={activePage} alarms={alarms} setAlarms={setAlarms} setAlarmActive={setAlarmActive}/>
    </main>
  )
}

export default App
