import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: '#18212A'
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Agendado"
        options={{
          title: "Agendado",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Informacoes"
        options={{
          title: "Informações",
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Conta"
        options={{
          title: "Conta",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
