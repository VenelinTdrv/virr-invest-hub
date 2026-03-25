import { motion } from "framer-motion";
import { ArrowLeft, Users, DollarSign, BarChart3, HelpCircle, Info } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNav from "@/components/mobile/BottomNav";

const tabs = [
  { key: "about", label: "За нас", icon: Users },
  { key: "originators", label: "Оригинатори", icon: DollarSign },
  { key: "statistics", label: "Статистика", icon: BarChart3 },
  { key: "faq", label: "FAQ", icon: HelpCircle },
  { key: "blog", label: "Блог", icon: Info },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Information = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(tabParam && tabs.some(t => t.key === tabParam) ? tabParam : "about");

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-3 relative z-30"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-xl font-bold text-foreground">Информация</h1>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-1 overflow-x-auto no-scrollbar bg-card rounded-2xl p-1 border border-border virr-card-shadow"
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 virr-card-shadow border border-border"
        >
          {activeTab === "about" && <AboutContent />}
          {activeTab === "originators" && <OriginatorsContent />}
          {activeTab === "statistics" && <StatisticsContent />}
          {activeTab === "faq" && <FaqContent />}
          {activeTab === "blog" && <BlogContent />}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

const AboutContent = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-foreground">За нас</h2>

    <div>
      <h3 className="text-sm font-semibold text-foreground mb-1">Ние сме Вирр P2P</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Нашата мисия е: Да предложим иновативен и прозрачен начин за инвестиране, който съчетава висока доходност, контрол върху риска и силно доверие между инвеститори и кредитори.
      </p>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-foreground mb-1">
        Какво представлява нашата P2P платформа?
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Новата ни платформа свързва индивидуални и институционални инвеститори с утвърдени небанкови финансови институции. Чрез дигитализирана инфраструктура, инвеститорите могат да инвестират в потребителски и бизнес заеми, като печелят атрактивна доходност при по-ниски разходи и по-добра прозрачност спрямо традиционните модели.
      </p>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-foreground mb-2">
        Ключови предимства за инвеститорите:
      </h3>
      <div className="space-y-2">
        {[
          { title: "Бърз Buyback механизъм", desc: "всеки договорен заем е обезпечен с гаранция за обратно изкупуване, което свежда риска за инвеститорите до минимум." },
          { title: "Конкурентна доходност", desc: "гъвкави инвестиционни възможности, съобразени с пазарните нива и предпочитанията на инвеститорите." },
          { title: "Намален риск", desc: "платформата си сътрудничи само с надеждни финансови институции с доказана във времето стабилност и устойчив ръст." },
          { title: "Цифрово удобство", desc: "изцяло онлайн процес на регистрация, избор на инвестиции и проследяване на резултати." },
          { title: "Пълна прозрачност", desc: "достъп до ключова информация за заемополучатели, лизингодатели и представянето на активите." },
        ].map((item) => (
          <div key={item.title} className="bg-accent/50 rounded-xl p-3">
            <span className="text-xs font-semibold text-foreground">{item.title}</span>
            <span className="text-xs text-muted-foreground"> – {item.desc}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-foreground mb-1">Визия</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Целта ни е да изградим устойчива екосистема, в която инвеститорите получават стабилна възвръщаемост, а кредитните институции – достъп до свеж ресурс при ясни и справедливи условия. Вярваме, че чрез технологии, партньорство и споделена отговорност можем да наложим нов стандарт в P2P инвестирането на българския и регионалния пазар.
      </p>
    </div>
  </div>
);

const OriginatorsContent = () => (
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-foreground">Оригинатори</h2>
    {[
      { name: "Credissimo", loans: 245, rating: "A+", country: "България" },
      { name: "iuvo Group", loans: 180, rating: "A", country: "България" },
      { name: "EasyCredit", loans: 44, rating: "B+", country: "България" },
    ].map((o) => (
      <div key={o.name} className="bg-accent/50 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{o.name}</p>
          <p className="text-[11px] text-muted-foreground">{o.country} · {o.loans} кредита</p>
        </div>
        <span className="text-sm font-bold text-primary">{o.rating}</span>
      </div>
    ))}
  </div>
);

const StatisticsContent = () => (
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-foreground">Статистика на платформата</h2>
    {[
      { label: "Общо инвестирани средства", value: "€2 450 000" },
      { label: "Активни инвеститори", value: "1 280" },
      { label: "Финансирани кредити", value: "12 450" },
      { label: "Средна доходност", value: "11,8%" },
    ].map((s) => (
      <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
        <span className="text-xs text-muted-foreground">{s.label}</span>
        <span className="text-sm font-bold text-foreground">{s.value}</span>
      </div>
    ))}
  </div>
);

const FaqContent = () => (
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-foreground">Често задавани въпроси</h2>
    {[
      { q: "Какво е P2P инвестиране?", a: "P2P (peer-to-peer) инвестирането е модел, при който индивидуални инвеститори финансират заеми на кредитополучатели чрез онлайн платформа, без посредничеството на банка." },
      { q: "Какъв е минималният размер на инвестиция?", a: "Минималната сума за инвестиция е €10 (или еквивалента в лева)." },
      { q: "Как работи Buyback гаранцията?", a: "Ако кредитът закъснее с повече от 60 дни, оригинаторът изкупува обратно инвестицията заедно с натрупаната лихва." },
      { q: "Как мога да изтегля средствата си?", a: "Можете да заявите теглене по всяко време от раздел 'Теглене'. Средствата се превеждат по банковата ви сметка в рамките на 1-3 работни дни." },
    ].map((item, i) => (
      <div key={i} className="bg-accent/50 rounded-xl p-3">
        <p className="text-xs font-semibold text-foreground mb-1">{item.q}</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.a}</p>
      </div>
    ))}
  </div>
);

const BlogContent = () => (
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-foreground">Блог</h2>
    {[
      { title: "Как да започнете с P2P инвестиране", date: "15.03.2026", excerpt: "Пълно ръководство за начинаещи инвеститори в P2P платформи." },
      { title: "Пазарен обзор Q1 2026", date: "01.03.2026", excerpt: "Анализ на тенденциите в P2P сектора през първото тримесечие." },
      { title: "Диверсификация на портфолиото", date: "18.02.2026", excerpt: "Стратегии за разпределение на риска при P2P инвестиции." },
    ].map((post) => (
      <div key={post.title} className="bg-accent/50 rounded-xl p-3">
        <p className="text-xs font-semibold text-foreground">{post.title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{post.date}</p>
        <p className="text-[11px] text-muted-foreground mt-1">{post.excerpt}</p>
      </div>
    ))}
  </div>
);

export default Information;
