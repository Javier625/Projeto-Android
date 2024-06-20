import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    try {
     
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        Alert.alert('Erro', 'Nenhum usuário registrado. Por favor, registre-se primeiro.');
        return;
      }

      
      const users = JSON.parse(userData);

      
      const loggedInUser = users.find(user => user.email === email && user.password === password);
      if (!loggedInUser) {
        Alert.alert('Erro', 'Email ou senha incorretos. Por favor, tente novamente.');
        return;
      }

      
      await AsyncStorage.setItem('loggedUserName', loggedInUser.nome);

      
      navigation.navigate('Página Inicial');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      Alert.alert('Erro', 'Erro ao realizar login. Por favor, tente novamente.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://api.aecweb.com.br/tematico/img_figuras/carreira%2012%20mestre%20de%20obras%20na%20construcao%201%202504%20WEBP._Olho%24%240.webp' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
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
          <Button title="Login" onPress={handleLogin} />
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

export default LoginScreen;
