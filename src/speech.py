from elevenlabs.client import ElevenLabs
from elevenlabs import stream
import sys

def smthing(text):
  client = ElevenLabs(
    api_key="sk_da63b4614fe7425f373317605143cf76b63596a8d9cc8f22", # Defaults to ELEVEN_API_KEY
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