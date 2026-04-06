// // "use client";

// // import { useEffect, useState } from "react";
// // import { supabase } from "../lib/supabase";

// // type Post = {
// //   id: number;
// //   content: string;
// //   anonymous_id: string;
// //   display_name: string;
// //   created_at: string;
// // };

// // export default function Home() {
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [text, setText] = useState("");

// //   const generateName = () => {
// //     const words = [
// //       "petal",
// //       "nova",
// //       "echo",
// //       "mist",
// //       "leaf",
// //       "ember",
// //       "orbit",
// //       "luna",
// //       "river",
// //       "cloud"
// //     ];

// //     const word = words[Math.floor(Math.random() * words.length)];
// //     const number = Math.floor(100 + Math.random() * 900);

// //     return word + number;
// //   };

// //   const timeAgo = (dateString: string) => {
// //     const seconds = Math.floor(
// //       (new Date().getTime() - new Date(dateString).getTime()) / 1000
// //     );

// //     let interval = seconds / 3600;

// //     if (interval > 24) {
// //       return new Date(dateString).toLocaleString(undefined, {
// //         day: "numeric",
// //         month: "short"
// //       });
// //     }

// //     if (interval >= 1) {
// //       return Math.floor(interval) + "h ago";
// //     }

// //     interval = seconds / 60;

// //     if (interval >= 1) {
// //       return Math.floor(interval) + "m ago";
// //     }

// //     return "just now";
// //   };

// //   const loadPosts = async () => {
// //     const { data, error } = await supabase
// //       .from("posts")
// //       .select("*")
// //       .order("created_at", { ascending: false });

// //     if (error) {
// //       console.log(error);
// //       return;
// //     }

// //     if (data) {
// //       setPosts(data);
// //     }
// //   };

// //   const createPost = async () => {
// //     if (!text.trim()) return;

// //     let anonId = localStorage.getItem("anon_id");
// //     let displayName = localStorage.getItem("display_name");

// //     if (!anonId || !displayName) {
// //       // anonId = crypto.randomUUID();
// //       anonId =
// //         crypto?.randomUUID?.() || Math.random().toString(36).substring(2);
// //       displayName = generateName();

// //       localStorage.setItem("anon_id", anonId);
// //       localStorage.setItem("display_name", displayName);
// //     }

// //     const { error } = await supabase.from("posts").insert([
// //       {
// //         content: text.trim(),
// //         anonymous_id: anonId,
// //         display_name: displayName
// //       }
// //     ]);

// //     if (error) {
// //       console.log("INSERT ERROR:", error);
// //       return;
// //     }

// //     setText("");
// //     await loadPosts();
// //   };

// //   useEffect(() => {
// //     loadPosts();
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         padding: "40px",
// //         maxWidth: "600px",
// //         margin: "auto"
// //       }}
// //     >
// //       <h1>UnTale</h1>

// //       <textarea
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         placeholder="Say something anonymously..."
// //         style={{
// //           width: "100%",
// //           height: "100px",
// //           padding: "10px",
// //           marginTop: "20px"
// //         }}
// //       />

// //       <button
// //         onClick={createPost}
// //         style={{
// //           marginTop: "10px",
// //           padding: "10px",
// //           width: "100%",
// //           cursor: "pointer"
// //         }}
// //       >
// //         Post
// //       </button>

// //       <div style={{ marginTop: "40px" }}>
// //         {posts.map((p) => (
// //           <div
// //             key={p.id}
// //             style={{
// //               padding: "15px",
// //               border: "1px solid #333",
// //               marginBottom: "10px",
// //               borderRadius: "8px"
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontWeight: "bold",
// //                 color: "#888"
// //               }}
// //             >
// //               {p.display_name || "anonymous"}
// //             </div>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 gap: "8px",
// //                 alignItems: "center",
// //                 marginBottom: "8px"
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   fontSize: "14px",
// //                   color: "#aaa"
// //                 }}
// //               >
// //                 {new Date(p.created_at).toLocaleString(undefined, {
// //                   day: "numeric",
// //                   month: "short",
// //                   hour: "numeric",
// //                   minute: "2-digit"
// //                 })}
// //               </div>

