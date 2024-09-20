import React, { useState } from "react";
import { addUser, getRecords } from "../db";
import { User } from "../staticData";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name && age) {
      const newUser: User = {
        id: Date.now(),
        name,
        age,
      };

      try {
        await addUser(newUser);
        const users = await getRecords();
        console.log("Users after addition: ", users);
      } catch (error) {
        console.error("Error adding user: ", error);
      }

      setName("");
      setAge("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
