# Wakey: The Alarm That Talks You Awake!

Waking up is tough—especially for heavy sleepers who can't seem to shake off the morning fog! We know how important it is to have a consistent morning routine, but traditional alarms just don’t cut it for many of us. So, we set out to build **Wakey**, an innovative solution to a common problem faced by students and anyone who struggles with waking up. Research shows that engaging in mentally stimulating activities or conversations can *boost* alertness—this became a core feature of our concept.

## How Wakey Works

The app doesn’t just ring; it makes sure you're truly awake! When setting the alarm, users pick a conversation topic. Once it goes off, they must have a full-on conversation with **Cohere's language model**. The twist? The alarm won’t stop until the LLM is satisfied that you’re actually awake! 😳

But that’s not all—Wakey takes it further by integrating with your personal calendar. It can answer questions about your upcoming day, giving you personalized reminders while you're still shaking off the sleep. 📅

## How We Built It

We developed a smooth voice interface using **speech-to-text** to capture user input, which is then sent to Cohere’s LLM. The response is converted back into speech, making the whole interaction feel natural. Thanks to real-time streaming through our backend, we keep everything super fast and responsive. For the calendar feature, we leveraged **Cohere’s RAG functionality**, allowing the LLM to pull relevant schedule information on-demand.

## Challenges We Conquered

One of our biggest hurdles was making all these different systems work together harmoniously. From ensuring reliable **speech-to-text** and **text-to-speech** performance to streaming data in real-time, each element required tight integration. But after lots of debugging and testing, we made it happen! 💪

## What We're Proud Of

As a team of beginner developers, reaching the finish line with a functional product was a massive achievement for us. Integrating cutting-edge technologies like LLMs and voice interfaces wasn’t easy, but we learned so much along the way. 🚀

## Lessons Learned

- Connecting frontend to backend systems.
- Tackling **mobile development**.
- Mastering **asynchronous functions** and Promises.

## What's Next for Wakey?

We’re excited to keep improving Wakey by enhancing personalization features, refining wake-up accuracy, and exploring integration with **smart home devices**! The possibilities are endless, and we can’t wait to take Wakey to the next level. 🎯

## Demo

Check out our demo video here: [Wakey Demo](https://youtu.be/4IO9Fpi7GPs)

## To start:
```
node express.js
npm run dev
```

An advanced alarm system that calls you and only hangs up once it is convinced you are awake