// //               <div
// //                 style={{
// //                   fontSize: "11px",
// //                   color: "#666"
// //                 }}
// //               >
// //                 • {timeAgo(p.created_at)}
// //               </div>
// //             </div>

// //             <div>{p.content}</div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// type Post = {
//   id: number;
//   content: string;
//   anonymous_id: string;
//   display_name: string;
//   created_at: string;
// };

// type AuthMode = "login" | "signup";

// const WORDS = [
//   "petal",
//   "nova",
//   "echo",
//   "mist",
//   "leaf",
//   "ember",
//   "orbit",
//   "luna",
//   "river",
//   "cloud",
//   "sakura",
//   "storm",
//   "drift",
//   "haze",
//   "frost",
//   "flare",
//   "dusk",
//   "bloom",
//   "cedar",
//   "ash"
// ];

// const generateName = () => {
//   const word = WORDS[Math.floor(Math.random() * WORDS.length)];
//   const number = Math.floor(100 + Math.random() * 900);
//   return word + number;
// };

// const timeAgo = (dateString: string) => {
//   const seconds = Math.floor(
//     (new Date().getTime() - new Date(dateString).getTime()) / 1000
//   );
//   const interval = seconds / 3600;
//   if (interval > 24) {
//     return new Date(dateString).toLocaleString(undefined, {
//       day: "numeric",
//       month: "short"
//     });
//   }
//   if (interval >= 1) return Math.floor(interval) + "h ago";
//   const mins = seconds / 60;
//   if (mins >= 1) return Math.floor(mins) + "m ago";
//   return "just now";
// };

// export default function Home() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [text, setText] = useState("");
//   const [authMode, setAuthMode] = useState<AuthMode>("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [authError, setAuthError] = useState("");
//   const [authLoading, setAuthLoading] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [displayName, setDisplayName] = useState<string>("");
//   const [posting, setPosting] = useState(false);
//   const [sessionLoading, setSessionLoading] = useState(true);
//   const [successMsg, setSuccessMsg] = useState("");

//   // ── Restore session on mount ──────────────────────────────────────────────
//   useEffect(() => {
//     const init = async () => {
//       const {
//         data: { session }
//       } = await supabase.auth.getSession();
//       if (session?.user) {
//         await handleUserSession(session.user);
//       }
//       setSessionLoading(false);
//     };
//     init();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session?.user) {
//           await handleUserSession(session.user);
//         } else {
//           setUser(null);
//           setDisplayName("");
//         }
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (user) loadPosts();
//   }, [user]);

//   // ── Assign or retrieve persistent username ────────────────────────────────
//   const handleUserSession = async (authUser: any) => {
//     setUser(authUser);

//     // Check if user already has a display_name in user_metadata
//     const existingName = authUser.user_metadata?.display_name;
//     if (existingName) {
//       setDisplayName(existingName);
//       return;
//     }

//     // First time — generate a name and save it to user metadata
//     const newName = generateName();
//     const { data, error } = await supabase.auth.updateUser({
//       data: { display_name: newName }
//     });

//     if (!error && data.user) {
//       setDisplayName(newName);
//     }
//   };

//   // ── Auth actions ──────────────────────────────────────────────────────────
//   const handleAuth = async () => {
//     setAuthError("");
//     setSuccessMsg("");
//     if (!email.trim() || !password.trim()) {
//       setAuthError("Please enter email and password.");
//       return;
//     }
//     setAuthLoading(true);

