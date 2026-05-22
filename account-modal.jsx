// Account management modal — light-themed full-screen overlay.
// Sidebar nav (个人主页 / 订阅 / 账单) on the left, content pane on the right.
// Opens from the avatar dropdown's 账户管理 entry on the homepage.

const accountStyles = {
  // Light theme palette — distinct from the dark homepage/pricing modal.
  bg: "#f6f6f4",
  sidebarBg: "#ebebe8",
  panelBg: "#ffffff",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(0,0,0,0.14)",
  text: "#0e0e10",
  textDim: "rgba(14,14,16,0.62)",
  textMute: "rgba(14,14,16,0.42)",
  active: "rgba(14,14,16,0.06)",
  rowHover: "rgba(14,14,16,0.025)"
};

const ACCOUNT_TABS = [
  { id: "subscription", label: "订阅", icon: boltIcon },
  { id: "billing", label: "账单", icon: receiptIcon },
  { id: "invite", label: "获取免费积分", icon: giftIcon },
  { id: "profile", label: "个人主页", icon: profileIcon }
];

function giftIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M2 9 H14 M8 6 V14" stroke="currentColor" strokeWidth="1.3"/><path d="M5 4 a1.5 1.5 0 1 1 3 0 V6 H6.5 a1.5 1.5 0 0 1 -1.5 -2 Z M11 4 a1.5 1.5 0 1 0 -3 0 V6 H9.5 a1.5 1.5 0 0 0 1.5 -2 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;
}

function profileIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 13.5 a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
function boltIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 2 L4 9 H7.5 L7 14 L12 7 H8.5 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor"/></svg>;
}
function receiptIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2 L13 2 L13 14 L11 13 L9 14 L7 13 L5 14 L3 13 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5.5 5.5 H10.5 M5.5 8 H10.5 M5.5 10.5 H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

