const { useState } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "header_style": "centered",
  "billing": "yearly",
  "highlight": "ultra",
  "show_savings_chip": true,
  "compact": false,
  "accent": "#ffd400"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState("subscription");

  // Lock body scroll while pricing modal is open
  React.useEffect(() => {
    if (!pricingOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") setPricingOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [pricingOpen]);

  return (
    <React.Fragment>
      <Homepage
        onOpenPricing={() => setPricingOpen(true)}
        onOpenAccount={() => { setAccountTab("subscription"); setAccountOpen(true); }}
        onOpenInvite={() => { setAccountTab("invite"); setAccountOpen(true); }}
      />

      <AccountModal
        open={accountOpen}
        initialTab={accountTab}
        onClose={() => setAccountOpen(false)}
        onRecharge={() => { setAccountOpen(false); setPricingOpen(true); }}
        onUpgrade={() => { setAccountOpen(false); setPricingOpen(true); }}
      />

      {pricingOpen && (
        <div
          onClick={() => setPricingOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4,4,8,0.72)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "32px 24px",
            overflowY: "auto"
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 1280, margin: "auto 0" }}>
            <PricingModal tweaks={tweaks} onClose={() => setPricingOpen(false)} />
          </div>
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection title="头部样式">
          <TweakRadio
            label="头部布局"
            value={tweaks.header_style}
            onChange={v => setTweak("header_style", v)}
            options={[
              { value: "centered", label: "居中" },
              { value: "minimal", label: "左右" },
              { value: "banner", label: "促销条" }
            ]}
          />
          <TweakToggle
            label="显示周年特惠 chip"
            value={tweaks.show_savings_chip}
            onChange={v => setTweak("show_savings_chip", v)}
          />
        </TweakSection>

        <TweakSection title="计费与强调">
          <TweakRadio
            label="计费周期"
            value={tweaks.billing}
            onChange={v => setTweak("billing", v)}
            options={[
              { value: "yearly", label: "按年" },
              { value: "monthly", label: "按月" }
            ]}
          />
          <TweakSelect
            label="主推方案"
            value={tweaks.highlight}
            onChange={v => setTweak("highlight", v)}
            options={[
              { value: "none", label: "不强调" },
              { value: "pro", label: "专业版" },
              { value: "ultra", label: "旗舰版（默认）" },
              { value: "team", label: "团队版" }
            ]}
          />
          <TweakColor
            label="CTA 主色"
            value={tweaks.accent}
            onChange={v => setTweak("accent", v)}
            options={["#ffd400", "#b288ff", "#6dffb8", "#5cd0ff"]}
          />
        </TweakSection>

        <TweakSection title="付费墙">
          <TweakButton
            label="打开付费墙"
            onClick={() => setPricingOpen(true)}
          />
          <TweakButton
            label="打开账户管理"
            onClick={() => setAccountOpen(true)}
          />
        </TweakSection>

        <TweakSection title="布局">
          <TweakToggle
            label="紧凑模式"
            value={tweaks.compact}
            onChange={v => setTweak("compact", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
