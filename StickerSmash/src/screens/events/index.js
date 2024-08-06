import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import users from "../../../TinderAssets/assets/data/users.js";
import Card from "../../components/tinderCard/index.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedUser, setExpandedUser] = useState(null);
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);

  const extendedUsers = useMemo(() => {
    return [...users, ...users, ...users];
  }, []);

  const scrollToIndex = useCallback(
    (index) => {
      const normalizedIndex = (index % users.length) + users.length;
      flatListRef.current?.scrollToIndex({
        index: normalizedIndex,
        animated: false,
      });
      setCurrentIndex(index % users.length);
    },
    [users.length]
  );

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const offsetX = event.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);

      if (index <= users.length - 1) {
        runOnJS(scrollToIndex)(index + users.length);
      } else if (index >= users.length * 2) {
        runOnJS(scrollToIndex)(index - users.length);
      } else {
        runOnJS(setCurrentIndex)(index - users.length);
      }
    },
  });

  const handleGoing = useCallback(() => {
    // Implement the logic for when user clicks "I'm Going"
    console.log("User is going to the event");
    // You might want to update some state or make an API call here
  }, []);

  const handleExpand = useCallback(
    (user) => {
      setExpandedUser(expandedUser === user ? null : user);
    },
    [expandedUser]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.carouselItem}>
        <Card
          user={item}
          attendees={users}
          expanded={expandedUser === item}
          onExpand={() => handleExpand(item)}
          onGoing={handleGoing}
        />
      </View>
    ),
    [expandedUser, users, handleGoing, handleExpand]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, []);

  return (
    <View style={styles.content}>
      <Animated.FlatList
        ref={flatListRef}
        data={extendedUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialScrollIndex={users.length}
        removeClippedSubviews={true}
        scrollEnabled={!expandedUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginTop: 20,
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Events;
