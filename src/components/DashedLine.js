import React from 'react';
import { View, StyleSheet } from 'react-native';

const DashedLine = ({ width, color }) => {
  const styles = StyleSheet.create({
    dashedLine: {
      width: width,
      height: 1,
      borderWidth: 1,
      borderColor: color,
      borderStyle: 'dashed'
    }
  });

  return <View style={styles.dashedLine} />;
};

export default DashedLine;
