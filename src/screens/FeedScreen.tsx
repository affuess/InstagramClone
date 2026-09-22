import React, { useState } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'Feed'>;

interface Post {
  id: string;
  authorName: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    authorName: 'alex_dev',
    avatarUrl: 'https://via.placeholder.com/100',
    imageUrl: 'https://via.placeholder.com/600',
    caption: 'Instagram',
    likesCount: 42,
    isLiked: false,
    isBookmarked: false,
  },
];

export default function FeedScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      )
    );
  };

  const toggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.header}
              onPress={() =>
                navigation.navigate('UserProfile', { userId: item.id })
              }
            >
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              <Text style={styles.authorName}>{item.authorName}</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

            <View style={styles.actionsRow}>
              <View style={styles.leftActions}>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Text style={styles.actionBtn}>
                    {item.isLiked ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Comments', { postId: item.id })
                  }
                >
                  <Text style={styles.actionBtn}>💬</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                <Text style={styles.actionBtn}>
                  {item.isBookmarked ? '🔖' : '📑'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.likesText}>{item.likesCount} отметок "Нравится"</Text>
              <Text style={styles.caption}>
                <Text style={styles.authorName}>{item.authorName} </Text>
                {item.caption}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff'
  },
  card: { 
    marginBottom: 15 
 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10 
 },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10 
 },
  authorName: { 
    fontWeight: 'bold', 
    fontSize: 14 
 },
  postImage: { 
    width: '100%', 
    height: 350 
 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: { flexDirection: 'row' },
  actionBtn: { fontSize: 22, marginRight: 15 },
  infoContainer: { paddingHorizontal: 10 },
  likesText: { fontWeight: 'bold', marginBottom: 4 },
  caption: { fontSize: 14 },
});