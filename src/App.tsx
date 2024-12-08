import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  NativeModules,
  View,
} from 'react-native';
import {Task} from './types';
import {Header} from './components/Header';
import {TaskInput} from './components/TaskInput';
import {TaskList} from './components/TaskList';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Türkçe karakter dönüşüm fonksiyonu
  const convertToTurkishChars = (text: string): string => {
    const turkishChars: {[key: string]: string} = {
      i: 'i',
      ı: 'ı',
      ğ: 'ğ',
      ü: 'ü',
      ş: 'ş',
      ö: 'ö',
      ç: 'ç',
      İ: 'İ',
      I: 'I',
      Ğ: 'Ğ',
      Ü: 'Ü',
      Ş: 'Ş',
      Ö: 'Ö',
      Ç: 'Ç',
    };

    return text
      .split('')
      .map(char => turkishChars[char] || char)
      .join('');
  };

  const handleTextChange = (text: string) => {
    // Metni Türkçe karakterlere dönüştür
    const convertedText = convertToTurkishChars(text);
    setTask(convertedText);
  };

  const addTask = useCallback(() => {
    if (task.trim().length === 0) {
      Alert.alert('Hata', 'Boş görev ekleyemezsiniz!');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: task,
      completed: false,
      createdAt: new Date(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setTask('');
  }, [task]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Android için klavye ayarlarını yapılandır
  if (Platform.OS === 'android') {
    NativeModules.TextInput?.setTextInputDelKeyHandler?.();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
        <View style={styles.inputWrapper}>
          <TaskInput
            value={task}
            onChangeText={handleTextChange}
            onAddTask={addTask}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
});

export default App;
