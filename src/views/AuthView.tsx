import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { PageHeading } from "@/components/common/PageHeading";
import { Card } from "@/components/common/Card";
import { AppText } from "@/components/common/AppText";
import { Button } from "@/components/common/Button";
import { TrackSelector } from "@/components/profile/TrackSelector";
import { useApp } from "@/context/AppContext";
import { colors, spacing, radius } from "@/theme";

export function AuthView() {
  const { authenticate, busy, error, enterAsGuest, registrationTracks, reloadRegistrationTracks } =
    useApp();
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trackId, setTrackId] = useState<string | null>(null);
  const selectedTrack = registrationTracks.find((track) => track.id === trackId);
  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="APROVATECH"
        title={mode === "login" ? "Entre na sua conta" : "Comece seus estudos"}
      />
      <Card style={styles.card}>
        <AppText>Seu cronograma, suas questões e seu progresso em um só lugar.</AppText>
        {mode === "cadastro" && (
          <>
            <AppText>Nome completo</AppText>
            <TextInput
              accessibilityLabel="Nome completo"
              style={styles.input}
              value={name}
              onChangeText={setName}
              editable={!busy}
              autoComplete="name"
            />
          </>
        )}
        <AppText>E-mail</AppText>
        <TextInput
          accessibilityLabel="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          editable={!busy}
        />
        <AppText>Senha</AppText>
        <TextInput
          accessibilityLabel="Senha"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          editable={!busy}
        />
        {mode === "cadastro" && (
          <>
            <AppText variant="caption">Use pelo menos 8 caracteres.</AppText>
            {registrationTracks.length > 0 ? (
              <>
                <TrackSelector
                  tracks={registrationTracks}
                  selectedId={trackId}
                  onSelect={setTrackId}
                  disabled={busy}
                />
                <AppText variant="caption">Todas as matérias da trilha começam com peso 1.</AppText>
              </>
            ) : (
              <>
                <AppText>Nenhuma trilha disponível para cadastro no momento.</AppText>
                <Button
                  variant="text"
                  label="Atualizar trilhas"
                  onPress={reloadRegistrationTracks}
                  disabled={busy}
                />
              </>
            )}
          </>
        )}
        {!!error && (
          <AppText color={colors.danger} accessibilityRole="alert">
            {error}
          </AppText>
        )}
        <Button
          label={mode === "login" ? "Entrar" : "Criar conta"}
          loading={busy}
          disabled={
            !email.trim() ||
            !password ||
            (mode === "cadastro" && (!name.trim() || password.length < 8 || !selectedTrack))
          }
          onPress={() => {
            void authenticate(
              mode,
              email,
              password,
              mode === "cadastro" && selectedTrack
                ? { name, trackId: selectedTrack.id }
                : undefined,
            );
          }}
        />
        <Button
          variant="text"
          label={mode === "login" ? "Ainda não tenho conta" : "Já tenho conta"}
          disabled={busy}
          onPress={() => {
            setMode(mode === "login" ? "cadastro" : "login");
            setPassword("");
          }}
        />
        <Button
          variant="secondary"
          label="Explorar trilhas e cursos"
          disabled={busy}
          onPress={enterAsGuest}
        />
      </Card>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  card: { gap: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
});
