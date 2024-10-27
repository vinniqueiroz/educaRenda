import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import Navbar from '../components/navbarCalculaRenda';
import Footer from '../components/Footer';

interface IncomeType {
  id: number;
  type: string;
  detail: string;
  amount: number;
}

const IncomeTable: React.FC = () => {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'Fixa' | 'Variada' | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [itemDetail, setItemDetail] = useState('');
  const [itemAmount, setItemAmount] = useState<number | null>(null);

  const addIncomeType = () => {
    if (selectedType && itemDetail && itemAmount !== null) {
      const newIncomeType: IncomeType = {
        id: incomeTypes.length + 1,
        type: selectedType,
        detail: itemDetail,
        amount: itemAmount,
      };
      setIncomeTypes([...incomeTypes, newIncomeType]);
      setModalVisible(false);
      setSelectedType(null);
      setItemDetail(''); // Limpa o campo de detalhe
      setItemAmount(null); // Limpa o campo de valor
    }
  };

  const openTypeSelection = (type: 'Fixa' | 'Variada') => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const calculateTotal = () => {
    return incomeTypes.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleSalarySubmit = () => {
    if (salary !== null) {
      const totalExpenses = calculateTotal();
      setRemaining(salary - totalExpenses);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <FlatList
        data={incomeTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.detail}</Text>
            <Text style={styles.cell}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Novo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total de Gastos: R$ {calculateTotal().toFixed(2)}</Text>
            </View>

            <View style={styles.salaryContainer}>
              <Text style={styles.salaryLabel}>Informe sua renda salarial:</Text>
              <TextInput
                style={styles.salaryInput}
                keyboardType="numeric"
                placeholder="Ex: 3000"
                onChangeText={(value) => setSalary(parseFloat(value))}
                value={salary ? salary.toString() : ''}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSalarySubmit}>
                <Text style={styles.buttonText}>Calcular Diferença</Text>
              </TouchableOpacity>
              {remaining !== null && (
                <Text style={styles.remainingText}>
                  {remaining >= 0
                    ? `Você ainda tem R$ ${remaining.toFixed(2)} disponíveis. \nSeria interessante voce usar esse dinheiro para realizar um investimento.\n\nSegue algumas dicas de investimento.\n\n- Investimento em renda fixa\n- Investimento em Imóveis\n- Fundos imobiliarios`
                    : `Você está com R$ ${Math.abs(remaining).toFixed(2)} em déficit. É necessario que você faça uma reorganização financeira.\n\n- Cortar Gastos denecessarios\n- Fazer uma reserva de emergencia\n- Planejar Compras para evitar dividas.`}
                </Text>
              )}
            </View>
          </>
        }
      />

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Selecione o tipo de renda</Text>
              <TouchableOpacity style={styles.optionButton} onPress={() => openTypeSelection('Fixa')}>
                <Text style={styles.optionText}>Fixa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => openTypeSelection('Variada')}>
                <Text style={styles.optionText}>Variada</Text>
              </TouchableOpacity>

              {selectedType && (
                <View style={styles.formContainer}>
                  <Text style={styles.modalSubtitle}>Dispesa:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Conta de Luz"
                    value={itemDetail}
                    onChangeText={setItemDetail}
                  />
                  <Text style={styles.modalSubtitle}>Valor:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 100"
                    keyboardType="numeric"
                    value={itemAmount ? itemAmount.toString() : ''}
                    onChangeText={(value) => setItemAmount(parseFloat(value))}
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={addIncomeType}>
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  salaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  salaryLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  salaryInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28a745', // Cor original
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonHover: {
    backgroundColor: '#4CAF50', // Cor mais clara quando pressionado
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  remainingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#007bff', // Azul
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  
  optionText: {
    fontSize: 16,
    color: '#fff', // Branco
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#ff3333',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default IncomeTable;