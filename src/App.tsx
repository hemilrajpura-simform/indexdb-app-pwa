import React, { useEffect, useState } from "react";
import "./App.css";
import { getRecords } from "./db";
import { User } from "./staticData";
import AddUserForm from "./components/AddUser";

function App() {
  const [records, setRecords] = useState<User[]>([]);

  const updateUserItems = async () => {
    const allRecords = await getRecords();
    setRecords(allRecords);
  };

  useEffect(() => {
    const initializeDB = async () => {
      updateUserItems();
    };

    initializeDB();
  }, []);

  return (
    <div className="container">
      <h1>Users in IndexedDB</h1>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.name} - Age: {record.age}
          </li>
        ))}
      </ul>

      <>
        <AddUserForm updateUserItems={updateUserItems} />
      </>
    </div>
  );
}

export default App;
