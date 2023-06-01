import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function App() {
  const [frete, setFrete] = useState('');
  const [qtdeProduto, setQtdeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [pessoas, setPessoas] = useState([]);

  function handleAddPessoa() {
    setPessoas([...pessoas, { qtdeProduto: '' }]);
  }

  function handleRemovePessoa(index) {
    setPessoas(pessoas.filter((_, i) => i !== index));
  }

  function handleProdutoChange(text, index) {
    const newPessoas = [...pessoas];
    newPessoas[index].qtdeProduto = text;
    setPessoas(newPessoas);
  }

  const totalCompra = pessoas.reduce((total, pessoa) => {
    const totalPessoa = parseFloat(pessoa.qtdeProduto) * parseFloat(valorProduto);
    return total + totalPessoa;
  }, 0);

  const totalFrete = parseFloat(frete) / pessoas.length || 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Product Divider - Cheers</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valorProduto}
        onChangeText={setValorProduto}
        placeholder="Value of product"
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={frete}
        onChangeText={setFrete}
        placeholder="Value of freight"
      />

      {pessoas.map((pessoa, index) => (
        <View key={index} style={styles.pessoaContainer}>
          <Text style={styles.pessoaNome}>Person {index + 1}</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pessoa.qtdeProduto}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                handleProdutoChange(text, index);
              }
            }}
            placeholder="Product quantity"
          />

          <TouchableOpacity
            onPress={() => handleRemovePessoa(index)}
            style={[styles.button, styles.buttonRemove]}
          >
            <Text style={styles.buttonText}>remove</Text>
          </TouchableOpacity>

          <Text style={styles.totalIndividual}>
            Total: {pessoa.qtdeProduto ? `R$ ${((parseFloat(pessoa.qtdeProduto) * parseFloat(valorProduto)) + totalFrete).toFixed(2)}` : 'R$ 0.00'}
          </Text>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddPessoa} style={styles.button}>
        <Text style={styles.buttonText}>add</Text>
      </TouchableOpacity>

      <Text style={styles.totalCompra}>
        Total purchase: {totalCompra || frete ? `R$ ${(totalCompra + parseFloat(frete)).toFixed(2)}` : 'R$ 0.00'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    width: '80%',
  },
  pessoaContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  pessoaNome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalIndividual: {
    marginTop: 10,
  },
  totalCompra: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonRemove: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
