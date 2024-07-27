import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Card from "./src/components/tinderCard";
import users from "./TinderAssets/assets/data/users";
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const nextCardScale = useSharedValue(0.9);
  const isTransitioning = useSharedValue(false);

  const getNextIndex = useCallback(
    (index) => (index + 1) % users.length,
    [users.length]
  );

  const resetCardPosition = useCallback(() => {
    translateX.value = 0;
    rotate.value = 0;
    cardOpacity.value = 1;
    nextCardScale.value = 0.9;
    isTransitioning.value = false;
  }, [translateX, rotate, cardOpacity, nextCardScale, isTransitioning]);

  const swipeCard = useCallback(
    (direction) => {
      setCurrentIndex((prevIndex) => getNextIndex(prevIndex));
      resetCardPosition();
    },
    [getNextIndex, resetCardPosition]
  );

  useAnimatedReaction(
    () => isTransitioning.value,
    (transitioning) => {
      if (transitioning) {
        runOnJS(swipeCard)();
      }
    },
    [swipeCard]
  );

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isTransitioning.value) return;
      translateX.value = event.translationX;
      rotate.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-10, 0, 10]
      );
      cardOpacity.value = interpolate(
        Math.abs(event.translationX),
        [0, SCREEN_WIDTH / 2],
        [1, 0.5]
      );
      nextCardScale.value = interpolate(
        Math.abs(event.translationX),
        [0, SCREEN_WIDTH / 2],
        [0.9, 1]
      );
    })
    .onEnd((event) => {
      if (isTransitioning.value) return;
      if (Math.abs(event.velocityX) < SWIPE_THRESHOLD) {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
        cardOpacity.value = withSpring(1);
        nextCardScale.value = withSpring(0.9);
      } else {
        isTransitioning.value = true;
        const direction = event.velocityX > 0 ? "right" : "left";
        translateX.value = withSpring(
          direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
          {
            overshootClamping: true,
            restSpeedThreshold: 100,
            restDisplacementThreshold: 100,
          }
        );
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: cardOpacity.value,
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextCardScale.value }],
    opacity: interpolate(nextCardScale.value, [0.9, 1], [0.5, 1]),
  }));

  const currentUser = users[currentIndex];

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FrisBee</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu-outline" size={24} color="#FF7A00" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.cardStack}>
          <Animated.View style={[styles.cardContainer, nextCardStyle]}>
            <Card user={users[getNextIndex(currentIndex)]} />
          </Animated.View>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.cardContainer, cardStyle]}>
              <Card user={currentUser} />
            </Animated.View>
          </GestureDetector>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{currentUser.eventTitle}</Text>
          <Text style={styles.eventDate}>{`${currentUser.eventDate} • ${currentUser.eventLocation}`}</Text>
          <Text style={styles.attendeesTitle}>LOOK WHO ARE GOING</Text>
          <View style={styles.attendees}>
            {users.slice(0, 4).map((user, index) => (
              <Image key={index} source={{ uri: user.image }} style={styles.attendeeImage} />
            ))}
            <TouchableOpacity style={styles.moreAttendeesButton}>
              <Icon name="chevron-forward" size={24} color="#FF7A00" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.goingButton}>
            <Text style={styles.goingButtonText}>I'm Going</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7A00',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  cardStack: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.6,
  },
  cardContainer: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  eventDetails: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  attendeesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attendees: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  moreAttendeesButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goingButton: {
    backgroundColor: '#FF7A00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  goingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerButton: {
    padding: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4B7BEC',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default App;