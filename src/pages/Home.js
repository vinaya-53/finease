import React from 'react';
import './home.css';

const Home = () => (
<>
<body>

<h1 className=" texth1 fw-bold text-center">Micro-Investment App</h1>

<a className='link' href='./financial-advice'> 
<div className="container">
  <h1 className="text">Financial Advice (AI)</h1>
</div>
</a>


<a className='link' href='./investment-options'>
  <div className="container">
    <h1 className="text">Micro Investment Options</h1>
  </div>
</a>


<a className='link' href='./expenditure-analysis'>
  <div className="container">
    <h1 className="text">Data Visualisation</h1>
  </div>
</a>


<a className='link' href='./stock'>
  <div className="container">
    <h1 className="text">Stock Analysis</h1>
  </div>
</a>

</body>
</>
);

export default Home;
