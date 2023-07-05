const fs = require("fs");
const { Readable } = require("stream");
const { exec } = require("child_process");
const speech = require("@google-cloud/speech");

// Set threshold for audio detection
const THRESHOLD = 50;

// Set time limit for audio recording in seconds
const TIME_LIMIT = 20;

// Set path to directory where audio files will be stored
const AUDIO_DIR = "audio";

// Create audio directory if it doesn't exist
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR);
}

// Initialize recording variables
let frames = [];
let silenceCounter = 0;
let isRecording = true;
const startTime = Date.now();

// Initialize Google Cloud Speech client
const client = new speech.SpeechClient();

// Function to record audio
function recordAudio() {
  console.log("Recording...");

  // Initialize audio stream with a smaller buffer size
  const audioStream = exec("arecord -f S16_LE -r 44100 -c 1 -N -d 20");

  audioStream.stdout.on("data", (data) => {
    const pcmData = Buffer.from(data, "binary");

    // Collect audio frames
    frames.push(pcmData);

    // Check if audio input is below the threshold
    if (Math.max(...pcmData) < THRESHOLD) {
      silenceCounter++;
    } else {
      silenceCounter = 0;
    }

    // Stop recording if there is 3 seconds of silence or time limit has been reached
    if (
      silenceCounter > (1 * 44100) / 256 ||
      Date.now() - startTime > TIME_LIMIT * 1000
    ) {
      isRecording = false;
    }
  });

  audioStream.stderr.on("data", (error) => {
    console.error(`Error: ${error}`);
  });

  audioStream.on("close", () => {
    console.log("Stopped.");

    // Set unique filename for the audio file
    const filename = `./${AUDIO_DIR}/recording_${Date.now()}.wav`;

    // Write audio data to a wav file
    const outputStream = fs.createWriteStream(filename);
    const readableStream = new Readable();

    for (const frame of frames) {
      readableStream.push(frame);
    }

    readableStream.push(null);
    readableStream.pipe(outputStream);

    // Create a thread to transcribe the audio
    transcribeAudio(filename);
  });
}

// Function to transcribe audio
async function transcribeAudio(filename) {
  const file = fs.readFileSync(filename);
  const audioBytes = file.toString("base64");

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 44100,
    languageCode: "en-US",
  };

  const request = {
    audio: audio,
    config: config,
  };

  // Transcribe audio using Google Cloud Speech-to-Text API
  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    // Display transcription on screen
    console.log(transcription);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Start recording audio
recordAudio();