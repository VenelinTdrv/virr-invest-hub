import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Green header */}
      <div className="bg-primary pt-14 pb-10 px-6 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-5 -left-5 w-32 h-32 rounded-full bg-primary-foreground/10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-3xl font-bold text-primary-foreground tracking-wider">VIRR</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">P2P Инвестиционна платформа</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5"
          >
            <Flag className="w-7 h-7 text-primary" />
          </motion.div>

          <p className="text-base font-semibold text-primary leading-relaxed">
            Вие се регистрирахте успешно. За да продължите, моля, натиснете върху линка, който изпратихме на вашия email.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="mt-8 text-sm text-muted-foreground underline"
          >
            Обратно към Вход
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
