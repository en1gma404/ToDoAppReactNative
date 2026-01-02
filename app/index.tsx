import { useState } from "react";
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([
        { id: Date.now().toString(), text: text, completed: false },
        ...todos,
      ]);
      setText("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привет, Nijat!🦁 </Text>
          <Text style={styles.subtitle}>Давай организуем твой день</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{activeCount}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{activeCount}</Text>
          <Text style={styles.statLabel}>Активные</Text>
        </View>
        <View style={[styles.statCard, styles.statCardCompleted]}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Выполнено</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todos.length}</Text>
          <Text style={styles.statLabel}>Всего</Text>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✏️</Text>
          <TextInput
            style={styles.input}
            placeholder="Новая задача..."
            placeholderTextColor="#6b7280"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTodo}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTodo}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎯</Text>
          <Text style={styles.emptyTitle}>Список задач пуст</Text>
          <Text style={styles.emptyText}>
            Добавь первую задачу чтобы начать!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={todos}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View
              style={[
                styles.todoItem,
                item.completed && styles.todoItemCompleted,
                { opacity: item.completed ? 0.6 : 1 },
              ]}
            >
              <TouchableOpacity
                style={styles.todoContent}
                onPress={() => toggleTodo(item.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.completed && styles.checkboxCompleted,
                  ]}
                >
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.todoText,
                    item.completed && styles.todoTextCompleted,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteTodo(item.id)}
                style={styles.deleteButton}
                activeOpacity={0.7}
              >
                <View style={styles.deleteButtonInner}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },
  badge: {
    backgroundColor: "#4f46e5",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1f2e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#262d3d",
  },
  statCardCompleted: {
    backgroundColor: "#1a2e29",
    borderColor: "#2a4a3f",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4f46e5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f2e",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#262d3d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#4f46e5",
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: -2,
  },
  list: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },
  todoItem: {
    backgroundColor: "#1a1f2e",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#262d3d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  todoItemCompleted: {
    backgroundColor: "#151a27",
    borderColor: "#1f2937",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "#4f46e5",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxCompleted: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  todoText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
    flex: 1,
    lineHeight: 22,
  },
  todoTextCompleted: {
    color: "#6b7280",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    marginLeft: 12,
  },
  deleteButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    fontSize: 18,
  },
});