//     if (authMode === "signup") {
//       const { error } = await supabase.auth.signUp({ email, password });
//       if (error) {
//         setAuthError(error.message);
//       } else {
//         setSuccessMsg(
//           "Account created! Check your email to confirm, then log in."
//         );
//         setAuthMode("login");
//       }
//     } else {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });
//       if (error) setAuthError(error.message);
//     }

//     setAuthLoading(false);
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setPosts([]);
//   };

//   // ── Posts ─────────────────────────────────────────────────────────────────
//   const loadPosts = async () => {
//     const { data, error } = await supabase
//       .from("posts")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (!error && data) setPosts(data);
//   };

//   const createPost = async () => {
//     if (!text.trim() || !user || !displayName) return;
//     setPosting(true);

//     const { error } = await supabase.from("posts").insert([
//       {
//         content: text.trim(),
//         anonymous_id: user.id,
//         display_name: displayName
//       }
//     ]);

//     if (!error) {
//       setText("");
//       await loadPosts();
//     }
//     setPosting(false);
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   if (sessionLoading) {
//     return (
//       <div style={styles.loadingWrap}>
//         <div style={styles.spinner} />
//       </div>
//     );
//   }

//   // AUTH SCREEN
//   if (!user) {
//     return (
//       <div style={styles.authPage}>
//         <div style={styles.authCard}>
//           {/* Logo */}
//           <div style={styles.logo}>UnTale</div>
//           <p style={styles.tagline}>Your voice, your alias.</p>

//           {/* Tab switcher */}
//           <div style={styles.tabRow}>
//             <button
//               style={authMode === "login" ? styles.tabActive : styles.tab}
//               onClick={() => {
//                 setAuthMode("login");
//                 setAuthError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Log In
//             </button>
//             <button
//               style={authMode === "signup" ? styles.tabActive : styles.tab}
//               onClick={() => {
//                 setAuthMode("signup");
//                 setAuthError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Inputs */}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleAuth()}
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleAuth()}
//             style={styles.input}
//           />

//           {authError && <p style={styles.errorText}>{authError}</p>}
//           {successMsg && <p style={styles.successText}>{successMsg}</p>}

//           <button
//             onClick={handleAuth}
//             disabled={authLoading}
//             style={styles.primaryBtn}
//           >
//             {authLoading
//               ? "Please wait…"
//               : authMode === "login"
//                 ? "Log In"
//                 : "Create Account"}
//           </button>

//           {authMode === "signup" && (
//             <p style={styles.noteText}>
//               🎲 You'll be assigned a random alias like <em>petal482</em> —
//               yours forever.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // MAIN APP (logged in)
//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <span style={styles.headerLogo}>UnTale</span>
//         <div style={styles.headerRight}>
//           <span style={styles.headerName}>👤 {displayName}</span>
//           <button onClick={handleLogout} style={styles.logoutBtn}>
//             Log Out
//           </button>
//         </div>
//       </div>

//       {/* Compose */}
//       <div style={styles.composeBox}>
//         <div style={styles.composeMeta}>
//           Posting as <strong>{displayName}</strong>
//         </div>
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="What's on your mind?"
//           style={styles.textarea}
//         />
//         <button
//           onClick={createPost}
//           disabled={posting || !text.trim()}
//           style={{
//             ...styles.primaryBtn,
//             opacity: posting || !text.trim() ? 0.5 : 1,
//             marginTop: "10px"
//           }}
//         >
//           {posting ? "Posting…" : "Post"}
//         </button>
//       </div>

