import React, { useEffect, useState } from "react";
import "./App.css";
import { getRecords } from "./db";
import { User } from "./staticData";

function App() {
  const [records, setRecords] = useState<User[]>([]);

  useEffect(() => {
    const initializeDB = async () => {
      const allRecords = await getRecords();
      setRecords(allRecords);
    };

    initializeDB();
  }, []);

  return (
    <div className="App">
      <h1>Static Users in IndexedDB</h1>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.name} - Age: {record.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
