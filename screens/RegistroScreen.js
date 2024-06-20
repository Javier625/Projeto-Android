import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    
    if (!nome || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      
      const userData = await AsyncStorage.getItem('userData');
      
      let users = [];
      if (userData) {
        users = JSON.parse(userData);
        if (!Array.isArray(users)) {
          users = [];
        }
      }

      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        Alert.alert('Erro', 'Este email já está registrado. Por favor, use outro email.');
        return;
      }

      const newUser = { id: Date.now().toString(), nome, email, password };

      users.push(newUser);

      await AsyncStorage.setItem('userData', JSON.stringify(users));

      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Erro ao salvar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.blueglass.com.br/uploads/editor/0fdb3dd4c8dbeaae939053149c109120.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TextInput
            placeholder="Nome"
            onChangeText={setNome}
            value={nome}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Registrar" onPress={handleRegister} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
});

export default RegistroScreen;
