import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  
  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: text }]);
      setText("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nijat&apos;s ToDo-App</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Какую задачу планируешь?"
          placeholderTextColor="#6c727f"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.inputtext}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1d23",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  text: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "Courier New",
    marginBottom: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#2d3139",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#404550",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#4ecdc4",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputtext: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  todoItem: {
    backgroundColor: "#2d3139",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#4ecdc4",
    borderWidth: 1,
    borderColor: "#404550",
  },
  todoText: {
    color: "#e8eaed",
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    color: "#ff4757",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});