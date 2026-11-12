import asyncio
import json
import os
import edge_tts
import subprocess

SCRIPT_TEXT = (
    "Stop trusting your calendar! It is secretly lying to you right now. "
    "Think a year is 365 days? Earth actually takes 365 days, 5 hours, and 49 minutes to orbit the Sun. "
    "Ignore those extra six hours, and July drifts into freezing winter blizzards! "
    "That is why we drop in Leap Day, to brake human time and rescue our seasons. "
    "Follow right now for more cosmic revelations! "
    "Because if we do not reset orbital drift..."
)

VOICE = "en-US-ChristopherNeural"
RATE = "+8%"

async def generate():
    os.makedirs("public", exist_ok=True)
    os.makedirs("remotion/public", exist_ok=True)
    
    print(f"Generating TTS with voice: {VOICE}, rate: {RATE}")
    comm = edge_tts.Communicate(SCRIPT_TEXT, VOICE, rate=RATE, boundary="WordBoundary")
    
    audio_data = bytearray()
    raw_words = []
    
    async for chunk in comm.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            raw_words.append(chunk)
            
    # Write audio files
    for path in ["public/voiceover.mp3", "remotion/public/voiceover.mp3"]:
        with open(path, "wb") as f:
            f.write(audio_data)
        print(f"Saved audio to {path} ({len(audio_data)} bytes)")
        
    # Process word captions
    captions = []
    for item in raw_words:
        start_ms = round(item["offset"] / 10000)
        end_ms = round((item["offset"] + item["duration"]) / 10000)
        captions.append({
            "text": item["text"],
            "startMs": start_ms,
            "endMs": end_ms,
            "timestampMs": start_ms,
            "confidence": 1.0
        })
        
    # Write captions JSON
    for path in ["public/captions.json", "remotion/public/captions.json"]:
        with open(path, "w") as f:
            json.dump(captions, f, indent=2)
        print(f"Saved {len(captions)} word captions to {path}")
        
    # Verify timing
    first_word = captions[0]
    last_word = captions[-1]
    cta_word = next((w for w in captions if "Follow" in w["text"]), None)
    
    print("\n--- TIMING VERIFICATION ---")
    print(f"Total Words: {len(captions)}")
    print(f"First Word ('{first_word['text']}'): {first_word['startMs']/1000:.2f}s")
    if cta_word:
        print(f"CTA Word ('{cta_word['text']}'): {cta_word['startMs']/1000:.2f}s (Target: ~24.0s)")
    print(f"Last Word ('{last_word['text']}'): {last_word['endMs']/1000:.2f}s (Target: < 29.5s for 30s video)")
    
    # Generate ambient cosmic BGM with ffmpeg
    print("\nGenerating atmospheric cosmic background music with ffmpeg...")
    bgm_cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "anoisesrc=d=30:c=pink:r=44100:a=0.02",
        "-f", "lavfi", "-i", "sine=f=110:d=30",
        "-f", "lavfi", "-i", "sine=f=164.81:d=30",
        "-f", "lavfi", "-i", "sine=f=220:d=30",
        "-f", "lavfi", "-i", "sine=f=329.63:d=30",
        "-filter_complex",
        "[1:a]volume=0.15[s1];[2:a]volume=0.12[s2];[3:a]volume=0.1[s3];[4:a]volume=0.08[s4];"
        "[0:a][s1][s2][s3][s4]amix=inputs=5:duration=longest[mix];"
        "[mix]lowpass=f=450,chorus=0.7:0.9:55:0.4:0.25:2,aecho=0.8:0.88:60:0.4,afade=t=in:ss=0:d=1.5,afade=t=out:st=28.5:d=1.5[out]",
        "-map", "[out]", "-c:a", "libmp3lame", "-q:a", "2", "remotion/public/bgm.mp3"
    ]
    subprocess.run(bgm_cmd, check=True)
    subprocess.run(["cp", "remotion/public/bgm.mp3", "public/bgm.mp3"], check=True)
    print("Cosmic background music saved to remotion/public/bgm.mp3 and public/bgm.mp3")

if __name__ == "__main__":
    asyncio.run(generate())
