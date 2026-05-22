/* Pricing modal — original design (not a copy of any specific product) */

// Highlight tokens: text wrapped in [[...]] is rendered with the plan's accent color.
const PLANS = [
  {
    id: "free",
    name: "免费版",
    tone: "neutral",
    priceMonthly: 0,
    priceYearly: 0,
    listPriceMonthly: null,
    listPriceYearly: null,
    yearlyTotal: null,
    cta: "包含",
    ctaState: "disabled",
    credits: "每月 [[200]] 积分（最多 [[8]] 个模型）",
    sections: [
      {
        title: "模型生成权限",
        items: [
          "[[1]] 个并发任务",
          "标准排队优先级",
          "[[1天]] 智能网格试用",
          "公开模型 (CC BY 4.0)"
        ]
      },
      {
        title: "专属功能",
        items: [
          "[[1天]] 模型编辑历史",
          "存储 [[10]] 个模型",
          "[[有限]] 的模型下载（每月最多下载 15 次 v2.5 模型）",
          "图像生成模型有限访问权限"
        ]
      }
    ]
  },
  {
    id: "pro",
    name: "专业版",
    tone: "pro",
    priceMonthly: 139.92,
    priceYearly: 84.0,
    listPriceMonthly: 139.92,
    listPriceYearly: 139.92,
    yearlyTotal: 1007.4,
    savings: 40,
    cta: "当前套餐",
    ctaState: "disabled",
    payments: ["Stripe", "PayPal"],
    credits: "每月 [[3000]] 积分（最多 [[120]] 个模型）",
    sections: [
      {
        title: "模型生成权限",
        items: [
          "[[10]] 个并发任务",
          "多视角转 3D",
          "分部件生成",
          "批量生成（每批最多 10 个模型）与批量导出",
          "最高排队优先级",
          "智能网格",
          "每个模型 [[3]] 次免费重试",
          "私有模型与商业用途",
          "超清几何精度"
        ]
      },
      {
        title: "专属功能",
        items: [
          "[[7天]] 模型编辑历史",
          "[[无限]] 模型存储",
          "[[无限]] 模型下载",
          "解锁所有图像生成模型"
        ]
      }
    ]
  },
  {
    id: "ultra",
    name: "旗舰版",
    tone: "ultra",
    priceMonthly: 629.0,
    priceYearly: 314.5,
    listPriceMonthly: 629.0,
    listPriceYearly: 629.0,
    yearlyTotal: 3774,
    savings: 50,
    badge: "Best Value",
    cta: "升级",
    ctaState: "primary",
    payments: ["Stripe", "PayPal"],
    perk: "解锁所有图像生成模型，享受2折生成优惠，每日前 20 张图像生成免费",
    credits: "每月 [[25000]] 积分（最多 [[1000]] 个模型）",
    extra: "额外赠送 25000 积分（仅限首月，将于 3 天内发放）",
    sections: [
      {
        title: "模型生成权限",
        items: [
          "[[100]] 个并发任务",
          "多视角转 3D",
          "分部件生成",
          "批量生成（每批最多 30 个模型）与批量导出",
          "专属队列通道（跳过高峰拥堵）",
          "智能网格",
          "每个模型 [[无限次]] 免费重试",
          "私有模型与商业用途",
          "超清几何精度"
        ]
      },
      {
        title: "专属功能",
        items: [
          "[[3]] 次免费专业精修",
          "[[永久]] 模型编辑历史",
          "[[无限]] 模型存储",
          "[[无限]] 模型下载",
          "抢先体验高级内测功能",
          "解锁所有图像生成模型，享受 2 折生成优惠，每日前 20 张图像生成免费"
        ]
      }
    ]
  },
  {
    id: "team",
    name: "团队版",
    tone: "team",
    priceMonthly: 769.0,
    priceYearly: 384.5,
    listPriceMonthly: 769.0,
    listPriceYearly: 769.0,
    yearlyTotal: 13842,
    savings: 50,
    perSeat: true,
    cta: "创建团队",
    ctaState: "primary",
    perk: "解锁所有图像生成模型，可无限免费生成",
    credits: "每月 [[45000]] 积分（最多 [[1800]] 个模型）",
    seatPicker: true,
    sections: [
      {
        title: "模型生成权限",
        items: [
          "[[200]] 个并发任务",
          "多视角转 3D",
          "分部件生成",
          "批量生成（每批最多 30 个模型）与批量导出",
          "专属队列通道（跳过高峰拥堵）",
          "智能网格",
          "每个模型 [[无限次]] 免费重试",
          "私有模型与商业用途",
          "超清几何精度"
        ]
      },
      {
        title: "专属功能",
        items: [
          "[[永久]] 模型编辑历史",
          "[[无限]] 模型存储",
          "[[无限]] 模型下载",
          "抢先体验高级内测功能",
          "解锁所有图像生成模型，可无限免费生成",
          "共享工作区与资产",
          "集中计费与管理",
          "更多团队功能敬请期待"
        ]
      }
    ]
  }
];

const CREDIT_PACKS = [
  { price: 70, credits: "1000 积分", base: 1000, bonus: 0 },
  { price: 700, credits: "10000 + 2000 积分", base: 10000, bonus: 2000 },
  { price: 3500, credits: "50000 + 12000 积分", base: 50000, bonus: 12000 },
  { price: 7000, credits: "100000 + 30000 积分", base: 100000, bonus: 30000 }
];

