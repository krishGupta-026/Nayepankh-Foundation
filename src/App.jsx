import { useState, useEffect, useRef } from "react";

const COLORS = {
  saffron: "#F97316",
  saffronLight: "#FED7AA",
  saffronDark: "#C2410C",
  green: "#15803d",
  greenLight: "#bbf7d0",
  greenDark: "#14532d",
  cream: "#FEFCE8",
  dark: "#0d1f0e",
  darkCard: "#132014",
  darkBorder: "#1e3320",
};

const NAV_LINKS = ["Home", "About", "Programs", "Impact", "Team", "Donate"];

const PROGRAMS = [
  {
    icon: "🍱",
    title: "Food Distribution",
    desc: "Fighting hunger by distributing nutritious meals to underprivileged families and stray animals across communities.",
    color: COLORS.saffron,
  },
  {
    icon: "📚",
    title: "Education Drive",
    desc: "Empowering children with knowledge through free tutoring, stationery kits, and learning camps.",
    color: COLORS.green,
  },
  {
    icon: "🩺",
    title: "Hygiene Awareness",
    desc: "Breaking stigma by distributing sanitary napkins and running menstrual hygiene workshops for women and girls.",
    color: "#7c3aed",
  },
  {
    icon: "👕",
    title: "Clothes for All",
    desc: "Collecting and distributing warm clothes and essentials to poor families ahead of each season.",
    color: "#0891b2",
  },
];

const STATS = [
  { value: "2L+", label: "Lives Touched" },
  { value: "80G", label: "Tax Certified" },
  { value: "12A", label: "Govt Registered" },
  { value: "100%", label: "Youth Led" },
];

const TEAM = [
  { name: "Rahul Sharma", role: "Founder & President", initials: "RS" },
  { name: "Priya Singh", role: "Head of Operations", initials: "PS" },
  { name: "Aman Gupta", role: "Youth Lead", initials: "AG" },
  { name: "Sneha Verma", role: "Outreach Director", initials: "SV" },
];

