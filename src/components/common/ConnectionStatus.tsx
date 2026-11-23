import { ActivityIndicator, View } from "react-native";
import { useApp } from "@/context/AppContext";
import { colors, spacing } from "@/theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

export function ConnectionStatus() {
  const { busy, error, refresh, authenticated, logout, hasData } = useApp();
  if (!authenticated) return null;
  return (
    <View style={{ padding: spacing.sm, gap: spacing.xs, backgroundColor: colors.surface }}>
      {busy ? (
        <ActivityIndicator color={colors.primary} accessibilityLabel="Sincronizando dados" />
      ) : (
        <>
          {!!error && (
            <AppText color={colors.danger} accessibilityRole="alert">
              {error}
            </AppText>
          )}
          <Button
            variant="text"
            label={hasData ? "Atualizar dados" : "Tentar carregar novamente"}
            onPress={() => {
              void refresh();
            }}
          />
          {!hasData && (
            <Button
              variant="text"
              label="Sair da conta"
              onPress={() => {
                void logout();
              }}
            />
          )}
        </>
      )}
    </View>
  );
}
