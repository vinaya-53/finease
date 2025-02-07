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
    <div className='container-io'>
      {options.map((option, index) => (
        <Card key={index} className='card-io'>
          <CardContent >
            <h3>{option}</h3>
            <Link to={`/investment-options/${option.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button className='button-io'>Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
      </div>
    </body>
  );
};

export default InvestmentOptions;