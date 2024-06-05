import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";

export default function LockScreen ({ locked, children }) {
  return locked ? (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.lockedContainer}>{children}</View>
    </TouchableWithoutFeedback>
  ) : (
    children
  );
};

const styles = StyleSheet.create({
  lockedContainer: {
    flex: 1
  }
});