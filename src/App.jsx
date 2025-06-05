import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const api = "https:/yurippe.vercel.app/api/quotes?character=";

function App() {
  const [name, setName] = useState("itachi");
  const [allQuotes, setAllQuotes] = useState([]);

  async function getQuote() {
    setAllQuotes([])
    try {
      const request = await fetch(`${api}${name}`);
    const response = await request.json();
    if(response.message){
      return
    }

    setAllQuotes(() => response);
    console.log("hiii");
    console.log(response);
    } catch (error) {
      console.log("Unable to get quotes ... ")
      setAllQuotes([{quote:"Quotes not Availlable :( ..."}])
      throw error
      
    }
  }
  return (
    <>
      <div className="container">
        <div>
          <h1>Anime Quotes by 2xDiallo</h1>
          <div>
           <div className="nameContainer">
             <input type="text" id="name" placeholder="Enter the Name : " onChange={(e)=>setName(e.target.value)} />
            <button type="button" onClick={() => getQuote()}>
              
              Get a Quote
            </button>
           </div>
            {allQuotes.map((quote) => {
              return (
                <ul key={quote._id}>
                  <li>{quote.quote}</li>
                  <li style={{color:"orangered"}}>{quote.character}</li>
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
