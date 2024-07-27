import "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./src/components/tinderCard";
import users from "./TinderAssets/assets/data/users";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useWindowDimensions } from "react-native";

const ROTATION = 60;
const SWIPE_THRESHOLD = 100;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextIndexRef = useRef((currentIndex + 1) % users.length);
  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(() => 
    interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + "deg"
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      // { rotate: rotate.value },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(Math.abs(translateX.value), [0, hiddenTranslateX], [0.8, 1]) },
    ],
    opacity: interpolate(Math.abs(translateX.value), [0, hiddenTranslateX], [0.5, 1]),
  }));

  const updateIndexes = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % users.length;
      nextIndexRef.current = (newIndex + 1) % users.length;
      return newIndex;
    });
  };

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      translateX.value = 0;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) < SWIPE_THRESHOLD) {
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(
          event.velocityX > 0 ? hiddenTranslateX : -hiddenTranslateX,
          {},
          () => runOnJS(updateIndexes)()
        );
      }
    });

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndexRef.current];

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard, nextCardStyle]}>
          <Card user={nextProfile} />
        </Animated.View>
      </View>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Card user={currentProfile} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  animatedCard: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;