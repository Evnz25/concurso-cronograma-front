import type { ModalType, ProfileFormData, TrackId, User } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { AccountSettingsCard } from "@/components/profile/AccountSettingsCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileTipCard } from "@/components/profile/ProfileTipCard";
import { getTracks } from "@/services/trackService";

interface ProfileViewProps {
  user: User;
  onSelectTrack: (trackId: TrackId) => void;
  onSave: (data: ProfileFormData) => void;
  onOpenModal: (modal: ModalType) => void;
}

/** Gestão de conta e escolha de trilha (RF01–RF05, RF08). */
export function ProfileView({ user, onSelectTrack, onSave, onOpenModal }: ProfileViewProps) {
  return (
    <>
      <PageHeading
        eyebrow="UMA JORNADA QUE É SUA"
        title="Seu perfil. Seu próximo capítulo"
        description="Conte um pouco sobre você e escolha o caminho da sua aprovação."
      />
      <div className="profile-layout">
        <div>
          <ProfileForm
            user={user}
            tracks={getTracks()}
            onSelectTrack={onSelectTrack}
            onSave={onSave}
          />
        </div>
        <aside>
          <ProfileTipCard />
          <AccountSettingsCard
            onResetSchedule={() => onOpenModal("reset")}
            onDeleteAccount={() => onOpenModal("delete")}
          />
        </aside>
      </div>
    </>
  );
}