//       {/* Feed */}
//       <div style={styles.feed}>
//         {posts.length === 0 && (
//           <p style={{ color: "#666", textAlign: "center", marginTop: "40px" }}>
//             No posts yet. Be the first.
//           </p>
//         )}
//         {posts.map((p) => (
//           <div key={p.id} style={styles.postCard}>
//             <div style={styles.postAuthor}>{p.display_name || "anonymous"}</div>
//             <div style={styles.postMeta}>
//               {new Date(p.created_at).toLocaleString(undefined, {
//                 day: "numeric",
//                 month: "short",
//                 hour: "numeric",
//                 minute: "2-digit"
//               })}
//               <span style={styles.dot}>•</span>
//               {timeAgo(p.created_at)}
//             </div>
//             <div style={styles.postContent}>{p.content}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── Styles ──────────────────────────────────────────────────────────────────
// const styles: Record<string, React.CSSProperties> = {
//   // Loading
//   loadingWrap: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     background: "#0d0d0d"
//   },
//   spinner: {
//     width: 32,
//     height: 32,
//     border: "3px solid #333",
//     borderTop: "3px solid #e0e0e0",
//     borderRadius: "50%",
//     animation: "spin 0.8s linear infinite"
//   },

//   // Auth page
//   authPage: {
//     minHeight: "100vh",
//     background: "#0d0d0d",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "'Georgia', serif"
//   },
//   authCard: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: "16px",
//     padding: "48px 40px",
//     width: "100%",
//     maxWidth: "420px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px"
//   },
//   logo: {
//     fontSize: "32px",
//     fontWeight: "700",
//     color: "#f0f0f0",
//     letterSpacing: "-1px",
//     textAlign: "center",
//     marginBottom: "4px"
//   },
//   tagline: {
//     textAlign: "center",
//     color: "#666",
//     fontSize: "14px",
//     margin: "0 0 8px"
//   },
//   tabRow: {
//     display: "flex",
//     gap: "8px",
//     marginBottom: "4px"
//   },
//   tab: {
//     flex: 1,
//     padding: "10px",
//     background: "transparent",
//     border: "1px solid #2a2a2a",
//     borderRadius: "8px",
//     color: "#666",
//     cursor: "pointer",
//     fontSize: "14px"
//   },
//   tabActive: {
//     flex: 1,
//     padding: "10px",
//     background: "#1e1e1e",
//     border: "1px solid #444",
//     borderRadius: "8px",
//     color: "#f0f0f0",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "600"
//   },
//   input: {
//     padding: "12px 14px",
//     background: "#111",
//     border: "1px solid #2a2a2a",
//     borderRadius: "8px",
//     color: "#f0f0f0",
//     fontSize: "15px",
//     outline: "none",
//     width: "100%",
//     boxSizing: "border-box"
//   },
//   primaryBtn: {
//     padding: "13px",
//     background: "#f0f0f0",
//     color: "#0d0d0d",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "700",
//     fontSize: "15px",
//     cursor: "pointer",
//     width: "100%",
//     transition: "opacity 0.2s"
//   },
//   errorText: { color: "#ff6b6b", fontSize: "13px", margin: "0" },
//   successText: { color: "#6bffb8", fontSize: "13px", margin: "0" },
//   noteText: {
//     color: "#666",
//     fontSize: "12px",
//     textAlign: "center",
//     margin: "4px 0 0",
//     lineHeight: "1.5"
//   },

//   // Main app
//   page: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     padding: "0 16px 60px",
//     fontFamily: "'Georgia', serif",
//     background: "#0d0d0d",
//     minHeight: "100vh",
//     color: "#e0e0e0"
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "24px 0 20px",
//     borderBottom: "1px solid #1e1e1e",
//     marginBottom: "28px"
//   },
//   headerLogo: {
//     fontSize: "22px",
//     fontWeight: "700",
//     color: "#f0f0f0",
//     letterSpacing: "-0.5px"
//   },
//   headerRight: { display: "flex", alignItems: "center", gap: "12px" },
//   headerName: { fontSize: "13px", color: "#888" },
//   logoutBtn: {
//     padding: "6px 14px",
//     background: "transparent",
//     border: "1px solid #2a2a2a",
//     borderRadius: "6px",
//     color: "#888",
//     cursor: "pointer",
//     fontSize: "13px"
//   },

