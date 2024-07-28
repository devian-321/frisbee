import React, { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Footer from "./src/components/footerNavbar/index.js";
import Header from "./src/components/header/index.js";
import Card from "./src/components/tinderCard/index.js";
import users from "./TinderAssets/assets/data/users.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CarouselItem = React.memo(({ user, attendees }) => (
  <View style={styles.carouselItem}>
    <Card user={user} attendees={attendees} />
  </View>
));

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const renderItem = useCallback(
    ({ item }) => <CarouselItem user={item} attendees={users} />,
    [users]
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
    <View style={styles.pageContainer}>
      <Header />
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
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  content: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginTop: 20,
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