function AccountModal({ open, onClose, initialTab = "subscription", onRecharge, onUpgrade }) {
  const [tab, setTab] = React.useState(initialTab);
  React.useEffect(() => { if (open) setTab(initialTab); }, [open, initialTab]);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 1280,
          height: "min(880px, calc(100vh - 48px))",
          background: accountStyles.bg,
          color: accountStyles.text,
          borderRadius: 18,
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 40px 120px -30px rgba(0,0,0,0.5)",
          fontFamily: '"Inter", "Noto Sans SC", system-ui, sans-serif'
        }}
      >
        {/* Sidebar */}
        <aside style={{
          width: 230,
          flexShrink: 0,
          padding: "26px 18px",
          borderRight: `1px solid ${accountStyles.border}`,
          background: accountStyles.sidebarBg,
          display: "flex",
          flexDirection: "column",
          gap: 6
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, padding: "4px 10px 18px", letterSpacing: 0.2 }}>
            账户管理
          </div>
          {ACCOUNT_TABS.map(t => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: active ? accountStyles.active : "transparent",
                  color: accountStyles.text,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background .12s ease"
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = accountStyles.rowHover; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ color: active ? accountStyles.text : accountStyles.textDim, display: "inline-flex" }}>{t.icon()}</span>
                {t.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <div style={{
          flex: 1,
          position: "relative",
          overflowY: "auto",
          padding: "26px 42px"
        }}>
          <button
            aria-label="关闭"
            onClick={onClose}
            style={{
              position: "absolute",
              top: 22,
              right: 24,
              width: 32, height: 32,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: accountStyles.textDim,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background .12s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accountStyles.rowHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {tab === "profile" && <ProfileView />}
          {tab === "subscription" && <SubscriptionView onRecharge={onRecharge} onUpgrade={onUpgrade} />}
          {tab === "billing" && <BillingView />}
          {tab === "invite" && <InviteView />}
        </div>
      </div>
    </div>
  );
}

function ProfileView() {
  const [username, setUsername] = React.useState("Anonymous1744882562");
  const [originalUsername] = React.useState("Anonymous1744882562");
  const email = "you956887140@gmail.com";
  const dirty = username !== originalUsername;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: 32 }}>
      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, marginTop: 8 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: 132,
            height: 132,
            borderRadius: 999,
            background: "rgba(14,14,16,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(14,14,16,0.30)"
          }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="14" r="2" fill="currentColor"/>
              <path d="M32 16 V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="16" y="20" width="32" height="28" rx="6" fill="currentColor"/>
              <circle cx="25" cy="32" r="3" fill="#fff"/>
              <circle cx="39" cy="32" r="3" fill="#fff"/>
              <rect x="13" y="28" width="3" height="10" rx="1.5" fill="currentColor"/>
              <rect x="48" y="28" width="3" height="10" rx="1.5" fill="currentColor"/>
              <path d="M26 41 H38" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <button
            aria-label="更换头像"
            style={{
              position: "absolute",
              right: -2,
              bottom: 6,
              width: 34, height: 34,
              borderRadius: 999,
              border: `2px solid ${accountStyles.bg}`,
              background: accountStyles.text,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2 L12 4.5 L5 11.5 L2 12 L2.5 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Username */}
      <FormField label="用户名">
        <div style={{ position: "relative" }}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 44px 14px 16px",
              borderRadius: 12,
              border: `1px solid ${accountStyles.border}`,
              background: accountStyles.panelBg,
              color: accountStyles.text,
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none"
            }}
            onFocus={e => { e.currentTarget.style.borderColor = accountStyles.borderStrong; }}
            onBlur={e => { e.currentTarget.style.borderColor = accountStyles.border; }}
          />
          <span style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: accountStyles.textMute,
            display: "inline-flex",
            pointerEvents: "none"
          }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M9.5 2 L12 4.5 L5 11.5 L2 12 L2.5 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </FormField>

      {/* Email */}
      <FormField label="邮箱">
        <input
          value={email}
          readOnly
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: `1px solid ${accountStyles.border}`,
            background: "rgba(14,14,16,0.025)",
            color: accountStyles.textDim,
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
            cursor: "not-allowed"
          }}
        />
      </FormField>

      {/* Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 28 }}>
        <button
          onClick={() => {}}
          style={{
            padding: "13px 20px",
            borderRadius: 999,
            border: `1px solid ${accountStyles.border}`,
            background: accountStyles.panelBg,
            color: accountStyles.text,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer"
          }}
        >取消</button>
        <button
          disabled={!dirty}
          style={{
            padding: "13px 20px",
            borderRadius: 999,
            border: "none",
            background: dirty ? accountStyles.text : "rgba(14,14,16,0.10)",
            color: dirty ? "#fff" : accountStyles.textMute,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: dirty ? "pointer" : "not-allowed"
          }}
        >保存更改</button>
      </div>

      {/* Reset password link */}
      <div style={{ textAlign: "center", marginTop: 22 }}>
        <a style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: "#d99500",
          cursor: "pointer",
          textDecoration: "none"
        }}>设置/重置密码</a>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 13.5, color: accountStyles.textDim, marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function SubscriptionView({ onRecharge, onUpgrade }) {
  return (
    <div>
      <h1 style={{ margin: "0 0 28px", fontSize: 22, fontWeight: 700, paddingBottom: 18, borderBottom: `1px solid ${accountStyles.border}` }}>订阅</h1>

      <h2 style={{ margin: "8px 0 6px", fontSize: 32, fontWeight: 700, letterSpacing: -0.3 }}>专业版</h2>
      <p style={{ margin: "0 0 28px", fontSize: 13.5, color: accountStyles.textDim }}>订阅已取消，有效期至：2027-04-07</p>

      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 18,
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: accountStyles.text, display: "inline-flex" }}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor"><path d="M9 2 L4 9 H7.5 L7 14 L12 7 H8.5 Z"/></svg>
            </span>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.3, fontVariantNumeric: "tabular-nums" }}>129,830</span>
          </div>
          <div style={{ fontSize: 13.5, color: accountStyles.textDim, display: "flex", alignItems: "center", gap: 6, paddingLeft: 2 }}>
            永久积分：
            <span style={{ display: "inline-flex", color: accountStyles.text }}><svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M9 2 L4 9 H7.5 L7 14 L12 7 H8.5 Z"/></svg></span>
            <span style={{ color: accountStyles.text, fontVariantNumeric: "tabular-nums" }}>102,908</span>
          </div>
          <div style={{ fontSize: 13.5, color: accountStyles.textDim, display: "flex", alignItems: "center", gap: 6, paddingLeft: 2 }}>
            本月积分余额:
            <span style={{ display: "inline-flex", color: accountStyles.text }}><svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M9 2 L4 9 H7.5 L7 14 L12 7 H8.5 Z"/></svg></span>
            <span style={{ color: accountStyles.text, fontVariantNumeric: "tabular-nums" }}>26,822</span>
          </div>
          <div style={{ fontSize: 12.5, color: accountStyles.textMute, paddingLeft: 2 }}>
            26,822 积分将于 2026-06-06 过期
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onRecharge}
            style={{
              padding: "12px 22px",
              borderRadius: 10,
              border: `1px solid ${accountStyles.borderStrong}`,
              background: "transparent",
              color: accountStyles.text,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer"
            }}
          >充值</button>
          <button
            onClick={onUpgrade}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              border: "none",
              background: accountStyles.text,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer"
            }}
          >升级会员</button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }} />

      {/* Usage table */}
      <UsageTable />
    </div>
  );
}

const USAGE_ROWS = [
  { detail: "Daily Login Bonus", status: "已获取", date: "2026-05-21 10:47", delta: "+100", positive: true },
  { detail: "Daily Bonus Credits Expired", status: "已消耗", date: "2026-05-21 07:59", delta: "-46" },
  { detail: "[@image:#1: 照片] 去除 AI 水印", status: "已消耗", date: "2026-05-20 10:14", delta: "-16" },
  { detail: "[@image:#1: 去除水印后的人像] …", status: "已消耗", date: "2026-05-20 10:11", delta: "-12" },
  { detail: "generator", status: "已消耗", date: "2026-05-20 10:05", delta: "-10" }
];

function UsageTable() {
  const [filter, setFilter] = React.useState("all");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const filterRef = React.useRef(null);

  React.useEffect(() => {
    if (!filterOpen) return;
    const onClick = e => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [filterOpen]);

  const filterOptions = [
    { id: "all", label: "全部" },
    { id: "earned", label: "已获取" },
    { id: "spent", label: "已消耗" }
  ];
  const currentLabel = filterOptions.find(o => o.id === filter).label;

  const rows = USAGE_ROWS.filter(r => {
    if (filter === "all") return true;
    if (filter === "earned") return r.status === "已获取";
    if (filter === "spent") return r.status === "已消耗";
    return true;
  });

  return (
    <div style={{
      border: `1px solid ${accountStyles.border}`,
      borderRadius: 12,
      overflow: "hidden",
      background: accountStyles.panelBg
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.8fr 1fr 1fr 0.7fr",
        padding: "14px 22px",
        background: "rgba(14,14,16,0.025)",
        borderBottom: `1px solid ${accountStyles.border}`,
        fontSize: 13,
        fontWeight: 600,
        color: accountStyles.textDim
      }}>
        <div>明细</div>
        <div ref={filterRef} style={{ position: "relative" }}>
          <button
            onClick={() => setFilterOpen(o => !o)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px 4px 0",
              border: "none",
              background: "transparent",
              color: accountStyles.textDim,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              borderRadius: 6,
              transition: "background .12s ease, color .12s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.color = accountStyles.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = accountStyles.textDim; }}
          >
            {currentLabel}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: filterOpen ? "rotate(180deg)" : "none", transition: "transform .15s ease" }}>
              <path d="M2.5 4 L6 7.5 L9.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {filterOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: -8,
              minWidth: 140,
              background: "#fff",
              border: `1px solid ${accountStyles.border}`,
              borderRadius: 10,
              padding: 4,
              boxShadow: "0 12px 32px -8px rgba(0,0,0,0.18)",
              zIndex: 20
            }}>
              {filterOptions.map(opt => {
                const active = opt.id === filter;
                return (
                  <button
                    key={opt.id}
                    onClick={() => { setFilter(opt.id); setFilterOpen(false); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      padding: "9px 12px",
                      border: "none",
                      background: active ? accountStyles.active : "transparent",
                      color: accountStyles.text,
                      fontSize: 13,
                      fontWeight: active ? 600 : 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      borderRadius: 7,
                      transition: "background .12s ease"
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = accountStyles.rowHover; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    {active && (
                      <span style={{ display: "inline-flex", color: accountStyles.text }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5 L4.8 9 L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>日期</div>
        <div>积分消耗</div>
      </div>
      {rows.length === 0 ? (
        <div style={{ padding: 36, textAlign: "center", fontSize: 13, color: accountStyles.textMute }}>暂无记录</div>
      ) : rows.map((row, i) => (
        <div key={i} style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 0.7fr",
          padding: "16px 22px",
          borderBottom: i === rows.length - 1 ? "none" : `1px solid ${accountStyles.border}`,
          fontSize: 13.5,
          alignItems: "center"
        }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>{row.detail}</div>
          <div style={{ color: accountStyles.textDim }}>{row.status}</div>
          <div style={{ color: accountStyles.textDim, fontVariantNumeric: "tabular-nums" }}>{row.date}</div>
          <div style={{
            fontVariantNumeric: "tabular-nums",
            fontWeight: 600,
            color: row.positive ? "#10a37f" : accountStyles.text
          }}>{row.delta}</div>
        </div>
      ))}
    </div>
  );
}

function BillingView() {
  const rows = [
    { date: "2026-02-01 11:08:00", type: "Team Plan", amount: "3564 USD", status: "Paid" }
  ];
  return (
    <div>
      <h1 style={{ margin: "0 0 28px", fontSize: 22, fontWeight: 700, paddingBottom: 18, borderBottom: `1px solid ${accountStyles.border}` }}>账单</h1>

      <div style={{
        border: `1px solid ${accountStyles.border}`,
        borderRadius: 12,
        overflow: "hidden",
        background: accountStyles.panelBg
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.6fr",
          padding: "14px 22px",
          background: "rgba(14,14,16,0.025)",
          borderBottom: `1px solid ${accountStyles.border}`,
          fontSize: 13,
          fontWeight: 600,
          color: accountStyles.textDim
        }}>
          <div>日期</div>
          <div>类别</div>
          <div>金额</div>
          <div>状态</div>
          <div>发票</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.6fr",
            padding: "18px 22px",
            borderBottom: `1px solid ${accountStyles.border}`,
            fontSize: 13.5,
            alignItems: "center"
          }}>
            <div style={{ fontVariantNumeric: "tabular-nums" }}>{r.date}</div>
            <div>{r.type}</div>
            <div style={{ fontVariantNumeric: "tabular-nums" }}>{r.amount}</div>
            <div>
              <span style={{
                display: "inline-flex",
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(14,14,16,0.06)",
                fontSize: 12,
                fontWeight: 600,
                color: accountStyles.text
              }}>{r.status}</span>
            </div>
            <div>
              <a style={{ color: accountStyles.text, fontSize: 13, cursor: "pointer", textDecoration: "none", borderBottom: `1px solid ${accountStyles.border}`, paddingBottom: 1 }}>下载</a>
            </div>
          </div>
        ))}
        <div style={{
          padding: "22px",
          textAlign: "center",
          fontSize: 13,
          color: accountStyles.textMute
        }}>暂无更多数据</div>
      </div>
    </div>
  );
}

function InviteView() {
  const invitedCount = 0;
  const paidCount = 0;
  const earned = 0;
  const code = "FQKZJ8";
  const inviteUrl = `https://studio.example.com?invite_code=${code}`;
  return (
    <div>
      <h1 style={{ margin: "0 0 28px", fontSize: 22, fontWeight: 700, paddingBottom: 18, borderBottom: `1px solid ${accountStyles.border}` }}>获取免费积分</h1>

      {/* Earned credits banner */}
      <div style={{
        padding: "22px 24px",
        background: accountStyles.panelBg,
        border: `1px solid ${accountStyles.border}`,
        borderRadius: 14,
        marginBottom: 16
      }}>
        <div style={{ fontSize: 13.5, color: accountStyles.textDim, marginBottom: 8 }}>已获积分</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 999,
            background: "#ffd400",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "#0a0a0c", flexShrink: 0
          }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M9 2 L4 9 H7.5 L7 14 L12 7 H8.5 Z"/></svg>
          </span>
          <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.3, fontVariantNumeric: "tabular-nums" }}>{earned.toLocaleString()}</span>
        </div>
        <div style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: `1px solid ${accountStyles.border}`,
          display: "flex",
          alignItems: "center",
          gap: 36
        }}>
          <div style={{ fontSize: 13.5, color: accountStyles.textDim }}>
            已有 <span style={{ color: accountStyles.text, fontWeight: 600 }}>{invitedCount}</span> / 50 位受邀者生成模型
          </div>
          <div style={{ width: 1, height: 18, background: accountStyles.border }} />
          <div style={{ fontSize: 13.5, color: accountStyles.textDim }}>
            <span style={{ color: accountStyles.text, fontWeight: 600 }}>{paidCount}</span> 位受邀者已支付
          </div>
        </div>
      </div>

      {/* Invite link + code */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginBottom: 24
      }}>
        <InviteField label="邀请链接" value={inviteUrl} />
        <InviteField label="邀请码" value={code} />
      </div>

      {/* Rules */}
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>如何运作？</h3>
        <div style={{ fontSize: 13.5, lineHeight: 1.8, color: accountStyles.textDim }}>
          <div>当受邀者通过您的邀请链接成功注册并生成至少 1 个模型后，您和受邀者都将获得 <span style={{ color: accountStyles.text, fontWeight: 600 }}>300</span> 永久免费积分。您最多可由此获得 <span style={{ color: accountStyles.text, fontWeight: 600 }}>15,000</span> 永久积分。</div>
          <div>当受邀者首次成功支付（任何付费项目）时，您将获得 <span style={{ color: accountStyles.text, fontWeight: 600 }}>1000</span> 永久积分，无上限。</div>
          <div style={{ color: accountStyles.textMute, marginTop: 6 }}>注意：受邀者数量的更新可能会有延迟，请耐心等待。</div>
        </div>
      </div>
    </div>
  );
}

function InviteField({ label, value }) {
  const [copied, setCopied] = React.useState(false);
  function handleClick() {
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: accountStyles.textDim, marginBottom: 8 }}>{label}</div>
      <div style={{
        display: "flex",
        alignItems: "stretch",
        padding: 5,
        borderRadius: 999,
        background: accountStyles.panelBg,
        border: `1px solid ${accountStyles.border}`
      }}>
        <div style={{
          flex: 1,
          padding: "10px 14px",
          fontSize: 13.5,
          color: accountStyles.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontFamily: label === "邀请码" ? "JetBrains Mono, monospace" : "inherit",
          letterSpacing: label === "邀请码" ? 1 : 0
        }}>{value}</div>
        <button
          onClick={handleClick}
          style={{
            padding: "0 22px",
            borderRadius: 999,
            border: "none",
            background: "#ffd400",
            color: "#0a0a0c",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "filter .12s ease",
            minWidth: 72
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.95)"; }}
          onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
        >{copied ? "已复制" : "邀请"}</button>
      </div>
    </div>
  );
}

window.AccountModal = AccountModal;
