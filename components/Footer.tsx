// components/Footer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 70,
    backgroundColor: '#2E64FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Footer;
