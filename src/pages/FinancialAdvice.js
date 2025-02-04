import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from "../components/Button";

const FinancialAdvice = () => {
  const location = useLocation();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const stockData = location.state?.stockData || {}; // Receive stock data from previous page

  const handleAdviceRequest = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a financial advisor, acting as a personal chartered accountant (CA). Your goal is to provide accurate, reliable, and insightful financial advice to help users make informed decisions about their finances." },
            { role: "user", content: `User's financial data: Company: ${stockData.companyName}, Current Price: ${stockData.currentPrice}, Market Cap: ${stockData.marketCap}, P/E Ratio: ${stockData.peRatio}, Dividend Yield: ${stockData.dividendYield}.` },
            { role: "user", content: question }
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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-purple-700">💰 Financial Advice (AI-powered)</h2>
      
      <p>Here is the data for the selected company:</p>
      <p>Company: {stockData.companyName}</p>
      <p>Current Price: ${stockData.currentPrice}</p>
      <p>Market Cap: ${stockData.marketCap}</p>
      <p>P/E Ratio: {stockData.peRatio}</p>
      <p>Dividend Yield: {stockData.dividendYield}%</p>

      <textarea
        className="w-full p-3 border rounded mt-4 text-gray-700"
        placeholder="Ask your financial question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />

      <Button
        className={`mt-3 px-4 py-2 rounded ${loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"} text-white`}
        onClick={handleAdviceRequest}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Advice"}
      </Button>

      <div className="mt-4 p-4 bg-gray-100 rounded min-h-[100px] border text-gray-800">
        {loading ? "⏳ Fetching advice..." : response || "AI response will appear here."}
      </div>
    </div>
  );
};

export default FinancialAdvice;
