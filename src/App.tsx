import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ArrowRight, 
  BarChart3, 
  PieChart,
  Wallet,
  CheckCircle2,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  MessageSquare,
  Mail,
  User,
  Send,
  Info,
  HelpCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'A Fórmula', href: '#formula', id: 'formula' },
    { name: 'Estabilização', href: '#reserva', id: 'reserva' },
    { name: 'Calculadora', href: '#calculadora', id: 'calculadora' },
    { name: 'Testemunhos', href: '#testemunhos', id: 'testemunhos' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Insights', href: '#insights', id: 'insights' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    const contactElement = document.getElementById('contact');
    if (contactElement) observer.observe(contactElement);

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">DMF Consulting</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={cn(
                "transition-colors relative py-2",
                activeSection === link.id ? "text-indigo-600 dark:text-indigo-400" : "hover:text-indigo-600 dark:hover:text-indigo-400"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                />
              )}
            </a>
          ))}
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
          
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <a 
            href="#contact" 
            className={cn(
              "bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none",
              activeSection === 'contact' && "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950"
            )}
          >
            Falar com Consultor
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <motion.div 
              className="px-6 py-8 space-y-6"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  variants={{
                    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
                  }}
                  className={cn(
                    "flex items-center gap-3 text-lg font-bold transition-colors",
                    activeSection === link.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {link.name}
                  {activeSection === link.id && <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
                </motion.a>
              ))}
              <motion.a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                variants={{
                  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
                }}
                className="block w-full bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                Falar com Consultor
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const StabilityChart = () => {
  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 30; i++) {
      points.push({
        day: i,
        dmf: 1.00,
        crypto: 1 + (Math.random() * 0.4 - 0.2),
        stocks: 1 + (Math.random() * 0.2 - 0.1),
      });
    }
    return points;
  }, []);

  return (
    <div className="h-[400px] w-full mt-8 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1">DMF vs Mercado</h3>
        <p className="text-sm text-slate-500">Comparação de volatilidade (NAV base \$1.00)</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="day" hide />
          <YAxis domain={[0.5, 1.5]} hide />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ display: 'none' }}
          />
          <Line type="monotone" dataKey="crypto" stroke="#f59e0b" strokeWidth={1} dot={false} opacity={0.3} name="Cripto" />
          <Line type="monotone" dataKey="stocks" stroke="#6366f1" strokeWidth={1} dot={false} opacity={0.3} name="Ações" />
          <Line type="monotone" dataKey="dmf" stroke="#10b981" strokeWidth={3} dot={false} name="DMF" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-4 text-[10px] font-bold uppercase tracking-wider justify-center">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> DMF (Estável)</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500 opacity-30" /> Ações</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500 opacity-30" /> Cripto</div>
      </div>
    </div>
  );
};

