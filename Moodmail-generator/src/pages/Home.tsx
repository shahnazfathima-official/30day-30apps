import React, { useState } from "react";
import MoodInput from "@/components/Moodinput";
import MoodOutput from "@/components/MoodOutput";

const Home = () => {
  const [mood, setMood] = useState("");
  const [subject, setSubject] = useState("");
  const [footer, setFooter] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    // Simulate generating subject and footer based on mood
    const lowerMood = mood.toLowerCase();
    const today = new Date();
    const dateStr = today.toLocaleDateString();
    let subjectText = "Mood Update";
    let footerText = "Catch you later!";
    if (lowerMood.includes("happy")) {
      subjectText = "Feeling Great!";
      footerText = "Stay positive and keep smiling!";
    } else if (lowerMood.includes("sad")) {
      subjectText = "Just another tough day";
      footerText = "Remember, tomorrow is a new day.";
    } else if (lowerMood.includes("angry")) {
      subjectText = "Need to cool down";
      footerText = "Take deep breaths and stay calm.";
    } else if (lowerMood.includes("excited")) {
      subjectText = "Bursting with Excitement!";
      footerText = "Can't wait to share more thrilling moments with you!";
    } else if (lowerMood.includes("anxious")) {
      subjectText = "Feeling a Bit Overwhelmed";
      footerText = "Taking it one step at a time. Breathe and believe.";
    } else if (lowerMood.includes("grateful")) {
      subjectText = "Full of Gratitude Today";
      footerText = "Thankful for the little things that make life beautiful.";
    } else if (lowerMood.includes("tired")) {
      subjectText = "Running on Low Energy";
      footerText = "Time to recharge and rest. Tomorrow will be better.";
    } else if (lowerMood.includes("hopeful")) {
      subjectText = "Looking Forward to Brighter Days";
      footerText = "Keep the faith—good things are on the way!";
    } else if (lowerMood.includes("nostalgic")) {
      subjectText = "Lost in Memories";
      footerText = "Cherishing the past while embracing the present.";
    } else if (lowerMood.includes("confused")) {
      subjectText = "Mixed Feelings Today";
      footerText = "Sometimes it's okay not to have all the answers.";
    }
    setSubject(`${subjectText}  (${dateStr})`);
    setFooter(footerText);
    setGenerated(true);
  }
    const handleReset = () => {
        setMood("");
        setSubject("");
        setFooter("");
        setGenerated(false);
    };

  const moodSuggestions = [
    "Happy", "Sad", "Angry", "Excited", "Anxious", "Grateful", "Tired", "Hopeful", "Nostalgic", "Confused"
  ];

  return (
    <div className='max-w-xl mx-auto mt-20 p-6 shadow-sm bg-white space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800'>MoodMail Generator</h2>

      <MoodInput
        mood={mood}
        setMood={setMood}
        onGenerate={handleGenerate}
        disabled={generated}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {moodSuggestions.map((m) => (
          <button
            key={m}
            type="button"
            className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300 cursor-pointer"
            onClick={() => setMood(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <MoodOutput 
        subject={subject}
        footer={footer}
        onReset={handleReset}
      />
    </div>
  );
};

export default Home;