
'use client'

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore
import SignedNav from './signednav.js';
import '../../styles/dispenser.css';

const firebaseConfig = require('../../../fb.js');
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore(); // Get a Firestore instance

export default function Page() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dispensers, setDispensers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('dispensers').onSnapshot(snapshot => {
      const newDispensers = snapshot.docs.map(doc => ({
        id: doc.id, // Using auto-generated document ID
        ...doc.data()
      }));
      setDispensers(newDispensers);
    });

    return () => unsubscribe();
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmit = async (dispenserData) => {
    await db.collection('dispensers').add(dispenserData);
    closePopup();
  };

  const handleDelete = async (id) => {
    await db.collection('dispensers').doc(id).delete();
  };

  const handleEdit = (id) => {
    const updatedDispensers = [...dispensers];
    const index = dispensers.findIndex(dispenser => dispenser.id === id);
    updatedDispensers[index]['editMode'] = true;
    setDispensers(updatedDispensers);
  };

  const handleSave = async (id) => {
    const updatedDispensers = [...dispensers];
    const index = dispensers.findIndex(dispenser => dispenser.id === id);
    updatedDispensers[index]['editMode'] = false;
    setDispensers(updatedDispensers);

    // Check if the document exists before updating
    const docRef = db.collection('dispensers').doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update(updatedDispensers[index]);
    } else {
      console.log('Document does not exist');
      // Handle this scenario as needed, e.g., show an error message to the user
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedDispensers = [...dispensers];
    const index = dispensers.findIndex(dispenser => dispenser.id === id);
    updatedDispensers[index][field] = value;
    setDispensers(updatedDispensers);
  };

  const handleRepeatOption = async (id, slot) => {
    const dispenser = dispensers.find(d => d.id === id);
    const repeatField = `slot${slot}Repeat`;
    const newRepeatStatus = !dispenser[repeatField];
    await db.collection('dispensers').doc(id).update({ [repeatField]: newRepeatStatus });
    handleInputChange(id, repeatField, newRepeatStatus);
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(id, 'imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dispenser">
      <SignedNav />
      <div className="dispense-header">
        My Dispensers
      </div>
      <div className="dispenser-list">
        {dispensers.map(dispenser => (
          <div key={dispenser.id} className="dispenser-item">
            <div className="dispenser-info">
              {dispenser['editMode'] ? (
                <input
                  type="text"
                  placeholder="Dispenser Name"
                  value={dispenser.name}
                  onChange={(e) => handleInputChange(dispenser.id, 'name', e.target.value)}
                />
              ) : (
                <p className="dispenser-name">{dispenser.name}</p>
              )}
              <p className="dispenser-role">Role: {dispenser.role}</p>
              {dispenser['editMode'] ? (
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={dispenser.patientName}
                  onChange={(e) => handleInputChange(dispenser.id, 'patientName', e.target.value)}
                />
              ) : (
                <p className="patient-name">Patient: {dispenser.patientName}</p>
              )}
            </div>
            <div className="medicine-container">
              {[1, 2].map(slot => (
                <div key={slot} className="medicine">
                  <div className="slot">
                    {dispenser['editMode'] ? (
                      <input
                        type="text"
                        placeholder="Medicine"
                        value={dispenser[`slot${slot}`]}
                        onChange={(e) => handleInputChange(dispenser.id, `slot${slot}`, e.target.value)}
                      />
                    ) : (
                      <p>{dispenser[`slot${slot}`]}</p>
                    )}
                  </div>
                  <div className="quantity">
                    {dispenser['editMode'] ? (
                      <input
                        placeholder="Quantity"
                        type="number"
                        value={dispenser[`slot${slot}Quantity`]}
                        onChange={(e) => handleInputChange(dispenser.id, `slot${slot}Quantity`, e.target.value)}
                      />
                    ) : (
                      <p>{dispenser[`slot${slot}Quantity`]}</p>
                    )}
                  </div>
                  <div className="alarm">
                    {dispenser['editMode'] ? (
                      <input
                        placeholder="HH:MM"
                        type="time"
                        value={dispenser[`slot${slot}Alarm`]}
                        onChange={(e) => handleInputChange(dispenser.id, `slot${slot}Alarm`, e.target.value)}
                      />
                    ) : (
                      <p>{dispenser[`slot${slot}Alarm`]}</p>
                    )}
                  </div>
                  <div className="repeat">
                    <button
                      className="repeat-button"
                      onClick={() => handleRepeatOption(dispenser.id, slot)}
                    >
                      {dispenser[`slot${slot}Repeat`] ? 'Repeat On' : 'Repeat Off'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="dispenser-buttons">
              <button className="edit-button" onClick={() => handleEdit(dispenser.id)}>Edit</button>
              <button className="save-button" onClick={() => handleSave(dispenser.id)}>Save</button>
              <button className="delete-button" onClick={() => handleDelete(dispenser.id)}>Delete</button>
            </div>
            <div className="upload-container">
              <input type="file" onChange={(event) => handleFileUpload(dispenser.id, event)} />
              {dispenser.imageUrl && <img src={dispenser.imageUrl} alt="Uploaded" className="uploaded-image" />}
            </div>
          </div>
        ))}
      </div>
      <button className="dispenser-add" onClick={openPopup}> + </button>

      {isPopupOpen && (
        <div className="popup">
          {/* Popup content */}
          <DispenserForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}

function DispenserForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [patientName, setPatientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      role,
      patientName,
      slot1: '',
      slot1Quantity: '',
      slot1Alarm: '',
      slot1Repeat: false, // Initialize repeat status
      slot2: '',
      slot2Quantity: '',
      slot2Alarm: '',
      slot2Repeat: false, // Initialize repeat status
      imageUrl: '', // Initialize image URL
    });
    setName('');
    setRole('');
    setPatientName('');
  };

  return (
    <form className="submitform" onSubmit={handleSubmit}>
      <input type="text" placeholder="Dispenser Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="caretaker">Caretaker</option>
        <option value="doctor">Doctor</option>
      </select>
      <input type="text" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
}
