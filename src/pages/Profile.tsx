import { motion } from "framer-motion";
import { ArrowLeft, User, Shield, Settings, UserPlus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="virr-gradient px-5 pt-12 pb-8 rounded-b-3xl text-primary-foreground">
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Профил</h1>
        </div>

        {/* Avatar card */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/profile/personal")}
          className="flex items-center gap-4 w-full"
        >
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-bold">ВТ</span>
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-xl font-bold">Венелин</h2>
            <p className="text-sm text-primary-foreground/70">ve***@gmail.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-foreground/50" />
        </motion.button>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Функции */}
        <Section title="Функции">
          <MenuItem icon={User} label="Лична информация" onClick={() => navigate("/profile/personal")} />
          <MenuItem icon={Shield} label="Сигурност" badge="2FA" onClick={() => navigate("/profile/security")} />
        </Section>

        {/* Настройки */}
        <Section title="Настройки">
          <MenuItem icon={Settings} label="Настройки" onClick={() => {}} />
          <MenuItem icon={UserPlus} label="Препоръчай приятел" badge="Покани" onClick={() => {}} />
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
      {children}
    </div>
  </div>
);

const MenuItem = ({ icon: Icon, label, badge, onClick }: { icon: any; label: string; badge?: string; onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center justify-between px-4 py-4 w-full"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="px-2.5 py-0.5 bg-muted rounded-full text-[11px] text-muted-foreground font-medium">{badge}</span>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  </motion.button>
);

export default Profile;