function CheckIcon({ color = "currentColor" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 5.2V8.2M6 3.8V3.85" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 7.5h11v5.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V7.5Z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 5.5h12V7.5H2zM8 5.5v8.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 5.5C8 5.5 5.5 5.5 5.5 4S6.5 2 7 2.5 8 5.5 8 5.5ZM8 5.5C8 5.5 10.5 5.5 10.5 4S9.5 2 9 2.5 8 5.5 8 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

function ToneAccent(tone) {
  const map = {
    neutral: "rgba(255,255,255,0.85)",
    pro: "#ffba5c",
    ultra: "#b288ff",
    team: "#6dffb8"
  };
  return map[tone] || map.neutral;
}

function formatPrice(n) {
  if (n === 0) return ["0", ""];
  const fixed = n.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  return [intPart, "." + decPart];
}

function BillingToggle({ billing, setBilling }) {
  return (
    <div style={{
      display: "inline-flex",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid var(--border)",
      borderRadius: 999,
      padding: 4,
      position: "relative"
    }}>
      {[
        { id: "yearly", label: "按年", chip: "省 50%" },
        { id: "monthly", label: "按月", chip: null }
      ].map(opt => {
        const active = billing === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setBilling(opt.id)}
            style={{
              border: "none",
              background: active ? "#ffffff" : "transparent",
              color: active ? "#0a0a0c" : "rgba(255,255,255,0.75)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all .18s ease",
              fontFamily: "inherit"
            }}
          >
            {opt.label}
            {opt.chip && (
              <span style={{
                fontSize: 11,
                padding: "2px 7px",
                borderRadius: 999,
                background: active ? "#0a0a0c" : "rgba(178,136,255,0.18)",
                color: active ? "#ffd400" : "#d0bbff",
                fontWeight: 600,
                letterSpacing: 0.2
              }}>{opt.chip}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, billing, highlighted, compact, accentToken }) {
  const accent = ToneAccent(plan.tone);
  const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
  const listPrice = billing === "yearly" ? plan.listPriceYearly : plan.listPriceMonthly;
  const [intP, decP] = formatPrice(price);
  const showStrike = billing === "yearly" && listPrice && listPrice !== price;
  const [seats, setSeats] = React.useState(3);
  const [payment, setPayment] = React.useState("Stripe");

  const cardBg = highlighted
    ? `linear-gradient(180deg, rgba(178,136,255,0.10), rgba(178,136,255,0.02) 40%, rgba(255,255,255,0.01))`
    : "var(--bg-card)";

  const ctaBg = plan.ctaState === "disabled"
    ? "rgba(255,255,255,0.06)"
    : accentToken;
  const ctaColor = plan.ctaState === "disabled" ? "rgba(255,255,255,0.45)" : "#0a0a0c";

  return (
    <div style={{
      position: "relative",
      borderRadius: 18,
      border: highlighted ? "1px solid rgba(178,136,255,0.45)" : "1px solid var(--border)",
      background: cardBg,
      padding: compact ? "20px 18px 18px" : "24px 22px 22px",
      display: "flex",
      flexDirection: "column",
      gap: compact ? 10 : 13,
      boxShadow: highlighted ? "0 20px 60px -30px rgba(178,136,255,0.55)" : "none",
      overflow: "hidden"
    }}>
      {highlighted && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(600px 140px at 50% -20%, rgba(178,136,255,0.30), transparent 70%)",
          pointerEvents: "none"
        }} />
      )}

      {/* === Fixed-height top block: name, price, payments/seat, CTA ===
          Locked height so the CTA button aligns horizontally across all cards. */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: compact ? 10 : 14,
        minHeight: compact ? 230 : 264
      }}>
        {/* Top row: name + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: accent,
            letterSpacing: 0.2
          }}>{plan.name}</div>
          {plan.badge && (
            <span style={{
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 6,
              background: "linear-gradient(90deg,#6dffb8,#8effd6)",
              color: "#0a0a0c",
              fontWeight: 700,
              letterSpacing: 0.4
            }}>{plan.badge}</span>
          )}
          {plan.savings && (
            <span style={{
              marginLeft: "auto",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(255,212,0,0.12)",
              color: "#ffd400",
              fontWeight: 600,
              letterSpacing: 0.2,
              border: "1px solid rgba(255,212,0,0.25)"
            }}>立省 {plan.savings}%</span>
          )}
        </div>

        {/* Price */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>¥</span>
            <span style={{
              fontSize: compact ? 38 : 44,
              fontWeight: 700,
              letterSpacing: -1.2,
              lineHeight: 1
            }}>{intP}</span>
            <span style={{ fontSize: 18, color: "var(--text-dim)", fontWeight: 500 }}>{decP}</span>
            <span style={{ fontSize: 13, color: "var(--text-mute)", marginLeft: 4 }}>
              / 月{plan.perSeat ? " / 席位" : ""}
            </span>
            {showStrike && (
              <span style={{
                fontSize: 13,
                color: "var(--text-mute)",
                textDecoration: "line-through",
                marginLeft: 6
              }}>¥{listPrice.toFixed(2)}</span>
            )}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-mute)", fontFamily: "JetBrains Mono, monospace", minHeight: 16 }}>
            {billing === "yearly" && plan.yearlyTotal !== null && plan.priceYearly > 0
              ? `按年计费: ¥${plan.yearlyTotal.toLocaleString()}/年`
              : "\u00A0"}
          </div>
        </div>

        {/* Bottom-anchored: payments/seat + CTA. marginTop:auto pushes them to the
            bottom of the fixed-height block so CTAs share a baseline. */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: compact ? 8 : 10 }}>
          {/* Payments / Seat picker / spacer — reserve consistent height */}
          {plan.payments ? (
            <div style={{ display: "flex", gap: 8 }}>
              {plan.payments.map(p => {
                const active = payment === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPayment(p)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "9px 10px",
                      borderRadius: 10,
                      border: active ? "1px solid var(--border-strong)" : "1px solid var(--border)",
                      background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                      color: active ? "#fff" : "var(--text-dim)",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all .15s ease"
                    }}
                  >
                    <span style={{
                      width: 14,
                      height: 14,
                      borderRadius: 999,
                      border: active ? "4px solid #ffd400" : "1.5px solid rgba(255,255,255,0.25)",
                      background: active ? "#0a0a0c" : "transparent",
                      boxSizing: "border-box"
                    }} />
                    {p}
                  </button>
                );
              })}
            </div>
          ) : plan.seatPicker ? (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)"
            }}>
              <span style={{ fontSize: 13, color: "var(--text-dim)" }}>席位数</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setSeats(Math.max(1, seats - 1))} style={iconBtnStyle}>−</button>
                <span style={{ fontSize: 15, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{seats}</span>
                <button onClick={() => setSeats(seats + 1)} style={iconBtnStyle}>+</button>
              </div>
            </div>
          ) : (
            <div style={{ height: 40 }} aria-hidden="true" />
          )}

          {/* CTA */}
          <button
            disabled={plan.ctaState === "disabled"}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: ctaBg,
              color: ctaColor,
              fontWeight: 700,
              fontSize: 14,
              cursor: plan.ctaState === "disabled" ? "default" : "pointer",
              fontFamily: "inherit",
              letterSpacing: 0.3,
              transition: "transform .12s ease, filter .12s ease"
            }}
            onMouseEnter={e => { if (plan.ctaState !== "disabled") e.currentTarget.style.filter = "brightness(1.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
          >
            {plan.cta}
          </button>
        </div>
      </div>

      {/* Perk callout */}
      {plan.perk && (
        <div style={{
          display: "flex",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{ color: accent, flexShrink: 0, marginTop: 1 }}><GiftIcon /></div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>{plan.perk}</div>
        </div>
      )}

      <div style={{ height: 1, background: "var(--border)", margin: "2px 0", position: "relative", zIndex: 1 }} />

      {/* Credits */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-mute)", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>积分</span>
          <InfoIcon />
        </div>
        <Feature accent={accent} text={plan.credits} bold />
        {plan.extra && <div style={{ marginTop: 8 }}><Feature accent={accent} text={plan.extra} muted /></div>}
      </div>

      {/* Sections */}
      {plan.sections.map((sec, i) => (
        <div key={i} style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize: 12,
            color: "var(--text-mute)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
            fontWeight: 600,
            marginBottom: 10
          }}>{sec.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sec.items.map((item, j) => <Feature key={j} accent={accent} text={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

const iconBtnStyle = {
  width: 26,
  height: 26,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.03)",
  color: "#fff",
  fontSize: 16,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "inherit",
  padding: 0
};

function renderHighlightTokens(text, accent) {
  // Split on [[...]] markers — yellow-highlight tokens like quantities and durations.
  const parts = String(text).split(/(\[\[[^\]]+\]\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[\[([^\]]+)\]\]$/);
    if (m) return <span key={i} style={{ color: "#ffd400", fontWeight: 600 }}>{m[1]}</span>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

function Feature({ text, accent, bold, muted, withHelp }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{
        flexShrink: 0,
        marginTop: 2,
        width: 14,
        height: 14,
        borderRadius: 999,
        background: "rgba(255,255,255,0.06)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: accent
      }}>
        <CheckIcon color={accent} />
      </span>
      <span style={{
        fontSize: 13,
        color: muted ? "var(--text-mute)" : "var(--text-dim)",
        lineHeight: 1.55,
        fontWeight: bold ? 500 : 400,
        flex: 1
      }}>
        {renderHighlightTokens(text, accent)}
        {withHelp && <span style={{ marginLeft: 6, display: "inline-flex", verticalAlign: "middle", color: "var(--text-mute)" }}><InfoIcon /></span>}
      </span>
    </div>
  );
}

function PromoCountdown() {
  // Anchor the end-time on first mount so values tick down smoothly across
  // re-renders. Default window: 6d 07h 59m 11s — long enough to make every
  // unit visibly tick (seconds change every render, minutes/hours visible).
  const endRef = React.useRef(null);
  if (endRef.current == null) {
    endRef.current = Date.now() + (6 * 86400 + 7 * 3600 + 59 * 60 + 11) * 1000;
  }
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remain = Math.max(0, endRef.current - now);
  const d = Math.floor(remain / 86400000);
  const h = Math.floor((remain % 86400000) / 3600000);
  const m = Math.floor((remain % 3600000) / 60000);
  const s = Math.floor((remain % 60000) / 1000);
  const pad = n => String(n).padStart(2, "0");
  const cells = [
    { label: "天", value: pad(d) },
    { label: "时", value: pad(h) },
    { label: "分", value: pad(m) },
    { label: "秒", value: pad(s) }
  ];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "5px 12px",
      borderRadius: 8,
      background: "rgba(0,0,0,0.24)",
      border: "1px solid rgba(255,255,255,0.18)",
      fontFamily: "JetBrains Mono, monospace",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }}>
      {cells.map((c, i) => (
        <React.Fragment key={c.label}>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: 0.4 }}>{c.value}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 500, fontFamily: "inherit" }}>{c.label}</span>
          </span>
          {i < cells.length - 1 && (
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 700 }}>:</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

// Poster-style promo banner: hero artwork backdrop, two-line copy on the
// left, large bare countdown digits with unit labels on the right.
// Lives at the top of the pricing modal. Visual reference: athlete-jump
// poster banner provided as design reference.
function PromoPoster({ onClose }) {
  const endRef = React.useRef(null);
  if (endRef.current == null) {
    endRef.current = Date.now() + (3 * 86400 + 9 * 3600 + 7 * 60 + 44) * 1000;
  }
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remain = Math.max(0, endRef.current - now);
  const d = Math.floor(remain / 86400000);
  const h = Math.floor((remain % 86400000) / 3600000);
  const m = Math.floor((remain % 3600000) / 60000);
  const s = Math.floor((remain % 60000) / 1000);
  const pad = n => String(n).padStart(2, "0");
  const cells = [
    { label: "天", value: pad(d) },
    { label: "时", value: pad(h) },
    { label: "分", value: pad(m) },
    { label: "秒", value: pad(s) }
  ];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: 108,
      overflow: "hidden",
      borderBottom: "1px solid rgba(0,0,0,0.4)",
      backgroundColor: "#3a2018",
      backgroundImage:
        "radial-gradient(circle at 60% 35%, rgba(255,180,120,0.55) 0%, transparent 38%), " +
        "radial-gradient(circle at 78% 78%, rgba(255,140,80,0.45) 0%, transparent 42%), " +
        "radial-gradient(circle at 30% 70%, rgba(120,60,30,0.6) 0%, transparent 50%), " +
        "radial-gradient(800px 200px at 50% 100%, rgba(0,0,0,0.55), transparent 70%), " +
        "linear-gradient(105deg, #281510 0%, #4a2418 35%, #8a4a28 70%, #c87850 100%)"
    }}>
      {/* Soft kinetic streak + bokeh highlights for poster feel */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(78deg, transparent 55%, rgba(255,220,180,0.18) 62%, rgba(255,200,150,0.10) 68%, transparent 75%), " +
          "radial-gradient(2px 2px at 18% 28%, rgba(255,230,200,0.6), transparent 60%), " +
          "radial-gradient(1.5px 1.5px at 84% 20%, rgba(255,220,180,0.5), transparent 60%), " +
          "radial-gradient(1.5px 1.5px at 92% 60%, rgba(255,220,180,0.5), transparent 60%)",
        pointerEvents: "none"
      }} />

      {/* Left scrim for text legibility */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 65%)",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        padding: "22px 80px 22px 40px"
      }}>
        {/* Copy — two lines */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 0.3,
            lineHeight: 1.25,
            textShadow: "0 2px 12px rgba(0,0,0,0.55)"
          }}>
            <span aria-hidden="true" style={{ marginRight: 10 }}>🎉</span>
            周年庆限时特惠：按年订阅最高立省{" "}
            <span style={{
              color: "#ffd400",
              fontWeight: 800,
              fontSize: 26,
              textShadow: "0 0 16px rgba(255,212,0,0.55)"
            }}>50%</span>
          </div>
          <div style={{
            marginTop: 8,
            fontSize: 13.5,
            color: "rgba(255,255,255,0.78)",
            fontWeight: 500,
            letterSpacing: 0.2,
            textShadow: "0 1px 6px rgba(0,0,0,0.4)"
          }}>
            订阅旗舰版享专属积分与全部图像生成模型，优惠即将结束
          </div>
        </div>

        {/* Countdown — bare digits with stacked unit labels */}
        <div style={{
          display: "inline-flex",
          alignItems: "flex-start",
          gap: 26,
          paddingLeft: 32,
          borderLeft: "1px solid rgba(255,255,255,0.18)"
        }}>
          {cells.map(c => (
            <div key={c.label} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 52
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
                fontSize: 34,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: 1,
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 2px 12px rgba(0,0,0,0.55)"
              }}>{c.value}</div>
              <div style={{
                marginTop: 8,
                fontSize: 11.5,
                fontWeight: 500,
                color: "rgba(255,255,255,0.78)",
                letterSpacing: 2
              }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingModal({ tweaks, onClose }) {
  const [billing, setBilling] = React.useState(tweaks.billing);
  const [creditOpen, setCreditOpen] = React.useState(false);
  React.useEffect(() => { setBilling(tweaks.billing); }, [tweaks.billing]);

  const highlightId = tweaks.highlight;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 1280,
      background: "var(--bg-modal)",
      borderRadius: 24,
      border: "1px solid var(--border)",
      boxShadow: "0 40px 120px -40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset",
      overflow: "hidden"
    }} data-screen-label="Pricing Modal">

      {/* Poster-style promo banner at the top of the modal. */}
      <PromoPoster onClose={onClose} />

      {/* Close */}
      <button
        aria-label="close"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 36,
          height: 36,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.03)",
          color: "var(--text-dim)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          transition: "all .15s ease"
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "var(--text-dim)"; }}
      >
        <CloseIcon />
      </button>

      {/* Header — minimal or hero variant */}
      <Header style={tweaks.header_style} billing={billing} setBilling={setBilling} showSavingsChip={tweaks.show_savings_chip} onOpenCredits={() => setCreditOpen(true)} />

      {/* Plans — Free card is narrower so the 3 paid plans get more room */}
      <div style={{
        padding: tweaks.compact ? "0 28px 28px" : "0 32px 32px",
        display: "grid",
        gridTemplateColumns: "0.78fr 1.07fr 1.07fr 1.07fr",
        gap: tweaks.compact ? 12 : 16
      }}>
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            highlighted={plan.id === highlightId}
            compact={tweaks.compact}
            accentToken={tweaks.accent}
          />
        ))}
      </div>

      {/* Coupon notice — sits above the usage comparison so users see the
          active discount context before reviewing per-tier generation counts. */}
      <div style={{ padding: "0 32px 24px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px 20px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid var(--border)",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 280 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(178,136,255,0.12)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "#b288ff", flexShrink: 0
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 14 4.5V6a1.5 1.5 0 1 0 0 4v1.5A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5V10a1.5 1.5 0 1 0 0-4V4.5Z" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M9 4.5v7" stroke="currentColor" strokeWidth="1.3" strokeDasharray="1.5 1.5"/>
              </svg>
            </span>
            <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>
              如果您想使用默认优惠券以外的优惠券，请点击按钮从您的账户中移除当前优惠券。
            </div>
          </div>
          <button style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: "1px solid rgba(178,136,255,0.4)",
            background: "rgba(178,136,255,0.12)",
            color: "#d0bbff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all .15s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(178,136,255,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(178,136,255,0.12)"; }}
          >
            移除优惠券
          </button>
        </div>
      </div>

      {/* Usage comparison */}
      <UsageComparison billing={billing} highlightId={highlightId} currentPlanId="pro" accentToken={tweaks.accent} />

      {/* FAQ */}
      <FAQSection />

      {/* Credit pack overlay — opens when user clicks 会员积分充值 */}
      <CreditPackDialog open={creditOpen} onClose={() => setCreditOpen(false)} accentToken={tweaks.accent} />
    </div>
  );
}

