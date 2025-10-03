import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonSpinner, IonToast, IonText, IonIcon } from "@ionic/react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import TopNav from "../components/TopNav";
import { MapPinIcon, SendIcon, Users, X } from "lucide-react";
import { sendOutline } from "ionicons/icons";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

type Message = {
  id?: number;
  group_id?: number | string;
  user_id?: number | string | null;
  author_name?: string;
  body: string;
  created_at?: string;
};

type Group = {
  id?: number | string;
  name?: string;
  about?: string;
  members?: number;
  image?: string;
};

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const location = useLocation<{ group?: Group } | any>();
  const history = useHistory();
  const [group, setGroup] = useState<Group | null>(location?.state?.group ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(!Boolean(location?.state?.group));
  const [sending, setSending] = useState(false);
  const [text, setText] = useState("");
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const author = user?.name ?? "Anonymous";
  const pollRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/groups/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Failed to load group");
      const payload = await res.json();
      setGroup(payload?.data ?? null);
    } catch (err) {
      console.warn("group load failed, continuing");
    }
    try {
      const res2 = await fetch(`${API_URL}/groups/${encodeURIComponent(id)}/messages`);
      if (!res2.ok) throw new Error("Failed to load messages");
      const p2 = await res2.json();
      setMessages(p2?.data ?? []);
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: "Unable to load messages", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // simple polling for messages
    pollRef.current = window.setInterval(() => {
      fetch(`${API_URL}/groups/${encodeURIComponent(id)}/messages`)
        .then(r => r.ok ? r.json() : null)
        .then((p: any) => { if (p?.data) setMessages(p.data); })
        .catch(() => {});
    }, 4000) as unknown as number;
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
    // eslint-disable-next-line
  }, [id]);

  // scroll to bottom whenever messages change (fast)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // small delay to ensure DOM updated
    setTimeout(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
      } catch {
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }, [messages, loading]);

  const send = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/groups/${encodeURIComponent(id)}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ body: text.trim(), author_name: author }),
      });
      console.log("Author", author);
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Send failed");
      }
      setText("");
      // reload messages (will trigger scroll)
      await load();
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? "Send failed", color: "danger" });
    } finally {
      setSending(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100" fullscreen>
        <TopNav />
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <IonText className="text-lg font-semibold text-gray-800">{group?.name ?? `Group ${id}`}</IonText>
              <p className="text-xs ml-2 flex-wrap text-gray-600">{group?.about ?? "Group chat"}</p>
            </div>
            {/* <div className="text-sm text-amber-600 flex gap-1"><Users size={16} className="" /> {group?.members ?? 0}</div> */}
          </div>

          {/* Messages */}
          <div ref={containerRef} className="bg-white rounded-lg shadow p-4 mb-4 h-[80vh] overflow-auto flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <IonSpinner name="crescent" color={"primary"} />
                <span className="ml-2">Loading messages...</span>
              </div>
            ) : (
              <div className="flex-1 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 p-6">No messages yet.</div>
                ) : (
                  messages.map(m => {
                    const isMine = (user && m.user_id !== undefined && m.user_id !== null && String(m.user_id) === String(user.id))
                      || (m.author_name && user && m.author_name === user.name);
                    return (
                      <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-1 sm:p-2 rounded border border-gray-100 max-w-[80%] ${isMine ? 'bg-green-50 text-right ml-4' : 'bg-gray-50 mr-4'}`}>
                          <div className="flex items-center justify-between text-xs sm:text-sm gap-2 sm:gap-4 text-gray-500 mb-1">
                            <div className={`${isMine ? 'font-medium text-green-600' : 'font-medium text-gray-700'}`}>
                              {isMine ? 'You' : (m.author_name ?? 'Unknown')}
                            </div>
                            <div>{m.created_at ? new Date(m.created_at).toLocaleTimeString() : ""}</div>
                          </div>
                          <div className="text-sm text-gray-800">{m.body}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
            <div className="mt-3 pt-3 border-t flex gap-2">
              <IonInput value={text} placeholder="Type a message..." onIonInput={(e: any) => setText(e.detail?.value ?? "")} />
              <IonButton fill="clear" color={"primary"} shape="round" onClick={send} disabled={sending}>
                {sending ? <IonSpinner name="crescent" /> : (<IonIcon slot="icon-only" icon={sendOutline} />)}
              </IonButton>
            </div>
          </div>
        </div>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default Chat;