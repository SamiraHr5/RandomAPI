'use client'
import { useEffect, useState } from "react";

interface Name {
  first: string;
  last: string;
}

interface Location {
  street: {
    number: number;
    name: string;
  };
}

interface Login {
  password: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Picture {
  large: string;
}

interface Person {
  name: Name;
  email: string;
  location: Location;
  phone: string;
  dob: Dob;
  login: Login;
  picture: Picture;
}

export default function Historial() {
  const [history, setHistory] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("personHistory") || "[]");
    setHistory(storedHistory);
  }, []);

  return (
    <div style={{ maxWidth: "400px", padding: "20px", textAlign: "center" }}>
      <h2>Person History</h2>
      {history.length === 0 && <p>No history available.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {history.map((person, index) => (
          <li key={index} style={{ cursor: "pointer", marginBottom: "10px", borderBottom: "1px solid #ddd", padding: "10px" }}
              onClick={() => setSelectedPerson(person)}>
            <strong>{person.name.first} {person.name.last}</strong>
          </li>
        ))}
      </ul>

      {selectedPerson && (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "white", color: "black", padding: "20px", marginTop: "20px" }}>
          <h3>{selectedPerson.name.first} {selectedPerson.name.last}</h3>
          <img src={selectedPerson.picture.large} alt="Person" style={{ borderRadius: "50%", width: "150px", height: "150px", marginBottom: "10px" }} />
          <p><strong>Email:</strong> {selectedPerson.email}</p>
          <p><strong>Birthday:</strong> {new Date(selectedPerson.dob.date).toLocaleDateString()}</p>
          <p><strong>Address:</strong> {selectedPerson.location.street.number} {selectedPerson.location.street.name}</p>
          <p><strong>Phone:</strong> {selectedPerson.phone}</p>
          <p><strong>Password:</strong> {selectedPerson.login.password}</p>
          <button onClick={() => setSelectedPerson(null)} style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}>Close</button>
        </div>
      )}
    </div>
  );
}