const __unused_footerLink = null;

function UtilityLink({ label }) {
  return (
    <button style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "7px 12px",
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "rgba(255,255,255,0.025)",
      color: "var(--text-dim)",
      fontSize: 12,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all .15s ease"
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.color = "var(--text-dim)"; }}
    >
      {label}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function CurrencySelect() {
  return (
    <button style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 12px",
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "rgba(255,255,255,0.025)",
      color: "var(--text-dim)",
      fontSize: 12,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all .15s ease"
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.color = "var(--text-dim)"; }}
    >
      Currency
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 14, height: 14, borderRadius: 999, overflow: "hidden",
        background: "linear-gradient(180deg, #de2910 50%, #ffde00 50%)",
        boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.4)",
        fontSize: 8
      }}>🇨🇳</span>
      <span style={{ color: "#fff", fontWeight: 600 }}>CNY</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function Header({ style, billing, setBilling, showSavingsChip, onOpenCredits }) {
  if (style === "minimal") {
    return (
      <div style={{ padding: "36px 32px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, color: "#b288ff", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#b288ff" }} />
            Studio · 价格方案
          </div>
          <h2 style={{ margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.15 }}>选择适合你的方案</h2>
          <p style={{ margin: "12px 0 0", color: "var(--text-dim)", fontSize: 14, maxWidth: 560, lineHeight: 1.6 }}>
            免费开始。升级以解锁超清几何、智能网格、多视角生成与无限模型下载。
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {showSavingsChip && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(255,212,0,0.08)", border: "1px solid rgba(255,212,0,0.35)", color: "#ffd400", fontSize: 13, fontWeight: 600 }}>
              <span>🎉</span>
              <span>周年特惠 · 按年最高省 50%</span>
            </div>
          )}
          <BillingToggle billing={billing} setBilling={setBilling} />
          <CreditRechargeButton onClick={onOpenCredits} />
        </div>
      </div>
    );
  }

  if (style === "centered") {
    return (
      <div style={{ position: "relative", padding: "44px 32px 24px" }}>
        {/* Centered title block */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.2 }}>
            Studio 价格方案
          </h2>
          <p style={{ margin: "12px auto 0", color: "var(--text-dim)", fontSize: 14, lineHeight: 1.65 }}>
            免费开始。升级以解锁超清几何精度、智能网格、多视角生成、无限模型下载以及更多专属功能。
          </p>
        </div>

        {/* Toggle row — toggle stays centered with 会员积分充值 right next to it.
            Other utility links float on the absolute right edge of the row. */}
        <div style={{ position: "relative", marginTop: 22, display: "flex", justifyContent: "center", alignItems: "center", gap: 12, minHeight: 44 }}>
          <BillingToggle billing={billing} setBilling={setBilling} />
          <CreditRechargeButton onClick={onOpenCredits} />
          <div style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <CurrencySelect />
          </div>
        </div>
      </div>
    );
  }

  // banner variant — small inset banner above billing (no logo wall, no full-width gradient bar)
  return (
    <div style={{ padding: "28px 32px 24px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "12px 18px",
        borderRadius: 14,
        background: "linear-gradient(90deg, rgba(178,136,255,0.18), rgba(109,255,184,0.10))",
        border: "1px solid rgba(178,136,255,0.25)",
        marginBottom: 24,
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18 }}>🎉</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>周年庆限时特惠</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>按年订阅最高立省 50%，仅剩 6 天</div>
          </div>
        </div>
        <BillingToggle billing={billing} setBilling={setBilling} />
        <CreditRechargeButton onClick={onOpenCredits} />
      </div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>选择适合你的方案</h2>
    </div>
  );
}

