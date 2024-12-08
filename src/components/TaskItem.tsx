import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Task} from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = memo(
  ({task, onToggle, onDelete}) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => onToggle(task.id)}>
        <Text style={[styles.taskText, task.completed && styles.completedTask]}>
          {task.title}
        </Text>
        <Text style={styles.dateText}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  ),
);

TaskItem.displayName = 'TaskItem';

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  dateText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
