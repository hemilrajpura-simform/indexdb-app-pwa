import { users, User } from "./staticData";

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyDatabase", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("myStore")) {
        const store = db.createObjectStore("myStore", {
          keyPath: "id",
          autoIncrement: true,
        });

        users.forEach((user) => store.add(user));
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject(
        "Error opening database: " +
          (event.target as IDBOpenDBRequest).error?.message
      );
    };
  });
};

export const addRecord = async (record: User): Promise<string> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("myStore", "readwrite");
    const store = transaction.objectStore("myStore");

    const request = store.add(record);

    request.onsuccess = () => {
      resolve("Record added successfully!");
    };

    request.onerror = (event: Event) => {
      reject(
        "Error adding record: " + (event.target as IDBRequest).error?.message
      );
    };
  });
};

export const getRecords = async (): Promise<User[]> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("myStore", "readonly");
    const store = transaction.objectStore("myStore");

    const request = store.getAll();

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result as User[]);
    };

    request.onerror = (event: Event) => {
      reject(
        "Error retrieving records: " +
          (event.target as IDBRequest).error?.message
      );
    };
  });
};

export const addUser = async (user: User): Promise<void> => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("myStore", "readwrite");
    const store = transaction.objectStore("myStore");

    const request = store.add(user);

    request.onsuccess = () => {
      console.log("User added successfully");
      resolve();
    };

    request.onerror = (event: Event) => {
      reject(
        "Error adding user: " + (event.target as IDBRequest).error?.message
      );
    };
  });
};
