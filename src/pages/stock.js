import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./stock.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const StockDetailPage = () => {
  const [companySymbol, setCompanySymbol] = useState("AAPL");
  const [stockData, setStockData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Use navigate instead of history

  const companies = [
    { symbol: "AAPL", name: "Apple" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "GOOGL", name: "Google" },
    { symbol: "AMZN", name: "Amazon" },
    { symbol: "TSLA", name: "Tesla" },
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);

        // Make API requests
        const priceRes = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companySymbol}&apikey=${process.env.Alpha_Vantage_API_KEY}`
        );
        const overviewRes = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companySymbol}&apikey=${process.env.Alpha_Vantage_API_KEY}`
        );

        // Check if the API response has the necessary data
        if (!priceRes.data["Time Series (Daily)"] || !overviewRes.data.Name) {
          throw new Error("No stock data available for this symbol");
        }

        // If the API responds correctly, process the data
        const timeSeries = priceRes.data["Time Series (Daily)"];
        const graphLabels = Object.keys(timeSeries).slice(0, 30); // Get the first 30 days
        const graphValues = graphLabels.map(
          (date) => timeSeries[date]["4. close"]
        ); // Get the closing prices

        setGraphData({
          labels: graphLabels,
          datasets: [
            {
              label: `${companySymbol} Stock Price`,
              data: graphValues,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });

        setStockData({
          companyName: overviewRes.data.Name,
          currentPrice: overviewRes.data.Price,
          marketCap: overviewRes.data.MarketCapitalization,
          peRatio: overviewRes.data.PERatio,
          dividendYield: overviewRes.data.DividendYield,
        });

        const prices = graphValues.map((price) => parseFloat(price));
        const volatility = calculateVolatility(prices);
        setRiskLevel(volatility > 5 ? "High Risk" : "Low Risk");
      } catch (error) {
        console.error("Error fetching stock data:", error.message);

        // Fallback to dummy data if API limit is hit or data is missing
        setGraphData({
          labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
          datasets: [
            {
              label: `${companySymbol} Stock Price`,
              data: [150, 155, 158, 160, 162],
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });

        setStockData({
          companyName: "Dummy Company",
          currentPrice: 155,
          marketCap: "500 Billion", // Arbitrary value
          peRatio: 25, // Arbitrary value
          dividendYield: "2", // Arbitrary value
        });

        setRiskLevel("Low Risk"); // Default risk
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [companySymbol]);

  const calculateVolatility = (prices) => {
    let sum = 0;
    let mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    prices.forEach((price) => {
      sum += Math.pow(price - mean, 2);
    });
    const variance = sum / prices.length;
    return Math.sqrt(variance);
  };

  const handleLearnMoreClick = () => {
    navigate("/financial-advice", { state: { stockData } }); // Use navigate instead of history.push
  };

  return (
    <Container className="mt-5 conts">
    
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {companies.find((company) => company.symbol === companySymbol)
                ?.name || "Select a Company"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {companies.map((company) => (
                <Dropdown.Item
                  key={company.symbol}
                  onClick={() => setCompanySymbol(company.symbol)}
                >
                  {company.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        
          <Card className="h-100-s">
            <Card.Body className="card-s">
              <Card.Title className="title-s">Stock Details</Card.Title>
              {loading ? (
                <div>Loading...</div>
              ) : stockData ? (
                <> 
                  <h4>{stockData.companyName}</h4>
                  <p>Market Cap: ${stockData.marketCap}</p>
                  <p>P/E Ratio: {stockData.peRatio}</p>
                  <p>Dividend Yield: {stockData.dividendYield}%</p>
                </>
              ) : (
                <p>Data not available</p>
              )}
            </Card.Body>
          </Card>
        
          <Card className="h-100-s">
            <Card.Body className="card-s">
              <Card.Title className="title-s">Stock Price Graph</Card.Title>
              {graphData ? (
                <Line data={graphData} />
              ) : (
                <div>No graph data available</div>
              )}
            </Card.Body>
          </Card>
        
      

      <Row>
        <Col>
          <Card className="h-100-s h-100-s2 ">
            <Card.Body className="card-s">
              <Card.Title className="title-s">Risk Assessment</Card.Title>
              <p>Risk Level: {riskLevel}</p>
              <Button className="btn-s" variant="info" onClick={handleLearnMoreClick}>
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StockDetailPage;
