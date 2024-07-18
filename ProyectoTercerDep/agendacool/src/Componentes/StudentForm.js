import React, { useState } from 'react';
import { db, Timestamp } from '../configuracionfirebase/firebase';
import '../App.css';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combinar fecha y hora en un solo objeto Date
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const fullDate = new Date(year, month - 1, day, hours, minutes);

    try {
      await db.collection('Recordatorios').add({
        Titulo: title,
        Fecha: Timestamp.fromDate(fullDate),
        Descripcion: description,
      });
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
      alert('Evento agregado exitosamente');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error al agregar el evento');
    }
  };

  // Obtener la fecha actual en el formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='Formulario'>
        <label>Título&emsp;</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <label>&emsp;&emsp;Fecha&emsp;</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={getCurrentDate()} required/>
        <br/><br/>
        <label>Hora&emsp;</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required/>
        <br/><br/>
        <label>Descripción&emsp;</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <br/><br/>
      </div>
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventForm;
