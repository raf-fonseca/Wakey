import speech from "@google-cloud/speech";
// @ts-ignore
import * as recorder from 'node-record-lpcm16';

let finalTranscript = "";

export default async function listen() {
  return new Promise((resolve, reject) => {
    const client = new speech.SpeechClient({
      keyFilename: './htnproject-fa322c7140ed.json'
    });

    const recognizeStream = client
      .streamingRecognize({
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          enableSpeakerDiarization: true,
          model: 'latest_long',
        },
        interimResults: true,
      })
      .on('error', (err) => {
        console.error(err);
        console.log("error happened!")
        // reject(err); // Reject promise on error
      })
      .on('data', (data) => {
        //process.stdout.write(data.results[0]?.alternatives?.[0]?.transcript.toString().split(' ').slice(-1)[0] + ' ')
        // process.stdout.write("USER: " + data.results[0]?.alternatives?.[0]?.transcript);
        // process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        console.log("USER: ", data.results[0]?.alternatives?.[0]?.transcript)

        if (data.results[0]?.isFinal) {
          // Save the final sentence to the variable
          finalTranscript = data.results[0]?.alternatives?.[0]?.transcript;
          console.log(`Final transcript: ${finalTranscript}`);

          // End the recognize stream when final transcript is received
          recognizeStream.end()
          }
      })
      .on('end', () => {
        console.log("streamingRecognize ended");
        // return finalTranscript;
        resolve(finalTranscript); // Resolve the promise with the final transcript
      });

    // Create a writable stream to save the captured audio
    const audioStream = recorder.default.record({
        sampleRate: 16000, // Sample rate (adjust as needed)
        channels: 1, // Mono audio
        audioType: 'raw', // Output audio type
    }).stream();

    audioStream.pipe(recognizeStream);

    audioStream.on('end', () => {
      console.log("audioStream ended");
    });
  });
}

export async function listenWrapper() {
  try {
    const result = await listen();
    // const cohereResult = await callCohere(result)
    console.log("In listenWrapper", { result });
    return result;
  } catch (error) {
    console.error("Error in listenWrapper:", error);
  }

  return "EMPTY"
}

if (require.main === module) {
  console.log("Entry Point (Printed first)");
  listenWrapper();
}
