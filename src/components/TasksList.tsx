import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";
import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTitleTask: (id: number, title: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  handleEditTitleTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              id={item.id}
              title={item.title}
              done={item.done}
              index={index}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
              handleEditTitleTask={handleEditTitleTask}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({});
