import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Globe,
  FileText,
  Calendar,
  MapPin,
  Home,
  Upload,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  verified?: boolean;
  type?: string;
  placeholder?: string;
}

const FieldRow = ({
  icon: Icon,
  label,
  value,
  onChange,
  verified,
  type = "text",
  placeholder,
}: FieldRowProps) => (
  <div className="flex items-center gap-3 px-4 py-3">
    <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-[11px] text-muted-foreground mb-0.5">{label}</p>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="h-8 text-sm border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 bg-transparent"
      />
    </div>
    {verified && (
      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 text-primary-foreground" />
      </div>
    )}
  </div>
);

interface UploadBoxProps {
  label: string;
  file: File | null;
  onSelect: (f: File | null) => void;
}

const UploadBox = ({ label, file, onSelect }: UploadBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    onSelect(f);
  };

  return (
    <div className="border-2 border-dashed border-border rounded-2xl p-4 flex flex-col items-center gap-3 bg-accent/30">
      <p className="text-xs text-muted-foreground text-center font-medium bg-accent px-3 py-1 rounded-lg">
        {label}
      </p>
      {file ? (
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary" />
          <span className="text-xs text-foreground truncate max-w-[140px]">
            {file.name}
          </span>
          <button onClick={() => onSelect(null)}>
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer flex items-center gap-1 text-primary text-xs font-medium">
          <Upload className="w-4 h-4" />
          Прикачи от тук
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
};

const IdentityVerification = () => {
  const navigate = useNavigate();

  // Personal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactLang, setContactLang] = useState("Български BG");

  // Document
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [egn, setEgn] = useState("");
  const [noExpiry, setNoExpiry] = useState(false);

  // Permanent address
  const [permCountry, setPermCountry] = useState("");
  const [permCity, setPermCity] = useState("");
  const [permAddress, setPermAddress] = useState("");
  const [permZip, setPermZip] = useState("");

  // Current address
  const [sameAddress, setSameAddress] = useState(false);
  const [currCountry, setCurrCountry] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currAddress, setCurrAddress] = useState("");
  const [currZip, setCurrZip] = useState("");

  // Documents
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [backPhoto, setBackPhoto] = useState<File | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Header */}
      <div className="virr-gradient px-5 pt-12 pb-6 rounded-b-3xl text-primary-foreground">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Лична информация</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Personal Data */}
        <Section title="Лични данни">
          <FieldRow icon={User} label="Име*" value={firstName} onChange={setFirstName} />
          <FieldRow icon={User} label="Фамилия*" value={lastName} onChange={setLastName} />
          <div className="px-4 py-3 flex items-center gap-3">
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground mb-0.5">Пол*</p>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-8 text-sm border-0 border-b border-border rounded-none px-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Изберете" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Мъж</SelectItem>
                  <SelectItem value="female">Жена</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <FieldRow icon={Phone} label="Телефонен номер*" value={phone} onChange={setPhone} type="tel" />
          <FieldRow icon={Mail} label="Email*" value={email} onChange={setEmail} type="email" verified={!!email} />
          <div className="px-4 py-3 flex items-center gap-3">
            <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground mb-0.5">Език за контакт*</p>
              <Select value={contactLang} onValueChange={setContactLang}>
                <SelectTrigger className="h-8 text-sm border-0 border-b border-border rounded-none px-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Изберете" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Български BG">Български BG</SelectItem>
                  <SelectItem value="English EN">English EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        {/* Documents */}
        <Section title="Документи">
          <div className="px-4 py-3 flex items-center gap-3">
            <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground mb-0.5">Тип на документа*</p>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger className="h-8 text-sm border-0 border-b border-border rounded-none px-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Изберете" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id_card">Лична карта</SelectItem>
                  <SelectItem value="passport">Паспорт</SelectItem>
                  <SelectItem value="driving_license">Шофьорска книжка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <FieldRow icon={FileText} label="ЕГН*" value={egn} onChange={setEgn} />
          <FieldRow icon={FileText} label="Номер на документа*" value={docNumber} onChange={setDocNumber} />
          <FieldRow icon={Calendar} label="Дата на раждане*" value={birthDate} onChange={setBirthDate} type="date" />
          <FieldRow icon={Calendar} label="Дата на издаване на документа*" value={issueDate} onChange={setIssueDate} type="date" />
          <FieldRow icon={Calendar} label="Дата на валидност на документа*" value={expiryDate} onChange={setExpiryDate} type="date" />
          <div className="px-4 py-2 flex items-center gap-2">
            <Checkbox
              id="noExpiry"
              checked={noExpiry}
              onCheckedChange={(v) => setNoExpiry(v === true)}
            />
            <label htmlFor="noExpiry" className="text-xs text-muted-foreground">
              Безсрочна валидност на документа
            </label>
          </div>
        </Section>

        {/* Permanent Address */}
        <Section title="Постоянен адрес">
          <div className="px-4 py-3 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground mb-0.5">Държава*</p>
              <Select value={permCountry} onValueChange={setPermCountry}>
                <SelectTrigger className="h-8 text-sm border-0 border-b border-border rounded-none px-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Изберете" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bulgaria">България</SelectItem>
                  <SelectItem value="Romania">Румъния</SelectItem>
                  <SelectItem value="Greece">Гърция</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <FieldRow icon={Home} label="Град*" value={permCity} onChange={setPermCity} />
          <FieldRow icon={Home} label="Адрес*" value={permAddress} onChange={setPermAddress} />
          <FieldRow icon={Mail} label="Пощенски код*" value={permZip} onChange={setPermZip} />
        </Section>

        {/* Current Address */}
        <Section title="Настоящ адрес">
          <div className="px-4 py-2 flex items-center gap-2">
            <Checkbox
              id="sameAddress"
              checked={sameAddress}
              onCheckedChange={(v) => setSameAddress(v === true)}
            />
            <label htmlFor="sameAddress" className="text-xs text-muted-foreground">
              Настоящият адрес е същият като постоянния
            </label>
          </div>
          {!sameAddress && (
            <>
              <div className="px-4 py-3 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] text-muted-foreground mb-0.5">Държава*</p>
                  <Select value={currCountry} onValueChange={setCurrCountry}>
                    <SelectTrigger className="h-8 text-sm border-0 border-b border-border rounded-none px-0 bg-transparent focus:ring-0">
                      <SelectValue placeholder="Изберете" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bulgaria">България</SelectItem>
                      <SelectItem value="Romania">Румъния</SelectItem>
                      <SelectItem value="Greece">Гърция</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <FieldRow icon={Home} label="Град*" value={currCity} onChange={setCurrCity} />
              <FieldRow icon={Home} label="Адрес*" value={currAddress} onChange={setCurrAddress} />
              <FieldRow icon={Mail} label="Пощенски код*" value={currZip} onChange={setCurrZip} />
            </>
          )}
        </Section>

        {/* Photo Uploads */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Прикачени документи
          </h3>
          <div className="space-y-3">
            <UploadBox
              label="Моля, прикачете снимка на лицето на вашата лична карта."
              file={frontPhoto}
              onSelect={setFrontPhoto}
            />
            <UploadBox
              label="Моля, прикачете снимка на гърба на вашата лична карта."
              file={backPhoto}
              onSelect={setBackPhoto}
            />
            <UploadBox
              label="Моля, прикачете ваша актуална снимка."
              file={selfiePhoto}
              onSelect={setSelfiePhoto}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={() => navigate("/profile")}
          className="w-full h-12 rounded-xl text-sm font-semibold"
        >
          Запази
        </Button>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
      {title}
    </h3>
    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
      {children}
    </div>
  </div>
);

export default IdentityVerification;
