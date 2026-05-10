"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";

// Types
type Post = {
  id: number;
  content: string;
  anonymous_id: string;
  display_name: string;
  created_at: string;
};

// Word list for random names
const WORDS = [
  "petal",
  "nova",
  "echo",
  "mist",
  "leaf",
  "ember",
  "orbit",
  "luna",
  "river",
  "cloud",
  "sakura",
  "storm",
  "drift",
  "haze",
  "frost",
  "flare",
  "dusk",
  "bloom",
  "cedar",
  "ash",
  "willow",
  "raven",
  "sparrow",
  "fern",
  "moss",
  "stone",
  "breeze",
  "whisper"
];

const generateName = () => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const number = Math.floor(100 + Math.random() * 900);
  return word + number;
};

const timeAgo = (dateString: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000
  );
  const interval = seconds / 3600;
  if (interval > 24) {
    return new Date(dateString).toLocaleString(undefined, {
      day: "numeric",
      month: "short"
    });
  }
  if (interval >= 1) return Math.floor(interval) + "h ago";
  const mins = seconds / 60;
  if (mins >= 1) return Math.floor(mins) + "m ago";
  return "just now";
};
// ─────────────────────────────────────────────────────────────
// REPLACE your entire FeedbackForm function with this.
// Also add chipBase, qLabel, qSub constants right after it
// (before the Home() export default).
// Everything else in page.tsx stays exactly the same.
// ─────────────────────────────────────────────────────────────

