import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,  Image, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { ScrollView } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const PlaceholderImage = require('../assets/images/logo.jpg');

const PeceraScreen = ({ route }) => {
  const { id } = route.params;
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={HomeScreenContent} />
    </Drawer.Navigator>
  );
}

const Image1 = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const imageWidth = screenWidth;
  const imageHeight = (18 / 9) * screenWidth; // Relación de aspecto de 16:9

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={[styles.image, { width: imageWidth, height: imageHeight }]} />
      </View>
    </View>
  );
}

const HomeScreenContent = () => {
  return (
    <ScrollView>
      <Image1 />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1
  },
  image: {
    borderRadius: 18,
  },
});

export default PeceraScreen;
