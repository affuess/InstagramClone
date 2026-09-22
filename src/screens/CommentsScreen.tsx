import React, { useState } from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

export default function CommentsScreen() {
  const [comments, setComments] = useState<string[]>([
    'Perfect',
    'Great',
  ]);
  const [text, setText] = useState('');

  const addComment = () => {
    if (!text.trim()) return;
    setComments((prev) => [...prev, text.trim()]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={comments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentText}>{item}</Text>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Comment"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff'
 },
  commentItem: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderColor: '#eee'
 },
  commentText: { 
    fontSize: 14
 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendBtn: { 
    backgroundColor: '#007AFF', 
    borderRadius: 15,
     padding: 10
     },
  sendBtnText: { 
    color: '#fff', 
    fontWeight: 'bold'
 },
});