function FeedbackForm({
  displayName,
  showNotification
}: {
  displayName: string;
  showNotification: (msg: string, type?: string) => void;
}) {
  const [feeling, setFeeling] = useState("");
  const [safeFeeling, setSafeFeeling] = useState("");
  const [wantNext, setWantNext] = useState<string[]>([]);
  const [broken, setBroken] = useState("");
  const [freeText, setFreeText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const FEELINGS = [
    { emoji: "🥹", label: "Felt heard" },
    { emoji: "😌", label: "Felt calm" },
    { emoji: "😐", label: "Felt nothing" },
    { emoji: "😕", label: "Felt confused" },
    { emoji: "😔", label: "Felt lonely still" }
  ];

  const SAFE_OPTIONS = [
    "Yes, completely",
    "Mostly yes",
    "Not sure",
    "Not really"
  ];

  const NEXT_FEATURES = [
    { emoji: "💬", label: "Anonymous chat with real people" },
    { emoji: "🎭", label: "Mood tags on posts" },
    { emoji: "🔔", label: "Notify me when someone replies" },
    { emoji: "🌙", label: "Different themes / dark modes" },
    { emoji: "📌", label: "Save posts I like" },
    { emoji: "🗓️", label: "Daily prompt to write" }
  ];

  const BROKEN_OPTIONS = [
    "Nothing, all good",
    "Login / signup was confusing",
    "Feed didn't load properly",
    "Replies didn't work",
    "Something else"
  ];

  const toggleWantNext = (label: string) => {
    setWantNext((prev) =>
      prev.includes(label)
        ? prev.filter((x) => x !== label)
        : prev.length < 3
          ? [...prev, label]
          : prev
    );
  };

  const handleSubmit = async () => {
    if (!feeling) {
      showNotification("Tell us how UnTale made you feel first 🌸");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("feedback").insert([
      {
        feeling: feeling,
        safe_feeling: safeFeeling || null,
        want_next: wantNext.length > 0 ? wantNext : null,
        broken: broken || null,
        suggestion: freeText.trim() || null,
        display_name: "anonymous"
      }
    ]);

    if (error) {
      showNotification("Something went wrong. Try again.");
    } else {
      setSubmitted(true);
      showNotification("Thank you 🌸 Your voice shapes UnTale.", "success");
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🌸</div>
        <p
          style={{
            color: "#e879a0",
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "8px",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Thank you.
        </p>
        <p
          style={{
            color: "#7c6a9a",
            fontSize: "14px",
            lineHeight: 1.8,
            maxWidth: "340px",
            margin: "0 auto"
          }}
        >
          Every response helps us decide what UnTale becomes next. You're part
          of building something real.
        </p>
      </div>
    );
  }

  const chipBase: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "50px",
    border: "1.5px solid",
    background: "transparent",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s"
  };

  const qLabel: React.CSSProperties = {
    fontSize: "14px",
    color: "#a89bc2",
    fontWeight: 600,
    marginBottom: "4px"
  };

  const qSub: React.CSSProperties = {
    fontSize: "12px",
    color: "#5b4d72",
    marginBottom: "12px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Q1 — emotional experience */}
      <div>
        <p style={qLabel}>1. How did UnTale make you feel?</p>
        <p style={qSub}>Pick the one that fits most.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {FEELINGS.map((f) => (
            <button
              key={f.label}
              onClick={() => setFeeling(f.label)}
              style={{
                ...chipBase,
                borderColor:
                  feeling === f.label ? "#e879a0" : "rgba(232,121,160,0.2)",
                background:
                  feeling === f.label
                    ? "rgba(232,121,160,0.15)"
                    : "transparent",
                color: feeling === f.label ? "#e879a0" : "#a89bc2"
              }}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Q2 — safety */}
      <div>
        <p style={qLabel}>2. Did this space feel safe to you?</p>
        <p style={qSub}>Safety is the most important thing we're building.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {SAFE_OPTIONS.map((o) => (
            <button
              key={o}
              onClick={() => setSafeFeeling(o)}
              style={{
                ...chipBase,
                borderColor:
                  safeFeeling === o ? "#60a5fa" : "rgba(96,165,250,0.2)",
                background:
                  safeFeeling === o ? "rgba(96,165,250,0.15)" : "transparent",
                color: safeFeeling === o ? "#60a5fa" : "#a89bc2"
              }}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Q3 — what to build next */}
      <div>
        <p style={qLabel}>3. What would make UnTale better for you?</p>
        <p style={qSub}>
          Pick up to 3. These directly shape what we build next.
        </p>
        <p style={{ fontSize: "11px", color: "#5b4d72", marginBottom: "10px" }}>
          {wantNext.length}/3 selected
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {NEXT_FEATURES.map((f) => (
            <button
              key={f.label}
              onClick={() => toggleWantNext(f.label)}
              style={{
                ...chipBase,
                borderColor: wantNext.includes(f.label)
                  ? "#c084fc"
                  : "rgba(192,132,200,0.2)",
                background: wantNext.includes(f.label)
                  ? "rgba(192,132,200,0.15)"
                  : "transparent",
                color: wantNext.includes(f.label) ? "#c084fc" : "#a89bc2",
                opacity:
                  !wantNext.includes(f.label) && wantNext.length >= 3 ? 0.4 : 1
              }}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Q4 — what broke */}
      <div>
        <p style={qLabel}>4. Did anything feel broken or confusing?</p>
        <p style={qSub}>Be honest — we won't take it personally.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {BROKEN_OPTIONS.map((o) => (
            <button
              key={o}
              onClick={() => setBroken(o)}
              style={{
                ...chipBase,
                borderColor: broken === o ? "#f87171" : "rgba(248,113,113,0.2)",
                background:
                  broken === o ? "rgba(248,113,113,0.12)" : "transparent",
                color: broken === o ? "#f87171" : "#a89bc2"
              }}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Q5 — free text */}
      <div>
        <p style={qLabel}>
          5. Anything else?{" "}
          <span style={{ color: "#5b4d72", fontWeight: 400 }}>(optional)</span>
        </p>
        <p style={qSub}>A feeling, a suggestion, a complaint — all welcome.</p>
        <textarea
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="Write freely here…"
          maxLength={500}
          style={{
            width: "100%",
            minHeight: "90px",
            padding: "14px",
            background: "rgba(16,10,40,0.6)",
            border: "1.5px solid rgba(232,121,160,0.18)",
            borderRadius: "14px",
            color: "#ede8f8",
            fontSize: "14px",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: "1.65"
          }}
        />
        <div
          style={{
            fontSize: 11,
            color: "#5b4d72",
            textAlign: "right",
            marginTop: 3
          }}
        >
          {freeText.length}/500
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting || !feeling}
        style={{
          padding: "13px",
          background: "linear-gradient(135deg, #be185d, #e879a0)",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          fontWeight: "700",
          fontSize: "15px",
          cursor: submitting || !feeling ? "not-allowed" : "pointer",
          opacity: submitting || !feeling ? 0.5 : 1,
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.25s"
        }}
      >
        {submitting ? "Sending…" : "🌸 Send Feedback"}
      </button>
    </div>
  );
}
export default function Home() {
  // State
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [postsToday, setPostsToday] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [posting, setPosting] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [showReplyId, setShowReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyCounts, setReplyCounts] = useState<Map<number, number>>(
    new Map()
  );
  const [repliesMap, setRepliesMap] = useState<Map<number, any[]>>(new Map());
  const [repliesLoading, setRepliesLoading] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likesCount, setLikesCount] = useState<Map<number, number>>(new Map());
  const [reportedPosts, setReportedPosts] = useState<Set<number>>(new Set());
  const [notification, setNotification] = useState<{
    msg: string;
    type: string;
    key: number;
  } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "home" | "feed" | "about" | "feedback"
  >("home");
  const [chatPhase, setChatPhase] = useState<"pick" | "searching" | "chat">(
    "pick"
  );
  const [myMood, setMyMood] = useState<string | null>(null);
  const [matchedMood, setMatchedMood] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifs, setNotifs] = useState<any[]>([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const loadNotifications = async (userId: string) => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setNotifs(data);
  };

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const filteredPosts = searchQuery.trim()
    ? posts.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesContent = p.content.toLowerCase().includes(q);
        const matchesName = p.display_name.toLowerCase().includes(q);
        const matchesDate = new Date(p.created_at)
          .toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
          .toLowerCase()
          .includes(q);
        return matchesContent || matchesName || matchesDate;
      })
    : posts;
  // Mood data for chat
  const CHAT_MOODS = [
    {
      emoji: "😊",
      label: "Happy",
      desc: "Riding good vibes",
      color: "#f5c842"
    },
    {
      emoji: "😔",
      label: "Sad",
      desc: "Need someone to hear",
      color: "#60a5fa"
    },
    {
      emoji: "😰",
      label: "Anxious",
      desc: "Head won't quiet down",
      color: "#e879a0"
    },
    {
      emoji: "😤",
      label: "Angry",
      desc: "Frustrated and venting",
      color: "#f87171"
    },
    {
      emoji: "🥺",
      label: "Lonely",
      desc: "Just want company",
      color: "#fcd34d"
    },
    {
      emoji: "😶",
      label: "Numb",
      desc: "Feeling nothing much",
      color: "#a89bc2"
    },
    {
      emoji: "😓",
      label: "Stressed",
      desc: "Too much at once",
      color: "#34d399"
    },
    {
      emoji: "🥰",
      label: "Grateful",
      desc: "Wanting to share joy",
      color: "#c084fc"
    }
  ];

  const MOOD_RESPONSES: Record<string, string[]> = {
    Happy: [
      "That's great to hear!",
      "tell me more, what happened?",
      "your energy is contagious 🌸",
      "happiness is rare these days",
      "😊 same vibe honestly"
    ],
    Sad: [
      "hey, I'm here 💙",
      "want to talk about it?",
      "it's okay to feel this way",
      "you're not alone in this",
      "I've been there too"
    ],
    Anxious: [
      "take a breath with me 🌿",
      "anxiety is so valid",
      "what's been on your mind?",
      "I understand completely",
      "you're safe here"
    ],
    Angry: [
      "ugh, same honestly",
      "let it out, I'm listening",
      "what happened?",
      "that sounds really frustrating",
      "anger means something mattered"
    ],
    Lonely: [
      "glad you're here",
      "I felt that 💙",
      "loneliness hits differently at night",
      "you found someone 🌸",
      "tell me about your day?"
    ],
    Numb: [
      "just existing today, same",
      "sometimes words don't come — that's okay",
      "I see you",
      "numbness can feel like a heavy blanket",
      "we don't have to talk"
    ],
    Stressed: [
      "breathe. you've survived 100% of your hard days",
      "what's piling up?",
      "you're doing more than you think",
      "stressed too, let's struggle together 😅",
      "tell me what's going on?"
    ],
    Grateful: [
      "that's beautiful 🌸",
      "gratitude is underrated",
      "tell me what you're grateful for!",
      "this made me smile",
      "grateful to meet you too 🌸"
    ]
  };

  const OPENERS: Record<string, string[]> = {
    Sad: ["hey", "been a rough day huh", "you there?"],
    Happy: ["hey! 👋", "hi there 🌸", "hello!"],
    Anxious: ["hey… you there?", "hi", "needed someone to talk to"],
    Angry: ["ugh hey", "finally someone lol", "hi"],
    Lonely: ["hey", "glad someone connected", "hi there 🌙"],
    Numb: ["…hi", "hey", "just existing today haha"],
    Stressed: ["hey", "finally logged in lol", "hi, rough day"],
    Grateful: ["hi! 🌸", "hey!! 😊", "hello, good to meet you"]
  };

  // Show notification
  const showNotification = (msg: string, type: string = "") => {
    setNotification({ msg, type, key: Date.now() });
    setTimeout(() => setNotification(null), 2800);
  };

  // Load posts from Supabase
  const PAGE_SIZE = 15;

  const loadPosts = async (pageNum = 0, append = false, userId?: string) => {
    if (pageNum === 0) setLoadingMore(false);
    else setLoadingMore(true);

    const from = pageNum * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      setLoadingMore(false);
      return;
    }

    if (data) {
      setPosts((prev) => {
        const merged = append ? [...prev, ...data] : data;
        const seen = new Set<number>();
        return merged.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
      });
      setHasMore(data.length === PAGE_SIZE);
      setPage(pageNum);
      await loadReplyCounts();
      await loadLikesForPosts(
        data.map((p) => p.id),
        userId
      );
    }
    setLoadingMore(false);
  };

  const loadLikesForPosts = async (
    postIds: number[],
    currentUserId?: string
  ) => {
    if (postIds.length === 0) return;

    const { data: allLikes } = await supabase
      .from("likes")
      .select("post_id")
      .in("post_id", postIds);

    const counts = new Map<number, number>();
    postIds.forEach((id) => counts.set(id, 0));
    (allLikes || []).forEach((l) =>
      counts.set(l.post_id, (counts.get(l.post_id) || 0) + 1)
    );

    setLikesCount((prev) => {
      const next = new Map(prev);
      counts.forEach((v, k) => next.set(k, v));
      return next;
    });

    // Use passed userId OR fall back to current user state
    const userId = currentUserId || user?.id;
    if (!userId) return;

    const { data: myLikes } = await supabase
      .from("likes")
      .select("post_id")
      .in("post_id", postIds)
      .eq("user_id", userId);

    if (myLikes) {
      setLikedPosts((prev) => {
        const next = new Set(prev);
        myLikes.forEach((l) => next.add(l.post_id));
        return next;
      });
    }
  };
  const containsBadContent = (content: string): string | null => {
    const lower = content.toLowerCase();

    const patterns: { regex: RegExp; msg: string }[] = [
      // Personal info sharing / fishing
      {
        regex: /\b(\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})\b/,
        msg: "Please don't share phone numbers 🌸"
      },
      {
        regex: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}\b/,
        msg: "Please don't share email addresses 🌸"
      },
      {
        regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
        msg: "Please don't share card or account numbers 🌸"
      },
      {
        regex:
          /(what'?s?\s+i?s?\s*ur|what\s+is\s+ur|what'?s\s+your|whats\s+your)\s*(num(ber|b|br|ber)?|ph(one|n|one)?|no\.?|contact|addr(ess)?|loc(ation)?|insta(gram)?|snap(chat)?|whats\s*app|disc(ord)?|tele(gram)?|gmail|mail|email)/i,
        msg: "Please don't ask others for personal information 🌸"
      },
      {
        regex:
          /(send|drop|share|give|pass|shoot|lmk|hmu|hit\s*me\s*up).{0,20}(num(ber|b|br)?|ph(one|n)?|no\.?|contact|insta|snap|disc(ord)?|tele(gram)?|whats\s*app|email|gmail)/i,
        msg: "Please don't ask others for personal information 🌸"
      },
      {
        regex:
          /(dm\s*me|text\s*me|msg\s*me|message\s*me|reach\s*me|contact\s*me|find\s*me\s*on|add\s*me\s*on)/i,
        msg: "Please don't ask others for personal information 🌸"
      },
      // Illegal / dangerous
      {
        regex:
          /\b(buy|sell|selling|buying|deal|dealer)\b.{0,30}\b(drugs?|weed|cocaine|meth|heroin|xanax|pills?|mdma|lsd)\b/i,
        msg: "That content isn't allowed here 🌸"
      },
      {
        regex: /\b(cp|child porn|csam|minor.{0,10}(nude|naked|sex))\b/i,
        msg: "That content is not allowed here."
      },
      {
        regex:
          /\b(how to (make|build|create).{0,20}(bomb|weapon|explosive|poison))\b/i,
        msg: "That content isn't allowed here 🌸"
      },
      // Hate / slurs (add more as needed)
      {
        regex: /\b(n[i1]gg[ae]r|f[a4]gg[o0]t|k[i1]ke|ch[i1]nk|sp[i1][ck])\b/i,
        msg: "Slurs and hate speech aren't welcome here 🌸"
      },
      // Scam / spam
      {
        regex:
          /(follow me on|check out my|subscribe to|click this link|bit\.ly|tinyurl|free money|win \$|you've won)/i,
        msg: "Spam or promotional content isn't allowed here 🌸"
      },
      // Self-harm promotion (not discussion — promotion)
      {
        regex:
          /(how to (kill yourself|commit suicide|end your life)|step[s]? to suicide)/i,
        msg: "If you're struggling, you're not alone. Please reach out to someone 🌸"
      }
    ];

    for (const { regex, msg } of patterns) {
      if (regex.test(lower) || regex.test(content)) {
        return msg;
      }
    }
    return null;
  };
  // Create a new post - FIXED VERSION
  const createPost = async () => {
    if (!text.trim()) {
      showNotification("Write something first 🌸");
      return;
    }
    if (!user) {
      showNotification("Something went wrong. Try again.");
      return;
    }
    if (postsToday >= 5) {
      showNotification(
        "You've shared 5 stories today 🌸 Come back tomorrow.",
        "warn"
      );
      return;
    }
    // ─── content filter ───────────────────────────────────────
    const flagged = containsBadContent(text.trim());
    if (flagged) {
      showNotification(flagged, "warn");
      return;
    }
    // ──────────────────────────────────────────────────────────
    setPosting(true);

    // ─── AI moderation ────────────────────────────────────────
    try {
      const modRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 60,
          messages: [
            {
              role: "user",
              content: `You are a content moderator for an anonymous mental health / emotional support community called UnTale. People share feelings, struggles, and stories here.

Review this post and reply with ONLY one of:
- "ALLOW" if it's a genuine emotional post (sadness, anxiety, venting, love, anger, happiness, trauma, etc.)
- "BLOCK: [short reason]" if it contains: personal info (phone/email/address), requests for personal info, illegal activity, hate speech, slurs, spam/promotion, explicit sexual content, content that sexualizes minors, or instructions for self-harm methods.

Be LENIENT. Dark emotions, swearing, and heavy topics are allowed. Only block clear violations.

Post: "${text.trim().slice(0, 500)}"`
            }
          ]
        })
      });
      const modData = await modRes.json();
      const verdict = modData?.content?.[0]?.text?.trim() ?? "ALLOW";
      if (verdict.startsWith("BLOCK")) {
        const reason = verdict.replace("BLOCK:", "").trim();
        showNotification(`This post can't be shared: ${reason} 🌸`, "warn");
        setPosting(false);
        return;
      }
    } catch {
      // If AI check fails, allow the post (don't block on API errors)
    }
    // ──────────────────────────────────────────────────────────
    const { error } = await supabase.from("posts").insert([
      {
        content: text.trim(),
        anonymous_id: user.id,
        display_name: displayName
      }
    ]);
    if (error) {
      showNotification("Something went wrong. Try again.");
    } else {
      setText("");
      setPostsToday((prev) => prev + 1);
      await loadPosts(0, false, user.id);
      showNotification("Your story is now a star in the night 🌟", "success");
    }
    setPosting(false);
  };

  // Handle user session
  const handleUserSession = async (authUser: any): Promise<string> => {
    setUser(authUser);
    userRef.current = authUser;
    const existingName = authUser.user_metadata?.display_name;
    if (existingName) {
      setDisplayName(existingName);
      return existingName;
    }
    const newName = generateName();
    const { error } = await supabase.auth.updateUser({
      data: { display_name: newName }
    });
    if (!error) setDisplayName(newName);
    return newName;
  };
  // Post interactions
  const handleLike = async (postId: number) => {
    if (!user) return;

    const alreadyLiked = likedPosts.has(postId);

    // Optimistic update
    setLikedPosts((prev) => {
      const next = new Set(prev);
      alreadyLiked ? next.delete(postId) : next.add(postId);
      return next;
    });
    setLikesCount((prev) => {
      const next = new Map(prev);
      next.set(
        postId,
        Math.max(0, (next.get(postId) || 0) + (alreadyLiked ? -1 : 1))
      );
      return next;
    });

    if (alreadyLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (error) {
        // Revert
        setLikedPosts((prev) => {
          const next = new Set(prev);
          next.add(postId);
          return next;
        });
        setLikesCount((prev) => {
          const next = new Map(prev);
          next.set(postId, (next.get(postId) || 0) + 1);
          return next;
        });
      }
    } else {
      const { error } = await supabase
        .from("likes")
        .upsert([{ post_id: postId, user_id: user.id }], {
          onConflict: "post_id,user_id",
          ignoreDuplicates: true
        });
      if (error) {
        // Revert
        setLikedPosts((prev) => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
        setLikesCount((prev) => {
          const next = new Map(prev);
          next.set(postId, Math.max(0, (next.get(postId) || 0) - 1));
          return next;
        });
      } else {
        const post = posts.find((p) => p.id === postId);
        if (post && post.anonymous_id !== user.id) {
          await supabase.from("notifications").insert([
            {
              user_id: post.anonymous_id,
              type: "like",
              post_id: postId,
              triggered_by: displayName
            }
          ]);
        }
      }
    }
  };

  const handleReport = async (postId: number) => {
    if (!user || reportedPosts.has(postId)) return;

    const { error } = await supabase
      .from("reports")
      .insert([{ post_id: postId, reported_by: user.id }]);

    if (!error) {
      setReportedPosts((prev) => new Set(prev).add(postId));
      showNotification("Post reported anonymously.");
    }
  };

  const handleReply = async (postId: number) => {
    if (!replyText.trim()) {
      showNotification("Write something first 🌸");
      return;
    }

    const replyFlagged = containsBadContent(replyText.trim());
    if (replyFlagged) {
      showNotification(replyFlagged, "warn");
      return;
    }

    setReplySubmitting(true);

    try {
      const modRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 60,
          messages: [
            {
              role: "user",
              content: `You moderate an anonymous emotional support community. Review this reply and respond ONLY with "ALLOW" or "BLOCK: [reason]".

ALWAYS BLOCK if the reply asks for or shares: phone numbers, emails, addresses, social media handles, Discord, Telegram, WhatsApp. This includes typos and shorthand like "numer", "num", "phne", "ur num", "yr number", "gib number", "wat is ur num", "drop ur no", "hmu", "hit me up", "dm me", "text me", "find me on", "add me on". If someone is clearly trying to get or share contact info in any form, BLOCK it.

Reply: "${replyText.trim().slice(0, 300)}"`
            }
          ]
        })
      });
      const modData = await modRes.json();
      const verdict = modData?.content?.[0]?.text?.trim() ?? "ALLOW";
      if (verdict.startsWith("BLOCK")) {
        const reason = verdict.replace("BLOCK:", "").trim();
        showNotification(`This reply can't be posted: ${reason} 🌸`, "warn");
        setReplySubmitting(false);
        return;
      }
    } catch {
      // Allow on API error
    }

    const { data, error } = await supabase
      .from("replies")
      .insert([
        {
          post_id: postId,
          content: replyText.trim(),
          display_name: displayName
        }
      ])
      .select()
      .single();

    if (error) {
      showNotification("Something went wrong. Try again.");
    } else {
      setReplyText("");
      showNotification("Reply posted 🌸", "success");
      const post = posts.find((p) => p.id === postId);
      if (post && post.anonymous_id !== user.id) {
        await supabase.from("notifications").insert([
          {
            user_id: post.anonymous_id,
            type: "reply",
            post_id: postId,
            triggered_by: displayName
          }
        ]);
      }
      // Update reply count
      setReplyCounts((prev) => {
        const next = new Map(prev);
        next.set(postId, (next.get(postId) || 0) + 1);
        return next;
      });
      // Append to open replies if visible
      if (data) {
        setRepliesMap((prev) => {
          const next = new Map(prev);
          const existing = prev.get(postId) || [];
          // Only add if not already present (prevents duplicate with realtime)
          if (!existing.find((r: any) => r.id === data.id)) {
            next.set(postId, [...existing, data]);
          }
          return next;
        });
      }
    }
    setReplySubmitting(false);
  };
  const handleDeletePost = async (postId: number, anonymousId: string) => {
    if (user?.id !== anonymousId) {
      showNotification("You can only delete your own posts.");
      return;
    }
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showNotification("Post deleted 🌸");
    } else {
      showNotification("Something went wrong. Try again.");
    }
  };

  const handleDeleteReply = async (replyId: number, postId: number) => {
    const { error } = await supabase.from("replies").delete().eq("id", replyId);
    if (!error) {
      setRepliesMap((prev) => {
        const next = new Map(prev);
        next.set(
          postId,
          (prev.get(postId) || []).filter((r) => r.id !== replyId)
        );
        return next;
      });
      setReplyCounts((prev) => {
        const next = new Map(prev);
        next.set(postId, Math.max(0, (prev.get(postId) || 0) - 1));
        return next;
      });
      showNotification("Reply deleted 🌸");
    } else {
      showNotification("Something went wrong. Try again.");
    }
  };
  const loadReplies = async (postId: number) => {
    setRepliesLoading((prev) => new Set(prev).add(postId));
    const { data, error } = await supabase
      .from("replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setRepliesMap((prev) => {
        const next = new Map(prev);
        next.set(postId, data);
        return next;
      });
    }
    setRepliesLoading((prev) => {
      const next = new Set(prev);
      next.delete(postId);
      return next;
    });
  };

  const loadReplyCounts = async () => {
    const { data } = await supabase.from("replies").select("post_id");
    if (data) {
      const counts = new Map<number, number>();
      data.forEach((r) =>
        counts.set(r.post_id, (counts.get(r.post_id) || 0) + 1)
      );
      setReplyCounts(counts);
    }
  };

  const loadPostsToday = async (userId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("anonymous_id", userId)
      .gte("created_at", today.toISOString());
    setPostsToday(count || 0);
  };

  // Chat functions
  const startChat = () => {
    if (!myMood) {
      showNotification("Pick a mood first 🌸");
      return;
    }

    setChatPhase("searching");

    setTimeout(() => {
      const matched =
        CHAT_MOODS.find((m) => m.label === myMood) || CHAT_MOODS[0];
      setMatchedMood(matched);
      setChatPhase("chat");
      setChatMessages([
        {
          type: "system",
          text: `Stranger connected · feeling ${matched.emoji} ${matched.label}`
        }
      ]);

      const openerPool = OPENERS[matched.label] || ["hey"];
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "theirs",
            text: openerPool[Math.floor(Math.random() * openerPool.length)],
            time: "now"
          }
        ]);
      }, 900);
    }, 1600);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const txt = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [
      ...prev,
      { type: "mine", text: txt, time: "now" }
    ]);

    setTimeout(() => {
      const pool = MOOD_RESPONSES[matchedMood?.label] || MOOD_RESPONSES["Numb"];
      setChatMessages((prev) => [
        ...prev,
        {
          type: "theirs",
          text: pool[Math.floor(Math.random() * pool.length)],
          time: "now"
        }
      ]);
    }, 700);
  };

  const nextChat = () => {
    setChatPhase("searching");
    setChatMessages([]);

    setTimeout(() => {
      const newMatch =
        CHAT_MOODS[Math.floor(Math.random() * CHAT_MOODS.length)];
      setMatchedMood(newMatch);
      setChatPhase("chat");
      setChatMessages([
        {
          type: "system",
          text: `New stranger connected · feeling ${newMatch.emoji} ${newMatch.label}`
        }
      ]);
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { type: "theirs", text: "hey 👋", time: "now" }
        ]);
      }, 900);
    }, 1400);
  };

  const endChat = () => {
    setChatMessages((prev) => [
      ...prev,
      { type: "system", text: "Chat ended. Take care 🌙" }
    ]);
    setTimeout(() => {
      setChatPhase("pick");
      setMyMood(null);
      setMatchedMood(null);
      setChatMessages([]);
    }, 2200);
  };

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Custom cursor effect
  useEffect(() => {
    // Create cursor element
    const cursor = document.createElement("div");
    cursor.id = "sakura-cursor";
    cursor.innerHTML = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="12" stroke="#7dd3fc" stroke-width="0.8" opacity="0.5"/>
      <circle cx="14" cy="14" r="9" stroke="url(#arcGrad)" stroke-width="1.4" stroke-dasharray="20 38" stroke-linecap="round" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" from="0 14 14" to="360 14 14" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="14" cy="14" r="9" stroke="url(#arcGrad2)" stroke-width="0.7" stroke-dasharray="10 48" stroke-linecap="round" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="180 14 14" to="-180 14 14" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="14" cy="14" r="1.5" fill="#e0f2fe" opacity="1"/>
      <circle cx="14" cy="14" r="0.6" fill="#38bdf8" opacity="1"/>
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.2"/>
        </linearGradient>
        <linearGradient id="arcGrad2" x1="28" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>`;
    document.body.appendChild(cursor);

    let lastTrail = 0;
    const TRAIL_INTERVAL = 45;
    const petalColors = [
      ["#fce4f0", "#e879a0"],
      ["#f0d6f5", "#c084c8"],
      ["#ffe4f2", "#f5a0c0"],
      ["#e8d4f8", "#a070d0"]
    ];

    const spawnTrailPetal = (x: number, y: number) => {
      const el = document.createElement("div");
      el.className = "cursor-trail-petal";
      const sz = 5 + Math.random() * 7;
      el.style.width = sz + "px";
      el.style.height = sz + "px";
      const col = petalColors[Math.floor(Math.random() * petalColors.length)];
      el.style.background = `radial-gradient(circle at 35% 35%, ${col[0]}, ${col[1]})`;
      el.style.left = x - sz / 2 + (Math.random() - 0.5) * 10 + "px";
      el.style.top = y - sz / 2 + (Math.random() - 0.5) * 10 + "px";
      el.style.borderRadius =
        Math.random() > 0.5 ? "50% 0 50% 0" : "0 50% 0 50%";
      el.style.animationDuration = 0.5 + Math.random() * 0.4 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      const now = Date.now();
      if (now - lastTrail > TRAIL_INTERVAL) {
        spawnTrailPetal(e.clientX, e.clientY);
        lastTrail = now;
      }
    };

    const handleMouseDown = () => {
      cursor.classList.add("clicked");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("clicked");
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cursor.remove();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Falling leaves effect
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "leaf-canvas";
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9990;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -999, y: -999 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const SAKURA_COLORS = [
      ["#fce4f0", "#e879a0"],
      ["#f9d0e8", "#d4548a"],
      ["#ffe0ef", "#f5a0c0"],
      ["#f0d6f5", "#c084c8"],
      ["#fce8f8", "#e07ac0"]
    ];

    const drawSakuraPetal = (
      x: number,
      y: number,
      size: number,
      angle: number,
      colors: string[]
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(1, colors[1] + "99");
      ctx.fillStyle = grad;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const bx = Math.cos(a) * size * 0.4;
        const by = Math.sin(a) * size * 0.4;
        const cx1 = Math.cos(a - 0.4) * size;
        const cy1 = Math.sin(a - 0.4) * size;
        const cx2 = Math.cos(a + 0.4) * size;
        const cy2 = Math.sin(a + 0.4) * size;
        if (i === 0) ctx.moveTo(bx, by);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, bx, by);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const createLeaf = () => {
      const colors =
        SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)];
      return {
        x: Math.random() * canvas.width,
        y: -20,
        size: 3 + Math.random() * 4,
        speedY: 0.4 + Math.random() * 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.012,
        swayAmp: 0.4 + Math.random() * 0.8,
        opacity: 0.55 + Math.random() * 0.4,
        colors,
        vx: 0,
        vy: 0
      };
    };

    const leaves = Array.from({ length: 28 }, () => {
      const l = createLeaf();
      l.y = Math.random() * canvas.height;
      return l;
    });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const leaf of leaves) {
        leaf.sway += leaf.swaySpeed;
        const swayX = Math.sin(leaf.sway) * leaf.swayAmp;
        const dx = leaf.x - mouse.x;
        const dy = leaf.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90;
          leaf.vx += (dx / dist) * force * 2.2;
          leaf.vy += (dy / dist) * force * 2.2;
        }
        leaf.vx *= 0.88;
        leaf.vy *= 0.88;
        leaf.x += swayX + leaf.speedX + leaf.vx;
        leaf.y += leaf.speedY + leaf.vy;
        leaf.angle += leaf.rotSpeed;
        ctx.globalAlpha = leaf.opacity;
        drawSakuraPetal(leaf.x, leaf.y, leaf.size, leaf.angle, leaf.colors);
        ctx.globalAlpha = 1;
        if (
          leaf.y > canvas.height + 30 ||
          leaf.x < -50 ||
          leaf.x > canvas.width + 50
        ) {
          const fresh = createLeaf();
          Object.assign(leaf, fresh);
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.remove();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove); // ← add this
    };
  }, []);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openMenuId !== null) setOpenMenuId(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openMenuId]);
  // Restore session on mount
  useEffect(() => {
    const init = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session?.user) {
        await handleUserSession(session.user);
        await loadPosts(0, false, session.user.id);
        await loadPostsToday(session.user.id);
        // if session exists:
        await loadNotifications(session.user.id);
      } else {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error && data.user) {
          await handleUserSession(data.user);
          await loadPosts(0, false, data.user.id);
          await loadPostsToday(data.user.id);
          // if signing in anonymously:
          await loadNotifications(data.user.id);
        }
      }
      setSessionLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await handleUserSession(session.user);
        } else {
          setUser(null);
          setDisplayName("");
        }
      }
    );

    // Realtime: new posts appear instantly
    // Realtime: new posts appear instantly
    const channel = supabase
      .channel("posts-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((prev) => {
            if (prev.some((p) => p.id === newPost.id)) return prev;
            return [newPost, ...prev];
          });
          setLikesCount((prev) => {
            const next = new Map(prev);
            if (!next.has(newPost.id)) next.set(newPost.id, 0);
            return next;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "likes" },
        (payload) => {
          const newLike = payload.new as any;
          if (newLike.user_id === userRef.current?.id) return; // skip own action
          setLikesCount((prev) => {
            const next = new Map(prev);
            next.set(newLike.post_id, (next.get(newLike.post_id) || 0) + 1);
            return next;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "likes" },
        (payload) => {
          const oldLike = payload.old as any;
          if (oldLike.user_id === userRef.current?.id) return; // skip own action
          setLikesCount((prev) => {
            const next = new Map(prev);
            next.set(
              oldLike.post_id,
              Math.max(0, (next.get(oldLike.post_id) || 0) - 1)
            );
            return next;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "replies" },
        (payload) => {
          const postId = (payload.new as any).post_id;
          const newReply = payload.new as any;
          setReplyCounts((prev) => {
            const next = new Map(prev);
            next.set(postId, (next.get(postId) || 0) + 1);
            return next;
          });
          setRepliesMap((prev) => {
            const next = new Map(prev);
            if (next.has(postId)) {
              const existing = next.get(postId) || [];
              // Only add if not already present (prevents duplicate with handleReply)
              if (!existing.find((r: any) => r.id === newReply.id)) {
                next.set(postId, [...existing, newReply]);
              }
            }
            return next;
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          if ((payload.new as any).user_id === userRef.current?.id) {
            setNotifs((prev) => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();
  }, []);

  if (sessionLoading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.spinner} />
        <p style={{ color: "#a89bc2", marginTop: 20, fontSize: 14 }}>
          Finding your space…
        </p>
      </div>
    );
  }

  const renderAbout = () => (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 0" }}>
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "80px 20px",
          position: "relative",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* floating doodles */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "-20px",
            fontSize: "22px",
            opacity: 0.2
          }}
        >
          ✿
        </div>

        <div
          style={{
            position: "absolute",
            top: "220px",
            right: "-10px",
            fontSize: "18px",
            opacity: 0.15
          }}
        >
          ~
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "120px",
            left: "-25px",
            fontSize: "20px",
            opacity: 0.2
          }}
        >
          ❀
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "42px",
            textAlign: "center",
            marginBottom: "60px",
            fontFamily: "'Playfair Display', serif",
            color: "#f1eaff",
            position: "relative"
          }}
        >
          About{" "}
          <em style={{ color: "#e879a0", fontStyle: "normal" }}>UnTale</em>
          <div
            style={{
              width: "120px",
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #e879a0, transparent)",
              margin: "14px auto 0"
            }}
          />
        </h1>

        {/* Paragraph 1 */}
        <p
          style={{
            fontSize: "18px",
            color: "#b8a9d6",
            lineHeight: "2.1",
            marginBottom: "28px"
          }}
        >
          There was a time when I could not even think properly. I could not
          understand myself, and worse, I did not know how to share what I was
          feeling or who I could even share it with.
          <span
            style={{
              display: "block",
              marginTop: "14px",
              fontStyle: "italic",
              color: "#d8cfff",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            I felt lost for days without moving. Stuck.
          </span>
          Like my feet were rooted to a place I did not choose.
        </p>

        {/* emotional divider */}
        <div
          style={{
            textAlign: "center",
            margin: "40px 0",
            color: "#e879a0",
            fontSize: "20px",
            letterSpacing: "6px",
            opacity: 0.6
          }}
        >
          · · ·
        </div>

        {/* Paragraph 2 */}
        <p
          style={{
            fontSize: "18px",
            color: "#b8a9d6",
            lineHeight: "2.1",
            marginBottom: "32px"
          }}
        >
          Have you ever felt like there was something continuously running in
          your head and every time you tried to share it, even with your best
          friend, the words just never came out?
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#d8cfff",
            lineHeight: "2.1",
            marginBottom: "36px",
            fontStyle: "italic",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Like they existed somewhere inside you but refused to form into
          something anyone could hold?
        </p>

        {/* single line impact */}
        <p
          style={{
            fontSize: "20px",
            color: "#ffffff",
            textAlign: "center",
            margin: "50px 0",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Have you ever felt that no matter how much you tried, nothing and no
          one could fix it?
        </p>

        {/* broken rhythm text */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#b8a9d6",
              lineHeight: "2"
            }}
          >
            Hundreds of questions swirling.
          </p>
          <p style={{ color: "#b8a9d6", margin: "6px 0" }}>No proper words.</p>
          <p style={{ color: "#b8a9d6", margin: "6px 0" }}>No proper place.</p>
          <p
            style={{
              marginTop: "14px",
              color: "#e879a0",
              fontWeight: "500"
            }}
          >
            That is when I thought of UnTale.
          </p>
        </div>

        {/* Paragraph */}
        <p
          style={{
            fontSize: "18px",
            color: "#b8a9d6",
            lineHeight: "2.1",
            marginBottom: "50px"
          }}
        >
          There are so many of us. Hurt, pressured, betrayed, carrying weight we
          never asked to carry, blamed for things that were never our fault. We
          are like little petals that have fallen from the tree, pushed wherever
          the wind takes us, with no say in the direction.
        </p>

        {/* MAIN QUOTE (hero moment) */}
        <div
          style={{
            margin: "70px 0",
            textAlign: "center",
            position: "relative"
          }}
        >
          <div
            style={{
              fontSize: "60px",
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.08
            }}
          >
            “
          </div>

          <p
            style={{
              color: "#f5c6d6",
              lineHeight: "2.2",
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            But here, together, we will form our own tree. We will grow. We will
            heal. And slowly, we will learn to hold the wind in our own hands.
          </p>
        </div>

        {/* closing paragraph */}
        <p
          style={{
            fontSize: "18px",
            color: "#b8a9d6",
            lineHeight: "2.1",
            marginBottom: "60px",
            textAlign: "center"
          }}
        >
          Find another petal like you. Someone who might need you to help them
          become their own wind. And maybe, without even trying, they will do
          the same for you.
        </p>

        {/* feature card reimagined */}
        <div
          style={{
            textAlign: "center",
            padding: "30px 20px",
            borderTop: "1px dashed rgba(255,255,255,0.1)",
            borderBottom: "1px dashed rgba(255,255,255,0.1)"
          }}
        >
          <div
            style={{
              fontSize: "36px",
              marginBottom: "12px"
            }}
          >
            🌸
          </div>

          <p
            style={{
              color: "#ffffff",
              fontSize: "17px",
              lineHeight: "1.8",
              marginBottom: "10px",
              fontWeight: "600"
            }}
          >
            UnTale is an anonymous space where your words finally have a home.
          </p>

          <p
            style={{
              color: "#a393c8",
              fontSize: "14px",
              lineHeight: "1.9",
              margin: 0
            }}
          >
            No names. No faces. No judgment. Just you, your thoughts, and a
            community of people who understand what it means to carry something
            unsaid. Write here. Read here. Breathe here. You are not alone in
            this, and you never were.
          </p>
        </div>
      </div>
    </div>
  );
  const renderHome = () => (
    <div style={styles.homePage}>
      {/* Ambient orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.orb3} />

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroEyebrow}>
          <span style={styles.eyebrowDot} />
          <span style={styles.eyebrowText}>safe · anonymous · free</span>
          <span style={styles.eyebrowDot} />
        </div>

        <h1 style={styles.heroTitle}>
          <span style={{ ...styles.titleLine, animationDelay: "0.1s" }}>
            Tell what remains
          </span>
          <br />
          <em style={{ ...styles.titleAccent, animationDelay: "0.35s" }}>
            untold.
          </em>
        </h1>

        <p style={styles.heroSubtitle}>
          A place where your heaviest thoughts finally have somewhere to land.
          <br />
          No names. No judgment. Just honesty.
        </p>

        <div style={styles.heroButtons}>
          <button
            style={styles.btnPrimary}
            onClick={() => setCurrentPage("feed")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(190,24,93,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 18px rgba(190,24,93,0.38)";
            }}
          >
            ✍️ Start Writing
          </button>
          <button
            style={styles.btnGhost}
            onClick={() => setCurrentPage("about")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(192,132,200,0.25)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(192,132,200,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(192,132,200,0.35)";
            }}
          >
            What is UnTale?
          </button>
        </div>

        {/* Floating words */}
        <div style={styles.floatingWords}>
          {[
            "lost",
            "hopeful",
            "tired",
            "healing",
            "scared",
            "okay",
            "trying",
            "seen"
          ].map((w, i) => (
            <span
              key={w}
              style={{
                ...styles.floatingWord,
                animationDelay: `${i * 0.4}s`,
                left: `${8 + i * 11.5}%`,
                animationDuration: `${6 + (i % 3)}s`
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Quote strip */}
      <div style={styles.quoteStrip}>
        <div style={styles.quoteInner}>
          <span style={styles.quoteGlyph}>"</span>
          <p style={styles.quoteText}>
            We are like little petals that have fallen from the tree — pushed
            wherever the wind takes us.{" "}
            <em style={{ color: "#e879a0" }}>But here, together, we grow.</em>
          </p>
        </div>
      </div>

      {/* Feature tiles */}
      <div style={styles.tilesGrid}>
        {[
          {
            icon: "🎭",
            title: "Truly Anonymous",
            desc: "A random alias. No names, no photos, no traces. Just your words, floating free.",
            accent: "#e879a0"
          },
          {
            icon: "📖",
            title: "Read Others' Stories",
            desc: "Thousands of unheard voices waiting to be found. You are not alone in this.",
            accent: "#c084fc"
          },
          {
            icon: "🌸",
            title: "A Safe Space",
            desc: "Kindness is the default here. Community guidelines protect every voice.",
            accent: "#60a5fa"
          }
        ].map((f, i) => (
          <div
            key={f.title}
            style={{
              ...styles.tile,
              animationDelay: `${0.2 + i * 0.15}s`,
              borderTopColor: f.accent
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-6px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${f.accent}33`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={styles.tileIcon}>{f.icon}</div>
            <h3 style={{ ...styles.tileTitle, color: f.accent }}>{f.title}</h3>
            <p style={styles.tileDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={styles.bottomCta}>
        <p style={styles.ctaText}>Your story deserves to be heard.</p>
        <button
          style={styles.ctaBtn}
          onClick={() => setCurrentPage("feed")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-3px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 14px 36px rgba(190,24,93,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 28px rgba(190,24,93,0.4)";
          }}
        >
          🌸 Release Your Story
        </button>
      </div>
    </div>
  );
  // Feed View
  const renderFeed = () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      {/* Main feed column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.composeBox}>
          <div style={styles.composeMeta}>
            Posting as{" "}
            <strong style={{ color: "#e879a0" }}>{displayName || "…"}</strong>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind? Speak freely…"
            style={styles.textarea}
            maxLength={600}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: postsToday >= 5 ? "#e879a0" : "#5b4d72"
              }}
            >
              {5 - postsToday} {5 - postsToday === 1 ? "story" : "stories"}{" "}
              remaining today
            </span>
            <span style={{ fontSize: 12, color: "#5b4d72" }}>
              {text.length}/600
            </span>
          </div>
          <button
            onClick={createPost}
            disabled={posting || !text.trim()}
            style={{
              ...styles.primaryBtn,
              opacity: posting || !text.trim() ? 0.5 : 1,
              marginTop: "10px"
            }}
          >
            {posting ? "Posting…" : "🌸 Release Your Story"}
          </button>
        </div>

        <div style={styles.feed}>
          {posts.length === 0 && (
            <p
              style={{
                color: "#7c6a9a",
                textAlign: "center",
                marginTop: "40px"
              }}
            >
              No posts yet. Be the first.
            </p>
          )}

          {filteredPosts.map((p) => (
            <div key={p.id} id={`post-${p.id}`} style={styles.postCard}>
              <div style={styles.postHeader}>
                <div style={styles.anonAvatar}>🌸</div>
                <div style={styles.postAuthor}>{p.display_name}</div>
                <div style={styles.postTime}>
                  {new Date(p.created_at).toLocaleString(undefined, {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                  <span style={{ margin: "0 6px" }}>•</span>
                  {timeAgo(p.created_at)}
                </div>
              </div>
              <div style={styles.postContent}>{p.content}</div>
              <div style={styles.postTags}>
                <span
                  style={{
                    background: "rgba(190,24,93,0.10)",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    color: "#c084c8"
                  }}
                >
                  #anonymous
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative"
                }}
              >
                <button
                  style={{
                    ...styles.actionBtn,
                    color: likedPosts.has(p.id) ? "#e879a0" : "#a89bc2"
                  }}
                  onClick={() => handleLike(p.id)}
                >
                  {likedPosts.has(p.id) ? "❤️" : "🤍"}{" "}
                  {likesCount.get(p.id) ?? 0}
                </button>
                <button
                  style={{
                    ...styles.actionBtn,
                    color: showReplyId === p.id ? "#e879a0" : "#a89bc2"
                  }}
                  onClick={() => {
                    if (showReplyId === p.id) {
                      setShowReplyId(null);
                    } else {
                      setShowReplyId(p.id);
                      if (!repliesMap.has(p.id)) loadReplies(p.id);
                    }
                  }}
                >
                  💬 {replyCounts.get(p.id) ?? 0}
                </button>

                {/* Floating Action Tray */}
                <div style={{ position: "relative", marginLeft: "auto" }}>
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === p.id ? null : p.id)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background:
                        openMenuId === p.id
                          ? "rgba(232,121,160,0.2)"
                          : "rgba(232,121,160,0.1)",
                      border: "0.5px solid rgba(232,121,160,0.25)",
                      borderRadius: "999px",
                      color: "#e879a0",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "6px 14px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "background 0.15s, transform 0.15s",
                      transform:
                        openMenuId === p.id ? "scale(0.97)" : "scale(1)"
                    }}
                  >
                    ⚡ Actions
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
                        transition: "transform 0.2s",
                        transform:
                          openMenuId === p.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)"
                      }}
                    >
                      ▲
                    </span>
                  </button>

                  {/* Tray */}
                  {openMenuId === p.id && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: "calc(100% + 10px)",
                        background: "#1e1a32",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        padding: "6px",
                        width: "178px",
                        zIndex: 50,
                        animation: "trayOpen 0.18s cubic-bezier(.4,0,.2,1) both"
                      }}
                    >
                      {/* Caret */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-5px",
                          right: "22px",
                          width: "9px",
                          height: "9px",
                          background: "#1e1a32",
                          borderRight: "0.5px solid rgba(255,255,255,0.1)",
                          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
                          transform: "rotate(45deg)"
                        }}
                      />

                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.07em",
                          color: "rgba(255,255,255,0.25)",
                          padding: "6px 12px 4px",
                          textTransform: "uppercase",
                          fontFamily: "'DM Sans', sans-serif"
                        }}
                      >
                        Post options
                      </div>

                      <div
                        style={{
                          height: "0.5px",
                          background: "rgba(255,255,255,0.07)",
                          margin: "4px 6px"
                        }}
                      />

                      {/* Report */}
                      <button
                        onClick={() => {
                          handleReport(p.id);
                          setOpenMenuId(null);
                        }}
                        disabled={reportedPosts.has(p.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderRadius: "9px",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: reportedPosts.has(p.id)
                            ? "default"
                            : "pointer",
                          border: "none",
                          background: "transparent",
                          width: "100%",
                          textAlign: "left",
                          color: reportedPosts.has(p.id)
                            ? "rgba(255,200,80,0.35)"
                            : "rgba(255,200,80,0.9)",
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.12s",
                          opacity: reportedPosts.has(p.id) ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (!reportedPosts.has(p.id))
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(255,200,80,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                        }}
                      >
                        🚩{" "}
                        {reportedPosts.has(p.id)
                          ? "Already reported"
                          : "Report post"}
                      </button>

                      {/* Delete — only for own posts */}
                      {p.anonymous_id === user?.id && (
                        <button
                          onClick={() => {
                            handleDeletePost(p.id, p.anonymous_id);
                            setOpenMenuId(null);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            borderRadius: "9px",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            width: "100%",
                            textAlign: "left",
                            color: "rgba(240,90,90,0.9)",
                            fontFamily: "'DM Sans', sans-serif",
                            transition: "background 0.12s"
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(240,90,90,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "transparent";
                          }}
                        >
                          🗑️ Delete post
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {showReplyId === p.id && (
                <div style={styles.replyBox}>
                  {repliesLoading.has(p.id) ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "12px 0",
                        color: "#5b4d72",
                        fontSize: 13
                      }}
                    >
                      Loading replies…
                    </div>
                  ) : (repliesMap.get(p.id) || []).length > 0 ? (
                    <div
                      style={{
                        marginBottom: 14,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10
                      }}
                    >
                      {Array.from(
                        new Map(
                          (repliesMap.get(p.id) || []).map((r: any) => [
                            r.id,
                            r
                          ])
                        ).values()
                      ).map((r: any) => (
                        <div
                          key={r.id}
                          style={{
                            background: "rgba(232,121,160,0.06)",
                            borderRadius: 12,
                            padding: "10px 14px"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 4
                            }}
                          >
                            <span style={{ fontSize: 14 }}>🌸</span>
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#a89bc2"
                              }}
                            >
                              {r.display_name}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: "#5b4d72",
                                marginLeft: "auto"
                              }}
                            >
                              {timeAgo(r.created_at)}
                            </span>
                            {r.display_name === displayName && (
                              <button
                                onClick={() => handleDeleteReply(r.id, p.id)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#5b4d72",
                                  fontSize: 11,
                                  cursor: "pointer",
                                  fontFamily: "'DM Sans', sans-serif",
                                  padding: "2px 6px"
                                }}
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              color: "#d8cff0",
                              lineHeight: 1.6
                            }}
                          >
                            {r.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 13,
                        color: "#5b4d72",
                        marginBottom: 12,
                        textAlign: "center"
                      }}
                    >
                      No replies yet. Be the first 🌸
                    </div>
                  )}
                  <textarea
                    style={styles.replyInput}
                    placeholder="Write a kind reply… 🌸"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    maxLength={300}
                  />
                  <div
                    style={{
                      fontSize: 11,
                      color: "#5b4d72",
                      textAlign: "right",
                      marginTop: 3
                    }}
                  >
                    {replyText.length}/300
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "flex-end",
                      marginTop: 8
                    }}
                  >
                    <button
                      style={styles.cancelBtn}
                      onClick={() => {
                        setShowReplyId(null);
                        setReplyText("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        ...styles.replyBtn,
                        opacity: replySubmitting || !replyText.trim() ? 0.5 : 1
                      }}
                      onClick={() => handleReply(p.id)}
                      disabled={replySubmitting || !replyText.trim()}
                    >
                      {replySubmitting ? "…" : "🌸 Reply"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => loadPosts(page + 1, true, user?.id)}
              disabled={loadingMore}
              style={{
                ...styles.primaryBtn,
                opacity: loadingMore ? 0.5 : 1,
                marginTop: 8
              }}
            >
              {loadingMore ? "Loading…" : "Load more stories"}
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Smart Search Card */}
        <div style={styles.sideCard}>
          <div style={styles.sideCardTitle}>🔍 Search Posts</div>
          <div style={{ marginTop: "12px", position: "relative" }}>
            <input
              type="text"
              placeholder="keyword, name, date…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 36px",
                background: "rgba(16,10,40,0.6)",
                border: "1.5px solid rgba(232,121,160,0.18)",
                borderRadius: "50px",
                color: "#ede8f8",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'DM Sans', sans-serif"
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "14px",
                pointerEvents: "none"
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#7c6a9a",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: 0,
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <div
              style={{ marginTop: "8px", fontSize: "11px", color: "#5b4d72" }}
            >
              {filteredPosts.length} result
              {filteredPosts.length !== 1 ? "s" : ""} found
            </div>
          )}
        </div>
        {/* Your identity card */}
        <div style={styles.sideCard}>
          <div style={styles.sideCardTitle}>Your Identity</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 10
            }}
          >
            <div
              style={{
                ...styles.anonAvatar,
                width: 42,
                height: 42,
                fontSize: 18
              }}
            >
              🌸
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#e879a0", fontSize: 14 }}>
                {displayName || "…"}
              </div>
              <div style={{ fontSize: 11, color: "#5b4d72", marginTop: 2 }}>
                Anonymous · same device
              </div>
            </div>
          </div>
        </div>

        {/* Top posts this week */}
        <div style={styles.sideCard}>
          <div style={styles.sideCardTitle}>🔥 Most Loved</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 12
            }}
          >
            {[...posts]
              .sort(
                (a, b) =>
                  (likesCount.get(b.id) ?? 0) - (likesCount.get(a.id) ?? 0)
              )
              .slice(0, 5)
              .map((p, i) => (
                <div key={p.id} style={styles.sidePost}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#e879a0",
                        fontWeight: 700
                      }}
                    >
                      #{i + 1}
                    </span>
                    <span style={{ fontSize: 11, color: "#5b4d72" }}>
                      {p.display_name}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 11,
                        color: "#e879a0"
                      }}
                    >
                      ❤️ {likesCount.get(p.id) ?? 0}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#a89bc2",
                      lineHeight: 1.5,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as any
                    }}
                  >
                    {p.content}
                  </div>
                </div>
              ))}
            {filteredPosts.length === 0 && (
              <p
                style={{
                  color: "#7c6a9a",
                  textAlign: "center",
                  marginTop: "40px"
                }}
              >
                {searchQuery ? (
                  <>
                    No posts matching "<strong>{searchQuery}</strong>" 🌸
                  </>
                ) : (
                  "No posts yet. Be the first."
                )}
              </p>
            )}
          </div>
        </div>

        {/* Community vibe */}
        <div style={styles.sideCard}>
          <div style={styles.sideCardTitle}>🌸 Community</div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}
          >
            <div style={styles.statRow}>
              <span style={{ fontSize: 12, color: "#7c6a9a" }}>
                Stories shared
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#e879a0" }}>
                {posts.length}+
              </span>
            </div>
            <div style={styles.statRow}>
              <span style={{ fontSize: 12, color: "#7c6a9a" }}>
                Total hearts
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#e879a0" }}>
                {Array.from(likesCount.values()).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <div style={styles.statRow}>
              <span style={{ fontSize: 12, color: "#7c6a9a" }}>
                Replies given
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#e879a0" }}>
                {Array.from(replyCounts.values()).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              padding: "10px 12px",
              background: "rgba(232,121,160,0.06)",
              borderRadius: 10,
              fontSize: 12,
              color: "#7c6a9a",
              lineHeight: 1.6,
              fontStyle: "italic"
            }}
          >
            "You are not alone in this. Every story here is proof." 🌙
          </div>
        </div>
      </div>
    </div>
  );
  const renderFeedback = () => (
    <div style={{ maxWidth: "580px", margin: "0 auto", padding: "40px 24px" }}>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "36px",
          color: "#f1eaff",
          textAlign: "center",
          marginBottom: "10px"
        }}
      >
        Your <em style={{ color: "#e879a0" }}>Voice</em> Matters
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#7c6a9a",
          fontSize: "14px",
          marginBottom: "36px",
          lineHeight: 1.7
        }}
      >
        You're among the first to use UnTale. Help us shape what it becomes. 🌸
      </p>
      <div
        style={{
          background: "rgba(16,10,40,0.68)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(232,121,160,0.18)",
          borderRadius: "20px",
          padding: "32px"
        }}
      >
        <FeedbackForm
          displayName={displayName}
          showNotification={showNotification}
        />
      </div>
    </div>
  );
  // Chat View
  const renderChat = () => {
    if (chatPhase === "pick") {
      return (
        <div style={styles.chatContainer}>
          <div style={styles.sectionTitle}>How are you feeling?</div>
          <div style={styles.sectionSub}>
            We'll match you with someone sharing a similar emotional space ✨
          </div>
          <div style={styles.moodGrid}>
            {CHAT_MOODS.map((m) => (
              <button
                key={m.label}
                style={{
                  ...styles.moodBtn,
                  borderColor:
                    myMood === m.label ? m.color : "rgba(232,121,160,0.14)",
                  background:
                    myMood === m.label ? `${m.color}22` : "rgba(16,10,40,0.7)"
                }}
                onClick={() => setMyMood(m.label)}
              >
                <span style={styles.moodEmoji}>{m.emoji}</span>
                <span style={styles.moodLabel}>{m.label}</span>
                <span style={styles.moodDesc}>{m.desc}</span>
              </button>
            ))}
          </div>
          {myMood && (
            <div style={styles.moodPreview}>
              <span style={{ fontSize: 24 }}>
                {CHAT_MOODS.find((m) => m.label === myMood)?.emoji}
              </span>
              <div style={{ marginLeft: 12 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: "#a89bc2" }}
                >
                  You'll be matched with someone feeling similar
                </div>
                <div style={{ fontSize: 12, color: "#5b4d72" }}>
                  Same or compatible moods · anonymous · safe
                </div>
              </div>
            </div>
          )}
          <button style={styles.chatStartBtn} onClick={startChat}>
            Find My Stranger ✨
          </button>
        </div>
      );
    }

    if (chatPhase === "searching") {
      return (
        <div style={styles.chatSearching}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>
            {CHAT_MOODS.find((m) => m.label === myMood)?.emoji}
          </div>
          <div style={styles.loadingDots}>
            <span />
            <span />
            <span />
          </div>
          <p style={{ marginTop: 16, color: "#7c6a9a", fontSize: 15 }}>
            Matching you with someone feeling{" "}
            <strong style={{ color: "#e879a0" }}>{myMood}</strong>…
          </p>
        </div>
      );
    }

    return (
      <div style={styles.chatBox}>
        <div style={styles.chatHeader}>
          <div style={styles.chatStatusDot} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#a89bc2" }}>
            Stranger
          </span>
          {matchedMood && (
            <span style={styles.chatMoodPill}>
              {matchedMood.emoji} {matchedMood.label}
            </span>
          )}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#5b4d72" }}>
            You: {CHAT_MOODS.find((m) => m.label === myMood)?.emoji} {myMood}
          </span>
        </div>
        <div style={styles.chatMessages}>
          {chatMessages.map((msg, i) =>
            msg.type === "system" ? (
              <div key={i} style={styles.chatSystem}>
                {msg.text}
              </div>
            ) : (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  alignSelf: msg.type === "mine" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    ...styles.msgBubble,
                    background:
                      msg.type === "mine"
                        ? "linear-gradient(135deg, #be185d, #e879a0)"
                        : "rgba(28,18,50,0.92)",
                    border:
                      msg.type === "mine"
                        ? "none"
                        : "1px solid rgba(232,121,160,0.18)"
                  }}
                >
                  {msg.text}
                </div>
                <div style={styles.msgTime}>{msg.time}</div>
              </div>
            )
          )}
          <div ref={chatEndRef} />
        </div>
        <div style={styles.chatInputArea}>
          <div style={styles.chatInputRow}>
            <input
              style={styles.chatInput}
              placeholder="Say something…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
            />
            <button style={styles.sendBtn} onClick={sendChatMessage}>
              Send
            </button>
          </div>
          <div style={styles.chatActions}>
            <button style={styles.chatActionBtn} onClick={nextChat}>
              ↪️ Next
            </button>
            <button style={styles.chatActionBtn} onClick={endChat}>
              ✕ End
            </button>
            <button
              style={styles.chatActionBtn}
              onClick={() => showNotification("Reported anonymously.")}
            >
              ⚠️ Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Premium View
  const renderPremium = () => (
    <div style={styles.premiumContainer}>
      <div style={styles.premiumHero}>
        <div style={styles.premiumBadge}>✨ UnTale Premium</div>
        <div style={styles.premiumTitle}>
          More space.
          <br />
          More freedom.
        </div>
        <p style={styles.premiumSub}>
          Unlock unlimited posts, unlimited chat, reconnect, and zero ads.
        </p>
      </div>

      <div style={styles.benefitsGrid}>
        {[
          {
            icon: "✍️",
            title: "Post Anonymously",
            desc: "Share your story. No account trails."
          },
          {
            icon: "💬",
            title: "Unlimited Chat",
            desc: "No daily limits. Talk as long as you need."
          },
          {
            icon: "🔄",
            title: "Reconnect Chats",
            desc: "Save and reconnect with understanding strangers."
          },
          { icon: "🚫", title: "Zero Ads", desc: "Pure, uninterrupted space." },
          {
            icon: "🏷️",
            title: "Custom Alias",
            desc: "Your recurring anonymous identity."
          },
          {
            icon: "🌈",
            title: "Mood Themes",
            desc: "Exclusive sakura palettes."
          }
        ].map((b) => (
          <div key={b.title} style={styles.benefitCard}>
            <div style={styles.benefitIcon}>{b.icon}</div>
            <h3 style={styles.benefitTitle}>{b.title}</h3>
            <p style={styles.benefitDesc}>{b.desc}</p>
          </div>
        ))}
      </div>

      <div style={styles.priceCard}>
        <div style={{ fontSize: 13, color: "#5b4d72", marginBottom: 10 }}>
          Monthly Plan
        </div>
        <div style={styles.priceNum}>₹199</div>
        <div style={styles.pricePeriod}>per month · cancel anytime</div>
        <button
          style={styles.upgradeBtn}
          onClick={() =>
            showNotification("Redirecting to checkout… 💎", "warn")
          }
        >
          ✨ Upgrade Now
        </button>
        <p style={{ fontSize: 12, color: "#5b4d72" }}>
          Secure payment · Instant activation
        </p>
      </div>
    </div>
  );

  // Main render with navigation
  return (
    <div style={styles.mainApp}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoArea} onClick={() => setCurrentPage("home")}>
          <span style={styles.logoText}>
            Un<span style={{ fontStyle: "italic" }}>Tale</span>
          </span>
        </div>
        <div style={styles.navLinks}>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === "home" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === "feed" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("feed")}
          >
            Feed
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === "about" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("about")}
          >
            About
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === "feedback" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("feedback")}
          >
            Feedback
          </button>
          <div style={styles.userSection}>
            {/* Bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (!showNotifDropdown) markAllRead();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: showNotifDropdown
                    ? "rgba(232,121,160,0.2)"
                    : "rgba(232,121,160,0.08)",
                  border: "1px solid rgba(232,121,160,0.28)",
                  borderRadius: "50px",
                  color: "#e879a0",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "7px 14px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.2s"
                }}
              >
                🌸
                {unreadCount > 0 ? (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #be185d, #e879a0)",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      borderRadius: "50px",
                      padding: "1px 7px"
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                ) : (
                  <span style={{ color: "#a89bc2", fontSize: "12px" }}>
                    updates
                  </span>
                )}
              </button>
              {showNotifDropdown && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 10px)",
                    width: "300px",
                    background: "#1e1a32",
                    border: "1px solid rgba(232,121,160,0.18)",
                    borderRadius: "16px",
                    padding: "12px",
                    zIndex: 200,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#a89bc2",
                      marginBottom: "10px",
                      padding: "0 4px"
                    }}
                  >
                    Notifications
                  </div>
                  {notifs.length === 0 ? (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5b4d72",
                        textAlign: "center",
                        padding: "20px 0"
                      }}
                    >
                      No notifications yet 🌸
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        maxHeight: "320px",
                        overflowY: "auto"
                      }}
                    >
                      {notifs.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setShowNotifDropdown(false);
                            setCurrentPage("feed");
                            setTimeout(() => {
                              const el = document.getElementById(
                                `post-${n.post_id}`
                              );
                              if (el) {
                                el.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center"
                                });
                                el.style.transition = "box-shadow 0.4s ease";
                                el.style.boxShadow =
                                  "0 0 0 2px rgba(232,121,160,0.7)";
                                setTimeout(() => {
                                  el.style.boxShadow = "";
                                }, 2000);
                              }
                            }, 200);
                          }}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: n.read
                              ? "transparent"
                              : "rgba(232,121,160,0.08)",
                            border: "1px solid rgba(232,121,160,0.08)",
                            fontSize: "13px",
                            color: "#d8cff0",
                            lineHeight: 1.5,
                            cursor: "pointer",
                            transition: "background 0.15s"
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(232,121,160,0.15)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = n.read
                              ? "transparent"
                              : "rgba(232,121,160,0.08)")
                          }
                        >
                          {n.type === "like"
                            ? `❤️ ${n.triggered_by} liked your post`
                            : `💬 ${n.triggered_by} replied to your post`}
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#5b4d72",
                              marginTop: "3px"
                            }}
                          >
                            {timeAgo(n.created_at)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <span style={styles.userName}>{displayName}</span>
          </div>
        </div>
        <button
          style={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <button
            style={styles.mobileLink}
            onClick={() => {
              setCurrentPage("home");
              setMobileMenuOpen(false);
            }}
          >
            Home
          </button>
          <button
            style={styles.mobileLink}
            onClick={() => {
              setCurrentPage("feed");
              setMobileMenuOpen(false);
            }}
          >
            Feed
          </button>
          <button
            style={styles.mobileLink}
            onClick={() => {
              setCurrentPage("about");
              setMobileMenuOpen(false);
            }}
          >
            About
          </button>
          <button
            style={styles.mobileLink}
            onClick={() => {
              setCurrentPage("feedback");
              setMobileMenuOpen(false);
            }}
          >
            Feedback
          </button>
        </div>
      )}

      {/* Page Content */}
      {currentPage === "home" && renderHome()}
      {currentPage === "feed" && (
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}
        >
          {renderFeed()}
        </div>
      )}
      {currentPage === "about" && renderAbout()}
      {currentPage === "feedback" && renderFeedback()}

      {/* Notification */}
      {notification && (
        <div
          style={{
            ...styles.notification,
            ...(notification.type === "success"
              ? styles.notificationSuccess
              : {})
          }}
        >
          {notification.msg}
        </div>
      )}
    </div>
  );
}

