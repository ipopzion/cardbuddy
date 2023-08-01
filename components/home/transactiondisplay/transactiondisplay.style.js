import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  transactionsContainer: {
    width: "100%",
  },
  transactionsTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  transactionCard: {
    width: "95%",
    height: 90,
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    display: "flex",
    flexDirection: "row",
  },
  merchantName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary
  },
  cashbackAmount: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: "green"
  },
  cashbackRate: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    fontStyle: "italic",
    color: "grey"
  },
  datetime: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  deleteButton: {
    alignSelf: "center",
    width: 80,
    borderRadius: SIZES.medium,
    height: 90,
    backgroundColor: "darkred",
    alignItems: "center",
    justifyContent: "center"
  },
  deleteText: {
    fontFamily: FONT.regular,
    textAlign: "center",
    color: "white",
  }
});

export default styles;
