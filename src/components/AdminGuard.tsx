import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const isAdmin = useAdmin();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <Shield size={40} className="text-[#ef4444] mx-auto mb-3" />
          <h1 className="text-lg font-bold text-[#eff1f6]">Access Denied</h1>
          <p className="text-sm text-[#8c8c8c] mt-1">Admin only.</p>
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
