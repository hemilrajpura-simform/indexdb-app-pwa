// Define a User type for the data structure
export interface User {
  id?: number;
  name: string;
  age: number;
}

export const users: User[] = [
  { name: "John", age: 30, id: 1 },
  { name: "Jane", age: 25, id: 2 },
  { name: "Alice", age: 28, id: 3 },
  { name: "Bob", age: 35, id: 4 },
];
