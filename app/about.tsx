import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Index = () => {

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Quem somos nós?</Text>
        <Text style={styles.text}>
        Dois alunos da UNEX, movidos pelo desejo de transformar a forma como as pessoas 
        lidam com suas finanças, uniram seus conhecimentos para desenvolver um aplicativo 
        inovador de educação financeira. O EducaRenda foi criado com o objetivo de simplificar 
        conceitos financeiros complexos e capacitar os usuários a gerirem melhor seu dinheiro, 
        oferecendo ferramentas práticas para planejamento, controle de gastos e investimentos. 
        O projeto, que nasceu em sala de aula, reflete o compromisso dos estudantes em promover
         a educação financeira acessível e relevante para todas as pessoas, de forma prática e 
         envolvente.        </Text>
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
