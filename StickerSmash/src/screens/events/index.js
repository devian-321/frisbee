import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
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
import users from "../../../TinderAssets/assets/data/users.js";
import Card from "../../components/tinderCard/index.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ExpandedCard = ({ user, attendees, onClose }) => (
  <ScrollView style={styles.expandedCard}>
    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
      <Text>Close</Text>
    </TouchableOpacity>
    <Card user={user} attendees={attendees} />
    <Text style={styles.guestListTitle}>LOOK WHO ARE GOING</Text>
    <Text style={styles.guestListSubtitle}>
      RSVP, interact & make fun plans
    </Text>
    <View style={styles.guestGrid}>
      {Array(30)
        .fill()
        .map((_, index) => (
          <Image
            key={index}
            source={{ uri: attendees[index % attendees.length].image }}
            style={styles.guestAvatar}
          />
        ))}
    </View>
  </ScrollView>
);

const CarouselItem = React.memo(({ user, attendees, onExpand }) => (
  <TouchableOpacity onPress={() => onExpand(user)} style={styles.carouselItem}>
    <Card user={user} attendees={attendees} />
  </TouchableOpacity>
));

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

  const renderItem = useCallback(
    ({ item }) => (
      <CarouselItem
        user={item}
        attendees={users}
        onExpand={(user) => setExpandedUser(user)}
      />
    ),
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
    <View style={styles.content}>
      {expandedUser ? (
        <ExpandedCard
          user={expandedUser}
          attendees={users}
          onClose={() => setExpandedUser(null)}
        />
      ) : (
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
      )}
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
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedCard: {
    flex: 1,
    backgroundColor: "white",
  },
  closeButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  guestListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  guestListSubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  guestGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  guestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
});

export default Events;
