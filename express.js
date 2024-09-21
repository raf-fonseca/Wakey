import express from "express"
import cors from 'cors'
import {exec, spawn} from 'child_process'
import { listenWrapper } from "./src/listen.js";
//import { listenWrapper } from "./src/hi.js"; ///Users/alejandro/VSCodeProjects/Wakey/src/listen.ts
import { promises as fs } from 'fs';
import { ElevenLabsClient, play } from "elevenlabs";

const app = express();
const port = 3001;

//app.use(express.static('public'))
app.use(cors())
app.use(express.json());

async function handleVoicePython(chatbot) {
  console.log('CALLING PYTHON')
  exec(`python3 ./src/speech.py "${chatbot}"`)

  console.log("WAITING")
  while (true) {
    const data = await fs.readFile('res.txt', 'utf8')
    if (data == 'DONE') break
  }
  console.log('DONE')
  await fs.writeFile('res.txt', 'HELLO', 'utf-8');
}

async function handleVoiceTS(chatbot) {
  const elevenlabs = new ElevenLabsClient({
    apiKey: "sk_da63b4614fe7425f373317605143cf76b63596a8d9cc8f22" // Defaults to process.env.ELEVENLABS_API_KEY
  })
  
  const audio = await elevenlabs.generate({
    voice: "Sarah",
    text: chatbot,
    stream: true
  });
  
  await play(audio);
}

app.get('/api/listen', async (req, res) => {
  const user = await listenWrapper()
  const data = { user: user };
  res.header("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.post('/api/speak', async (req, res) => {
  await handleVoiceTS(req.body.data.text)
  res.json({})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
