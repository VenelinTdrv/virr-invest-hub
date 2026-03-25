import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, Mail, FileText, Calendar, MapPin, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePersonal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="virr-gradient px-5 pt-12 pb-6 rounded-b-3xl text-primary-foreground">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Лична информация</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        <Section title="Лични данни">
          <InfoRow icon={User} label="Име" value="Венелин" />
          <InfoRow icon={User} label="Фамилия" value="Тодоров" />
          <InfoRow icon={User} label="Пол" value="Мъж" />
          <InfoRow icon={Phone} label="Телефонен номер" value="+359888525549" />
          <InfoRow icon={Mail} label="Email" value="venelin.todorov@gmail.com" verified />
          <InfoRow icon={Globe} label="Език за контакт" value="Български BG" />
        </Section>

        <Section title="Документи">
          <InfoRow icon={FileText} label="Тип на документа" value="Лична карта" />
          <InfoRow icon={FileText} label="ЕГН" value="8002059065" verified />
          <InfoRow icon={FileText} label="Номер на документа" value="648807849" />
          <InfoRow icon={Calendar} label="Дата на раждане" value="2/5/1980" />
          <InfoRow icon={Calendar} label="Дата на издаване" value="1/27/2020" />
          <InfoRow icon={Calendar} label="Дата на валидност" value="1/27/2030" />
        </Section>

        <Section title="Постоянен адрес">
          <InfoRow icon={MapPin} label="Държава" value="Bulgaria" />
          <InfoRow icon={MapPin} label="Град" value="София" />
          <InfoRow icon={MapPin} label="Адрес" value="Никола Крушкин 50" />
          <InfoRow icon={Mail} label="Пощенски код" value="1444" />
        </Section>

        <Section title="Настоящ адрес">
          <InfoRow icon={MapPin} label="Държава" value="Bulgaria" />
          <InfoRow icon={MapPin} label="Град" value="София" />
          <InfoRow icon={MapPin} label="Адрес" value="Никола Крушкин 50" />
          <InfoRow icon={Mail} label="Пощенски код" value="1444" />
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

export default ProfilePersonal;