function WingSVG({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scaleX(0.3) translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s cubic-bezier(0.34,1.56,0.64,1)";
      el.style.opacity = "1";
      el.style.transform = "scaleX(1) translateY(0)";
    });
  }, []);
  const c = dark ? "#F97316" : "#F97316";
  const c2 = dark ? "#bbf7d0" : "#15803d";
  return (
    <svg ref={ref} viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 320 }} aria-hidden="true">
      <g>
        <path d="M120 80 C80 60, 20 30, 10 10 C40 20, 80 40, 120 50 Z" fill={c} opacity="0.9" />
        <path d="M120 80 C90 50, 50 20, 30 5 C60 18, 95 42, 120 60 Z" fill={c} opacity="0.6" />
        <path d="M120 80 C160 60, 220 30, 230 10 C200 20, 160 40, 120 50 Z" fill={c2} opacity="0.9" />
        <path d="M120 80 C150 50, 190 20, 210 5 C180 18, 145 42, 120 60 Z" fill={c2} opacity="0.6" />
        <ellipse cx="120" cy="80" rx="8" ry="10" fill={dark ? "#fff" : "#0d1f0e"} opacity="0.9" />
      </g>
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function NayePankh() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(500);
  const [activeNav, setActiveNav] = useState("Home");

  const bg = dark ? COLORS.dark : "#fffef7";
  const card = dark ? COLORS.darkCard : "#ffffff";
  const border = dark ? COLORS.darkBorder : "#e5e7eb";
  const text = dark ? "#f1f5f0" : "#111827";
  const muted = dark ? "#9ab09c" : "#6b7280";
  const sectionBg = dark ? "#0f1a10" : "#f0fdf4";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
  };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: dark ? "rgba(13,31,14,0.95)" : "rgba(255,254,247,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${border}`,
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <WingSVG dark={dark} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.saffron, lineHeight: 1.1 }}>NayePankh</div>
              <div style={{ fontSize: 10, color: muted, letterSpacing: 1 }}>FOUNDATION</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 4, "@media(max-width:768px)": { display: "none" } }} className="nav-links">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeNav === link ? COLORS.saffron : muted,
                  fontWeight: activeNav === link ? 700 : 400,
                  fontSize: 14, padding: "6px 12px",
                  borderBottom: activeNav === link ? `2px solid ${COLORS.saffron}` : "2px solid transparent",
                  transition: "all 0.2s",
                }}>
                  {link}
                </button>
              ))}
            </div>
            <button onClick={() => setDark(!dark)} style={{
              background: dark ? "#1e3320" : "#f0fdf4",
              border: `1px solid ${border}`,
              borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              fontSize: 16, transition: "all 0.2s",
            }}>{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: text,
            }} className="burger">☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: dark ? COLORS.darkCard : "#fff", borderTop: `1px solid ${border}`, padding: "1rem 1.5rem" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
                cursor: "pointer", color: text, fontSize: 16, padding: "10px 0",
                borderBottom: `1px solid ${border}`,
              }}>{link}</button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes wingPulse { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.06)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes countUp { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        .nav-links { display:flex; }
        .burger { display:none!important; }
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .burger{display:block!important;}
        }
        .prog-card:hover { transform:translateY(-6px); box-shadow:0 12px 32px rgba(0,0,0,0.12)!important; }
        .prog-card { transition: transform 0.3s, box-shadow 0.3s; }
        .team-card:hover .team-avatar { transform:scale(1.1); }
        .team-avatar { transition:transform 0.3s; }
        .donate-btn:hover { transform:scale(1.04); }
        .donate-btn { transition:transform 0.2s; }
        .amount-btn:hover { border-color: ${COLORS.saffron}!important; color:${COLORS.saffron}!important; }
      `}</style>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: dark
          ? `linear-gradient(135deg, ${COLORS.dark} 0%, #132014 60%, #1a2e1a 100%)`
          : `linear-gradient(135deg, #fffef7 0%, #f0fdf4 60%, #fefce8 100%)`,
        paddingTop: 80, paddingBottom: 40,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <AnimSection>
              <div style={{
                display: "inline-block", background: dark ? "#1e3320" : COLORS.saffronLight,
                color: COLORS.saffronDark, fontSize: 12, fontWeight: 700, letterSpacing: 2,
                padding: "6px 14px", borderRadius: 20, marginBottom: 20,
              }}>
                UP GOVT · 80G · 12A CERTIFIED NGO
              </div>
            </AnimSection>
            <AnimSection delay={0.1}>
              <h1 style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1,
                marginBottom: 20, color: text,
              }}>
                Giving{" "}
                <span style={{
                  color: COLORS.saffron,
                  textDecoration: `underline wavy ${COLORS.green}`,
                  textUnderlineOffset: 6,
                }}>Wings</span>{" "}
                to the Underprivileged
              </h1>
            </AnimSection>
            <AnimSection delay={0.2}>
              <p style={{ fontSize: 18, color: muted, lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
                We don't ask for much — just help us with what you can. Be it money, skill, or your time. Together, we can be <em style={{ color: COLORS.saffron, fontStyle: "normal", fontWeight: 600 }}>Badalte Bharat Ki Nayi Tasveer.</em>
              </p>
            </AnimSection>
            <AnimSection delay={0.3} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("donate")} className="donate-btn" style={{
                background: COLORS.saffron, color: "#fff",
                border: "none", padding: "14px 32px", borderRadius: 50,
                fontWeight: 700, fontSize: 16, cursor: "pointer",
              }}>Donate Now 🤝</button>
              <button onClick={() => scrollTo("about")} style={{
                background: "none",
                border: `2px solid ${dark ? COLORS.saffron : COLORS.green}`,
                color: dark ? COLORS.saffron : COLORS.green,
                padding: "14px 28px", borderRadius: 50,
                fontWeight: 600, fontSize: 16, cursor: "pointer",
              }}>Our Story →</button>
            </AnimSection>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ animation: "float 4s ease-in-out infinite", width: "100%", maxWidth: 340 }}>
              <svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                <defs>
                  <clipPath id="cc"><circle cx="170" cy="130" r="120" /></clipPath>
                </defs>
                <circle cx="170" cy="130" r="122" fill={dark ? "#1e3320" : "#bbf7d0"} />
                <circle cx="170" cy="130" r="118" fill={dark ? "#132014" : "#f0fdf4"} />
                <text x="170" y="90" textAnchor="middle" fontSize="72" fill="none">🌟</text>
                <text x="170" y="100" textAnchor="middle" fontSize="80">🧒</text>
                <text x="100" y="160" textAnchor="middle" fontSize="44">📚</text>
                <text x="240" y="160" textAnchor="middle" fontSize="44">🍱</text>
                <text x="170" y="185" textAnchor="middle" fontSize="36">❤️</text>
                <path d="M170 10 C130 30, 50 70, 50 130" stroke={COLORS.saffron} strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.5" />
                <path d="M170 10 C210 30, 290 70, 290 130" stroke={COLORS.green} strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.5" />
              </svg>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }}>
              {STATS.map((s, i) => (
                <AnimSection key={s.label} delay={0.4 + i * 0.1}>
                  <div style={{
                    background: card, border: `1px solid ${border}`,
                    borderRadius: 12, padding: "16px 12px", textAlign: "center",
                    borderTop: `3px solid ${i % 2 === 0 ? COLORS.saffron : COLORS.green}`,
                  }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: i % 2 === 0 ? COLORS.saffron : COLORS.green }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{s.label}</div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: sectionBg, padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <AnimSection>
            <div style={{
              background: card, borderRadius: 20, padding: "2.5rem",
              border: `1px solid ${border}`, position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 6,
                background: `linear-gradient(90deg, ${COLORS.saffron}, ${COLORS.green})`,
              }} />
              <div style={{ fontSize: 48, marginBottom: 16 }}>🕊️</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: COLORS.saffron }}>Our Origin Story</h3>
              <p style={{ color: muted, lineHeight: 1.9, marginBottom: 16 }}>
                Born during the darkest days of Covid-19, NayePankh Foundation stepped up when communities needed it most. What began as emergency relief soon grew into a mission to uplift the underprivileged across India.
              </p>
              <p style={{ color: muted, lineHeight: 1.9 }}>
                The name "NayePankh" — meaning <strong style={{ color: text }}>New Wings</strong> — reflects our belief that every person deserves a chance to soar. Today, we are a fully youth-led movement registered under UP Government, 80G & 12A.
              </p>
              <div style={{ marginTop: 20, padding: "14px 16px", background: dark ? "#1e3320" : "#fefce8", borderRadius: 10, borderLeft: `4px solid ${COLORS.saffron}` }}>
                <p style={{ margin: 0, fontStyle: "italic", color: muted, fontSize: 14 }}>
                  "Badalte Bharat Ki Nayi Tasveer" — A new picture of a changing India.
                </p>
              </div>
            </div>
          </AnimSection>
          <AnimSection delay={0.15}>
            <div>
              <div style={{ display: "inline-block", background: COLORS.saffron, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 12px", borderRadius: 20, marginBottom: 16 }}>
                ABOUT US
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 20 }}>
                More than 2 Lakh lives,{" "}
                <span style={{ color: COLORS.green }}>one smile at a time</span>
              </h2>
              <p style={{ color: muted, lineHeight: 1.9, marginBottom: 24 }}>
                NayePankh is one of India's most active youth-driven NGOs — many members still in college or school. We work tirelessly across food, education, hygiene, and clothing. Our efforts are transparent, grassroots, and fuelled entirely by compassion.
              </p>
              {[
                ["✅", "Zero administrative overhead — all donations reach the ground"],
                ["✅", "50% income tax relief on donations (80G certified)"],
                ["✅", "Active presence across Uttar Pradesh"],
                ["✅", "Over 200,000 beneficiaries served"],
              ].map(([icon, text2]) => (
                <div key={text2} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, marginTop: 2 }}>{icon}</span>
                  <span style={{ color: muted, fontSize: 15 }}>{text2}</span>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "80px 1.5rem", background: bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: dark ? "#1e3320" : "#dcfce7", color: COLORS.green, fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 12px", borderRadius: 20, marginBottom: 14 }}>
              OUR PROGRAMS
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2 }}>
              What We Do
            </h2>
            <p style={{ color: muted, maxWidth: 480, margin: "12px auto 0" }}>Four pillars of change, driven by youth, powered by you.</p>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {PROGRAMS.map((p, i) => (
              <AnimSection key={p.title} delay={i * 0.1}>
                <div className="prog-card" style={{
                  background: card, border: `1px solid ${border}`,
                  borderRadius: 16, padding: "2rem 1.5rem",
                  borderBottom: `4px solid ${p.color}`,
                }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10, color: p.color }}>{p.title}</h3>
                  <p style={{ color: muted, lineHeight: 1.8, fontSize: 14 }}>{p.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" style={{ background: dark ? "#0a160a" : "#1a3a1a", padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <AnimSection>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
              Our Impact in Numbers
            </h2>
            <p style={{ color: "#9ca3af", marginBottom: 48 }}>Every figure is a human life we've touched.</p>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { n: "2,00,000+", l: "People helped", icon: "👥" },
              { n: "5,000+", l: "Meals served monthly", icon: "🍱" },
              { n: "10,000+", l: "Sanitary kits distributed", icon: "🩺" },
              { n: "3,000+", l: "Children educated", icon: "📚" },
              { n: "15,000+", l: "Clothing items donated", icon: "👕" },
              { n: "50+", l: "Active youth volunteers", icon: "✊" },
            ].map((s, i) => (
              <AnimSection key={s.l} delay={i * 0.08}>
                <div style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14, padding: "24px 16px",
                }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.saffron, marginBottom: 4 }}>{s.n}</div>
                  <div style={{ color: "#9ca3af", fontSize: 13 }}>{s.l}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "72px 1.5rem", background: sectionBg }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <AnimSection>
            <div style={{ fontSize: 64, color: COLORS.saffron, lineHeight: 1, marginBottom: -16, opacity: 0.3 }}>"</div>
            <blockquote style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 600, lineHeight: 1.7,
              color: text, margin: 0, fontStyle: "italic",
            }}>
              We are completely led by the youth of our country — many still in colleges and schools — on a mission to make this earth a better place for all creatures.
            </blockquote>
            <div style={{ marginTop: 24, color: muted, fontSize: 14 }}>— NayePankh Foundation Team</div>
          </AnimSection>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "80px 1.5rem", background: bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: dark ? "#1e3320" : COLORS.saffronLight, color: COLORS.saffronDark, fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 12px", borderRadius: 20, marginBottom: 14 }}>
              MEET THE TEAM
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900 }}>Youth Driving Change</h2>
            <p style={{ color: muted, marginTop: 10 }}>College students. School kids. Dreamers. Doers.</p>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {TEAM.map((m, i) => (
              <AnimSection key={m.name} delay={i * 0.1}>
                <div className="team-card" style={{
                  background: card, border: `1px solid ${border}`,
                  borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center",
                }}>
                  <div className="team-avatar" style={{
                    width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                    background: i % 2 === 0 ? COLORS.saffron : COLORS.green,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, fontWeight: 800, color: "#fff",
                    border: `3px solid ${dark ? border : "#fff"}`,
                    boxShadow: `0 0 0 3px ${i % 2 === 0 ? COLORS.saffron + "33" : COLORS.green + "33"}`,
                  }}>
                    {m.initials}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                  <div style={{ color: muted, fontSize: 13, marginTop: 4 }}>{m.role}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" style={{ padding: "80px 1.5rem", background: dark ? "#0a160a" : "#15803d" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <AnimSection>
            <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
              Make a Difference Today
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 36, lineHeight: 1.7 }}>
              Your donation comes with 50% income tax relief under 80G. Every rupee goes directly to those who need it.
            </p>
            <div style={{
              background: dark ? COLORS.darkCard : "#fff", borderRadius: 20, padding: "2rem",
            }}>
              <p style={{ fontWeight: 700, color: muted, marginBottom: 14, fontSize: 14 }}>Select Amount (₹)</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
                {[100, 250, 500, 1000, 2500, 5000].map(a => (
                  <button key={a} className="amount-btn" onClick={() => setDonateAmount(a)} style={{
                    padding: "10px 18px", borderRadius: 50, cursor: "pointer", fontSize: 14, fontWeight: 600,
                    background: donateAmount === a ? COLORS.saffron : (dark ? "#1e3320" : "#f9fafb"),
                    color: donateAmount === a ? "#fff" : text,
                    border: `2px solid ${donateAmount === a ? COLORS.saffron : border}`,
                    transition: "all 0.2s",
                  }}>₹{a.toLocaleString()}</button>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", color: muted, fontSize: 13, marginBottom: 8 }}>Or enter a custom amount</label>
                <input
                  type="number"
                  value={donateAmount}
                  onChange={e => setDonateAmount(Number(e.target.value))}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 18,
                    border: `2px solid ${border}`, background: dark ? "#0d1f0e" : "#fff",
                    color: text, fontWeight: 700, boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ background: dark ? "#1e3320" : "#f0fdf4", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: muted }}>
                🎁 Your ₹{donateAmount.toLocaleString()} donation saves{" "}
                <strong style={{ color: COLORS.green }}>₹{Math.round(donateAmount * 0.5).toLocaleString()}</strong> in income tax (80G)
              </div>
              <button className="donate-btn" style={{
                width: "100%", padding: "16px", borderRadius: 50,
                background: COLORS.saffron, color: "#fff",
                border: "none", fontSize: 17, fontWeight: 800, cursor: "pointer",
              }}>
                Donate ₹{donateAmount.toLocaleString()} Now 🙏
              </button>
              <p style={{ color: muted, fontSize: 11, marginTop: 12 }}>
                Secure · 100% goes to beneficiaries · 80G receipt provided
              </p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark ? "#070e07" : "#0f2010", padding: "48px 1.5rem 24px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.saffron, marginBottom: 8 }}>NayePankh Foundation</div>
              <p style={{ fontSize: 13, lineHeight: 1.8 }}>UP Govt, 80G & 12A registered NGO working toward a hunger-free, educated India — led entirely by youth.</p>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 14 }}>Quick Links</div>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
                  display: "block", background: "none", border: "none",
                  color: "rgba(255,255,255,0.5)", cursor: "pointer",
                  fontSize: 13, padding: "4px 0", textAlign: "left",
                }}>{l}</button>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 14 }}>Our Programs</div>
              {PROGRAMS.map(p => (
                <div key={p.title} style={{ fontSize: 13, padding: "4px 0" }}>{p.icon} {p.title}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 14 }}>Contact</div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>📧 info@nayepankh.com</div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>📍 Uttar Pradesh, India</div>
              <div style={{ fontSize: 13 }}>🌐 www.nayepankh.com</div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {["📘", "📸", "🐦"].map((ic, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, cursor: "pointer",
                  }}>{ic}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12 }}>
            <div>© 2024 NayePankh Foundation. All rights reserved.</div>
            <div style={{ color: COLORS.saffron }}>Made with ❤️ by youth, for India</div>
          </div>
        </div>
      </footer>
    </div>
  );
}