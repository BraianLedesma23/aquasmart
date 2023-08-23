
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const datosUsuario = {
      name,
      lastname,
      email,
      password,
    };

    try {
      // Envía los datos del usuario al servidor para el registro 
      // my ip 192.168.100.15
      const respuesta = await fetch('http://192.168.100.15:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
      });

      const resultado = await respuesta.json();
      if (resultado === 'success') {
        navigation.navigate('Login');
      } else {
        // Maneja el error de registro
        // Por ejemplo, muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error de registro:', error);
    
    }
  };

  const handleBack = () => {
    // Navigate back to the previous screen (e.g., LoginScreen)
    navigation.navigate('Login');
  };
  return (
      <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRARSE</Text>

      {/* Datos personales */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre de usuario"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Apellidos del usuario</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          placeholder="Apellidos del usuario"
        />
      </View>

    
      {/* Datos de registro */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Correo Electronico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo Electronico"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>

      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default RegistrationScreen;
