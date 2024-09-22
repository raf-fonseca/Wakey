import { StreamedChatResponse } from "cohere-ai/api";
import { Stream } from "cohere-ai/core";
import generateResponse, { ChatMessage } from "./genai";
import { listenWrapper } from "./listen.cjs";
import generateResponseWithSchedule from "./genai_with_schedule";
import axios from "axios";


async function consoleSpeak(stream: Stream<StreamedChatResponse>) {
    let chatbot = ""
    for await (const chat of stream) {
        if (chat.eventType === "text-generation") {
            //process.stdout.write(chat.text)
            console.log(chat.text)
            chatbot += chat.text
        }
    }
    //process.stdout.write('\n')
    return chatbot
}

export default async function runChat(topic: string, setChatBot: any, setUser: any, end: any, setIsChatSpeaking: any) {
    axios.defaults.baseURL = 'http://localhost:3001';
    console.log("HEREEE")
    console.log(setChatBot)
    if (!setChatBot) {
        setChatBot = consoleSpeak
    }
    const chatHistory: ChatMessage[] = []
    let user = "Please wake me up."

    while (true) {
        const {stream, ready} = await generateResponseWithSchedule(topic, user, chatHistory)
        //process.stdout.write("CHATBOT: ")
        setIsChatSpeaking(true)
        const chatbot = await setChatBot(stream)
        await axios.post('/api/speak', {data: {text: chatbot}, headers: {'Access-Control-Allow-Origin' : '*'}})
        console.log("CHATBOT: ", chatbot)
        chatHistory.push({role: "CHATBOT", message: chatbot})
        if (ready) {
            console.log("READY")
            break // here we also want to end 
        }

        // process.stdout.write("USER: ")
        console.log("USER: ")
        setIsChatSpeaking(false)
        user = ''
        while (user == '') {
            const response = await axios.get('/api/listen', {headers: {'Access-Control-Allow-Origin' : '*'}})
            user = response.data.user
            setUser(user)
            console.log("USER::", user)
        }
        chatHistory.push({role: "USER", message: user})

        // if (true) {
        //     break
        // }
    }

    console.log("ALL DONE")
    end()
}

// if (require.main === module) {
//     runChat("Ask me what I want to wear for the day. I like fashion", undefined)
// }