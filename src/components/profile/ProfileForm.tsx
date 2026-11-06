import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { ProfileFormData, Track, TrackId, User } from "@/interfaces";
import { MIN_PASSWORD_LENGTH } from "@/services/userService";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { TrackSelector } from "./TrackSelector";

interface ProfileFormProps {
  user: User;
  tracks: Track[];
  onSelectTrack: (trackId: TrackId) => void;
  onSave: (data: ProfileFormData) => void;
}

export function ProfileForm({ user, tracks, onSelectTrack, onSave }: ProfileFormProps) {
  const [form, setForm] = useState<ProfileFormData>({
    name: user.name,
    email: user.email,
    password: "",
  });

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  }, [user]);

  const update = (field: keyof ProfileFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    onSave(form);
    update("password", "");
  };

  return (
    <Card style={styles.card}>
      {/* Avatar Header */}
      <View style={styles.avatarRow}>
        <Avatar name={user.name} size="large" />
        <View style={styles.avatarText}>
          <AppText variant="subheading">{user.name || "Boas-vindas ao AprovaTech"}</AppText>
          <AppText variant="caption">Seu futuro começa aqui.</AppText>
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.fields}>
        <View style={styles.fieldGroup}>
          <AppText variant="caption" style={styles.label}>
            Nome completo
          </AppText>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => update("name", v)}
            placeholder="Como podemos chamar você?"
            placeholderTextColor={colors.muted}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.fieldGroup}>
          <AppText variant="caption" style={styles.label}>
            E-mail
          </AppText>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(v) => update("email", v)}
            placeholder="voce@email.com"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <AppText variant="caption" style={styles.label}>
            Senha
          </AppText>
          <TextInput
            style={styles.input}
            value={form.password}
            onChangeText={(v) => update("password", v)}
            placeholder="Digite uma nova senha"
            placeholderTextColor={colors.muted}
            secureTextEntry
          />
          <AppText variant="caption" style={styles.hint}>
            Mínimo de {MIN_PASSWORD_LENGTH} caracteres.
          </AppText>
        </View>
      </View>

      {/* Track Selector */}
      <TrackSelector tracks={tracks} selectedId={user.trackId} onSelect={onSelectTrack} />

      {/* Submit Button */}
      <Button
        label={user.name ? "Salvar alterações" : "Criar perfil"}
        icon="check"
        onPress={handleSubmit}
        fullWidth
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.lg,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarText: {
    flex: 1,
    gap: 2,
  },
  fields: {
    gap: spacing.md,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontFamily: fonts.medium,
    color: colors.text,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  hint: {
    fontSize: 11,
    color: colors.muted,
  },
});
