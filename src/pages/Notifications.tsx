import { motion } from "framer-motion";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useEffect } from "react";

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, markAllAsRead } = useNotifications();

  useEffect(() => {
    markAllAsRead();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="virr-gradient px-5 pt-12 pb-6 rounded-b-3xl text-primary-foreground">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Известия</h1>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Няма известия</p>
          </div>
        ) : (
          notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <p className="text-sm text-foreground leading-relaxed">
                {n.linkText && n.linkTo ? (
                  <>
                    {n.message.split(n.linkText)[0]}
                    <span
                      onClick={() => navigate(n.linkTo!)}
                      className="text-primary font-semibold underline cursor-pointer"
                    >
                      {n.linkText}
                    </span>
                    {n.message.split(n.linkText)[1]}
                  </>
                ) : (
                  n.message
                )}
              </p>
              <p className="text-[11px] text-muted-foreground mt-2">
                {n.createdAt.toLocaleDateString("bg-BG")}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
