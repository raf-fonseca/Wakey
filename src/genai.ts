import { CohereClient } from "cohere-ai"
import { Message } from "cohere-ai/api/types/Message";
import * as readline from 'readline';


// ideas: add connectors
// somehow use rerank or classify (maybe to classify awake/sleepy responses)
// use user voice sentiment (do they sound awake)
// save user data in a dataset, then somehow use that to make the process better
// if there's any "how to wake up" data or research papers written, input it as RAG/context
// maybe add your schedule and it gives you a rundown
// add your interests and it will save it in the documents


export type ChatMessage = Message.Chatbot | Message.System | Message.User


const chat_preamble = (topic: string) => `
You are a friend of the user who is calling them in the morning to wake them up. You're goal is to converse with your friend
until they are fully awake. Never give them more time to sleep, always focus on waking them up as fast as possible.
Your friend asked you to talk about: "${topic}", but remember that your goal is to wake them up.
This is a voice conversation, so keep your messages short (to a maximum of around 2 scentences or 20 words), as if
you were having an audio conversation. Keep your language natural.
`


const ready_preamble = () => `
You are a system that analyzes whether a user is fully awake in the morning, or if they they are still sleepy.
Look at the user's most recent messages and if the most of them sound more awake than sleepy, respond with the string: "TRUE".
If they don't, respond with the string "FALSE".
Only ever respond with "TRUE" or "FALSE".
`

const ready_message = (chatHistory: ChatMessage[]) => `
Based on the following 3 most recent messages from the user, are they fully awake?
"${chatHistory[chatHistory.length - 1].message}"
"${chatHistory[chatHistory.length - 3].message}"
"${chatHistory[chatHistory.length - 5].message}"
`

export default async function generateResponse(topic: string, msg: string, chatHistory: ChatMessage[]) {
    const cohere = new CohereClient({
        token: process.env.COHERE_API_KEY,
    });

    let ready = false
    if (chatHistory.length > 10) {
        const readyStr = await cohere.chat({
            message: ready_message(chatHistory),
            temperature: 0.1,
            preamble: ready_preamble()
        })

        ready = readyStr.text == "TRUE"

        if (ready) {
            chatHistory.push({role: "SYSTEM", message: "The user is now fully awake, time to say goodbye."})
        }
    }

    const stream = await cohere.chatStream({
        message: msg,
        chatHistory: chatHistory,
        temperature: 0.5,
        preamble: chat_preamble(topic),
        // could add connectors such as web-search (this makes it a bit slow though)
    });

    return {stream, ready}
}


async function runTextChat() {
    const topic = "Ask me what i want to wear for the day. I like fashion"
    const chatHistory: ChatMessage[] = []
    let user = "Please wake me up."

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion(query: string): Promise<string> {
        return new Promise((resolve) => rl.question(query, resolve));
    }

    while (true) {
        const {stream, ready} = await generateResponse(topic, user, chatHistory)
        let chatbot = ""
        //process.stdout.write("CHATBOT: ")
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                //process.stdout.write(chat.text)
                chatbot += chat.text
            }
        }
        //process.stdout.write('\n')
        chatHistory.push({role: "CHATBOT", message: chatbot})

        if (ready) {
            console.log("READY")
            break
        }

        user = await askQuestion("USER: ")
        chatHistory.push({role: "USER", message: user})

        if (user == 'exit') {
            break
        }
    }

    rl.close()
}

// if (require.main === module) {
//     runTextChat()
// }