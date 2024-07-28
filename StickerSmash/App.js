import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "./src/components/tinderCard";
import users from "./TinderAssets/assets/data/users";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);

  const extendedUsers = useMemo(() => {
    return [users[users.length - 1], ...users, users[0]];
  }, [users]);

  const scrollToIndex = useCallback((index) => {
    flatListRef.current?.scrollToIndex({ index, animated: false });
    setCurrentIndex(index);
  }, []);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const offsetX = event.contentOffset.x;
      const contentWidth = event.contentSize.width;

      if (offsetX <= 0) {
        runOnJS(scrollToIndex)(users.length);
      } else if (offsetX >= contentWidth - SCREEN_WIDTH) {
        runOnJS(scrollToIndex)(1);
      }
    },
  });

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Card user={item} attendees={users} />
      </View>
    );
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FrisBee</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu-outline" size={24} color="#FF7A00" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Animated.FlatList
          ref={flatListRef}
          data={extendedUsers}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          initialScrollIndex={1}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Slightly grey background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF7A00",
    flex: 1,
    textAlign: "center",
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginTop: 20, // Added margin between header and card
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default App;
