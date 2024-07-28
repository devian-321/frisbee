import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({ user, attendees }) => {
    const { image, eventTitle, eventDate, eventLocation } = user;

    return (
        <View style={styles.card}>
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
                    <View style={styles.attendees}>
                        {attendees && attendees.slice(0, 4).map((attendee, index) => (
                            <Image key={index} source={{ uri: attendee.image }} style={styles.attendeeImage} />
                        ))}
                        <TouchableOpacity style={styles.moreAttendeesButton}>
                            <Icon name="chevron-forward" size={24} color="#FF7A00" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.goingButton}>
                    <Text style={styles.goingButtonText}>I'm Going</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    imageContainer: {
        height: '50%',
        backgroundColor: '#f0f0f0', // Light gray background for image container
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cardInner: {
        padding: 20,
        backgroundColor: 'white',
    },
    eventInfo: {
        marginBottom: 20,
    },
    eventTitle: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
    },
    eventLocation: {
        fontSize: 18,
        color: 'gray',
    },
    attendeesSection: {
        marginBottom: 20,
    },
    attendeesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    attendees: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendeeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    moreAttendeesButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
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
});

export default Card;