const Calculator = () => {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(5);
  const rate = 0.08;

  const finalValue = useMemo(() => {
    return amount * Math.pow(1 + rate, years);
  }, [amount, years]);

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= years; i++) {
      data.push({
        year: `Ano ${i}`,
        value: amount * Math.pow(1 + rate, i),
      });
    }
    return data;
  }, [amount, years]);

  return (
    <section id="calculadora" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">Calculadora DMF</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10">
              Veja o poder do rendimento de 8% ao ano com volatilidade zero. 
              O diferimento de impostos potencia o seu crescimento exponencial.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-sm">Investimento Inicial</label>
                  <span className="text-indigo-600 font-bold">{amount.toLocaleString('pt-PT')}€</span>
                </div>
                <input 
                  type="range" min="1000" max="1000000" step="1000" 
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-sm">Prazo (Anos)</label>
                  <span className="text-indigo-600 font-bold">{years} Anos</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="p-8 bg-indigo-600 rounded-3xl text-white">
                <div className="text-sm font-medium opacity-80 mb-1">Valor Estimado Final</div>
                <div className="text-4xl font-bold">{finalValue.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium bg-white/10 p-3 rounded-xl">
                  <Info className="w-4 h-4" />
                  Baseado num rendimento anual de 8% (DMF Target).
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" hide />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "O que é exatamente o NAV de 1 dólar?",
      a: "NAV significa Net Asset Value. Manter o NAV em 1 dólar significa que cada unidade do fundo vale sempre exatamente 1 dólar, tal como o saldo na sua conta bancária, eliminando a volatilidade do mercado."
    },
    {
      q: "Como é garantida a liquidez diária?",
      a: "Através da alocação de 20% em equivalentes a moeda (Money Market Funds) e 10% em cash. Isto permite honrar resgates instantâneos sem afetar o motor de rendimento do fundo."
    },
    {
      q: "Quais são as vantagens fiscais do DMF?",
      a: "O fundo beneficia do diferimento de impostos, o que significa que os rendimentos são reinvestidos sem tributação imediata, permitindo que o juro composto atue sobre o valor bruto."
    },
    {
      q: "O fundo é seguro contra crises sistémicas?",
      a: "A estrutura de 110% (100% ativos + 10% reserva extra) é desenhada para absorver choques. A reserva de cash atua como um amortecedor diário contra qualquer flutuação de mercado."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-slate-600 dark:text-slate-400">Esclareça as suas dúvidas sobre a estrutura e segurança do fundo.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <span className="font-bold">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 transition-transform", openIndex === i && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Hero = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
          Como criar um <span className="text-indigo-600 italic">Digital Money Fund</span>?
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10">
          Para quem está a dar os primeiros passos, imagine-o como uma receita de culinária rigorosa. 
          O objetivo? Criar o produto financeiro perfeito: volatilidade zero com rendimentos superiores.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#formula" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Descobrir a Receita <ArrowRight className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-200">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-500">+500 Investidores</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const RecipeSection = () => {
  const ingredients = [
    {
      percentage: "80%",
      title: "Crédito Digital",
      subtitle: "O Motor do Rendimento",
      description: "Investido em instrumentos de curta duração como o STRC (Stretch). Gera os rendimentos elevados transferindo ganhos da economia digital.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-50 border-amber-100"
    },
    {
      percentage: "20%",
      title: "Equivalentes a Moeda",
      subtitle: "A Almofada de Segurança",
      description: "Alocados a ativos tradicionais de mercado monetário. Garante liquidez imediata para resgates sem pressionar o crédito digital.",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-100"
    },
    {
      percentage: "10%",
      title: "Reserva de Cash",
      subtitle: "O Estabilizador Diário",
      description: "Reserva extra puramente em dinheiro físico. Utilizada diariamente às 16h00 para ajustar e reabastecer o NAV do fundo.",
      icon: <Clock className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-100"
    }
  ];

  return (
    <section id="formula" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">A Fórmula Exata</h2>
          <p className="text-slate-600">
            Misturamos três ingredientes fundamentais num processo que retira o risco das criptomoedas 
            e entrega estabilidade e lucro ao cidadão comum.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border ${item.color} flex flex-col h-full`}
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  {item.icon}
                </div>
                <span className="text-4xl font-bold text-slate-900">{item.percentage}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4 italic">{item.subtitle}</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">O Resultado: A Conta Poupança Perfeita</h3>
              <p className="text-slate-400 leading-relaxed">
                Ao aplicar este ajustamento diário, o fundo anula flutuações e mantém o valor estável de 1 dólar (NAV fixo), 
                alcançando a tão desejada volatilidade zero.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-400 mb-1">~8%</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Rendimento Alvo</div>
              </div>
              <div className="w-px h-16 bg-slate-800 hidden md:block" />
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400 mb-1">0.0</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Volatilidade</div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -ml-32 -mb-32" />
        </motion.div>
      </div>
    </section>
  );
};

const StabilizationSection = () => (
  <section id="reserva" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Clock className="w-4 h-4" /> Precisão Diária
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Qual é a função da reserva de 10% em dinheiro?
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Atua como um <span className="font-bold text-slate-900">estabilizador diário perfeito</span>. 
                Para quem procura segurança máxima, esta reserva é o mecanismo que retira o risco do mercado.
              </p>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Ajuste às 16h00</h4>
                  <p className="text-sm">
                    Diariamente, os gestores utilizam esta almofada para reabastecer o NAV. 
                    Qualquer flutuação é corrigida de imediato.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex-shrink-0 flex items-center justify-center border border-slate-200">
                  <Wallet className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Blindagem de Capital</h4>
                  <p className="text-sm">
                    O fundo passa a negociar como uma stablecoin, mantendo um valor fixo de 1 dólar, 
                    fazendo a volatilidade descer para o zero absoluto.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="font-bold text-xl">Monitor de Estabilidade</h3>
                <p className="text-sm text-slate-400">Atualizado em tempo real</p>
              </div>
              <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                ATIVO
              </div>
            </div>
            
            <div className="space-y-8">
              <StabilityChart />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Rácio de Atração</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">∞</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Volatilidade</div>
                  <div className="text-2xl font-bold text-emerald-600">0.00%</div>
                </div>
              </div>
              
              <div className="p-6 border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-sm">Composição da Reserva</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-indigo-600 w-[80%]" />
                  <div className="h-full bg-indigo-400 w-[20%]" />
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>80% Crédito</span>
                  <span>20% Liquidez</span>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Decorative blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />
        </div>
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="beneficios" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
            Paz de espírito na sua conta bancária
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
            O seu capital encontra-se totalmente protegido e apoiado, permitindo-lhe usufruir de um rendimento passivo 
            que ronda os 8% ao ano, com a mesma segurança de uma conta tradicional.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Diferimento de impostos monumental",
              "Rendimento formidável de ~8%",
              "Proteção total contra quedas"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="mt-16 inline-block bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-slate-100 transition-all">
            Começar a Investir Agora
          </a>
        </motion.div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const reviews = [
    { name: "António Silva", role: "Investidor Privado", text: "A estabilidade do DMF é impressionante. Finalmente um produto que me permite dormir descansado enquanto o capital cresce.", avatar: "https://picsum.photos/seed/antonio/100/100" },
    { name: "Maria Santos", role: "Gestora de Património", text: "Recomendo aos meus clientes que procuram uma alternativa segura aos depósitos a prazo, com rendimentos muito superiores.", avatar: "https://picsum.photos/seed/maria/100/100" },
    { name: "João Pereira", role: "Empreendedor", text: "O diferimento de impostos é a cereja no topo do bolo. A eficiência fiscal deste fundo é inigualável no mercado atual.", avatar: "https://picsum.photos/seed/joao/100/100" }
  ];

  return (
    <section id="testemunhos" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">O que dizem os nossos investidores</h2>
          <p className="text-slate-600 dark:text-slate-400">Confiança e transparência em cada passo do caminho.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={rev.avatar} alt={rev.name} className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-bold text-sm">{rev.name}</div>
                  <div className="text-xs text-slate-500">{rev.role}</div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">"{rev.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketInsights = () => {
  const posts = [
    { title: "O Fim da Volatilidade?", date: "2 Mar 2026", category: "Análise", excerpt: "Como os fundos de dinheiro digital estão a mudar o paradigma do investimento conservador." },
    { title: "STRC: O Motor de 8%", date: "28 Fev 2026", category: "Tecnologia", excerpt: "Uma análise profunda sobre o instrumento de crédito digital que garante rendimentos superiores." },
    { title: "Fiscalidade no Século XXI", date: "25 Fev 2026", category: "Impostos", excerpt: "Por que o diferimento de impostos é a ferramenta mais poderosa para o investidor moderno." }
  ];

  return (
    <section id="insights" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Market Insights</h2>
            <p className="text-slate-600 dark:text-slate-400">Fique a par das últimas tendências do dinheiro digital.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
            Ver todos os artigos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article 
              key={i}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 rounded-3xl mb-6 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/blog${i}/800/450`} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                  {post.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Pronto para transformar as suas poupanças?</h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Fale com um dos nossos consultores especializados e descubra como o Digital Money Fund pode blindar o seu património.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Email</div>
                  <div className="font-bold">consultoria@dmf.pt</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">WhatsApp</div>
                  <div className="font-bold">+351 912 345 678</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[3rem] text-slate-900 dark:text-white shadow-2xl">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                <p className="text-slate-600 dark:text-slate-400">Entraremos em contacto consigo nas próximas 24 horas.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-indigo-600 font-bold text-sm underline underline-offset-4"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required type="text" placeholder="Ex: João Silva" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Profissional</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required type="email" placeholder="joao@exemplo.pt" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Mensagem</label>
                  <textarea 
                    required placeholder="Como podemos ajudar?" rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  />
                </div>
                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  {status === 'sending' ? 'A enviar...' : (
                    <>Enviar Pedido de Consultoria <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -ml-48 -mb-48" />
    </section>
  );
};
const Footer = () => (
  <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
          <TrendingUp className="text-white w-4 h-4" />
        </div>
        <span className="font-bold text-lg tracking-tight dark:text-white">DMF Consulting</span>
      </div>
      <div className="text-slate-400 dark:text-slate-500 text-sm">
        © 2026 Digital Money Fund Consulting. Todos os direitos reservados.
      </div>
      <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Termos</a>
        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacidade</a>
        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contacto</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <RecipeSection />
        <StabilizationSection />
        <Calculator />
        <Benefits />
        <Testimonials />
        <FAQ />
        <MarketInsights />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

