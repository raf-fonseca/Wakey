import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { PiDotOutlineFill } from "react-icons/pi";


const CallPage = ({isChatSpeaking, chatBotText, userText}) => {
    return (
        <section
            className="
                h-full w-full flex flex-col justify-start items-center gap-8
            "
        >
            <button 
                type="button"
                className={` flex flex-col justify-center items-center rounded-lg px-4 py-6 flex-[0.1] w-full h-full text text-base  font-light expandAnimation ${isChatSpeaking ? 'text-green-100 bg-green-600' : 'text-sky-100 bg-sky-600'} transition-all ease-in-out duration-500`}
            >
                {isChatSpeaking ? 'Wakey Speaking' : 'You\'re Speaking'}
            </button>
            <button 
                type="button"
                className={`bg-green-50 flex flex-col justify-center items-center rounded-lg px-4 py-6 ${isChatSpeaking ? 'flex-[0.7]' : 'flex-[0.2]'} w-full h-full font-extralight text-xl tracking-wide text-green-600 relative transition-all ease-in-out duration-500`}
            >
                <p className="z-50">
                    {chatBotText}
                </p>
            </button>
            <button 
                type="button"
                className={`bg-sky-50 flex relative flex-col items-center rounded-lg px-4 py-6 flex-[0.3] w-full h-full justify-center font-extralight text-xl text-sky-600 tracking-wide transition-all ease-in-out duration-500 ${!isChatSpeaking ? 'flex-[0.7]' : 'flex-[0.2]'}`}
            >
                {!isChatSpeaking ? <div class="dot-flashing"></div> : userText}
                <div className={`text-4xl ${isChatSpeaking ? 'bg-sky-100 text-sky-950' : 'bg-sky-50 text-sky-600'} rounded-full aspect-square -bottom-4 absolute transition-all ease-in-out duration-500`}>
                    {isChatSpeaking ? <CiMicrophoneOff/> : <CiMicrophoneOn/>}
                </div>
            </button>
        </section>
    )
}

export default CallPage;
