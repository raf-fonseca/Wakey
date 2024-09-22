from elevenlabs.client import ElevenLabs
from elevenlabs import stream
import sys

def smthing(text):
  client = ElevenLabs(
    api_key = process.env.ELEVENLABS_API_KEY,
  )

  audio_stream = client.generate(
    text=text,
    stream=True
  )

  stream(audio_stream)


smthing(sys.argv[1])
f = open("res.txt", "w")
f.write("DONE")
f.close()
sys.stdout.flush()
sys.exit(2)