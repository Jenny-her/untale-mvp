"use client";

import UntaleLogoMark from "./UntaleLogoMark";

// Define the props type
interface HomePageProps {
  navigate: (route: string) => void;
  user: {
    premium?: boolean;
    email?: string;
    name?: string;
  } | null;
}

export default function HomePage({ navigate, user }: HomePageProps) {
  return (
    <div>
      <div className="hero">
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <UntaleLogoMark size={64} />
        </div>
        <h1 className="fade-in">
          Tell what remains
          <br />
          <em>untold.</em>
        </h1>
        <p className="fade-in fade-in-d1">
          An anonymous space to share your truest thoughts, find comfort in
          strangers, and be wholly, unguardedly yourself.
        </p>
        <div className="hero-btns fade-in fade-in-d2">
          <button
            className="btn-primary"
            onClick={() => navigate(user?.premium ? "/post" : "/premium")}
          >
            ✍️ Start Posting
          </button>
          <button className="btn-ghost" onClick={() => navigate("/chat")}>
            💬 Talk to Someone
          </button>
        </div>
        {!user?.premium && (
          <p
            style={{ marginTop: 16, fontSize: 13, color: "#5b4d72" }}
            className="fade-in fade-in-d3"
          >
            Posting requires{" "}
            <span className="link-text" onClick={() => navigate("/premium")}>
              Premium
            </span>
            . Viewing &amp; replying is free.
          </p>
        )}
        <div className="hero-stats fade-in fade-in-d3">
          <div className="stat">
            <div className="stat-num">24K+</div>
            <div className="stat-label">Anonymous voices</div>
          </div>
          <div className="stat">
            <div className="stat-num">138K</div>
            <div className="stat-label">Stories shared</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">Judgment-free</div>
          </div>
        </div>
      </div>
      <div className="features-grid">
        {[
          {
            icon: "🎭",
            title: "Truly Anonymous",
            desc: "No names, no photos, no traces. Just your words, floating free."
          },
          {
            icon: "💬",
            title: "Mood-Matched Chat",
            desc: "Connect with a stranger who feels exactly the way you do right now."
          },
          {
            icon: "🌸",
            title: "Safe Space",
            desc: "Community guidelines exist. Kindness is the default here."
          },
          {
            icon: "🔒",
            title: "End-to-End Privacy",
            desc: "We don't store identifiable data. Your secrets stay yours."
          }
        ].map((f, i) => (
          <div
            key={f.title}
            className={`glass feature-card fade-in fade-in-d${(i % 3) + 1}`}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
