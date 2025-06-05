import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";

import { useSpeechSynthesis } from "react-speech-kit";

const api = "https:/yurippe.vercel.app/api/quotes?character=";

function App() {
  const [name, setName] = useState("itachi");
  const [allQuotes, setAllQuotes] = useState([]);

  const { speak } = useSpeechSynthesis();

  async function getQuote() {
    setAllQuotes([]);
    try {
      const request = await fetch(`${api}${name}`);
      const response = await request.json();
      if (response.message) {
        return;
      }

      setAllQuotes(() => response);
      console.log("hiii");
      console.log(response);
    } catch (error) {
      console.log("Unable to get quotes ... ");
      setAllQuotes([{ quote: "Quotes not Availlable :( ..." }]);
      throw error;
    }

    


  }


  useEffect(() => {
    const audio = document.getElementById("bg-music");

    const enableAudio = () => {
      audio.muted = false;
      audio.volume = 0.2
      audio.play().catch((err) =>
        console.log("Erreur de lecture audio :", err)
      );
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);
  }, []);
  return (
    <>
    <audio id="bg-music" src="/naruto.mp3" autoPlay muted loop />

      <div className="container">
        <div>
          <h1>Anime Quotes by 2xDiallo</h1>
          <div>
            <div className="nameContainer">
              <input
                type="text"
                id="name"
                placeholder="Enter the Name : "
                onChange={(e) => setName(e.target.value)}
              />
              <button type="button" onClick={() => getQuote()}>
                Get a Quote
              </button>
            </div>
            {allQuotes.map((quote) => {
              return (
                <ul key={quote._id}>
                  <li>{quote.quote}</li>
                  <li style={{ color: "orangered" }}>{quote.character}</li>
                  <button onClick={() => speak({ text: `${quote.quote}` })}>
                    Speak
                  </button>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
