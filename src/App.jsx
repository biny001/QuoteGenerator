import { useEffect, useState } from "react";

export default function App() {
  const [quote, setQuote] = useState("");
  const [quoteArray, setQuoteArray] = useState([]);

  function handleClick() {
    const random = Math.floor(Math.random() * quoteArray.length);
    if (!quoteArray) return;

    setQuote(quoteArray[random]);
  }
  const removeTypeFitFromAuthor = () => {
    const authorParts = quote.author.split(",");
    const author = authorParts[0].trim();
    return author;
  };

  useEffect(() => {
    async function GetQuote() {
      const res = await fetch("https://type.fit/api/quotes");

      const data = await res.json();
      setQuoteArray(data);
      setQuote(quoteArray[0]);
    }
    GetQuote();
  }, []);

  return (
    <>
      <div className="quote-generator-container">
        <div className="quote-text">
          {quote ? quote.text : "press button to generate quote"}
        </div>
        <div className="quote-author">
          {quote ? removeTypeFitFromAuthor() : ""}
        </div>
        <div>
          <button onClick={handleClick} className="generate-button">
            Generate Quote
          </button>
        </div>
      </div>
    </>
  );
}
