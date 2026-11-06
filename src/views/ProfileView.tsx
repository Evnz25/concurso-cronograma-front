import type { ModalType, ProfileFormData, TrackId, User } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { AccountSettingsCard } from "@/components/profile/AccountSettingsCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { getTracks } from "@/services/trackService";

interface ProfileViewProps {
  user: User;
  onSelectTrack: (trackId: TrackId) => void;
  onSave: (data: ProfileFormData) => void;
  onOpenModal: (modal: ModalType) => void;
}

/** Gestão de conta e escolha de trilha (RF01–RF05, RF08). */
export function ProfileView({
  user,
  onSelectTrack,
  onSave,
  onOpenModal,
}: ProfileViewProps) {
  return (
    <>
      <PageHeading eyebrow="" title="Perfil" />
      <div className="profile-layout">
        <div>
          <ProfileForm
            user={user}
            tracks={getTracks()}
            onSelectTrack={onSelectTrack}
            onSave={onSave}
          />
        </div>
      </div>
    </>
  );
}
