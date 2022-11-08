import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import '../../material/tickets.css';
import { ref, set, update } from 'firebase/database';
import { databaseInstance } from 'frontend/contexts/FirebaseInstance';

const TicketCreate = () => {
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100000 + 999999));
  const location: any = useLocation();
  const ticketData = {
    Userid: location.state && location.state.userid ? location?.state?.userid : '',
    Eventid: location.state && location.state.eventid ? location?.state?.eventid : '',
    Authid: randomNum
  };

  useEffect(() => {
    intervalfunc();
    set(ref(databaseInstance, `tickets/${location.state?.userid}`), ticketData)
      .then(() => {
        console.log('Ticket creation done');
      })
      .catch((e) => {
        console.log(e);
        alert('Error in Ticket Create');
      });
  }, []);

  const intervalfunc = () => {
    setInterval(() => {
      const rand = Math.floor(Math.random() * 100000 + 999999);
      setRandomNum(rand);
      updateAuthid(rand);
    }, 60000);
  };

  const updateAuthid = (rand: any) => {
    update(ref(databaseInstance, `tickets/${location.state?.userid}`), { authid: rand })
      .then(() => {
        console.log('authid update success');
      })
      .catch((error: any) => {
        alert(`error in update${error}`);
      });
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div id="ticket_parent_div">
          <h1>Use Dint Scanner</h1>
          <br />
          <QRCode
            value={`Eventid :${location.state?.eventid || ''}, Userid:${
              location.state?.userid || ''
            } authid:${randomNum}`}
            style={{ fill: 'red' }}
          />
          ,<br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <h1>{randomNum}</h1>
          </div>
          <p>For security purposes your ticket regenerates every 60 seconds.</p>
        </div>
      </div>
    </>
  );
};

export default TicketCreate;
