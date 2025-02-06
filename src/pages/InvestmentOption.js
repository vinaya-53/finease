import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import '../pages/InvestmentOption.css'

const InvestmentOptions = () => {
  const options = [
    'Mutual Funds', 'ETFs', 'Bonds', 'Real Estate', 'Cryptocurrencies', 'Savings Plans'
  ];

  return (
    <body>
    <div className='container'>
      {options.map((option, index) => (
        <Card key={index}>
          <CardContent>
            <h3 className="text-center text-xl font-bold text-purple-600">{option}</h3>
            <Link to={`/investment-options/${option.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button className='button'>Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
      </div>
    </body>
  );
};

export default InvestmentOptions;