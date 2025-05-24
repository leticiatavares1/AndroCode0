import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#18212A',
        },
        headerStyle: {
          backgroundColor: '#18212A',
        },
        headerTintColor: '#C9A64D',
      }}
    />
  );
}
