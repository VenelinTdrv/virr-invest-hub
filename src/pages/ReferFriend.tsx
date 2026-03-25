import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Copy, UserPlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const ReferFriend = () => {
  const navigate = useNavigate();
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");

  const referralLink = "https://invest.virr.io/user-registration?ref=SYQDVU";

  const referrals = [
    { name: "Любомир Иванов", email: "lyubomir.s.ivanov@gmail.com", bonus: "Не" },
    { name: "Георги Хаджов", email: "poruchka@gmail.com", bonus: "Да" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Линкът е копиран" });
  };

  const handleSend = () => {
    if (!friendName.trim() || !friendEmail.trim()) {
      toast({ title: "Моля, попълнете всички полета", variant: "destructive" });
      return;
    }
    toast({ title: "Поканата е изпратена успешно" });
    setFriendName("");
    setFriendEmail("");
  };

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
          <h1 className="text-lg font-semibold">Препоръчай приятел</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Info banner */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Покани приятел да се регистрира и инвестира в платформата, и двамата ще получите по 1% cash back от всички негови инвестиции, направени в рамките на 30 дни след активиране на регистрацията му.
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-0">
          <StatRow label="Брой регистрирани потребители" value="16" />
          <StatRow label="Инвестирана сума (30 дни)" value="€255 177,19" highlight />
          <StatRow label="Общо получен бонус" value="€2551,73" />
        </div>

        {/* Referral link */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Референтен линк</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="w-full flex items-center justify-between bg-muted rounded-xl px-4 py-3"
          >
            <span className="text-xs text-foreground truncate mr-2">{referralLink}</span>
            <Copy className="w-4 h-4 text-muted-foreground shrink-0" />
          </motion.button>
        </div>

        {/* Invite form */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Препоръчай приятел</p>
          <div className="space-y-3">
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Име на приятел*"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Email на приятел*"
                type="email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm"
              >
                <Send className="w-4 h-4" />
                Изпрати
              </motion.button>
            </div>
          </div>
        </div>

        {/* Referrals table */}
        <div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 px-4 py-3 border-b border-border">
              <span className="text-[11px] font-semibold text-muted-foreground">Име на приятел</span>
              <span className="text-[11px] font-semibold text-muted-foreground">Email на приятел</span>
              <span className="text-[11px] font-semibold text-muted-foreground text-right">Получен бонус</span>
            </div>
            {referrals.map((r, i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-3 border-b border-border last:border-b-0">
                <span className="text-xs text-foreground">{r.name}</span>
                <span className="text-xs text-foreground truncate">{r.email}</span>
                <span className="text-xs text-foreground text-right">{r.bonus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
    <span className="text-xs text-foreground">{label}</span>
    <span className={`text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
  </div>
);

export default ReferFriend;
