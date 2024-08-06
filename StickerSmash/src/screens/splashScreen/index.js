import NetInfo from "@react-native-community/netinfo";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const FRISBEE_SIZE = Math.min(width, height) * 0.8;

const SplashScreen = ({ navigation }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const navigateToMainApp = () => {
    navigation.replace("SendOTP");
  };

  useEffect(() => {
    const checkConnectionAndAnimate = async () => {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        scale.value = withSequence(
          withTiming(1.2, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(
            0.1,
            { duration: 800, easing: Easing.bezier(0.5, 0, 1, 1) },
            (finished) => {
              if (finished) {
                opacity.value = withTiming(0, { duration: 300 }, () => {
                  runOnJS(navigateToMainApp)();
                });
              }
            }
          )
        );
      } else {
        navigation.replace("NoConnection");
      }
    };

    checkConnectionAndAnimate();
  }, [navigation, scale, opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.frisbee, animatedStyles]}>
        <Text style={styles.title}>FrisBee</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7A00",
  },
  frisbee: {
    width: FRISBEE_SIZE,
    height: FRISBEE_SIZE,
    borderRadius: FRISBEE_SIZE / 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF7A00",
  },
});

export default SplashScreen;
