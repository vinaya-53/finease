import React from 'react';
import './home.css';

const Home = () => (
<> 
<body>

<h1 className="h1-h">MICRO-INVESTMENT APP</h1>

<div className='main-container-h'>

<a className='link-h' href='./financial-advice'> 
<div className="container-h">
  <h1 className="text-h">Financial Advice (AI)</h1>
</div>
</a>


<a className='link-h' href='./investment-options'>
  <div className="container-h">
    <h1 className="text-h">Micro Investment Options</h1>
  </div>
</a>

 
<a className='link-h' href='./expenditure-analysis'>
  <div className="container-h">
    <h1 className="text-h">Data Visualisation</h1>
  </div>
</a>


<a className='link-h' href='./stock'>
  <div className="container-h">
    <h1 className="text-h">Stock Analysis</h1>
  </div>
</a>
</div>
</body>
</>
);

export default Home;
