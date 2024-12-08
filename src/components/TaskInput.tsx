import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAddTask: () => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChangeText,
  onAddTask,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Yeni görev ekle..."
      placeholderTextColor="#95a5a6"
      // Temel ayarlar
      keyboardType={Platform.OS === 'android' ? 'visible-password' : 'default'}
      autoCapitalize="sentences"
      autoCorrect={false}
      contextMenuHidden={true}
      // Enter tuşu ayarları
      returnKeyType="done"
      onSubmitEditing={onAddTask}
      // Android spesifik ayarlar
      textContentType="none"
      underlineColorAndroid="transparent"
    />
    <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
      <Text style={styles.addButtonText}>Ekle</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    elevation: 2,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
