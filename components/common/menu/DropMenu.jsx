import { Text, FlatList } from "react-native";
import styles from "./dropmenu.style";

const DropMenu = ({ visible }) => {
  if (!visible) return <></>;

  const menu = ["Profile", "Settings", "Manage Cards", "Log Out"];
  return (
    <FlatList
      data={menu}
      renderItem={(item) => <Text style={styles.menuItems}>{item.item}</Text>}
      keyExtractor={(item) => item}
      style={styles.dropMenu}
    />
  );
};

export default DropMenu;
