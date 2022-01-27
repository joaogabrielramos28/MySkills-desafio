import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit.png";
import { Task } from "./TasksList";

interface TaskItemProps extends Task {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTitleTask: (id: number, title: string) => void;
}

export function TaskItem({
  id,
  title,
  done,
  index,
  toggleTaskDone,
  removeTask,
  handleEditTitleTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  function handleEditTask() {
    handleEditTitleTask(id, newTitle);
    setIsEditing(false);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => removeTask(id),
          style: "default",
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(id)}
        >
          <View
            testID={`marker-${index}`}
            style={done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing ? (
            <TextInput
              defaultValue={title}
              onSubmitEditing={handleEditTask}
              onChangeText={setNewTitle}
              style={{ padding: 0 }}
              autoFocus={true}
            />
          ) : (
            <Text style={done ? styles.taskTextDone : styles.taskText}>
              {title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => setIsEditing(false)}
          style={{ paddingHorizontal: 24 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.taskActions}>
          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={() => setIsEditing(true)}
            style={{ borderRightWidth: 1, borderRightColor: "#C4C4C4" }}
          >
            <Image source={editIcon} style={styles.taskActionsImages} />
          </TouchableOpacity>
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleRemoveTask(id)}
          >
            <Image style={styles.taskActionsImages} source={trashIcon} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },

  taskActions: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  taskActionsImages: {
    marginHorizontal: 10,
    borderBottomWidth: 2,
  },

  inputTask: {
    height: 5,
    color: "#666",
    fontFamily: "Inter-Medium",
  },
});
