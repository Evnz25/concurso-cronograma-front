import { Tabs } from "expo-router";
import { Icon } from "@/components/common/Icon";
import { colors, fonts } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: "Cronograma",
          tabBarIcon: ({ color }) => <Icon name="calendar" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="questions"
        options={{
          title: "Questões",
          tabBarIcon: ({ color }) => <Icon name="book" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <Icon name="user" size={22} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
