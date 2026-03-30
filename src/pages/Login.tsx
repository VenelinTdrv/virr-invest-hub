import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, User, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { notificationStore } from "@/stores/notificationStore";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptData, setAcceptData] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast({ title: "Грешка", description: "Паролите не съвпадат", variant: "destructive" });
      return;
    }
    if (isLogin) {
      toast({ title: "Вход", description: "Успешно!" });
      navigate("/");
    } else {
      notificationStore.addNotification({
        message: "За да може да инвестирате в платформата е нужно да се идентифицирате. За целта попълнете вашите лични данни и прикачете копие на личната ви карта тук.",
        linkText: "тук",
        linkTo: "/profile/personal",
      });
      navigate("/registration-success");
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({ title: `Вход с ${provider}`, description: "Пренасочване..." });
  };

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

      {/* Form area */}
      <div className="flex-1 px-5 -mt-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-lg"
        >
          {/* Tab toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isLogin
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isLogin
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Регистрация
            </button>
          </div>

          <h2 className="text-lg font-bold text-foreground mb-1">
            {isLogin ? "Влезте във вашия профил" : "Създайте нов профил"}
          </h2>
          <p className="text-xs text-muted-foreground mb-5">
            {isLogin
              ? "Въведете вашите данни за достъп"
              : "Попълнете данните си за регистрация"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email - always shown */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-accent/30 border-border rounded-xl text-sm"
                required
              />
            </div>

            {/* Password - always shown */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Парола*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-accent/30 border-border rounded-xl text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Registration-only fields */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3.5"
              >
                {/* Confirm password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Потвърди паролата*"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12 bg-accent/30 border-border rounded-xl text-sm"
                    required
                  />
                </div>

                {/* First name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Име*"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10 h-12 bg-accent/30 border-border rounded-xl text-sm"
                    required
                  />
                </div>

                {/* Last name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Фамилия*"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10 h-12 bg-accent/30 border-border rounded-xl text-sm"
                    required
                  />
                </div>

                {/* Language select */}
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                    className="w-full h-12 pl-10 pr-4 bg-accent/30 border border-border rounded-xl text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>Език за контакт*</option>
                    <option value="bg">Български</option>
                    <option value="en">English</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <Checkbox
                      checked={acceptTerms}
                      onCheckedChange={(v) => setAcceptTerms(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      Запознат съм и приемам{" "}
                      <a href="#" className="text-primary underline">Общите условия</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <Checkbox
                      checked={acceptData}
                      onCheckedChange={(v) => setAcceptData(v === true)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      Потвърждавам, че съм съгласен да предоставя личните си данни
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-sm font-bold tracking-wide uppercase bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLogin ? "ВХОД" : "РЕГИСТРИРАЙ СЕ"}
            </Button>
          </form>

          {isLogin && (
            <button
              onClick={() =>
                toast({ title: "Забравена парола", description: "Функцията ще бъде налична скоро." })
              }
              className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 mx-auto"
            >
              <Lock className="w-3 h-3" />
              Забравена парола?
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">или влезте с</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-border bg-card hover:bg-accent/30 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-foreground">Продължи с Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin("Apple")}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-border bg-foreground hover:bg-foreground/90 transition-colors"
            >
              <svg className="w-5 h-5 text-background" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm font-medium text-background">Продължи с Apple</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="py-5 text-center">
        <p className="text-[10px] text-muted-foreground">
          © 2026 VIRR. Всички права запазени.
        </p>
      </div>
    </div>
  );
};

export default Login;
