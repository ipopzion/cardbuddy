import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    width: "100%",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: (mcc) => ({
    width: "100%",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: mcc ? "green" : COLORS.gray,
    height: 50,
  }),
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  tabsContainer: {
    width: "100%",
    height: 30,
    marginTop: SIZES.small,
  },
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  tabText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary
  },
});

export default styles;
