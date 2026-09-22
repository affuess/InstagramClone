import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<CreateStackParamList, 'Picker'>;

export default function PickerScreen({ navigation }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Нужен доступ к камере!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Gallery" onPress={pickImage} />
        <Button title="Camera" onPress={takePhoto} />
      </View>

      {imageUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <Button
            title="Next"
            onPress={() => navigation.navigate('PostDetails', { imageUri })}
          />
        </View>
      ) : (
        <Text style={styles.placeholderText}>Choose or take photo</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  previewContainer: {
    alignItems: 'center',
  },
  preview: {
    width: 260,
    height: 260,
    borderRadius: 12,
    marginBottom: 15,
  },
  placeholderText: {
    color: '#888',
    marginTop: 20,
  },
});