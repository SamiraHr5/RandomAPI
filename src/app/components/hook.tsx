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

export default function Hook() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?apikey=10L5-HBXE-0HTT-A16T")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        const newPerson = data.results[0];
        setPerson(newPerson);
        setLoading(false);

        const history = JSON.parse(localStorage.getItem("personHistory") || "[]");
        history.unshift(newPerson);
        localStorage.setItem("personHistory", JSON.stringify(history.slice(0, 10))); // Keep only the last 10 entries
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px", backgroundColor: "white", color: "black", padding: "20px", textAlign: "center" }}>
      <h2>Current Person</h2>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {person && (
        <div>
          <img src={person.picture.large} alt="Person" style={{ borderRadius: "50%", width: "150px", height: "150px", marginBottom: "10px" }} />
          <h3>{person.name.first} {person.name.last}</h3>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Birthday:</strong> {new Date(person.dob.date).toLocaleDateString()}</p>
          <p><strong>Address:</strong> {person.location.street.number} {person.location.street.name}</p>
          <p><strong>Phone:</strong> {person.phone}</p>
          <p><strong>Password:</strong> {person.login.password}</p>
        </div>
      )}
    </div>
  );
}
