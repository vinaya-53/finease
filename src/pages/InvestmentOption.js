import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';

const InvestmentOptions = () => {
  const options = [
    'Mutual Funds', 'ETFs', 'Bonds', 'Real Estate', 'Cryptocurrencies', 'Savings Plans'
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option, index) => (
        <Card key={index} className="hover:shadow-2xl transition cursor-pointer">
          <CardContent>
            <h3 className="text-xl font-bold text-purple-600">{option}</h3>
            <Link to={`/investment-options/${option.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button className="mt-2 bg-lilac-500 text-white">Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentOptions;