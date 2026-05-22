// Homepage shell — original layout for an AI 3D platform. Top nav, hero with two
// feature cards, gallery grid. Brand mark and imagery are placeholders. The
// credits chip and "升级" button in the top-right open the pricing modal.

const homeStyles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#0a0a0c",
    color: "#fff",
    fontFamily: '"Inter", "Noto Sans SC", system-ui, -apple-system, sans-serif',
    display: "flex",
    flexDirection: "column"
  }
};

function TopNav({ credits = 2140, onUpgrade, onOpenCredits, onOpenAccount, onOpenInvite }) {
  const linkBase = {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255,255,255,0.72)",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "color .15s ease, background .15s ease",
    textDecoration: "none"
  };
  const linkActive = { ...linkBase, color: "#fff" };
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      padding: "14px 28px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      gap: 24,
      background: "rgba(10,10,12,0.92)",
      backdropFilter: "blur(8px)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      {/* Brand mark — abstract geometric placeholder */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M4 6 L13 2 L22 6 L22 17 L13 23 L4 17 Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(255,255,255,0.04)"/>
          <path d="M4 6 L13 11 L22 6 M13 11 L13 23" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" opacity="0.7"/>
        </svg>
        <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: 2.4 }}>STUDIO</span>
      </div>

      <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.10)" }} />

      {/* Workspace switcher */}
      <button style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        borderRadius: 9,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: "pointer"
      }}>
        3D 工作台
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 4 L6 7.5 L9.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Primary nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <a style={linkActive}>首页</a>
        <a style={linkBase}>资产</a>
        <a style={linkBase}>联盟推广计划</a>
      </nav>

      <div style={{ flex: 1 }} />

      {/* Right cluster */}
      <button style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "inherit",
        cursor: "pointer"
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5 L7 2 L12 5 M2 9 L7 12 L12 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        DCC Bridge
      </button>

      {/* Combined credits + upgrade pill */}
      <div style={{
        display: "inline-flex",
        alignItems: "stretch",
        padding: 4,
        gap: 4,
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <button
          onClick={onOpenCredits}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 14px",
            borderRadius: 999,
            border: "none",
            background: "transparent",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            fontVariantNumeric: "tabular-nums",
            transition: "background .15s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          title="查看积分余额"
        >
          <span style={{ display: "inline-flex", color: "#ffd400" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5 L8 2 L13 5.5 V12 L8 14 L3 12 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(255,212,0,0.22)"/>
              <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
            </svg>
          </span>
          {credits.toLocaleString()}
        </button>
        <button
          onClick={onUpgrade}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 16px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(120deg, #b288ff 0%, #8b5cff 100%)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: "0 6px 18px -8px rgba(178,136,255,0.6)"
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 2 L9 6 L13 6.5 L10 9.5 L11 13.5 L7 11.5 L3 13.5 L4 9.5 L1 6.5 L5 6 Z" fill="currentColor"/></svg>
          升级
        </button>
      </div>

      <button style={iconBtn} aria-label="通知">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 11 L4 7 a4 4 0 0 1 8 0 V11 L13 12 H3 Z M6.5 13.5 a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{
          position: "absolute",
          top: 6, right: 6,
          minWidth: 14, height: 14, padding: "0 4px",
          borderRadius: 999,
          background: "#ff5a5a",
          fontSize: 9.5, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", lineHeight: 1
        }}>2</span>
      </button>

      <button style={iconBtn} aria-label="语言"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M2 8 H14 M8 2 a8 8 0 0 1 0 12 M8 2 a8 8 0 0 0 0 12" stroke="currentColor" strokeWidth="1.1"/></svg></button>

      {/* Avatar with dropdown */}
      <AvatarMenu credits={credits} onOpenAccount={onOpenAccount} onOpenInvite={onOpenInvite} onUpgrade={onUpgrade} />
    </header>
  );
}

function AvatarMenu({ credits, onOpenAccount, onOpenInvite, onUpgrade }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "100%",
    padding: "12px 16px",
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.88)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: 10,
    transition: "background .12s ease"
  };
  const items = [
    { id: "account", label: "账户管理", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.3"/><path d="M8 1.5 V3.5 M8 12.5 V14.5 M1.5 8 H3.5 M12.5 8 H14.5 M3.3 3.3 L4.7 4.7 M11.3 11.3 L12.7 12.7 M3.3 12.7 L4.7 11.3 M11.3 4.7 L12.7 3.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id: "invite", label: "获取免费积分", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M2 9 H14 M8 6 V14" stroke="currentColor" strokeWidth="1.3"/><path d="M5 4 a1.5 1.5 0 1 1 3 0 V6 H6.5 a1.5 1.5 0 0 1 -1.5 -2 Z M11 4 a1.5 1.5 0 1 0 -3 0 V6 H9.5 a1.5 1.5 0 0 0 1.5 -2 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
    { id: "api", label: "API", chevron: true, icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8 H12 M2 6 L4 8 L2 10 M14 6 L12 8 L14 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: "plugins", label: "插件", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><rect x="2" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M11.5 9 V14 M9 11.5 H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { id: "contact", label: "联系我们", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5 V8.5 M8 10.5 V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { id: "logout", label: "登出", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 2 H4 a1 1 0 0 0 -1 1 V13 a1 1 0 0 0 1 1 H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 5 L14 8 L11 11 M7 8 H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> }
  ];

  function handle(id) {
    setOpen(false);
    if (id === "account") onOpenAccount();
    else if (id === "invite") onOpenInvite();
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="账户菜单"
        style={{
          width: 32, height: 32, borderRadius: 999,
          background: "linear-gradient(135deg, #6dffb8, #5cd0ff)",
          border: open ? "2px solid rgba(255,255,255,0.4)" : "2px solid transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#0a0a0c",
          cursor: "pointer", padding: 0,
          transition: "border-color .15s ease"
        }}
      >K</button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          width: 280,
          background: "#1a1a21",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: 8,
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.7)",
          zIndex: 50
        }}>
          {/* Header card */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 12px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: 10
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.55)"
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M3 16 a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Anonymous1744…</span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: 999,
                background: "rgba(255,186,92,0.18)",
                color: "#ffba5c",
                whiteSpace: "nowrap"
              }}>专业版</span>
            </div>
          </div>

          {/* Plan tier + credits card */}
          <div style={{
            margin: "0 4px 8px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "12px 14px 10px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: 0.2 }}>专业版</div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <button
              onClick={() => handle("account")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "11px 14px",
                border: "none",
                background: "transparent",
                color: "rgba(255,255,255,0.88)",
                fontSize: 13.5,
                fontWeight: 500,
                fontFamily: "inherit",
                cursor: "pointer",
                textAlign: "left",
                transition: "background .12s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ display: "inline-flex", color: "#ffd400" }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M5.5 1.5 L4.5 6 L1.5 6.5 L3.5 8 L3 11 L5.5 9.5 L8 11 L7.5 8 L9.5 6.5 L6.5 6 Z" fill="currentColor"/>
                  <path d="M11.5 6 L11 8 L9.5 8.5 L11 9 L11.5 11 L12 9 L13.5 8.5 L12 8 Z" fill="currentColor" opacity="0.7"/>
                </svg>
              </span>
              <span>积分</span>
              <span style={{ display: "inline-flex", color: "rgba(255,255,255,0.4)", cursor: "help" }} title="积分说明">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1"/><path d="M4.8 4.5 a1.2 1.2 0 1 1 1.5 1.2 V6.5 M6 8.2 V8.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              </span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{(credits ?? 0).toLocaleString()}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", display: "inline-flex" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2.5 L7.5 6 L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </div>

          {items.map(it => (
            <button
              key={it.id}
              onClick={() => handle(it.id)}
              style={{
                ...itemStyle,
                color: it.accent ? "#ffd400" : "rgba(255,255,255,0.88)"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: it.accent ? "#ffd400" : "rgba(255,255,255,0.72)", display: "inline-flex" }}>{it.icon}</span>
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.chevron && (
                <span style={{ color: "rgba(255,255,255,0.4)", display: "inline-flex" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2.5 L7.5 6 L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const iconBtn = {
  position: "relative",
  width: 36, height: 36,
  display: "flex", alignItems: "center", justifyContent: "center",
  borderRadius: 9,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
  color: "rgba(255,255,255,0.75)",
  cursor: "pointer"
};

function Hero({ onUpgrade }) {
  return (
    <section style={{
      position: "relative",
      padding: "44px 28px 28px",
      overflow: "hidden"
    }}>
      {/* Backdrop wash */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background:
          "radial-gradient(900px 500px at 50% 0%, rgba(178,136,255,0.10), transparent 60%), " +
          "radial-gradient(700px 400px at 0% 100%, rgba(91,140,220,0.08), transparent 60%), " +
          "radial-gradient(700px 400px at 100% 100%, rgba(255,140,80,0.06), transparent 60%)",
        pointerEvents: "none"
      }} />

      <div style={{ position: "relative", textAlign: "center", marginBottom: 36 }}>
        <h1 style={{
          margin: 0,
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: -0.8,
          lineHeight: 1.1
        }}>一键生成任何 3D 内容</h1>
        <p style={{
          margin: "12px 0 0",
          fontSize: 14,
          color: "rgba(255,255,255,0.62)",
          fontWeight: 500
        }}>一站式 AI 3D 创作平台</p>
      </div>

      <div style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        maxWidth: 1400,
        margin: "0 auto"
      }}>
        <FeatureCard
          tint="#2459d8"
          accent="#5b8ef0"
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3 L24 9 L24 19 L14 25 L4 19 L4 9 Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round"/>
              <path d="M4 9 L14 14 L24 9 M14 14 L14 25" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" opacity="0.8"/>
            </svg>
          }
          title="高精度模型"
          subtitle={'最高支持 200 万面，适用于 3D 打印\n和视觉艺术'}
          cta="生成高精度模型"
          art="HERO · HIGH POLY MODEL"
        />
        <FeatureCard
          tint="#a8431a"
          accent="#e87b4a"
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4 L24 14 L14 24 L4 14 Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round"/>
              <path d="M9 9 L19 19 M19 9 L9 19 M14 4 L14 24 M4 14 L24 14" stroke="#fff" strokeWidth="1.1" opacity="0.7"/>
            </svg>
          }
          title="智能拓扑网格"
          subtitle={'2 秒生成 | 干净拓扑，适用于游戏和\nWeb 应用'}
          cta="生成智能网格"
          art="HERO · QUAD TOPOLOGY"
        />
      </div>
    </section>
  );
}

function FeatureCard({ tint, accent, icon, title, subtitle, cta, art }) {
  // Card layout: image fills left half, info pad on right with rounded inner
  // notch. Imagery is a striped SVG placeholder labelled with what should go
  // there so it's clear it's not final art.
  return (
    <article style={{
      position: "relative",
      borderRadius: 20,
      overflow: "hidden",
      background: "#0f1014",
      minHeight: 320,
      display: "flex"
    }}>
      {/* Hero art slot — placeholder */}
      <div style={{
        flex: "1.05",
        position: "relative",
        background: `linear-gradient(120deg, ${tint} 0%, #0a0a0c 100%)`,
        overflow: "hidden"
      }}>
        <PlaceholderArt label={art} />
      </div>

      {/* Info panel */}
      <div style={{
        flex: "1",
        position: "relative",
        background: tint,
        padding: "32px 28px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%, 0% 50%, 8% 42%)"
      }}>
        <div>
          <div style={{
            width: 56, height: 56,
            borderRadius: 14,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 22,
            marginLeft: 14
          }}>{icon}</div>
          <h3 style={{
            margin: "0 0 10px",
            marginLeft: 14,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: -0.3
          }}>{title}</h3>
          <p style={{
            margin: 0,
            marginLeft: 14,
            fontSize: 14,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.78)",
            whiteSpace: "pre-line"
          }}>{subtitle}</p>
        </div>
        <button style={{
          marginTop: 24,
          marginLeft: 14,
          alignSelf: "stretch",
          padding: "14px 20px",
          borderRadius: 14,
          border: "none",
          background: accent,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 6px 24px -10px rgba(0,0,0,0.4)"
        }}>
          <span>{cta}</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </article>
  );
}

function PlaceholderArt({ label }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 12px), " +
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 12px)",
      display: "flex",
      alignItems: "flex-end",
      padding: 18
    }}>
      <span style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10.5,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: 1.2,
        padding: "5px 10px",
        borderRadius: 6,
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>{label}</span>
    </div>
  );
}

const FILTERS = [
  { label: "全部", active: true },
  { label: "3D 打印", icon: "🖨" },
  { label: "精选", icon: "★", featured: true },
  { label: "角色" },
  { label: "载具" },
  { label: "动物" },
  { label: "建筑" },
  { label: "家具" },
  { label: "道具" },
  { label: "武器" },
  { label: "服装" },
  { label: "经典" },
  { label: "食物" },
  { label: "自然" },
  { label: "抽象" }
];

function Gallery() {
  return (
    <section style={{ padding: "8px 28px 60px" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 800 }}>画廊</h2>

      {/* Filter bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
        overflowX: "auto",
        paddingBottom: 4
      }}>
        <button style={{ ...chip, gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 2 H12 L8 7 V11 L5 12 V7 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
          筛选
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 4 L6 7.5 L9.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {FILTERS.map((f, i) => {
          const isActive = f.active;
          const isFeatured = f.featured;
          return (
            <button key={i} style={{
              ...chip,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
              borderColor: isActive ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
              fontWeight: isActive ? 700 : 500
            }}>
              {f.icon && <span style={{ fontSize: 12 }}>{f.icon}</span>}
              {f.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button style={{
          padding: "8px 14px",
          borderRadius: 999,
          background: "linear-gradient(120deg, #ffd400, #ffba5c)",
          border: "none",
          color: "#0a0a0c",
          fontSize: 12.5,
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          whiteSpace: "nowrap",
          flexShrink: 0
        }}>
          <span style={{
            fontSize: 10,
            padding: "1px 5px",
            borderRadius: 4,
            background: "rgba(0,0,0,0.15)"
          }}>+10</span>
          加入精选模型
        </button>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16
      }}>
        {GALLERY_ITEMS.map((g, i) => (
          <GalleryCard key={i} item={g} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}

const chip = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "rgba(255,255,255,0.72)",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  flexShrink: 0
};

const GALLERY_ITEMS = [
  { tag: "USER CASE", tint: "#2c8aa8", art: "FEATURED CASE", featured: true },
  { name: "Number.89757", likes: 70, tint: "#3a3a3a", art: "MODEL · BUILDING" },
  { name: "Aristo Kristandyo", likes: 111, tint: "#1f1f24", art: "MODEL · CHARACTER" },
  { name: "Kleberbomb1746976301", likes: 76, tint: "#262630", art: "MODEL · FIGURE" },
  { name: "Anonymous1745582792", likes: 49, tint: "#1c1c20", art: "MODEL · DIORAMA" }
];

function GalleryCard({ item, featured }) {
  return (
    <article style={{
      position: "relative",
      borderRadius: 14,
      overflow: "hidden",
      aspectRatio: "1 / 1.18",
      background: item.tint,
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.04)"
    }}>
      <PlaceholderArt label={item.art} />
      {/* Top-left badge */}
      {featured ? (
        <div style={{
          position: "absolute",
          top: 14, left: 14,
          padding: "6px 12px",
          borderRadius: 8,
          background: "rgba(0,0,0,0.55)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1
        }}>{item.tag}</div>
      ) : (
        <div style={{
          position: "absolute",
          top: 12, left: 12,
          width: 28, height: 28,
          borderRadius: 8,
          background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.85)"
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2 H10 V12 L6.5 10 L3 12 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
        </div>
      )}
      {/* Bottom-left author / likes */}
      {!featured && (
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "linear-gradient(0deg, rgba(0,0,0,0.7), transparent)"
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 11 a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <span style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.88)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1
          }}>{item.name}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "rgba(255,255,255,0.88)", fontVariantNumeric: "tabular-nums" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 10 L1.8 6 a2.4 2.4 0 0 1 4.2 -1.6 a2.4 2.4 0 0 1 4.2 1.6 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
            {item.likes}
          </span>
        </div>
      )}
    </article>
  );
}

function Homepage({ onOpenPricing, onOpenAccount, onOpenInvite }) {
  return (
    <div style={homeStyles.page}>
      <TopNav onUpgrade={onOpenPricing} onOpenCredits={onOpenPricing} onOpenAccount={onOpenAccount} onOpenInvite={onOpenInvite} />
      <Hero onUpgrade={onOpenPricing} />
      <Gallery />
    </div>
  );
}

window.Homepage = Homepage;
