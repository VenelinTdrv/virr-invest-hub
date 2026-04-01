import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Floating decorative circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5" />
        <div className="absolute top-1/4 -left-16 w-48 h-48 rounded-full bg-primary/3" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary tracking-tighter">VI</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Добре дошли</h1>
          <p className="text-muted-foreground text-sm">
            Влезте в акаунта си, за да продължите
          </p>
        </motion.div>

        {/* Buttons card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full bg-card rounded-3xl p-6 shadow-lg border border-border space-y-3"
        >
          <Button
            onClick={() => navigate("/login?mode=login")}
            className="w-full h-13 rounded-2xl text-sm font-bold tracking-wide uppercase bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25"
          >
            Вход
          </Button>
          <Button
            onClick={() => navigate("/login?mode=register")}
            variant="outline"
            className="w-full h-13 rounded-2xl text-sm font-bold tracking-wide uppercase border-primary/30 text-primary hover:bg-primary/5"
          >
            Регистрация
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-[10px] text-muted-foreground"
      >
        © 2026 VIRR. Всички права запазени.
      </motion.p>
    </div>
  );
};

export default Welcome;
