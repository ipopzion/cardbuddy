import { Animated, View, Text, FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import styles from "./transactiondisplay.style";

const TransactionCard = ({ transaction, removeTransaction, merchants }) => {
  const t = transaction;
  const datetime = new Date(t.timestamp);

  const handleSwipeRight = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [20, 0, 0, 1],
    });
    return (
      <RectButton
        onPress={() => removeTransaction(t.transactionId)}
        style={styles.deleteButton}
      >
        <Animated.Text style={styles.deleteText}>Delete</Animated.Text>
      </RectButton>
    );
  };

  return (
    // <></>
    <Swipeable renderRightActions={handleSwipeRight}>
      <Animated.View style={styles.transactionCard}>
        <View>
          <Text style={styles.merchantName}>
            {t.getMerchantName(merchants)}
          </Text>

          <Text style={styles.datetime}>{datetime.toDateString()}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.merchantName}>${t.amount.toFixed(2)}</Text>
          <Text style={styles.cashbackAmount}>
            + ${((t.amount * t.cashback_rate) / 100).toFixed(2)}
          </Text>
          <Text style={styles.cashbackRate}>{t.cashback_rate}% cashback</Text>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

const TransactionDisplay = ({
  cardList,
  activeCardIndex,
  removeTransaction,
  merchants,
}) => {
  const activeCard = cardList[activeCardIndex];
  return (
    <View style={styles.transactionsContainer}>
      <Text style={styles.transactionsTitle}>Transactions</Text>
      <FlatList
        data={activeCard.cardhistory}
        renderItem={(t) => (
          <TransactionCard
            transaction={t.item}
            removeTransaction={removeTransaction}
            merchants={merchants}
          />
        )}
      />
    </View>
  );
};

export default TransactionDisplay;
