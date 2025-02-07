import React from 'react';
import { useParams } from 'react-router-dom';
import './InvestmentDetail.css';

const InvestmentDetail = () => {
  const { optionId } = useParams();
  const formattedOption = optionId.replace(/-/g, ' ').toUpperCase();

  return (
    <div>
      <h2 className="text-3xl font-bold text-purple-700">{formattedOption}</h2>
      <div className='box-id'>
      <section className="mt-4-id">
        <h3 className="text-xl font-semibold text-purple-600">Understanding the Risks</h3>
        <p>Details about potential risks involved in {formattedOption.toLowerCase()}.</p>
      </section> 
      <section className="mt-4-id">
        <h3 className="text-xl font-semibold text-purple-600">Visual Presentations</h3>
        <p>Charts and data visualizations to help understand {formattedOption.toLowerCase()} trends.</p>
      </section>
      <section className="mt-4-id">
        <h3 className="text-xl font-semibold text-purple-600">How to Start</h3>
        <p>Step-by-step guide on how to begin investing in {formattedOption.toLowerCase()}.</p>
      </section>
      <section className="mt-4-id">
        <h3 className="text-xl font-semibold text-purple-600">Dos and Don'ts</h3>
        <p>Key points to remember while investing in {formattedOption.toLowerCase()}.</p>
      </section>
    </div>
    </div>
  );
};

export default InvestmentDetail;