function CreditRechargeButton({ onClick }) {
  // De-emphasized text link with a small ingot glyph. Sits next to the
  // billing toggle as a secondary action — it should read as a link, not
  // compete with the plan CTAs.
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        background: "transparent",
        color: "var(--text-dim)",
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
        letterSpacing: 0.1,
        transition: "color .15s ease, background .15s ease"
      }}
      onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "transparent"; }}
    >
      <span aria-hidden="true" style={{ display: "inline-flex", opacity: 0.7 }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M3 5.5 L8 2 L13 5.5 V12 L8 14 L3 12 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <circle cx="8" cy="8" r="1.4" fill="currentColor"/>
        </svg>
      </span>
      会员积分充值
    </button>
  );
}

function CreditPackDialog({ open, onClose, accentToken }) {
  // Lock body scroll while overlay is open; clean up on close/unmount so
  // toggling the dialog never leaves the page stuck.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
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
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 100,
        animation: "creditFadeIn .2s ease"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          maxHeight: "92vh",
          overflowY: "auto",
          background: "var(--bg-modal)",
          borderRadius: 22,
          border: "1px solid var(--border)",
          boxShadow: "0 40px 120px -40px rgba(0,0,0,0.7)",
          animation: "creditSlideUp .25s cubic-bezier(.2,.7,.2,1)"
        }}
      >
        {/* Close */}
        <button
          aria-label="close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.03)",
            color: "var(--text-dim)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            transition: "all .15s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "var(--text-dim)"; }}
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <div style={{ padding: "40px 32px 24px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, color: "#ffba5c", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#ffba5c" }} />
            会员积分充值
          </div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: -0.4 }}>购买积分包</h2>
          <p style={{ margin: "10px auto 0", fontSize: 13, color: "var(--text-dim)", maxWidth: 560, lineHeight: 1.6 }}>
            一次性购买积分，永不过期，按需补充。仅限订阅用户购买。
          </p>
        </div>

        {/* Packs grid */}
        <div style={{
          padding: "0 32px 36px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16
        }}>
          {CREDIT_PACKS.map((p, i) => <CreditPackCard key={i} pack={p} accentToken={accentToken} />)}
        </div>
      </div>

      <style>{`
        @keyframes creditFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes creditSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

function CreditPackSection({ accentToken }) {
  return (
    <div style={{ padding: "0 32px 32px" }}>
      <div style={{
        textAlign: "center",
        margin: "12px 0 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      }}>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>
          购买 <span style={{ color: "var(--text-mute)", fontSize: 14, fontWeight: 500 }}>（仅限订阅用户）</span>
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-mute)" }}>
          一次性购买积分，永不过期，按需补充
        </p>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 18
      }}>
        {CREDIT_PACKS.map((p, i) => <CreditPackCard key={i} pack={p} accentToken={accentToken} />)}
      </div>
    </div>
  );
}

function CreditPackCard({ pack, accentToken }) {
  const [payment, setPayment] = React.useState("Stripe");
  const ctaBg = accentToken || "#ffd400";
  return (
    <div style={{
      borderRadius: 18,
      border: "1px solid var(--border)",
      background: "var(--bg-card)",
      padding: "24px 22px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>¥</span>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
            {pack.price.toLocaleString()}
          </span>
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-dim)" }}>
          {pack.bonus > 0 ? (
            <span>
              <span style={{ color: "#fff", fontWeight: 500 }}>{pack.base.toLocaleString()}</span>
              <span style={{ color: "#ffd400", fontWeight: 600 }}> + {pack.bonus.toLocaleString()} </span>
              积分
            </span>
          ) : (
            <span><span style={{ color: "#fff", fontWeight: 500 }}>{pack.base.toLocaleString()}</span> 积分</span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {["Stripe", "PayPal"].map(m => {
          const active = payment === m;
          return (
            <button
              key={m}
              onClick={() => setPayment(m)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "9px 10px",
                borderRadius: 10,
                border: active ? "1px solid var(--border-strong)" : "1px solid var(--border)",
                background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                color: active ? "#fff" : "var(--text-dim)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              <span style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                border: active ? "4px solid #ffd400" : "1.5px solid rgba(255,255,255,0.25)",
                background: active ? "#0a0a0c" : "transparent",
                boxSizing: "border-box"
              }} />
              {m}
            </button>
          );
        })}
      </div>

      <button style={{
        padding: "13px 16px",
        borderRadius: 12,
        border: "none",
        background: ctaBg,
        color: "#0a0a0c",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        fontFamily: "inherit",
        letterSpacing: 0.5,
        transition: "filter .12s ease"
      }}
      onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
      >
        购买
      </button>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Studio 的积分是如何运作的？",
    a: "积分是 Studio 内生成模型与图像的统一计价单位。订阅会每月按方案发放对应额度，未用完的积分在当前订阅周期内有效；通过积分包额外购买的积分则永不过期，会优先消耗订阅积分。"
  },
  {
    q: "我可以免费使用 Studio 吗？",
    a: "可以。免费版无需付费即可注册体验，每月获得 200 积分（最多 8 个模型），可使用公开模型生成与导出能力，部分高级功能（如智能网格、批量生成、私有模型）仅限付费档使用。"
  },
  {
    q: "如何升级我的订阅计划？",
    a: "进入「会员 / 定价」页面选择目标方案，点击「订阅」并完成支付即可立即升级；剩余订阅周期的费用会按比例折抵到新方案，多出的差额按当前周期内的剩余天数结算。"
  },
  {
    q: "如何取消我的订阅？",
    a: "前往「账户 → 订阅与计费」点击「取消订阅」即可。订阅会在当前计费周期结束后停止续费，到期前你仍可正常使用所有付费功能与本月积分。"
  },
  {
    q: "我可以申请退款吗？",
    a: "首次订阅后 7 天内、且未消耗 50% 以上订阅积分时，可联系客服申请全额退款。一次性购买的积分包一旦发放即不支持退款，请谨慎下单。"
  },
  {
    q: "Studio 支持哪些付款方式？",
    a: "目前支持 Stripe（信用卡 / 借记卡，包括 Visa、Mastercard、American Express、JCB、银联）与 PayPal。团队版可联系销售开通对公转账与发票结算。"
  },
  {
    q: "Studio 如何确保支付信息的安全？",
    a: "所有支付请求都通过 PCI-DSS Level 1 认证的 Stripe / PayPal 完成，Studio 服务器不会存储完整的卡号或 CVV。链路全程使用 TLS 1.3 加密。"
  },
  {
    q: "如何获取收据？",
    a: "每次成功支付后，系统会自动发送电子收据到你的注册邮箱；你也可以在「账户 → 订单与发票」中随时下载历史收据 PDF。如需正式发票，可在订单详情页点击「申请发票」。"
  },
  {
    q: "哪个 Studio 方案适合我？",
    a: "个人尝鲜建议从免费版开始；个人创作者推荐专业版，覆盖 10 并发与超清几何；高频生产者与商业用途推荐旗舰版，享 25000 积分 + 图像 2 折优惠；多人协作请选团队版，支持席位管理与共享资产。"
  }
];

function FAQItem({ q, a, isOpen, onToggle }) {
  const contentRef = React.useRef(null);
  return (
    <div style={{
      borderRadius: 12,
      background: "rgba(255,255,255,0.025)",
      border: "1px solid var(--border)",
      overflow: "hidden",
      transition: "background .15s ease"
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "inherit",
          lineHeight: 1.4
        }}
      >
        <span>{q}</span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{
            flexShrink: 0,
            color: "var(--text-dim)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .25s ease"
          }}
        >
          <path d="M4.5 7L9 11.5L13.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div
        style={{
          maxHeight: isOpen ? (contentRef.current ? contentRef.current.scrollHeight + 40 : 200) : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height .28s ease, opacity .22s ease"
        }}
      >
        <div ref={contentRef} style={{
          padding: "0 20px 18px",
          fontSize: 13,
          color: "var(--text-dim)",
          lineHeight: 1.7
        }}>
          {a}
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <div style={{ padding: "8px 32px 36px" }}>
      <h3 style={{
        margin: "0 0 22px",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: -0.3,
        textAlign: "center"
      }}>常见问题</h3>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 960,
        margin: "0 auto"
      }}>
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={i}
            q={item.q}
            a={item.a}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </div>
    </div>
  );
}

// Per-month generation counts derived from each plan's monthly credit
// budget divided by the model's credit cost (floor). Numbers above use
// the credit budgets defined in PLANS: free=200, pro=3000, ultra=25000,
// team=45000. "perk" tags surface the "free daily quota" / "unlimited"
// callouts from the Ultra and Team plan perks.
const USAGE_GROUPS = [
  {
    title: "积分",
    note: "",
    rows: [
      {
        name: "积分",
        sub: "每月发放，订阅周期内有效",
        counts: { free: "200", pro: "3,000", ultra: "25,000", team: "45,000" }
      },
      {
        name: "积分折扣",
        sub: "购买积分包时的会员折扣",
        counts: { free: "×", pro: "×", ultra: "10% 积分充值折扣", team: "10% 积分充值折扣" }
      }
    ]
  },
  {
    title: "3D 模型",
    note: "3D 模型支持多视角输入、智能网格、分部件等高级能力",
    rows: [
      {
        name: "Mesh · 标准",
        sub: "25 积分 / 模型 · 标准几何精度",
        counts: { free: "8 个", pro: "120 个", ultra: "1,000 个", team: "1,800 个" }
      },
      {
        name: "Mesh · Pro",
        sub: "50 积分 / 模型 · 超清几何精度",
        counts: { free: "4 个", pro: "60 个", ultra: "500 个", team: "900 个" }
      },
      {
        name: "Mesh · Ultra HD",
        sub: "100 积分 / 模型 · 超清几何 + 智能网格",
        counts: { free: "2 个", pro: "30 个", ultra: "250 个", team: "450 个" }
      },
      {
        name: "Mesh · 多视角转 3D",
        sub: "75 积分 / 模型 · 多视角输入",
        counts: { free: "2 个", pro: "40 个", ultra: "333 个", team: "600 个" }
      }
    ]
  },
  {
    title: "图片模型",
    note: "图像生成支持参考图、放大、风格化等多种模式",
    rows: [
      {
        name: "Studio Image · 标准 1K",
        sub: "1 积分 / 张 · 低质量 · 无参考图",
        counts: { free: "200 张", pro: "3,000 张", ultra: "25,000 张", team: "45,000 张" },
        tags: { team: "不限量" }
      },
      {
        name: "Studio Image · 高清 2K",
        sub: "2 积分 / 张 · 低质量 · 无参考图",
        counts: { free: "100 张", pro: "1,500 张", ultra: "12,500 张", team: "22,500 张" },
        tags: { team: "不限量" }
      },
      {
        name: "Studio Image · 超清 4K",
        sub: "3 积分 / 张 · 高质量 · 含参考图",
        counts: { free: "66 张", pro: "1,000 张", ultra: "8,333 张", team: "15,000 张" },
        tags: { team: "不限量" }
      },
      {
        name: "Studio Image · 风格化 2K",
        sub: "8 积分 / 张 · 中质量 · 无参考图",
        counts: { free: "25 张", pro: "375 张", ultra: "3,125 张", team: "5,625 张" },
        tags: { team: "每月不限量" }
      }
    ]
  }
];

const TIERS = ["free", "pro", "ultra", "team"];

function UsageComparison({ billing, highlightId, currentPlanId, accentToken }) {
  const cols = PLANS;
  // 1.4fr left "model" column, 1fr per tier — keeps numbers and tags readable.
  const gridCols = "1.4fr 1fr 1fr 1fr 1fr";

  return (
    <div style={{ padding: "0 32px 36px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: -0.3 }}>
          每月生成次数
        </h3>
      </div>

      <div style={{
        borderRadius: 16,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.015)",
        overflow: "hidden"
      }}>
        {/* Column header: tier name + price + open button */}
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: 0,
          padding: "20px 22px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.02)"
        }}>
          <div />
          {cols.map(plan => {
            const isCurrent = plan.id === currentPlanId;
            const accent = ToneAccent(plan.tone);
            const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
            const [intP, decP] = formatPrice(price);
            return (
              <div key={plan.id} style={{
                padding: "0 12px",
                borderLeft: "1px dashed rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: accent, letterSpacing: 0.2 }}>{plan.name}</div>
                  {plan.badge && (
                    <span style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 5,
                      background: "linear-gradient(90deg,#6dffb8,#8effd6)",
                      color: "#0a0a0c",
                      fontWeight: 700,
                      letterSpacing: 0.3
                    }}>{plan.badge}</span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>¥</span>
                  <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>{intP}</span>
                  <span style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 500 }}>{decP}</span>
                  <span style={{ fontSize: 11, color: "var(--text-mute)", marginLeft: 2 }}>
                    / 月{plan.perSeat ? " / 席位" : ""}
                  </span>
                </div>
                <button
                  disabled={isCurrent}
                  style={{
                    marginTop: 4,
                    padding: "8px 12px",
                    borderRadius: 9,
                    border: "none",
                    background: isCurrent
                      ? "rgba(255,255,255,0.08)"
                      : (plan.id === "free" ? "rgba(255,255,255,0.04)" : accentToken),
                    color: isCurrent
                      ? "var(--text-dim)"
                      : (plan.id === "free" ? "var(--text-dim)" : "#0a0a0c"),
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: isCurrent ? "default" : "pointer",
                    fontFamily: "inherit",
                    transition: "filter .12s ease",
                    border: isCurrent ? "1px solid var(--border)" : "none"
                  }}
                  onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.filter = "brightness(1.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
                >
                  {isCurrent ? "当前套餐" : (plan.id === "free" ? "免费使用" : plan.cta)}
                </button>
              </div>
            );
          })}
        </div>

        {/* Groups */}
        {USAGE_GROUPS.map((group, gi) => (
          <div key={gi}>
            {/* Group header */}
            <div style={{
              padding: "14px 22px",
              background: "rgba(255,255,255,0.025)",
              borderTop: gi === 0 ? "none" : "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{group.title}</span>
              {group.note && (
                <span style={{ fontSize: 12, color: "var(--text-mute)" }}>· {group.note}</span>
              )}
            </div>

            {/* Rows */}
            {group.rows.map((row, ri) => (
              <div key={ri} style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                padding: "16px 22px",
                borderBottom: ri === group.rows.length - 1 && gi === USAGE_GROUPS.length - 1 ? "none" : "1px solid var(--border)",
                alignItems: "center",
                transition: "background .15s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingRight: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: "rgba(255,255,255,0.05)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-dim)"
                    }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M3.5 8 L5.5 6 L7 7.5 L9.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{row.name}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--text-mute)", paddingLeft: 30 }}>{row.sub}</div>
                </div>
                {TIERS.map(tier => {
                  const count = row.counts[tier];
                  const tag = row.tags && row.tags[tier];
                  return (
                    <div key={tier} style={{
                      paddingLeft: 12,
                      borderLeft: "1px dashed rgba(255,255,255,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "JetBrains Mono, monospace" }}>
                        {count}
                      </div>
                      {tag && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          alignSelf: "flex-start",
                          gap: 4,
                          padding: "2px 7px",
                          borderRadius: 5,
                          fontSize: 10.5,
                          fontWeight: 600,
                          background: "rgba(255,212,0,0.10)",
                          color: "#ffd400",
                          border: "1px solid rgba(255,212,0,0.22)",
                          letterSpacing: 0.2
                        }}>{tag}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

window.PricingModal = PricingModal;
window.PromoCountdown = PromoCountdown;