// Styles
const styles: Record<string, React.CSSProperties> = {
  loadingWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background:
      "linear-gradient(160deg, #0d0b1e 0%, #16103a 40%, #1a0e32 70%, #0c0820 100%)"
  },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid rgba(232,121,160,0.2)",
    borderTop: "3px solid #e879a0",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },

  // Auth page
  authPage: {
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #0d0b1e 0%, #16103a 40%, #1a0e32 70%, #0c0820 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif"
  },
  authCard: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  logo: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#e879a0",
    letterSpacing: "-1px",
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "4px"
  },
  tagline: {
    textAlign: "center",
    color: "#a89bc2",
    fontSize: "14px",
    margin: "0 0 8px"
  },
  tabRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "4px"
  },
  tab: {
    flex: 1,
    padding: "10px",
    background: "transparent",
    border: "1.5px solid rgba(192,132,200,0.35)",
    borderRadius: "50px",
    color: "#a89bc2",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif"
  },
  tabActive: {
    flex: 1,
    padding: "10px",
    background: "rgba(190,24,93,0.10)",
    border: "1.5px solid #e879a0",
    borderRadius: "50px",
    color: "#e879a0",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif"
  },
  input: {
    padding: "12px 14px",
    background: "rgba(16,10,40,0.6)",
    border: "1.5px solid rgba(232,121,160,0.18)",
    borderRadius: "50px",
    color: "#ede8f8",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif"
  },
  primaryBtn: {
    padding: "13px",
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.25s",
    fontFamily: "'DM Sans', sans-serif"
  },
  errorText: { color: "#ff6b6b", fontSize: "13px", margin: "0" },
  successText: { color: "#6bffb8", fontSize: "13px", margin: "0" },
  noteText: {
    color: "#7c6a9a",
    fontSize: "12px",
    textAlign: "center",
    margin: "4px 0 0",
    lineHeight: "1.5"
  },

  // Main app
  mainApp: {
    background:
      "linear-gradient(160deg, #0d0b1e 0%, #16103a 40%, #1a0e32 70%, #0c0820 100%)",
    minHeight: "100vh",
    color: "#ede8f8",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "none"
  },
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(10,7,26,0.88)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(232,121,160,0.12)",
    padding: "0 32px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoArea: { cursor: "pointer" },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "24px",
    fontWeight: "700",
    color: "#e879a0",
    letterSpacing: "-0.5px"
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  navLink: {
    padding: "8px 16px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#a89bc2",
    background: "transparent",
    border: "none",
    fontFamily: "'DM Sans', sans-serif"
  },
  navLinkActive: {
    background: "rgba(232,121,160,0.15)",
    color: "#e879a0",
    fontWeight: "600"
  },
  navPremium: {
    background: "linear-gradient(135deg, #d97706, #f5c842)",
    color: "#fff !important"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "16px"
  },
  userAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px"
  },
  userName: {
    fontSize: "13px",
    color: "#a89bc2"
  },
  logoutButton: {
    padding: "6px 14px",
    background: "transparent",
    border: "1.5px solid rgba(232,121,160,0.18)",
    borderRadius: "50px",
    color: "#a89bc2",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "'DM Sans', sans-serif"
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "4px"
  },
  mobileMenu: {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    background: "rgba(10,7,26,0.97)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(232,121,160,0.18)",
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    zIndex: 99
  },
  mobileLink: {
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    color: "#a89bc2",
    background: "transparent",
    border: "none",
    textAlign: "left",
    fontFamily: "'DM Sans', sans-serif"
  },
  pageContent: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 24px"
  },

  // Hero section
  hero: {
    textAlign: "center",
    padding: "60px 24px 40px"
  },
  heroLogo: {
    fontSize: "64px",
    marginBottom: "24px"
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(38px, 6vw, 68px)",
    fontWeight: "700",
    color: "#f5eeff",
    lineHeight: "1.15",
    marginBottom: "20px"
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#a89bc2",
    maxWidth: "520px",
    margin: "0 auto 36px",
    lineHeight: "1.7",
    fontWeight: "300"
  },
  heroButtons: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "12px 28px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(190,24,93,0.38)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease"
  },
  btnGhost: {
    background: "transparent",
    color: "#c084c8",
    border: "1.5px solid rgba(192,132,200,0.35)",
    borderRadius: "50px",
    padding: "11px 26px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition:
      "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease"
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    marginTop: "60px",
    flexWrap: "wrap"
  },
  stat: {
    textAlign: "center"
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "32px",
    fontWeight: "700",
    color: "#e879a0"
  },
  statLabel: {
    fontSize: "13px",
    color: "#7c6a9a",
    marginTop: "2px"
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    padding: "0 24px 60px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  featureCard: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "28px",
    textAlign: "center"
  },
  featureIcon: {
    fontSize: "34px",
    marginBottom: "14px",
    display: "inline-block"
  },
  featureTitle: {
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#ede8f8"
  },
  featureDesc: {
    fontSize: "14px",
    color: "#7c6a9a",
    lineHeight: "1.65"
  },

  // Home page enhanced
  homePage: {
    position: "relative" as const,
    overflow: "hidden"
  },
  orb1: {
    position: "absolute" as const,
    top: "-120px",
    left: "-80px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(190,24,93,0.12) 0%, transparent 70%)",
    pointerEvents: "none" as const,
    animation: "orbPulse 8s ease-in-out infinite"
  },
  orb2: {
    position: "absolute" as const,
    top: "200px",
    right: "-100px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(192,132,200,0.10) 0%, transparent 70%)",
    pointerEvents: "none" as const,
    animation: "orbPulse 10s ease-in-out infinite reverse"
  },
  orb3: {
    position: "absolute" as const,
    bottom: "100px",
    left: "30%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)",
    pointerEvents: "none" as const,
    animation: "orbPulse 12s ease-in-out infinite"
  },
  heroEyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "28px",
    animation: "fadeSlideUp 0.7s ease both"
  },
  eyebrowDot: {
    display: "inline-block",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#e879a0",
    opacity: 0.6
  },
  eyebrowText: {
    fontSize: "12px",
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    color: "#7c6a9a",
    fontWeight: "500"
  },
  titleLine: {
    display: "inline-block",
    animation: "fadeSlideUp 0.8s ease both"
  },
  titleAccent: {
    display: "inline-block",
    color: "#e879a0",
    fontStyle: "italic",
    animation: "fadeSlideUp 0.8s ease both"
  },
  floatingWords: {
    position: "relative" as const,
    height: "40px",
    marginTop: "48px",
    overflow: "hidden"
  },
  floatingWord: {
    position: "absolute" as const,
    fontSize: "12px",
    color: "rgba(168,155,194,0.35)",
    letterSpacing: "1px",
    animation: "wordFloat linear infinite",
    whiteSpace: "nowrap" as const,
    bottom: 0
  },
  quoteStrip: {
    margin: "0 auto 60px",
    maxWidth: "700px",
    padding: "0 24px"
  },
  quoteInner: {
    borderLeft: "2px solid rgba(232,121,160,0.35)",
    paddingLeft: "28px",
    position: "relative" as const,
    animation: "fadeSlideUp 0.9s ease 0.3s both"
  },
  quoteGlyph: {
    position: "absolute" as const,
    top: "-18px",
    left: "18px",
    fontSize: "60px",
    color: "rgba(232,121,160,0.08)",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  },
  quoteText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(16px, 2.5vw, 20px)",
    color: "#a89bc2",
    lineHeight: "1.9",
    margin: 0,
    fontWeight: "400"
  },
  tilesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    padding: "0 24px",
    maxWidth: "940px",
    margin: "0 auto 80px"
  },
  tile: {
    background: "rgba(16,10,40,0.55)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(232,121,160,0.12)",
    borderTop: "2px solid",
    borderRadius: "18px",
    padding: "32px 26px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    animation: "fadeSlideUp 0.8s ease both",
    cursor: "default"
  },
  tileIcon: {
    fontSize: "36px",
    marginBottom: "16px",
    display: "block"
  },
  tileTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
    letterSpacing: "-0.2px"
  },
  tileDesc: {
    fontSize: "14px",
    color: "#7c6a9a",
    lineHeight: "1.75",
    margin: 0
  },
  bottomCta: {
    textAlign: "center" as const,
    padding: "20px 24px 80px",
    animation: "fadeSlideUp 0.8s ease 0.5s both"
  },
  ctaText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(20px, 3vw, 28px)",
    color: "#d8cff0",
    marginBottom: "24px",
    fontWeight: "400",
    fontStyle: "italic"
  },
  ctaBtn: {
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "14px 36px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 28px rgba(190,24,93,0.4)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },

  // Compose box
  composeBox: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "32px"
  },
  composeMeta: {
    fontSize: "12px",
    color: "#7c6a9a",
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "16px",
    background: "rgba(16,10,40,0.6)",
    border: "1.5px solid rgba(232,121,160,0.18)",
    borderRadius: "14px",
    color: "#ede8f8",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.65"
  },

  // Feed
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  postCard: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "22px 24px"
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px"
  },
  anonAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #9d174d, #be185d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px"
  },
  postAuthor: {
    fontWeight: "600",
    color: "#a89bc2",
    fontSize: "13px"
  },
  postTime: {
    fontSize: "11px",
    color: "#5b4d72",
    marginLeft: "auto"
  },
  postContent: {
    fontSize: "15px",
    lineHeight: "1.75",
    color: "#d8cff0",
    marginBottom: "14px"
  },
  postTags: {
    marginBottom: "14px"
  },
  postActions: {
    display: "flex",
    gap: "8px"
  },
  actionBtn: {
    background: "rgba(232,121,160,0.08)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "50px",
    padding: "7px 16px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif"
  },
  replyBox: {
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid rgba(232,121,160,0.18)"
  },
  replyInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1.5px solid rgba(232,121,160,0.18)",
    background: "rgba(16,10,40,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#ede8f8",
    outline: "none",
    resize: "none",
    minHeight: "72px"
  },
  cancelBtn: {
    background: "transparent",
    border: "1.5px solid rgba(192,132,200,0.35)",
    borderRadius: "50px",
    padding: "8px 20px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#c084c8",
    fontFamily: "'DM Sans', sans-serif"
  },
  replyBtn: {
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "8px 20px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif"
  },

  // Chat styles
  chatContainer: {
    maxWidth: "680px",
    margin: "0 auto"
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px",
    fontWeight: "700",
    color: "#f5eeff",
    marginBottom: "6px",
    textAlign: "center"
  },
  sectionSub: {
    fontSize: "14px",
    color: "#7c6a9a",
    marginBottom: "28px",
    textAlign: "center"
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "28px"
  },
  moodBtn: {
    padding: "18px 10px",
    borderRadius: "16px",
    border: "2px solid",
    background: "rgba(16,10,40,0.7)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "all 0.22s",
    textAlign: "center",
    fontFamily: "'DM Sans', sans-serif"
  },
  moodEmoji: {
    fontSize: "28px",
    display: "block",
    marginBottom: "6px"
  },
  moodLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#a89bc2"
  },
  moodDesc: {
    fontSize: "11px",
    color: "#5b4d72",
    marginTop: "3px"
  },
  moodPreview: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "14px 20px",
    marginBottom: 20,
    display: "flex",
    alignItems: "center"
  },
  chatStartBtn: {
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif"
  },
  chatSearching: {
    textAlign: "center",
    paddingTop: 60
  },
  loadingDots: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    justifyContent: "center"
  },
  chatBox: {
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(232,121,160,0.18)",
    background: "rgba(12,8,30,0.85)",
    backdropFilter: "blur(14px)"
  },
  chatHeader: {
    background: "rgba(190,24,93,0.07)",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid rgba(232,121,160,0.18)"
  },
  chatStatusDot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#34d399",
    flexShrink: 0
  },
  chatMoodPill: {
    fontSize: "12px",
    background: "rgba(232,121,160,0.16)",
    color: "#c084c8",
    padding: "3px 10px",
    borderRadius: "50px",
    fontWeight: "600"
  },
  chatMessages: {
    height: "340px",
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  msg: {
    maxWidth: "75%"
  },
  msgBubble: {
    padding: "10px 16px",
    borderRadius: "18px",
    fontSize: "14px",
    lineHeight: "1.55"
  },
  msgTime: {
    fontSize: "10px",
    color: "#5b4d72",
    marginTop: "3px",
    padding: "0 4px"
  },
  chatSystem: {
    textAlign: "center",
    fontSize: "12px",
    color: "#5b4d72",
    padding: "6px 16px",
    background: "rgba(232,121,160,0.07)",
    borderRadius: "50px",
    alignSelf: "center"
  },
  chatInputArea: {
    padding: "16px",
    borderTop: "1px solid rgba(232,121,160,0.18)"
  },
  chatInputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  chatInput: {
    flex: 1,
    padding: "12px 18px",
    borderRadius: "50px",
    border: "1.5px solid rgba(232,121,160,0.18)",
    background: "rgba(16,10,40,0.7)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#ede8f8",
    outline: "none"
  },
  sendBtn: {
    background: "linear-gradient(135deg, #be185d, #e879a0)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif"
  },
  chatActions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px"
  },
  chatActionBtn: {
    background: "rgba(232,121,160,0.08)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "50px",
    padding: "7px 16px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#a89bc2",
    fontFamily: "'DM Sans', sans-serif"
  },

  // Premium styles
  premiumContainer: {
    maxWidth: "1100px",
    margin: "0 auto"
  },
  premiumHero: {
    textAlign: "center",
    padding: "50px 24px 32px"
  },
  premiumBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #d97706, #f5c842)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "6px 18px",
    borderRadius: "50px",
    marginBottom: "20px"
  },
  premiumTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(30px, 5vw, 50px)",
    color: "#f5eeff",
    marginBottom: "14px"
  },
  premiumSub: {
    color: "#7c6a9a",
    fontSize: "16px",
    maxWidth: "420px",
    margin: "0 auto",
    lineHeight: "1.7"
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    margin: "32px 0"
  },
  benefitCard: {
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px",
    padding: "28px 22px",
    textAlign: "center"
  },
  benefitIcon: {
    fontSize: "40px",
    marginBottom: "14px",
    display: "inline-block"
  },
  benefitTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#ede8f8"
  },
  benefitDesc: {
    fontSize: "13px",
    color: "#7c6a9a",
    lineHeight: "1.6"
  },
  priceCard: {
    maxWidth: "380px",
    margin: "0 auto 40px",
    padding: "36px",
    textAlign: "center",
    background: "rgba(16, 10, 40, 0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "20px"
  },
  priceNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "52px",
    fontWeight: "700",
    color: "#e879a0",
    lineHeight: "1"
  },
  pricePeriod: {
    fontSize: "14px",
    color: "#7c6a9a",
    marginBottom: "24px"
  },
  upgradeBtn: {
    background: "linear-gradient(135deg, #d97706, #f5c842)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    marginBottom: "14px",
    fontFamily: "'DM Sans', sans-serif"
  },

  // Notification
  notification: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "rgba(14,8,32,0.97)",
    border: "1px solid rgba(232,121,160,0.18)",
    color: "#ede8f8",
    padding: "14px 22px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    zIndex: 9999,
    maxWidth: "280px"
  },
  notificationSuccess: {
    background: "linear-gradient(135deg, #9d174d, #be185d)"
  },
  sidebar: {
    width: "280px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    position: "sticky" as const,
    top: "84px",
    maxHeight: "calc(100vh - 104px)",
    overflowY: "auto" as const,
    alignSelf: "flex-start",
    scrollbarWidth: "none" as const
  },
  sideCard: {
    background: "rgba(16,10,40,0.68)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(232,121,160,0.18)",
    borderRadius: "18px",
    padding: "18px"
  },
  sideCardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#a89bc2",
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const
  },
  sidePost: {
    padding: "10px 12px",
    background: "rgba(232,121,160,0.04)",
    borderRadius: "10px",
    border: "1px solid rgba(232,121,160,0.10)",
    cursor: "pointer"
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: "1px solid rgba(232,121,160,0.08)"
  }
};

// Add keyframes for animation
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeInUp 0.5s ease both; }
    .fade-in-d1 { animation-delay: 0.1s; }
    .fade-in-d2 { animation-delay: 0.2s; }
    .fade-in-d3 { animation-delay: 0.3s; }
    @keyframes trayOpen {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}
    @keyframes trailFade {
      0% { opacity: 0.75; transform: scale(1) rotate(0deg); }
      100% { opacity: 0; transform: scale(0.1) rotate(120deg) translateY(18px); }
    }
    .sidebar::-webkit-scrollbar { display: none; }
    .cursor-trail-petal {
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      border-radius: 50% 0 50% 0;
      transform-origin: center;
      animation: trailFade 0.7s ease-out forwards;
    }
    #sakura-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      width: 18px;
      height: 18px;
      transform: translate(-50%, -50%);
      transition: transform 0.07s ease;
    }
    #sakura-cursor.clicked {
      transform: translate(-50%, -50%) scale(0.72) rotate(45deg);
    }
    body {
      cursor: none;
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
    }
  `;
  document.head.appendChild(styleSheet);
}
