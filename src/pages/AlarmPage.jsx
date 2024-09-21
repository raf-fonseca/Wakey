import { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import CallPage from "./CallPage";
import { useState } from "react"
import runChat from '../speech_chat.ts'
import sound from '../public/ring.mp3'


const ring = new Audio(sound);
ring.currentTime = 2.9;
const AlarmPage = ({alarmActive, setAlarmActive}) => {
    const [isRinging, setIsRinging] = useState(true)

    useEffect(() => {
        if(!isRinging) {
            ring.pause()
        }
    }, [isRinging])

    useEffect(() => {
        if (isRinging && ring) {
            ring.play();
        }
    }, [isRinging]);


    const [chatBotText, setChatBotText] = useState('')
    const [userText, setUserText] = useState('')
    const [isChatSpeaking, setIsChatSpeaking] = useState(true)

    const setChatBot = async (stream) => {
        let chatbot = ""
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                chatbot += chat.text
                setChatBotText(chatbot)
            }
        }
        setChatBotText(chatbot)
        return chatbot
    }

    const setUser = async (text) => {
        setUserText(text)
        return text
    }

    const end = () => {
        setAlarmActive(prev => {return {...prev, bool: false}})
    }

    return (
        <div
            className="
                backdrop-blur-lg
                h-dvh z-50 w-dvw bg-black bg-opacity-60
                fixed top-0 left-0
                flex flex-col justify-between items-center
                py-12 px-6
            "
        >
            {
                isRinging ?
                <>
                    <h1
                        className="text-8xl text-white font-thin w-full text-center"
                    >
                        WAKEY WAKEY
                    </h1>
                    <FaBell className="bell text-9xl" />
                    <button
                        onClick={() => {
                            var prompt = "talk to me about turtles";
                            if(alarmActive.alarm) prompt = alarmActive.alarm.prompt;
                            setIsRinging(false)
                            ring.pause()
                            runChat(prompt, setChatBot, setUser, end, setIsChatSpeaking)
                            console.log('do the cohere thing')
                        }}
                        className="
                            text-6xl
                            bg-green-500 text-white p-8
                            shadow-2xl
                            rounded-full aspect-square
                        "
                    >
                        <FaPhone/>
                    </button>
                </>
                :
                <CallPage isChatSpeaking={isChatSpeaking} chatBotText={chatBotText} userText={userText} />
            }
        </div>
    )
}

export default AlarmPage;