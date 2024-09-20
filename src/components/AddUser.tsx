import React, { useState } from "react";
import { addUser, getRecords } from "../db";
import { User } from "../staticData";

const AddUserForm = ({ updateUserItems }: { updateUserItems: () => void }) => {
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
      updateUserItems();
      setName("");
      setAge("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        className="input"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Enter Age"
        className="input"
      />
      <button type="submit" className="button">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
