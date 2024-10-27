import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Importação do NavigationProp
import { StackParamList } from '../routes/aboutRoute'; // Definir StackParamList no app.tsx

const Navbar = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Tipagem correta

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Text style={styles.title}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#2E64FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;