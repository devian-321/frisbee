import React from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentsPage = () => {
  const handleMakePayment = () => {
    console.log("Initiating payment...");
    // Implement payment logic here
    navigation.navigate('MainApp');
  };

  const handleShare = () => {
    console.log("Sharing with friends...");
    navigation.navigate('MainApp');
    // Implement sharing logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.appName}>FrisBee</Text>
        <Text style={styles.tagline}>unlock your social life!</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>pay for just 1 conversation</Text>
          <Text style={styles.price}>₹39</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handleMakePayment}
          >
            <Icon name="shopping-cart" size={20} color="#FFF" />
            <Text style={styles.buttonText}> Make Payment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>share to 5 more friends</Text>
          <Text style={styles.cardDescription}>
            - ask your 5 friends to hit on 'I'm Going' for any particular event.
          </Text>
          <Text style={styles.cardDescription}>
            - unblock chat with 5 more people for that event.
          </Text>
          <Text style={styles.proTip}>
            protip : keep doing this for the events where you want to meet more
            people :)
          </Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share" size={20} color="#FFF" />
            <Text style={styles.buttonText}> Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navbar}>
        <Icon name="home" size={24} color="#FF7A00" />
        <Image
          source={{ uri: "https://example.com/profile-pic.jpg" }}
          style={styles.profilePic}
        />
        <View style={styles.notificationContainer}>
          <Icon name="bell" size={24} color="#4A90E2" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E6F3FF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7A00",
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  paymentButton: {
    backgroundColor: "#FF7A00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
  },
  shareButton: {
    backgroundColor: "#FF7A00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  orText: {
    width: 50,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7A00",
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  proTip: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 15,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#FF0000",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PaymentsPage;
