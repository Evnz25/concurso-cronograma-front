import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { AccountSettingsCard } from "@/components/profile/AccountSettingsCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useApp } from "@/context/AppContext";
import { getTracks } from "@/services/trackService";

export function ProfileView() {
  const { user, selectTrack, saveProfile, openModal } = useApp();

  return (
    <ScreenContainer>
      <PageHeading eyebrow="UMA JORNADA QUE É SUA" title="Perfil" />

      <ProfileForm
        user={user}
        tracks={getTracks()}
        onSelectTrack={selectTrack}
        onSave={saveProfile}
      />

      <AccountSettingsCard
        onResetSchedule={() => openModal("reset")}
        onDeleteAccount={() => openModal("delete")}
      />
    </ScreenContainer>
  );
}
