import React, { useState } from 'react';
import {View, TextInput, FlatList, Image, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const numColumns = 3;
const tileSize = Dimensions.get('window').width / numColumns;

const MEDIA_GRID = Array.from({ length: 18 }).map((_, i) => ({
  id: i.toString(),
  uri: `https://picsum.photos/300/300?random=${i + 10}`,
}));

export default function SearchScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Searching"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={MEDIA_GRID}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfile', {
                userId: item.id,
                userName: `user_${item.id}`,
              })
            }
          >
            <Image source={{ uri: item.uri }} style={styles.tile} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#efefef',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 15,
  },
  tile: {
    width: tileSize,
    height: tileSize,
    borderWidth: 1,
    borderColor: '#fff',
  },
});