import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyHaveTask = tasks.find((task) => task.title === newTaskTitle);

    if (alreadyHaveTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks([...tasks, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task = {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  }

  function handleEditTitleTask(id: number, title: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task = {
          ...task,
          title,
        };
      }
      return task;
    });

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        handleEditTitleTask={handleEditTitleTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
