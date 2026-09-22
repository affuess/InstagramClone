import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type UserProfileRouteProp = RouteProp<
  { UserProfile: { userId: string; userName?: string } },
  'UserProfile'
>;

export default function UserProfileScreen() {
  const route = useRoute<UserProfileRouteProp>();
  const { userName } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://picsum.photos/150' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName || 'User'}</Text>
        <Text style={styles.bio}>Information about user</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});