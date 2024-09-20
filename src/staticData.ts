// Define a User type for the data structure
export interface User {
  id?: number;
  name: string;
  age: number;
}

export const users: User[] = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
];
