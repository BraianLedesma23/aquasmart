import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomDrawerContent = ({navigation}) => {


  const handleGoToUsuario = () => {
    navigation.navigate('UsuarioScreen');
  }

  const handleGoToRegistro = () => {
    navigation.navigate('Registro');
  }

  const handleGoToGraficas = () => {
    navigation.navigate('Graficas');
  }

  return (
    <View style={styles.drawerContent}>
      {/* Logo o título de la aplicación */}
      <Text style={styles.appTitle}>Aqua-Smart</Text>
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToRegistro}>
          <View style={styles.itemWithIcon}>
            <Icon name="Registro" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Registro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToGraficas}>
          <View style={styles.itemWithIcon}>
            <Icon name="Graficas" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.drawerItemText}>Mi Pecera</Text>
          </View>
        </TouchableOpacity>
        { 
        }
       <TouchableOpacity style={styles.menuItem} onPress={handleGoToUsuario}>
          <View style={styles.itemWithIcon}>
            <View style={styles.iconCircle}>
              <Icon name="child" size={20} color="#2196f3" style={styles.icon} />
            </View>
            <Text style={styles.drawerItemText}>Usuario</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#1A5184', // Fondo del menú lateral con color de hospital
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center', // Alineación del texto al centro
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    marginTop: 16, // Espacio entre los elementos del menú
  },
  drawerItemText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 16,
    //fontWeight: 'bold', // Fuente en negrita (gordita)
    //fontFamily: 'Arial', // Fuente gótica (puedes cambiarla a una fuente gótica específica)
  },
  itemWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8, // Espacio entre el icono y el texto
  },
});

export default CustomDrawerContent;
