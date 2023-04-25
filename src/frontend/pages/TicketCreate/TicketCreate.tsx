import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import '../../material/tickets.css';
import { ref, set, update } from 'firebase/database';
import { databaseInstance } from 'frontend/contexts/FirebaseInstance';
import BackIconButton from '../../components/BackIconButton';

const TicketCreate = () => {
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100000 + 999999));
  const location = useLocation();
  const { userId, eventId } = location.state;
  const ticketData = {
    Userid: userId ?? '',
    Eventid: eventId ?? '',
    Authid: randomNum,
  };

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const rand = Math.floor(Math.random() * 100000 + 999999);
      setRandomNum(rand);
      updateAuthid(rand);
    }, 60 * 1000);

    set(ref(databaseInstance, `tickets/${userId}`), ticketData)
      .then(() => {
        console.log('Ticket creation done');
      })
      .catch((e) => {
        console.log(e);
        alert('Error in Ticket Create');
      });

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  const updateAuthid = (rand: any) => {
    update(ref(databaseInstance, `tickets/${userId}`), { authid: rand })
      .then(() => {
        console.log('authid update success');
      })
      .catch((error: any) => {
        alert(`error in update${error}`);
      });
  };

  return (
    <>
      <BackIconButton />
      <div style={{ display: 'flex', textAlign: 'center' }}>
        <div id="ticket_parent_div">
          <h1>Use <span className="notranslate">Dint</span> Scanner</h1>
          <br />
          <QRCode
            value={`Eventid :${eventId}, Userid:${userId} authid:${randomNum}`}
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
