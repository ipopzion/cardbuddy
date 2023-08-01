import { useEffect, useState } from "react";
import {
  Welcome,
  Wallet,
  CardInfo,
  TransactionDisplay,
  CreditCard,
  Transaction,
} from "../../index";
import { ActivityIndicator } from "react-native";
import dbtools from "../../../firebaseConfig";
import DropMenu from "../../common/menu/DropMenu";

const HomeView = ({
  user,
  merchants,
  cards,
  transhistory,
  setTranshistory,
}) => {
  if (!merchants?.length || !cards?.length) {
    console.log("loading merchants or cards");
    return <ActivityIndicator />;
  }

  const [mcc, setMcc] = useState(null);
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [merchantId, setMerchantId] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setCardList(
      cards.map((c) => new CreditCard({ ...c, transhistory: transhistory }))
    );
  }, [transhistory]);

  if (!cardList.length) {
    return <ActivityIndicator />;
  }

  const addTransaction = (cashback_rate) => {
    const newTransaction = new Transaction({
      transactionId: "temp",
      timestamp: Date.now(),
      card_id: cardList[activeCardIndex].card_id,
      cashback_rate: cashback_rate,
      amount: parseFloat(price),
      merchant_id: merchantId,
    });
    const newTransId = dbtools.add(user.id, newTransaction);
    newTransaction["transactionId"] = newTransId;
    setTranshistory([...transhistory, newTransaction]);
    setPrice("");
  };

  const removeTransaction = (transactionId) => {
    dbtools.delete(user.id, transactionId);
    setTranshistory(
      transhistory.filter((t) => t.transactionId != transactionId)
    );
  };

  return (
    <>
      {/* <DropMenu visible={visible} /> */}
      <Welcome
        user={user}
        mcc={mcc}
        setMcc={setMcc}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        price={price}
        setPrice={setPrice}
        setMerchantId={setMerchantId}
        transhistory={transhistory}
        merchants={merchants}
      />
      <Wallet
        cardList={cardList}
        setActiveCardIndex={setActiveCardIndex}
      />
      <CardInfo
        cardList={cardList}
        activeCardIndex={activeCardIndex}
        mcc={mcc}
        searchTerm={searchTerm}
        price={price}
        addTransaction={addTransaction}
      />
      <TransactionDisplay
        cardList={cardList}
        activeCardIndex={activeCardIndex}
        removeTransaction={removeTransaction}
        merchants={merchants}
      />
    </>
  );
};

export default HomeView;
