import { CohereClient } from "cohere-ai"
import { Message } from "cohere-ai/api/types/Message";
import * as readline from 'readline';


// ideas: add connectors
// somehow use rerank or classify (maybe to classify awake/sleepy responses)
// use user voice sentiment (do they sound awake)
// save user data in a dataset, then somehow use that to make the process better
// if there's any "how to wake up" data or research papers written, input it as RAG/context
// maybe add your schedule and it gives you a rundown


type ChatMessage = Message.Chatbot | Message.System | Message.User


const chat_preamble = (topic: string) => `
You are a friend of the user who is calling them in the morning to wake them up. You're goal is to converse with your friend
until they are fully awake. Never give them more time to sleep, always focus on waking them up as fast as possible.
Your friend asked you to talk about: "${topic}", but you may talk about other topics. Remember that your goal is to wake them up.
This is a voice conversation, so keep your messages short (to a maximum of around 2 scentences or 20 words), as if
you were having an audio conversation. Keep your language natural.
`
//If the conversation dies down a bit and your friend sounds sleepy, you may ask tell them about their schedule for the day.
// Only tell the user information about their schedule if they ask. If they don't ask information about their schedule, do NOT use the document data.
// If neither of the last 2 messages from the user are about their schedule, do not tell them information about their schedule.

const ready_preamble = () => `
You are a system that analyzes whether a user is fully awake in the morning, or if they they are still sleepy.
Look at the user's most recent messages and if the most of them sound more awake than sleepy or if they are saying goodbye, respond with the string: "TRUE".
If they don't, respond with the string "FALSE".
Only ever respond with "TRUE" or "FALSE".
`

const ready_message = (chatHistory: ChatMessage[]) => `
Based on the following 2 most recent messages from the user, are they fully awake?
"${chatHistory[chatHistory.length - 1].message}"
"${chatHistory[chatHistory.length - 3].message}"
`
//"${chatHistory[chatHistory.length - 5].message}"

const schedule_preamble = () => `
You are a system that analyzes a conversation between a user and a chatbot. Your goal is to determine whether any of the user's messages are
about the user's schedule or what they will do today.
You will recieve input in a list of the following format:
[{"role": "USER", "message": string},{"role": "CHATBOT", "message": string},{"role": "USER", "message": string}]
Where the "role" field defines who the message is from, and the "message" field is the message.
The last element in the list is the user's last message.
Using the context of all the messages, determine if the conversation is about the user's schedule.
If any of the user's messages are about their schedule or what they will do in the day, repond with the string: "TRUE". Otherwise, respond with the string: "FALSE". Only ever respond with "TRUE" or "FALSE".
`

const schedule_preamble2 = () => `
You will be presented with a chat conversation between a chatbot and a user.
Your goal is to determine whether the chatbot needs information about the user's schedule for the day to respond to the user.
You will recieve input in a list of the following format:
[{"role": "USER", "message": string},{"role": "CHATBOT", "message": string},{"role": "USER", "message": string}]
Where the "role" field defines who the message is from, and the "message" field is the message.
The last element in the list is the user's last message.
First think about how a chatbot may respond to the user, and if the chatbot would need the user's schedule for the day to respond, you should repond with the string: "TRUE". Otherwise, respond with the string: "FALSE". Only ever respond with "TRUE" or "FALSE".
The chatbot may need the user schedule for different reasons, such as: the user is asking about something they have today, or the user specifically asks for their schedule
`

const schedule_message = (chatHistoryStr: string) => `
Based on the following conversation, are any of the user's messages about their schedule or what they are doing in the day?
${chatHistoryStr}
`

const schedule_message2 = (chatHistoryStr: string) => `
Based on the conversation, does the chatbot need information about the user's schedule for the day to respond to the user?
${chatHistoryStr}
`

