import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="home-outline" size={24} color="#FF7A00" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="person-outline" size={24} color="#C0C0C0" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="chatbubble-outline" size={24} color="#C0C0C0" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>5</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerButton: {
    padding: 10,
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#4B7BEC",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Footer;
