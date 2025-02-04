import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => (
  <div className="flex flex-col items-center p-6 space-y-4">
    <h1 className="text-3xl font-bold text-purple-700">Micro-Investment App</h1>
    <Link to="/financial-advice">
      <Button className="bg-purple-500 text-white hover:bg-purple-600 transition">
        Financial Advice (AI)
      </Button>
    </Link>
    <Link to="/investment-options">
      <Button className="bg-lilac-500 text-white hover:bg-lilac-600 transition">
        Micro-Investment Options
      </Button>
    </Link>
    <Link to="/expenditure-analysis">
      <Button className="bg-lilac-500 text-white hover:bg-lilac-600 transition">
        data-visualisation
      </Button>
    </Link>
    <Link to="/stock">
      <Button className="bg-lilac-500 text-white hover:bg-lilac-600 transition">
        stock-analysis
      </Button>
    </Link>
  </div>
);

export default Home;
