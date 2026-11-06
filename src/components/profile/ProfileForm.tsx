import { useState, type FormEvent } from "react";
import type { ProfileFormData, Track, TrackId, User } from "@/interfaces";
import { MIN_PASSWORD_LENGTH } from "@/services/userService";
import { Avatar } from "../common/Avatar";
import { Icon } from "../common/Icon";
import { TrackSelector } from "./TrackSelector";

interface ProfileFormProps {
  user: User;
  tracks: Track[];
  onSelectTrack: (trackId: TrackId) => void;
  onSave: (data: ProfileFormData) => void;
}

/** Criação e edição de perfil (RF01, RF02). */
export function ProfileForm({
  user,
  tracks,
  onSelectTrack,
  onSave,
}: ProfileFormProps) {
  const [form, setForm] = useState<ProfileFormData>({
    name: user.name,
    email: user.email,
    password: "",
  });

  const update = (field: keyof ProfileFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(form);
    update("password", "");
  };

  return (
    <form className="panel profile-form" onSubmit={handleSubmit}>
      <div className="profile-avatar-row">
        <Avatar name={user.name} size="large" />
        <div>
          <strong>{user.name || "Boas-vindas ao AprovaTech"}</strong>
          <span>Seu futuro começa aqui.</span>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Nome completo
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Como podemos chamar você?"
            autoComplete="name"
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </label>
        <label className="full-width">
          Senha
          <input
            type="password"
            value={form.password}
            minLength={MIN_PASSWORD_LENGTH}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Digite uma nova senha"
            autoComplete="new-password"
          />
        </label>
      </div>
      <TrackSelector
        tracks={tracks}
        selectedId={user.trackId}
        onSelect={onSelectTrack}
      />
      <div className="form-footer">
        <button className="primary-button" type="submit">
          {user.name ? "Salvar alterações" : "Criar perfil"}
          <Icon name="check" size={17} />
        </button>
      </div>
    </form>
  );
}
