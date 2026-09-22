import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<CreateStackParamList, 'PostDetails'>;

export default function PostDetailsScreen({ route, navigation }: Props) {
  const { imageUri } = route.params;
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const handlePublish = () => {
    alert('Публикация успешно добавлена!');
    navigation.getParent()?.navigate('FeedTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: imageUri }} style={styles.thumbnail} />
        <TextInput
          style={styles.captionInput}
          placeholder="Напишите подпись..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add location or hashtags"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Publish" onPress={handlePublish} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  captionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});