import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Asegúrate de que este archivo exista
import { db } from '../configuracionfirebase/firebase';

const localizer = momentLocalizer(moment);

const VistaCalendario = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Recordatorios').onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.Titulo,
          start: data.Fecha.toDate(), // Convertir Timestamp a Date
          end: data.Fecha.toDate(),   // Convertir Timestamp a Date
        };
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default VistaCalendario;
