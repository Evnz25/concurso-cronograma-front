import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { Toast } from "@/components/common/Toast";
import { ConfirmActionModal } from "@/components/modals/ConfirmActionModal";
import { ExamDetailsModal } from "@/components/modals/ExamDetailsModal";
import { HelpModal } from "@/components/modals/HelpModal";
import { NotificationsModal } from "@/components/modals/NotificationsModal";
import { AppProvider, useApp } from "@/context/AppContext";
import { colors } from "@/theme";

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync().catch(() => {});

function GlobalModalsAndToast() {
  const router = useRouter();
  const {
    selectedExam,
    activeModal,
    toastMessage,
    pendingReviews,
    blocks,
    completedIds,
    closeModals,
    prepareForExam,
    resetProgress,
    deleteAccount,
    dismissToast,
  } = useApp();

  return (
    <>
      <Toast message={toastMessage} onClose={dismissToast} />

      {selectedExam && (
        <ExamDetailsModal
          exam={selectedExam}
          onClose={closeModals}
          onPrepare={(exam) => {
            prepareForExam(exam);
            router.push("/study" as any);
          }}
        />
      )}

      {activeModal === "notifications" && (
        <NotificationsModal
          pendingReviews={pendingReviews}
          pendingBlocks={blocks.length - completedIds.length}
          onClose={closeModals}
          onStartReview={() => {
            closeModals();
            router.push("/questions" as any);
          }}
        />
      )}

      {activeModal === "help" && <HelpModal onClose={closeModals} />}

      {activeModal === "reset" && (
        <ConfirmActionModal
          variant="reset"
          onClose={closeModals}
          onConfirm={() => {
            resetProgress();
            closeModals();
            router.push("/study" as any);
          }}
        />
      )}

      {activeModal === "delete" && (
        <ConfirmActionModal
          variant="delete"
          onClose={closeModals}
          onConfirm={() => {
            deleteAccount();
            closeModals();
            router.push("/profile" as any);
          }}
        />
      )}
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="stats"
            options={{
              presentation: "card",
              headerShown: true,
              headerTitle: "Meu Desempenho",
              headerTintColor: colors.primary,
              headerStyle: { backgroundColor: colors.surface },
            }}
          />
        </Stack>
        <GlobalModalsAndToast />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
