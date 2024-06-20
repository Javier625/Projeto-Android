import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {

    const fetchLoggedUserName = async () => {
      try {
        const loggedUserName = await AsyncStorage.getItem('loggedUserName');
        if (loggedUserName) {
          setUserName(loggedUserName);
        }
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
      }
    };

    fetchLoggedUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUserName');
      setUserName('');
      Alert.alert('Logout', 'Você foi desconectado com sucesso.');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      Alert.alert('Erro', 'Erro ao realizar logout. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userName ? (
          <View style={styles.loggedInContainer}>
            <Text style={styles.loggedInText}>Olá, {userName}!</Text>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            />
            <Button
              title="Registrar"
              onPress={() => navigation.navigate('Registro')}
              style={styles.button}
            />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.product}>
          <Image
            source={{ uri: 'https://cdn.awsli.com.br/600x450/1606/1606237/produto/60689468/1151ee43-0f50-41fe-9ad8-5724b2840597-(2)-479c74984f.jpg' }}
            style={styles.image}
          />
          <Text style={styles.text}>Cimento CP3 - R$ 27</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={{ uri: 'https://cdn.awsli.com.br/800x800/1291/1291093/produto/156996571/0fe455d766.jpg' }}
            style={styles.image}
          />
          <Text style={styles.text}>Argamassa AC3 - R$ 34</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={{ uri: 'https://images.tcdn.com.br/img/img_prod/999130/tijolo_ceramico_de_vedacao_14x19x39cm_8073_1_68fe793c144c5af92ec609f70aa76c52.jpeg' }}
            style={styles.image}
          />
          <Text style={styles.text}>Tijolo - R$ 2</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={{ uri: 'https://acdn.mitiendanube.com/stores/002/204/188/products/argamassa-porcelanato-cinza-20kg-argamil21-28ba77de850eb710ad16886514241152-480-0.jpg' }}
            style={styles.image}
          />
          <Text style={styles.text}>Argamassa AC1 - R$ 10</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  loggedInContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '40%',
  },
  loggedInText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default HomeScreen;
