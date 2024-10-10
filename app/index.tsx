import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Importação do NavigationProp
import { StackParamList } from '../routes/calculaRendaRoute'; // Definir StackParamList no app.tsx

const Index = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>(); // Tipagem correta

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bem vindo ao EducaRenda</Text>
        <Text style={styles.text}>
          Aqui, você encontrará uma educação prática e acessível para transformar sua vida financeira
        </Text>

        {/* Botão para navegar para a tela calculaRenda */}
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => navigation.navigate('calculaRenda')} // Navegação
        >
          <Text style={styles.buttonText}>Acesse aqui</Text>
        </TouchableOpacity>

        {/* Adicione o conteúdo principal da sua tela aqui */}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  blueButton: {
    backgroundColor: '#2E64FE',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Index;
