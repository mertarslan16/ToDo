import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>ToDo Uygulaması</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#3498db',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
