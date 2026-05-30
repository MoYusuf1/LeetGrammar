import { useState, useEffect, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { fetchProfile, updateProfile, uploadAvatar } from '@/services/profile-service';

interface ProfileEditorProps {
  /** If true, renders in compact sidebar style (Profile page). Otherwise full card style (Settings). */
  compact?: boolean;
}

export default function ProfileEditor({ compact = false }: ProfileEditorProps) {
  const { user } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from Supabase
  useEffect(() => {
    if (!user) return;
    fetchProfile(user.id).then((data) => {
      if (data) {
        setFirstName(data.first_name ?? '');
        setLastName(data.last_name ?? '');
        setDisplayName(data.display_name ?? '');
        setUsername(data.username ?? '');
        setAvatarUrl(data.avatar_url ?? '');
      }
      setProfileLoaded(true);
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await updateProfile(user.id, {
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      username,
    });
    setSaving(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    const url = await uploadAvatar(user.id, file);
    if (url) {
      setAvatarUrl(url);
      await updateProfile(user.id, { avatar_url: url });
    }
    setUploadingAvatar(false);
    e.target.value = '';
  };

  const fullName = `${firstName} ${lastName}`.trim() || displayName || user?.email?.split('@')[0] || 'Guest';
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName
        ? firstName[0].toUpperCase()
        : user?.email
          ? user.email[0].toUpperCase()
          : '?';

  if (!user) {
    return <p className="text-xs text-[#5c5c5c]">Sign in to edit your profile.</p>;
  }

  if (!profileLoaded) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={20} className="text-[#ffa116] animate-spin" />
      </div>
    );
  }

  if (compact) {
    // Sidebar style (Profile page)
    return (
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First"
              className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last"
              className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-9 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    );
  }

  // Full card style (Settings page)
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
      <h3 className="text-sm font-bold text-[#eff1f6] mb-4 flex items-center gap-2">
        <span className="text-[#8c8c8c]">Profile</span>
      </h3>

      <div className="space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0f0f0f]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xl font-bold">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#ffffff15] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              {uploadingAvatar ? <Loader2 size={11} className="animate-spin" /> : <Camera size={11} />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-[#eff1f6]">{fullName}</p>
            <p className="text-xs text-[#5c5c8c]">{user.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First"
              className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last"
              className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-9 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}

export function useProfileData() {
  const { user } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchProfile(user.id).then((data) => {
      if (data) {
        setFirstName(data.first_name ?? '');
        setLastName(data.last_name ?? '');
        setDisplayName(data.display_name ?? '');
        setUsername(data.username ?? '');
        setAvatarUrl(data.avatar_url ?? '');
      }
      setProfileLoaded(true);
    });
  }, [user]);

  const fullName = `${firstName} ${lastName}`.trim() || displayName || user?.email?.split('@')[0] || 'Guest';
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName
        ? firstName[0].toUpperCase()
        : user?.email
          ? user.email[0].toUpperCase()
          : '?';

  return {
    firstName, lastName, displayName, username, avatarUrl,
    fullName, initials, profileLoaded,
  };
}
