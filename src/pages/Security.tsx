import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Security = () => {
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
          <h1 className="text-lg font-semibold">Сигурност</h1>
        </div>
      </div>

      <div className="px-5 mt-6">
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-4 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Двуфакторна аутентикация</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-4 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Смени паролата</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Security;
