import { useEffect, useState } from 'react';

import '../material/tickets.css';

const TicketCreate = (props: {}) => {
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100000 + 999999));

  useEffect(() => {
    intervalfunc();
  }, []);

  const intervalfunc = () => {
    setInterval(() => {
      const rand = Math.floor(Math.random() * 100000 + 999999);
      setRandomNum(rand);
    }, 60000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {' '}
      <div id="ticket_parent_div">
        <h1>Use Dint Scanner</h1>
        <br />
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <h1>{randomNum}</h1>
        </div>
        <p>For security purposes your ticket regenerates every 60 seconds.</p>
      </div>
    </div>
  );
};

export default TicketCreate;
