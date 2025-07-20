import { Stack } from 'expo-router';

export default function KycLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="document-upload" />
      <Stack.Screen name="selfie" />
      <Stack.Screen name="review" />
      <Stack.Screen name="success" />
    </Stack>
  );
}