//   composeBox: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: "12px",
//     padding: "20px",
//     marginBottom: "32px"
//   },
//   composeMeta: { fontSize: "12px", color: "#666", marginBottom: "10px" },
//   textarea: {
//     width: "100%",
//     minHeight: "90px",
//     padding: "12px",
//     background: "#111",
//     border: "1px solid #2a2a2a",
//     borderRadius: "8px",
//     color: "#e0e0e0",
//     fontSize: "15px",
//     resize: "vertical",
//     outline: "none",
//     boxSizing: "border-box",
//     fontFamily: "inherit"
//   },

//   feed: { display: "flex", flexDirection: "column", gap: "12px" },
//   postCard: {
//     background: "#161616",
//     border: "1px solid #222",
//     borderRadius: "12px",
//     padding: "18px 20px"
//   },
//   postAuthor: {
//     fontWeight: "700",
//     color: "#aaa",
//     fontSize: "13px",
//     marginBottom: "4px"
//   },
//   postMeta: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     fontSize: "12px",
//     color: "#555",
//     marginBottom: "10px"
//   },
//   dot: { color: "#444" },
//   postContent: { fontSize: "15px", lineHeight: "1.65", color: "#ddd" }
// };
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

type AuthMode = "login" | "signup";

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

export default function Home() {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [posting, setPosting] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [showReplyId, setShowReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
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
    "home" | "feed" | "chat" | "premium"
  >("home");
  const [chatPhase, setChatPhase] = useState<"pick" | "searching" | "chat">(
    "pick"
  );
  const [myMood, setMyMood] = useState<string | null>(null);
  const [matchedMood, setMatchedMood] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

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
  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setPosts(data);
      // Initialize likes from localStorage
      const savedLikes = localStorage.getItem("liked_posts");
      if (savedLikes) {
        setLikedPosts(new Set(JSON.parse(savedLikes)));
      }
      const savedReports = localStorage.getItem("reported_posts");
      if (savedReports) {
        setReportedPosts(new Set(JSON.parse(savedReports)));
      }
      // Initialize like counts
      const likesMap = new Map();
      data.forEach((post) => {
        const savedLikesCount = localStorage.getItem(`likes_${post.id}`);
        likesMap.set(
          post.id,
          savedLikesCount
            ? parseInt(savedLikesCount)
            : Math.floor(Math.random() * 50) + 10
        );
      });
      setLikesCount(likesMap);
    }
  };

  // Create a new post - FIXED VERSION
  const createPost = async () => {
    if (!text.trim()) {
      showNotification("Write something first 🌸");
      return;
    }

    if (!user) {
      showNotification("Please log in first");
      return;
    }

    setPosting(true);

    const { error } = await supabase.from("posts").insert([
      {
        content: text.trim(),
        anonymous_id: user.id,
        display_name: displayName
      }
    ]);

    if (error) {
      console.log("INSERT ERROR:", error);
      showNotification("Something went wrong. Try again.");
    } else {
      setText("");
      await loadPosts();
      showNotification("Your story is now a star in the night 🌟", "success");
    }

    setPosting(false);
  };

  // Handle user session
  const handleUserSession = async (authUser: any) => {
    setUser(authUser);

    const existingName = authUser.user_metadata?.display_name;
    if (existingName) {
      setDisplayName(existingName);
      return;
    }

    const newName = generateName();
    const { error } = await supabase.auth.updateUser({
      data: { display_name: newName }
    });

    if (!error) {
      setDisplayName(newName);
    }
  };

  // Auth functions
  const handleAuth = async () => {
    setAuthError("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter email and password.");
      return;
    }

    setAuthLoading(true);

    if (authMode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccessMsg(
          "Account created! Check your email to confirm, then log in."
        );
        setAuthMode("login");
        setEmail("");
        setPassword("");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        setAuthError(error.message);
      } else {
        showNotification("✨ Welcome back! 🌙", "success");
      }
    }

    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPosts([]);
    setDisplayName("");
    setCurrentPage("home");
    showNotification("Signed out 🌙");
  };

  // Post interactions
  const handleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    const newLikesCount = new Map(likesCount);

    if (newLiked.has(postId)) {
      newLiked.delete(postId);
      newLikesCount.set(postId, (newLikesCount.get(postId) || 0) - 1);
    } else {
      newLiked.add(postId);
      newLikesCount.set(postId, (newLikesCount.get(postId) || 0) + 1);
    }

    setLikedPosts(newLiked);
    setLikesCount(newLikesCount);
    localStorage.setItem("liked_posts", JSON.stringify(Array.from(newLiked)));
    localStorage.setItem(
      `likes_${postId}`,
      newLikesCount.get(postId)?.toString() || "0"
    );
  };

  const handleReport = (postId: number) => {
    if (reportedPosts.has(postId)) return;
    const newReported = new Set(reportedPosts);
    newReported.add(postId);
    setReportedPosts(newReported);
    localStorage.setItem(
      "reported_posts",
      JSON.stringify(Array.from(newReported))
    );
    showNotification("Post reported anonymously.");
  };

  const handleReply = async (postId: number) => {
    if (!replyText.trim()) {
      showNotification("Write something first 🌸");
      return;
    }

    setReplySubmitting(true);
    setTimeout(() => {
      setReplyText("");
      setShowReplyId(null);
      setReplySubmitting(false);
      showNotification("Reply posted 🌸", "success");
    }, 900);
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

  // Restore session on mount
  useEffect(() => {
    const init = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session?.user) {
        await handleUserSession(session.user);
        await loadPosts();
      }
      setSessionLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await handleUserSession(session.user);
          await loadPosts();
        } else {
          setUser(null);
          setDisplayName("");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (sessionLoading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.spinner} />
      </div>
    );
  }

  // Auth Screen
  if (!user) {
    return (
      <div style={styles.authPage}>
        <div style={styles.authCard}>
          <div style={styles.logo}>UnTale</div>
          <p style={styles.tagline}>Tell what remains untold.</p>

          <div style={styles.tabRow}>
            <button
              style={authMode === "login" ? styles.tabActive : styles.tab}
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
                setSuccessMsg("");
              }}
            >
              Log In
            </button>
            <button
              style={authMode === "signup" ? styles.tabActive : styles.tab}
              onClick={() => {
                setAuthMode("signup");
                setAuthError("");
                setSuccessMsg("");
              }}
            >
              Sign Up
            </button>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            style={styles.input}
          />

          {authError && <p style={styles.errorText}>{authError}</p>}
          {successMsg && <p style={styles.successText}>{successMsg}</p>}

          <button
            onClick={handleAuth}
            disabled={authLoading}
            style={styles.primaryBtn}
          >
            {authLoading
              ? "Please wait…"
              : authMode === "login"
                ? "Log In"
                : "Create Account"}
          </button>

          {authMode === "signup" && (
            <p style={styles.noteText}>
              🎲 You'll be assigned a random alias like <em>petal482</em> —
              yours forever.
            </p>
          )}
        </div>
      </div>
    );
  }

  // HOME PAGE COMPONENT
  const renderHome = () => (
    <div>
      <div style={styles.hero}>
        <div style={styles.heroLogo}>🌸</div>
        <h1 style={styles.heroTitle}>
          Tell what remains
          <br />
          <em style={{ color: "#e879a0", fontStyle: "italic" }}>untold.</em>
        </h1>
        <p style={styles.heroSubtitle}>
          An anonymous space to share your truest thoughts, find comfort in
          strangers, and be wholly, unguardedly yourself.
        </p>
        <div style={styles.heroButtons}>
          <button
            style={styles.btnPrimary}
            onClick={() => setCurrentPage("feed")}
          >
            ✍️ Start Posting
          </button>
          <button
            style={styles.btnGhost}
            onClick={() => setCurrentPage("chat")}
          >
            💬 Talk to Someone
          </button>
        </div>
        <div style={styles.heroStats}>
          <div style={styles.stat}>
            <div style={styles.statNum}>24K+</div>
            <div style={styles.statLabel}>Anonymous voices</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>138K</div>
            <div style={styles.statLabel}>Stories shared</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>∞</div>
            <div style={styles.statLabel}>Judgment-free</div>
          </div>
        </div>
      </div>
      <div style={styles.featuresGrid}>
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
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Feed View
  const renderFeed = () => (
    <>
      <div style={styles.composeBox}>
        <div style={styles.composeMeta}>
          Posting as <strong>{displayName}</strong>
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
            fontSize: 12,
            color: "#5b4d72",
            textAlign: "right",
            marginTop: 4
          }}
        >
          {text.length}/600
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
            style={{ color: "#7c6a9a", textAlign: "center", marginTop: "40px" }}
          >
            No posts yet. Be the first.
          </p>
        )}
        {posts.map((p) => (
          <div key={p.id} style={styles.postCard}>
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
            <div style={styles.postActions}>
              <button
                style={{
                  ...styles.actionBtn,
                  color: likedPosts.has(p.id) ? "#e879a0" : "#a89bc2"
                }}
                onClick={() => handleLike(p.id)}
              >
                ❤️ {likesCount.get(p.id) || 0}
              </button>
              <button
                style={styles.actionBtn}
                onClick={() =>
                  setShowReplyId(showReplyId === p.id ? null : p.id)
                }
              >
                💬 {Math.floor(Math.random() * 30) + 5}
              </button>
              <button
                style={{
                  ...styles.actionBtn,
                  color: reportedPosts.has(p.id) ? "#e879a0" : "#a89bc2"
                }}
                onClick={() => handleReport(p.id)}
                disabled={reportedPosts.has(p.id)}
              >
                ⚠️ {reportedPosts.has(p.id) ? "Reported" : "Report"}
              </button>
            </div>
            {showReplyId === p.id && (
              <div style={styles.replyBox}>
                <textarea
                  style={styles.replyInput}
                  placeholder="Write an anonymous reply… be kind 🌸"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
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
                    onClick={() => setShowReplyId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    style={styles.replyBtn}
                    onClick={() => handleReply(p.id)}
                    disabled={replySubmitting}
                  >
                    {replySubmitting ? "..." : "🌸 Reply"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
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
              ...(currentPage === "chat" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("chat")}
          >
            Chat
          </button>
          <button
            style={{
              ...styles.navLink,
              ...styles.navPremium,
              ...(currentPage === "premium" ? styles.navLinkActive : {})
            }}
            onClick={() => setCurrentPage("premium")}
          >
            💎 Premium
          </button>
          <div style={styles.userSection}>
            <div style={styles.userAvatar}>🌸</div>
            <span style={styles.userName}>{displayName}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Sign out
            </button>
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
              setCurrentPage("chat");
              setMobileMenuOpen(false);
            }}
          >
            Chat
          </button>
          <button
            style={styles.mobileLink}
            onClick={() => {
              setCurrentPage("premium");
              setMobileMenuOpen(false);
            }}
          >
            Premium
          </button>
          <button style={styles.mobileLink} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      )}

      {/* Page Content */}
      <div style={styles.pageContent}>
        {currentPage === "home" && renderHome()}
        {currentPage === "feed" && renderFeed()}
        {currentPage === "chat" && renderChat()}
        {currentPage === "premium" && renderPremium()}
      </div>

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
    boxShadow: "0 4px 18px rgba(190,24,93,0.38)"
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
    cursor: "pointer"
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
    
    @keyframes trailFade {
      0% { opacity: 0.75; transform: scale(1) rotate(0deg); }
      100% { opacity: 0; transform: scale(0.1) rotate(120deg) translateY(18px); }
    }
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
