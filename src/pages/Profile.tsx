import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, Mail, FileText, Calendar, MapPin, Shield, Settings, ChevronRight, UserPlus, Globe } from "lucide-react";
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
        
        {/* Avatar section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-bold">ВТ</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Венелин Тодоров</h2>
            <p className="text-sm text-primary-foreground/70">venelin.todorov@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Лична информация */}
        <Section title="Лична информация">
          <InfoRow icon={User} label="Име" value="Венелин" />
          <InfoRow icon={User} label="Фамилия" value="Тодоров" />
          <InfoRow icon={User} label="Пол" value="Мъж" />
          <InfoRow icon={Phone} label="Телефонен номер" value="+359888525549" />
          <InfoRow icon={Mail} label="Email" value="venelin.todorov@gmail.com" verified />
          <InfoRow icon={Globe} label="Език за контакт" value="Български BG" />
        </Section>

        {/* Документи */}
        <Section title="Документи">
          <InfoRow icon={FileText} label="Тип на документа" value="Лична карта" />
          <InfoRow icon={FileText} label="ЕГН" value="8002059065" verified />
          <InfoRow icon={FileText} label="Номер на документа" value="648807849" />
          <InfoRow icon={Calendar} label="Дата на раждане" value="2/5/1980" />
          <InfoRow icon={Calendar} label="Дата на издаване" value="1/27/2020" />
          <InfoRow icon={Calendar} label="Дата на валидност" value="1/27/2030" />
        </Section>

        {/* Постоянен адрес */}
        <Section title="Постоянен адрес">
          <InfoRow icon={MapPin} label="Държава" value="Bulgaria" />
          <InfoRow icon={MapPin} label="Град" value="София" />
          <InfoRow icon={MapPin} label="Адрес" value="Никола Крушкин 50" />
          <InfoRow icon={Mail} label="Пощенски код" value="1444" />
        </Section>

        {/* Настоящ адрес */}
        <Section title="Настоящ адрес">
          <InfoRow icon={MapPin} label="Държава" value="Bulgaria" />
          <InfoRow icon={MapPin} label="Град" value="София" />
          <InfoRow icon={MapPin} label="Адрес" value="Никола Крушкин 50" />
          <InfoRow icon={Mail} label="Пощенски код" value="1444" />
        </Section>

        {/* Настройки - Kraken style menu */}
        <Section title="Настройки">
          <MenuItem icon={Shield} label="Сигурност" badge="2FA" onClick={() => {}} />
          <MenuItem icon={Settings} label="Настройки" onClick={() => {}} />
          <MenuItem icon={UserPlus} label="Препоръчай приятел" onClick={() => {}} />
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-3">{title}</h3>
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
      {children}
    </div>
  </div>
);

const InfoRow = ({ icon: Icon, label, value, verified }: { icon: any; label: string; value: string; verified?: boolean }) => (
  <div className="flex items-center justify-between px-4 py-3">
    <div className="flex items-center gap-3 min-w-0">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
    {verified && (
      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
        <span className="text-primary-foreground text-xs">✓</span>
      </div>
    )}
  </div>
);

const MenuItem = ({ icon: Icon, label, badge, onClick }: { icon: any; label: string; badge?: string; onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center justify-between px-4 py-4 w-full"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="px-2 py-0.5 bg-muted rounded-full text-[11px] text-muted-foreground font-medium">{badge}</span>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  </motion.button>
);

export default Profile;
