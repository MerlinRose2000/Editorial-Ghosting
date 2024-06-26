import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("database created");
    },
  });

export const putDb = async (content) => {
  console.log("Update the database");

  const textDb = await openDB("jate", 1);

  const tx = textDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log("🚀 - saved to the database", result);
};
export const getDb = async () => {
  console.log("GET from the database");

  const textDb = await openDB("jate", 1);

  const tx = textDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.get(1);

  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();