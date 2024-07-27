import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
const SCREEN_WIDTH = Dimensions.get("window").width;
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
    transform: [{ translateX: translateX.value }],
    opacity: cardOpacity.value,
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextCardScale.value }],
    opacity: interpolate(nextCardScale.value, [0.9, 1], [0.5, 1]),
  }));

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.cardStack}>
        <Animated.View style={[styles.cardContainer, nextCardStyle]}>
          <Card user={users[getNextIndex(currentIndex)]} />
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.cardContainer, cardStyle]}>
            <Card user={users[currentIndex]} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  cardStack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    position: "absolute",
    width: "95%",
    height: "70%",
  },
});

export default App;
