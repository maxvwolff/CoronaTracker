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
  Button,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.body}>

      <View style={styles.header}>
        <Text style={styles.sectionTitle}>CoronaTracker</Text>
        <Text style={styles.activeIndicator}>AKTIV</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.quickview}>
          <Text style={styles.statsattr}>Wahrscheinlich nicht infiziert!</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.h2}>Statistik</Text>
          <Text style={styles.statsattr}>Du warst mit <Text>12</Text> Personen in Kontakt.</Text>
        </View>
        <Button title="Ich habe Corona" style={styles.registerCoronaBtn} />
      </View>

      <View style={styles.footer}>
        <Button title="INFO" style={styles.moreInfoBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "rgb(255, 255, 255)",
  },
  header: {
      backgroundColor: "rgb(0, 115, 190)",
      padding: 20,
  },
  wrapper: {
    padding: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center",
    color: "rgb(255, 255, 255)",
  },
  activeIndicator: {
    color: '#55FF00',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: "center",
  },
  quickview: {
    height: 150,
    width: "100%",
    backgroundColor: "#55AC00",
    padding: 10,
    marginBottom: 10,
  },
  stats: {
    height: 300,
    width: "100%",
    backgroundColor: "rgb(0, 115, 190)",
    padding: 10,
  },
  statsattr: {
    fontSize: 17,

  },
  footer: {
    justifyContent: "flex-end",
  },
  h2: {
    color: "white",
    fontSize: 22,
  },
  registerCoronaBtn: {
    marginTop: 20,
    height: 100,
  }
});

export default App;
