import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Card = ({ user, attendees, expanded, onExpand, onGoing }) => {
  const { image, eventTitle, eventDate, eventLocation } = user;

  const cardContent = (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardInner}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{eventTitle}</Text>
          <Text style={styles.eventDate}>{eventDate}</Text>
          <Text style={styles.eventLocation}>{eventLocation}</Text>
        </View>
        <View style={styles.attendeesSection}>
          <Text style={styles.attendeesTitle}>LOOK WHO ARE GOING</Text>
          <View style={expanded ? styles.attendeesGrid : styles.attendees}>
            {attendees &&
              attendees
                .slice(0, expanded ? undefined : 4)
                .map((attendee, index) => (
                  <Image
                    key={index}
                    source={{ uri: attendee.image }}
                    style={styles.attendeeImage}
                  />
                ))}
            {!expanded && attendees.length > 4 && (
              <TouchableOpacity
                style={styles.moreAttendeesButton}
                onPress={onExpand}
              >
                <Icon name="chevron-forward" size={24} color="#FF7A00" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );

  if (expanded) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onExpand}
        style={styles.expandedCard}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cardContent}
        </ScrollView>
        <TouchableOpacity style={styles.goingButton} onPress={onGoing}>
          <Text style={styles.goingButtonText}>I'm Going</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onExpand}
      activeOpacity={0.9}
      style={styles.card}
    >
      {cardContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    overflow: "hidden",
  },
  expandedCard: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.8,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardInner: {
    padding: 20,
    backgroundColor: "white",
  },
  eventInfo: {
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 18,
    color: "gray",
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 18,
    color: "gray",
  },
  attendeesSection: {
    marginBottom: 20,
  },
  attendeesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  attendees: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  moreAttendeesButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  goingButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  goingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Card;
