import { useState } from "react";
import { Text, TouchableOpacity, Image, FlatList } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => setVisible(!visible)}
    >
      <Image
        source={{ uri: iconUrl }}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
