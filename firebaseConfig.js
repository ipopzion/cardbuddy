import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, remove } from "firebase/database";
import { Transaction } from "./components";
import firebaseKey from "./firebaseKey";

const firebaseConfig = firebaseKey;

const app = initializeApp(firebaseConfig);

const getTransactions = (userId, setTranshistory) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/transactions`)).then((snapshot) => {
    console.log("read from database")
    if (snapshot.exists()) {
      data = snapshot.val()
      const newTranshistory = []
      for (var key in data) {
        newTranshistory.push(new Transaction({ transactionId: key, ...data[key] }))
      }
      setTranshistory(newTranshistory)
    } else {
      updateTransactions(userId, [])
      setTranshistory([])
      console.log("created for new user: " + userId)
    }
  }).catch((error) => {
    console.log("ERROR: " + error);
  });
}

const addTransToDb = (userId, newTransaction) => {
  delete newTransaction["transactionId"]
  const db = getDatabase();
  const transDbRef = ref(db, `users/${userId}/transactions`)
  const newTransRef = push(transDbRef)
  set(newTransRef, newTransaction)
  const newTransId = String(newTransRef).slice(String(newTransRef).lastIndexOf("/") + 1)
  console.log("added to database")
  return newTransId
}

const removeTrans = (userId, transId) => {
  const db = getDatabase();
  const transDbRef = ref(db, `users/${userId}/transactions/${transId}`)
  remove(transDbRef)
  console.log("removed from database")
}


const updateTransactions = (userId, transactions) => {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    transactions: transactions
  });
}

dbtools = {
  read: getTransactions,
  add: addTransToDb,
  delete: removeTrans,
  update: updateTransactions
}

export default dbtools;