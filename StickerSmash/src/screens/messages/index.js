import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';

const messages = [
  { id: '1', name: 'Shamik', message: 'This is good shit, I will like be o..', time: '3:30 PM' },
  { id: '2', name: 'Anshuman', message: 'This is good.', time: '3:30 PM' },
  { id: '3', name: 'Papai', message: 'Okay.', time: '3:30 PM' },
  { id: '4', name: 'Riya', message: 'This is good.', time: '3:30 PM' },
  { id: '5', name: 'Raj', message: 'I\'ll probably meet up tomorrow...', time: '3:30 PM' },
];

const MessageItem = ({ item }) => (
  <View style={styles.messageItem}>
    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
    <View style={styles.messageContent}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

const Messages = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#999"
      />
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          You DMs still feel empty for this event. Talk to more people here.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  messageText: {
    color: '#666',
  },
  time: {
    color: '#999',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default Messages;