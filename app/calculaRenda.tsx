import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Pressable, TextInput, Alert } from 'react-native';
import Navbar from '../components/Navbar';
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

  // Opções de renda fixa e variada com valores médios
  const fixedOptions = [
    { detail: 'Conta de Luz', amount: 100 },
    { detail: 'Conta de Água', amount: 70 },
    { detail: 'Aluguel', amount: 1200 },
  ];

  const variedOptions = [
    { detail: 'Compras Mensais', amount: 500 },
    { detail: 'Transporte', amount: 150 },
    { detail: 'Entretenimento', amount: 200 },
  ];

  const addIncomeType = (option: { detail: string; amount: number }) => {
    if (selectedType) {
      const newIncomeType: IncomeType = {
        id: incomeTypes.length + 1,
        type: selectedType,
        detail: option.detail,
        amount: option.amount,
      };
      setIncomeTypes([...incomeTypes, newIncomeType]);
      setModalVisible(false); // Fechar modal
      setSelectedType(null);  // Limpar seleção
    }
  };

  const openTypeSelection = (type: 'Fixa' | 'Variada') => {
    setSelectedType(type);
    setModalVisible(true); // Abrir modal para escolher o detalhe
  };

  // Função para calcular o valor total dos gastos
  const calculateTotal = () => {
    return incomeTypes.reduce((acc, item) => acc + item.amount, 0);
  };

  // Função para calcular a diferença entre salário e gastos
  const calculateRemaining = () => {
    if (salary !== null) {
      const total = calculateTotal();
      return salary - total;
    }
    return null;
  };

  const handleSalarySubmit = () => {
    const remaining = calculateRemaining();
    if (remaining !== null) {
      Alert.alert(
        'Resultado',
        remaining >= 0
          ? `Você ainda tem R$ ${remaining.toFixed(2)} disponíveis após os gastos.`
          : `Você está com R$ ${Math.abs(remaining).toFixed(2)} em déficit após os gastos.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      {/* Tabela de tipos de renda */}
      <FlatList
        data={incomeTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.detail}</Text>
            <Text style={styles.cell}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <>
            {/* Botão New */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>New</Text>
              </TouchableOpacity>
            </View>

            {/* Total dos gastos */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total de Gastos: R$ {calculateTotal().toFixed(2)}</Text>
            </View>

            {/* Campo de entrada para a renda salarial */}
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
            </View>
          </>
        }
      />

      {/* Modal para seleção de Fixa ou Variada */}
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
                <View>
                  <Text style={styles.modalSubtitle}>Selecione uma opção:</Text>
                  {(selectedType === 'Fixa' ? fixedOptions : variedOptions).map((option) => (
                    <TouchableOpacity
                      key={option.detail}
                      style={styles.optionButton}
                      onPress={() => addIncomeType(option)}
                    >
                      <Text style={styles.optionText}>
                        {option.detail} - R$ {option.amount.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Fechar</Text>
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
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
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
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#ff3333',
    borderRadius: 5
  }
})

export default IncomeTable;