function createScheduleDocuments() {
    return [
        {
            "title": "Breakfast and Morning Prep 7:30 AM to 8:00 AM",
            "snippet": "Start the day with a quick breakfast, preparing mentally and physically for the busy day ahead. This is a great time to check emails, organize your backpack, and review your schedule."
        },
        {
            "title": "Calculus Lecture 8:30 AM to 9:30 AM",
            "snippet": "A core mathematics class covering concepts such as limits, derivatives, and integrals. The professor will go over example problems, provide theoretical background, and discuss homework assignments."
        },
        {
            "title": "Library Study Session 10:00 AM to 11:30 AM",
            "snippet": "A quiet period to review lecture notes, work on assignments, or prepare for upcoming exams. The library offers a peaceful environment, with access to resources for studying and collaboration."
        },
        {
            "title": "Lunch Break 12:00 PM to 12:45 PM",
            "snippet": "Time to relax and refuel with a healthy meal. Many students catch up with friends or eat solo while listening to podcasts or watching videos. This break is a chance to unwind before afternoon classes."
        },
        {
            "title": "Physics Lab 1:00 PM to 3:00 PM",
            "snippet": "Hands-on session where students conduct experiments to understand fundamental principles of physics. Lab reports are prepared at the end of the session, and teamwork is essential for success."
        },
        {
            "title": "Group Project Meeting 3:30 PM to 4:30 PM",
            "snippet": "Meet with classmates to discuss progress on a group assignment. Topics include task delegation, reviewing milestones, and preparing for upcoming deadlines. Collaboration is key to staying on track."
        },
        {
            "title": "Gym Workout 5:00 PM to 6:00 PM",
            "snippet": "An hour-long session at the campus gym to stay active and relieve stress. Popular activities include weightlifting, running, or participating in group fitness classes like yoga or cycling."
        },
        {
            "title": "Dinner and Relaxation 6:30 PM to 7:30 PM",
            "snippet": "A chance to unwind after a busy day. Many students enjoy dinner at the dining hall or cook in their apartments, followed by watching TV, reading, or engaging in hobbies."
        },
        {
            "title": "Study and Homework 8:00 PM to 10:00 PM",
            "snippet": "Time to complete assignments, review the day’s lectures, and prepare for upcoming tests. This study session is often spent alone or with classmates in a quiet space."
        },
        {
            "title": "There are no other events in the schedule.",
            "snippet": "There are no other events in the schedule."
        }
    ]
}

export default async function generateResponseWithSchedule(topic: string, msg: string, chatHistory: ChatMessage[]) {
    const cohere = new CohereClient({
        token: process.env.COHERE_API_KEY,
    });

    let ready = false
    console.log("length: ", chatHistory.length)
    if (chatHistory.length > 6) {
        const readyStr = await cohere.chat({
            message: ready_message(chatHistory),
            temperature: 0.1,
            preamble: ready_preamble()
        })

        ready = readyStr.text == "TRUE"

        if (ready) {
            chatHistory.push({role: "SYSTEM", message: "The user is now fully awake, time to say goodbye."})
        }
        console.log('Ready: ', ready)
    }

    // const aboutScheduleResponse = await cohere.chat({
    //     message: schedule_message(JSON.stringify(chatHistory.slice(-2).concat({role: "USER", message: msg}))),
    //     temperature: 0.1,
    //     preamble: schedule_preamble()
    // })

    const aboutScheduleResponse = await cohere.chat({
        message: schedule_message2(JSON.stringify(chatHistory.slice(-4).concat({role: "USER", message: msg}))),
        temperature: 0.1,
        preamble: schedule_preamble2(),
    })

    console.log("aboutScheduleResponse:", aboutScheduleResponse.text)
    const aboutSchedule = aboutScheduleResponse.text == "TRUE"

    const stream = await cohere.chatStream({
        message: msg,
        chatHistory: chatHistory,
        temperature: aboutSchedule ? 0.5: 0.7,
        preamble: chat_preamble(topic),
        documents: aboutSchedule ? createScheduleDocuments() : undefined
    });

    return {stream, ready}
}


async function runChat() {
    const topic = "I like to talk about turtles"
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
        const {stream, ready} = await generateResponseWithSchedule(topic, user, chatHistory)
        let chatbot = ""
        //process.stdout.write("CHATBOT: ")
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                process.stdout.write(chat.text)
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

        if (user == 'q') {
            break
        }
    }

    rl.close()
}


// if (require.main === module) {
//     runChat()
// }