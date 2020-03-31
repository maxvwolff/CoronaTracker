/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.sectionTitle}>CoronaTracker</Text>
      <Text style={styles.activeIndicator}>AKTIV</Text>
      <Text style={styles.stats}>Du warst mit <Text>12</Text> Personen in Kontakt.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  stats: {
    paddingLeft: 20,
  }
});

export default App;
