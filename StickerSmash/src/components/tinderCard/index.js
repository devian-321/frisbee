import React from "react";
import { Text, View,ImageBackground, StyleSheet } from "react-native";


const Card = props => {
    console.log(props);
    const {name,image,bio} = props.user;
    return (
        <View style={styles.card}>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.ImageCompoment}
        >
          <View style={styles.cardInnerTextCompoment}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio}>
             {bio}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
    
};

const styles = StyleSheet.create({
    ImageCompoment: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      overflow: "hidden",
  
      justifyContent: "flex-end",
    },
    card: {
      width: "95%",
      height: "70%",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,
  
      elevation: 19,
    },
    name: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
    },
    bio: {
      fontSize: 18,
      color: "white",
      lineHeight: 25,
    },
    cardInnerTextCompoment: {
      padding: 10,
    },
  });

export default Card;