"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const ADMIN_PASSWORD = "Jenny@614113";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [replies, setReplies] = useState<{ [postId: number]: any[] }>({});
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "reported">("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [reportCounts, setReportCounts] = useState<{ [id: number]: number }>(
    {}
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    setActiveFilter("all");
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setPosts(data);
      await loadReportCounts(data.map((p: any) => p.id));
    }
    setLoading(false);
  };

  const loadReported = async () => {
    setLoading(true);
    setActiveFilter("reported");
    const { data: reportData } = await supabase
      .from("reports")
      .select("post_id");
    if (!reportData || reportData.length === 0) {
      setPosts([]);
      setLoading(false);
      return;
    }
    const ids = [...new Set(reportData.map((r: any) => r.post_id))];
    const { data } = await supabase
      .from("posts")
      .select("*")
      .in("id", ids)
      .order("created_at", { ascending: false });
    if (data) {
      setPosts(data);
      await loadReportCounts(ids as number[]);
    }
    setLoading(false);
  };

  const loadReportCounts = async (postIds: number[]) => {
    const { data } = await supabase
      .from("reports")
      .select("post_id")
      .in("post_id", postIds);
    if (data) {
      const counts: { [id: number]: number } = {};
      data.forEach((r: any) => {
        counts[r.post_id] = (counts[r.post_id] || 0) + 1;
      });
      setReportCounts(counts);
    }
  };

  const loadRepliesForPost = async (postId: number) => {
    if (replies[postId]) {
      setExpandedPost(expandedPost === postId ? null : postId);
      return;
    }
    const { data } = await supabase
      .from("replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (data) {
      setReplies((prev) => ({ ...prev, [postId]: data }));
    }
    setExpandedPost(postId);
  };

  const deletePost = async (id: number) => {
    if (!confirm("Delete this post and all its data?")) return;
    await Promise.all([
      supabase.from("replies").delete().eq("post_id", id),
      supabase.from("likes").delete().eq("post_id", id),
      supabase.from("notifications").delete().eq("post_id", id),
      supabase.from("reports").delete().eq("post_id", id)
    ]);
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast("Post deleted.");
  };

  const deleteReply = async (replyId: number, postId: number) => {
    await supabase.from("replies").delete().eq("id", replyId);
    setReplies((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((r) => r.id !== replyId)
    }));
    showToast("Reply deleted.");
  };

  const clearReports = async (postId: number) => {
    await supabase.from("reports").delete().eq("post_id", postId);
    setReportCounts((prev) => ({ ...prev, [postId]: 0 }));
    showToast("Reports cleared.");
  };

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #0d0b1e 0%, #16103a 40%, #1a0e32 70%, #0c0820 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        <div
          style={{
            background: "rgba(16,10,40,0.8)",
            border: "1px solid rgba(232,121,160,0.2)",
            borderRadius: "20px",
            padding: "48px 40px",
            width: "100%",
            maxWidth: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              color: "#e879a0",
              textAlign: "center",
              marginBottom: "8px"
            }}
          >
            🌸 Admin
          </div>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setPwError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            style={{
              padding: "12px 16px",
              background: "rgba(16,10,40,0.6)",
              border: `1.5px solid ${pwError ? "#f87171" : "rgba(232,121,160,0.2)"}`,
              borderRadius: "50px",
              color: "#ede8f8",
              fontSize: "14px",
              outline: "none",
              fontFamily: "'DM Sans', sans-serif"
            }}
          />
          {pwError && (
            <p
              style={{
                color: "#f87171",
                fontSize: "13px",
                margin: 0,
                textAlign: "center"
              }}
            >
              Incorrect password
            </p>
          )}
          <button
            onClick={handleLogin}
            style={{
              padding: "12px",
              background: "linear-gradient(135deg, #be185d, #e879a0)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // ── ADMIN DASHBOARD ───────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #0d0b1e 0%, #16103a 40%, #1a0e32 70%, #0c0820 100%)",
        color: "#ede8f8",
        fontFamily: "'DM Sans', sans-serif",
        padding: "32px 24px"
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                color: "#e879a0",
                margin: 0
              }}
            >
              🌸 UnTale Admin
            </h1>
            <p
              style={{ color: "#5b4d72", fontSize: "13px", margin: "4px 0 0" }}
            >
              Full control panel
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={loadAll}
              style={{
                ...btnStyle,
                background:
                  activeFilter === "all"
                    ? "linear-gradient(135deg, #be185d, #e879a0)"
                    : "rgba(232,121,160,0.1)",
                color: activeFilter === "all" ? "#fff" : "#e879a0"
              }}
            >
              📋 All Posts
            </button>
            <button
              onClick={loadReported}
              style={{
                ...btnStyle,
                background:
                  activeFilter === "reported"
                    ? "linear-gradient(135deg, #b45309, #f59e0b)"
                    : "rgba(245,158,11,0.1)",
                color: activeFilter === "reported" ? "#fff" : "#f59e0b"
              }}
            >
              🚩 Reported
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap"
          }}
        >
          {[
            { label: "Posts loaded", value: posts.length },
            {
              label: "Total reports",
              value: Object.values(reportCounts).reduce((a, b) => a + b, 0)
            }
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(16,10,40,0.6)",
                border: "1px solid rgba(232,121,160,0.15)",
                borderRadius: "12px",
                padding: "12px 20px",
                flex: 1,
                minWidth: "120px"
              }}
            >
              <div
                style={{ fontSize: "22px", fontWeight: 700, color: "#e879a0" }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "12px", color: "#5b4d72" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p
            style={{ color: "#7c6a9a", textAlign: "center", padding: "40px 0" }}
          >
            Loading…
          </p>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <p
            style={{ color: "#5b4d72", textAlign: "center", padding: "60px 0" }}
          >
            {activeFilter === "reported"
              ? "No reported posts 🌸"
              : "Click a button above to load posts."}
          </p>
        )}

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {posts.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(16,10,40,0.7)",
                border: `1px solid ${
                  reportCounts[p.id]
                    ? "rgba(245,158,11,0.35)"
                    : "rgba(232,121,160,0.15)"
                }`,
                borderRadius: "16px",
                padding: "20px"
              }}
            >
              {/* Post meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  flexWrap: "wrap"
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#e879a0"
                  }}
                >
                  🌸 {p.display_name}
                </span>
                <span style={{ fontSize: "11px", color: "#5b4d72" }}>
                  {new Date(p.created_at).toLocaleString()}
                </span>
                <span style={{ fontSize: "11px", color: "#5b4d72" }}>
                  ID: {p.id}
                </span>
                {reportCounts[p.id] > 0 && (
                  <span
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.4)",
                      color: "#f59e0b",
                      fontSize: "11px",
                      fontWeight: 700,
                      borderRadius: "50px",
                      padding: "2px 10px"
                    }}
                  >
                    🚩 {reportCounts[p.id]} report
                    {reportCounts[p.id] > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  fontSize: "14px",
                  color: "#d8cff0",
                  lineHeight: "1.7",
                  marginBottom: "14px",
                  whiteSpace: "pre-wrap"
                }}
              >
                {p.content}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  onClick={() => loadRepliesForPost(p.id)}
                  style={{
                    ...smallBtn,
                    color: "#60a5fa",
                    borderColor: "rgba(96,165,250,0.3)"
                  }}
                >
                  💬 {expandedPost === p.id ? "Hide" : "View"} Replies
                </button>
                {reportCounts[p.id] > 0 && (
                  <button
                    onClick={() => clearReports(p.id)}
                    style={{
                      ...smallBtn,
                      color: "#f59e0b",
                      borderColor: "rgba(245,158,11,0.3)"
                    }}
                  >
                    ✅ Clear Reports
                  </button>
                )}
                <button
                  onClick={() => deletePost(p.id)}
                  style={{
                    ...smallBtn,
                    color: "#f87171",
                    borderColor: "rgba(248,113,113,0.3)"
                  }}
                >
                  🗑️ Delete Post
                </button>
              </div>

              {/* Replies */}
              {expandedPost === p.id && (
                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(232,121,160,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  {!replies[p.id] || replies[p.id].length === 0 ? (
                    <p style={{ fontSize: "13px", color: "#5b4d72" }}>
                      No replies.
                    </p>
                  ) : (
                    replies[p.id].map((r) => (
                      <div
                        key={r.id}
                        style={{
                          background: "rgba(232,121,160,0.05)",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px"
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#a89bc2",
                              fontWeight: 600,
                              marginBottom: "4px"
                            }}
                          >
                            🌸 {r.display_name} ·{" "}
                            {new Date(r.created_at).toLocaleString()}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#d8cff0",
                              lineHeight: "1.6"
                            }}
                          >
                            {r.content}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteReply(r.id, p.id)}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(248,113,113,0.3)",
                            borderRadius: "8px",
                            color: "#f87171",
                            fontSize: "12px",
                            cursor: "pointer",
                            padding: "4px 10px",
                            flexShrink: 0,
                            fontFamily: "'DM Sans', sans-serif"
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "linear-gradient(135deg, #9d174d, #be185d)",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            zIndex: 9999,
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

// Shared button styles
const btnStyle: React.CSSProperties = {
  padding: "9px 18px",
  border: "none",
  borderRadius: "50px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  transition: "all 0.2s"
};

const smallBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  padding: "6px 12px",
  fontFamily: "'DM Sans', sans-serif"
};
