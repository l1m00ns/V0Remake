import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Code2,
  Eye,
  Heart,
  Image,
  LayoutGrid,
  Mic,
  Monitor,
  RefreshCw,
  Send,
  Sparkles,
  Users,
  Wand2,
  Zap,
} from "lucide-react";

const TEMPLATES = [
  { title: "Image Generation Playground", author: "v0", views: "6.8K", likes: "760", kind: "dark", cat: "Apps" },
  { title: "Brillance SaaS Landing Page", author: "Maya Chen", views: "14.8K", likes: "2.1K", kind: "light", cat: "Landing" },
  { title: "3D Gallery Photography Template", author: "Studio", views: "3.6K", likes: "904", kind: "gallery", cat: "Landing" },
  { title: "Optimus — AI Platform", author: "Dune", views: "10.4K", likes: "1.6K", kind: "light", cat: "SaaS" },
  { title: "Modern Smart Home Dashboard", author: "Kai", views: "222", likes: "81", kind: "dash", cat: "Dashboard" },
  { title: "Garden City Game", author: "Jules", views: "8", likes: "3", kind: "dark", cat: "Apps" },
];

const SUGGESTIONS = ["Contact Form", "Image Editor", "Mini Game", "Finance Calculator"];

export default function App() {
  const [view, setView] = useState<"home" | "workspace">("home");
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState("");
  const [model, setModel] = useState("v0 Max");
  const [modelOpen, setModelOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = useState("Apps and Games");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState(false);
  const [value, setValue] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const ta = useRef<HTMLTextAreaElement>(null);

  const STEPS = ["Reading your prompt", "Planning the layout", "Writing components", "Installing packages", "Rendering preview"];

  useEffect(() => {
    if (view !== "workspace") return;
    setStep(0);
    setReply(false);
    const timers = STEPS.map((_, i) => window.setTimeout(() => setStep(i + 1), 700 * (i + 1)));
    timers.push(window.setTimeout(() => setReply(true), 700 * STEPS.length + 500));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [view, sent]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [reply, step]);

  function submit(text?: string) {
    const p = (text ?? prompt).trim();
    if (!p) return;
    setSent(p);
    setPrompt("");
    setView("workspace");
  }

  function send() {
    if (!value.trim()) return;
    setValue("");
    setReply(false);
    setStep(0);
    const timers = STEPS.map((_, i) => window.setTimeout(() => setStep(i + 1), 500 * (i + 1)));
    timers.push(window.setTimeout(() => setReply(true), 500 * STEPS.length + 300));
  }

  if (view === "workspace") {
    return (
      <div className="v0-workspace">
        <header className="v0-ws-top">
          <button className="v0-back" onClick={() => setView("home")} aria-label="Back"><ArrowLeft size={15} /></button>
          <span className="v0-mark small">v0</span>
          <button className="v0-project">Northwind landing <ChevronDown size={11} /></button>
          <span className="v0-ws-status"><i /> Ready</span>
          <div className="v0-ws-actions">
            <button className="v0-chip"><Code2 size={13} /> Code</button>
            <button className="v0-dark-btn">Deploy <ArrowUp size={12} /></button>
          </div>
        </header>
        <div className="v0-ws-body">
          <aside className="v0-chat">
            <div className="v0-chat-scroll" ref={scroller}>
              <div className="v0-msg user">{sent}</div>
              <div className="v0-msg assistant">
                <span className="v0-ai"><Sparkles size={11} /></span>
                <div>
                  <p>I&apos;ll build a polished, responsive page with a clear hero, product sections and a working contact form.</p>
                  <div className="v0-tasklist">
                    {STEPS.map((s, i) => (
                      <div key={s} className={i < step ? "done" : i === step ? "active" : ""}>
                        <span>{i < step ? <Check size={9} /> : i === step ? <i className="v0-dot" /> : null}</span>{s}
                      </div>
                    ))}
                  </div>
                  {reply && (
                    <div className="v0-done">
                      <p>Done. The page is live in the preview. I used Geist, a restrained monochrome palette and a responsive 12-column grid.</p>
                      <div className="v0-msg-actions"><button><Check size={11} /> Accept</button><button>Refine</button><button>Regenerate</button></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="v0-composer sm">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={2}
                placeholder="Ask v0 to change something..."
              />
              <div className="v0-composer-foot">
                <button><span className="v0-plus">+</span></button>
                <span className="v0-model-sm">{model}</span>
                <button className="v0-send" onClick={send} disabled={!value.trim()}><ArrowUp size={14} /></button>
              </div>
            </div>
          </aside>
          <main className="v0-preview">
            <div className="v0-preview-bar">
              <div className="v0-browser-dots"><i /><i /><i /></div>
              <div className="v0-url">northwind.v0.dev</div>
              <div className="v0-view-toggle">
                <button className={tab === "preview" ? "on" : ""} onClick={() => setTab("preview")}><Eye size={12} /> Preview</button>
                <button className={tab === "code" ? "on" : ""} onClick={() => setTab("code")}><Code2 size={12} /> Code</button>
              </div>
            </div>
            {tab === "preview" ? (
              <div className="v0-preview-scroll">
                <div className="v0-generated">
                  <nav><b>Northwind</b><div><span>Product</span><span>Customers</span><span>Pricing</span></div><button>Get started</button></nav>
                  <div className="v0-gen-hero">
                    <span className="v0-gen-pill">Now in public beta</span>
                    <h1>Ship your next idea<br />without the busywork.</h1>
                    <p>The calm workspace for product teams. Plan, build and launch in one place.</p>
                    <div><button>Start free</button><button className="ghost">Book a demo</button></div>
                  </div>
                  <div className="v0-gen-cards">
                    {["Plan", "Build", "Launch"].map((t, i) => (
                      <div key={t}><span>{`0${i + 1}`}</span><h3>{t}</h3><p>Everything your team needs, thoughtfully connected.</p></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <pre className="v0-code"><code>{`export default function Page() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Nav />
      <Hero
        eyebrow="Now in public beta"
        title="Ship your next idea"
        subtitle="The calm workspace for product teams."
      />
      <Features items={features} />
      <Footer />
    </main>
  );
}`}</code></pre>
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="v0">
      <header className="v0-header">
        <span className="v0-mark">v0</span>
        <nav className="v0-nav">
          <a href="#templates">Templates <ChevronDown size={11} /></a>
          <a href="#enterprise">Enterprise</a>
          <a href="#pricing">Pricing</a>
          <a href="#ios">iOS</a>
          <a href="#students">Students</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="v0-actions">
          <button className="v0-outline">Log In</button>
          <button className="v0-dark-btn">Sign Up</button>
          <button className="v0-menu" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
        </div>
        {menu && <div className="v0-mobile-menu">{["Templates", "Enterprise", "Pricing", "iOS", "Students", "FAQ"].map((x) => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>}
      </header>

      <main>
        <section className="v0-hero">
          <button className="v0-announce"><span>◎</span> Use your ChatGPT plan in v0 <ArrowRight size={12} /></button>
          <h1>What do you want to create?</h1>
          <div className="v0-composer">
            <textarea
              ref={ta}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
              rows={3}
              placeholder="Ask v0 to build..."
            />
            <div className="v0-composer-foot">
              <div className="v0-model-wrap">
                <button className="v0-model" onClick={() => setModelOpen(!modelOpen)}>
                  <span className="v0-model-icon">◎</span> {model} <ChevronDown size={11} />
                </button>
                {modelOpen && (
                  <div className="v0-model-menu">
                    {["v0 Max", "v0 Pro", "v0 Mini"].map((m) => (
                      <button key={m} onClick={() => { setModel(m); setModelOpen(false); }}>{m} {m === model && <Check size={11} />}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="v0-composer-right">
                <button aria-label="Voice"><Mic size={15} /></button>
                <button className="v0-send" onClick={() => submit()} disabled={!prompt.trim()}><ArrowUp size={15} /></button>
              </div>
            </div>
          </div>
          <div className="v0-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => submit(`Build a ${s.toLowerCase()} with a clean, modern interface`)}>
                {s === "Contact Form" && <Send size={13} />}
                {s === "Image Editor" && <Image size={13} />}
                {s === "Mini Game" && <Wand2 size={13} />}
                {s === "Finance Calculator" && <Zap size={13} />}
                {s}
              </button>
            ))}
            <button className="v0-shuffle" aria-label="Shuffle"><RefreshCw size={13} /></button>
          </div>
        </section>

        <section className="v0-templates" id="templates">
          <div className="v0-templates-head">
            <h2>Start with a template</h2>
            <div className="v0-cats">
              {["Apps and Games", "Landing Pages", "Components", "Dashboards"].map((c) => (
                <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
                  {c === "Apps and Games" && <LayoutGrid size={12} />}
                  {c === "Landing Pages" && <Monitor size={12} />}
                  {c === "Components" && <Sparkles size={12} />}
                  {c === "Dashboards" && <Users size={12} />}
                  {c}
                </button>
              ))}
              <a href="#all">Browse all <ArrowRight size={12} /></a>
            </div>
          </div>
          <div className="v0-grid">
            {TEMPLATES.map((t) => (
              <button key={t.title} className="v0-card" onClick={() => submit(`Build ${t.title} — a polished, production-ready experience`)}>
                <div className={`v0-thumb ${t.kind}`}>
                  {t.kind === "dark" && <><div className="v0-thumb-nav" /><div className="v0-thumb-panel"><i /><i /><i /></div><div className="v0-thumb-box" /></>}
                  {t.kind === "light" && <><div className="v0-thumb-nav light" /><div className="v0-thumb-serif">Effortless custom<br />contract billing</div><div className="v0-thumb-btn" /></>}
                  {t.kind === "gallery" && <><div className="v0-thumb-gallery"><i /><i /><i /></div><div className="v0-thumb-script">I create, therefore I am</div></>}
                  {t.kind === "dash" && <><div className="v0-thumb-dash"><i /><i /><i /><i /></div><div className="v0-thumb-chart"><i /><i /><i /><i /><i /></div></>}
                </div>
                <div className="v0-card-meta">
                  <span className={`v0-avatar ${t.kind}`}>{t.author.charAt(0)}</span>
                  <div><b>{t.title}</b><span><Users size={10} /> {t.views} <Heart size={10} /> {t.likes}</span></div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="v0-features">
          <div className="v0-features-head">
            <p>Prompt.</p><p>Build.</p><p>Publish.</p>
            <span>Generate working applications in minutes with AI. Publish as live websites in seconds.</span>
          </div>
          <div className="v0-feature-grid">
            {[
              ["Sync with a repo", "Connect GitHub and push code directly to your repository."],
              ["Integrate with apps", "Build with your favorite tools and APIs, no accounts required."],
              ["Deploy to Vercel", "Go live instantly with one-click deployment to production."],
              ["Edit with design mode", "Fine-tune every detail with visual controls and live preview."],
              ["Start with templates", "Launch faster with ready-made components and full pages."],
              ["Create design systems", "Define colors, typography and styles across projects."],
              ["Agentic by default", "v0 plans, creates tasks and connects databases as it builds."],
              ["Create from your phone", "Build anywhere with the v0 iOS app."],
            ].map(([t, d]) => (
              <div key={t}><span><Sparkles size={14} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <section className="v0-final">
          <h2>Start building with v0</h2>
          <p>Go from idea to production in seconds with smart, secure infrastructure.</p>
          <button className="v0-dark-btn big" onClick={() => ta.current?.focus()}>Get Started <ArrowRight size={14} /></button>
        </section>
      </main>

      <footer className="v0-footer">
        <div><span className="v0-mark small">v0</span><p>Build full-stack web apps with AI.</p></div>
        {[
          { h: "Product", l: ["Home", "Enterprise", "Pricing", "Students"] },
          { h: "Company", l: ["Terms", "AI Policy", "Privacy", "Cookies"] },
          { h: "Resources", l: ["FAQs", "Docs", "Community", "Vercel"] },
          { h: "Social", l: ["Twitter", "LinkedIn", "GitHub", "YouTube"] },
        ].map((c) => <div key={c.h} className="v0-footer-col"><p>{c.h}</p>{c.l.map((x) => <a key={x} href="#footer">{x}</a>)}</div>)}
      </footer>
    </div>
  );
}
