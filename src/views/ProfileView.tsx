import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { AccountSettingsCard } from "@/components/profile/AccountSettingsCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/common/Button";

export function ProfileView() {
  const { user, tracks, selectTrack, saveProfile, openModal, logout, busy } = useApp();

  return (
    <ScreenContainer>
      <PageHeading eyebrow="UMA JORNADA QUE É SUA" title="Perfil" />

      <ProfileForm user={user} tracks={tracks} onSelectTrack={selectTrack} onSave={saveProfile} />

      <Button
        label="Sair da conta"
        variant="secondary"
        disabled={busy}
        onPress={() => {
          void logout();
        }}
      />

      <AccountSettingsCard
        onResetSchedule={() => openModal("reset")}
        onDeleteAccount={() => openModal("delete")}
      />
    </ScreenContainer>
  );
}
