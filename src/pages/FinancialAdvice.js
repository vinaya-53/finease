import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import "./FinancialAdvice.css";

const FinancialAdvice = () => {
  const location = useLocation();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const stockData = location.state?.stockData || {}; // Receive stock data from previous page

  const handleAdviceRequest = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a financial advisor, acting as a personal chartered accountant (CA). Your goal is to provide accurate, reliable, and insightful financial advice to help users make informed decisions about their finances.",
            },
            {
              role: "user",
              content: `User's financial data: Company: ${stockData.companyName}, Current Price: ${stockData.currentPrice}, Market Cap: ${stockData.marketCap}, P/E Ratio: ${stockData.peRatio}, Dividend Yield: ${stockData.dividendYield}.`,
            },
            { role: "user", content: question },
          ],
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0]?.message?.content || "No response received.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <div className="container-page-f">
      <h2 className="h2-f">
         Financial Advice (AI-powered)
      </h2>
<div className="container-main-f">
    <div className="container-flex-f">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Company Information</h5>
          <p className="card-text">Company: {stockData.companyName}</p>
          <p className="card-text">Current Price: ${stockData.currentPrice}</p>
          <p className="card-text">Market Cap: ${stockData.marketCap}</p>
          <p className="card-text">P/E Ratio: {stockData.peRatio}</p>
          <p className="card-text">
            Dividend Yield: {stockData.dividendYield}%
          </p>
        </div>
      </div>
      

      <div >
      <div className="textbox-f">
        <textarea
          className="form-control"
          placeholder="Ask your financial question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="btn-f"><Button
        className={`btn btn-primary ${loading ? "disabled" : ""}`}
        onClick={handleAdviceRequest}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Advice"}
      </Button>
      </div>
      </div>
      </div>

      <div className="ai">
        <textarea className="ai mt-4 p-4 bg-light border rounded">
        {loading
          ? "⏳ Fetching advice..."
          : response || "AI response will appear here."}
          </textarea>
      </div>
    </div>
    </div>
  );
};

export default FinancialAdvice;
