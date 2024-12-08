import React from 'react';
import {View, FlatList, StyleSheet, ListRenderItem, Text} from 'react-native';
import {TaskItem} from './TaskItem';
import {Task} from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  const renderItem: ListRenderItem<Task> = ({item}) => (
    <TaskItem task={item} onToggle={onToggleTask} onDelete={onDeleteTask} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Toplam Görev: <Text style={styles.statsNumber}>{tasks.length}</Text>
        </Text>
        <Text style={styles.statsText}>
          Tamamlanan:{' '}
          <Text style={styles.statsNumber}>
            {tasks.filter(task => task.completed).length}
          </Text>
        </Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
  },
  statsText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  statsNumber: {
    fontWeight: 'bold',
    color: '#3498db',
  },
});
