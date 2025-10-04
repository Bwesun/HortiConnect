import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonToast,
  IonText,
} from "@ionic/react";
import {
  BookOpenIcon,
  SearchIcon,
  ArrowRightIcon,
  Link as LinkIcon,
  PlusIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import TopNav from "../components/TopNav";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT = 8;

type KnowledgeItem = {
  id: number | string;
  title: string;
  summary?: string;
  body?: string;
  type?: string;
  tags?: string[];
  author?: string;
  source_url?: string;
  image?: string;
  published_at?: string;
  created_at?: string;
};

const KnowledgeHub: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<KnowledgeItem | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });
  const { user } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (q) params.set("q", q);
      const res = await fetch(`${API_URL}/knowledge?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load knowledge items");
      const payload = await res.json();
      setItems(payload?.data ?? []);
      setTotalPages(Math.max(1, Math.ceil((payload?.total ?? 0) / LIMIT)));
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: err?.message.message ?? "Load failed", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [page]);

  const openView = (it: KnowledgeItem) => {
    setSelected(it);
    setViewOpen(true);
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <TopNav />

        <div className="max-w-6xl mx-auto p-2 sm:p-4">
          <header className="flex items-center justify-between flex-wrap mb-4">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpenIcon /> <IonText color={"primary"}>Knowledge Hub</IonText>
              </p>
              <p className="text-sm text-gray-600">Guides, trainings and resources for agribusiness clusters.</p>
            </div>

            <div className="flex items-center gap-2">
              <IonInput
                placeholder="Search resources"
                value={q}
                onIonInput={(e: any) => setQ(e.detail?.value ?? "")}
                className="bg-white rounded border-b border-gray-300 px-2 py-1 hidden sm:block"
                style={{ width: 260 }}
              />
              <IonButton fill="clear" onClick={() => { setPage(1); load(); }}>
                <SearchIcon className="rounded-full" />
              </IonButton>
              {user?.role === "admin" ? (
                <IonButton routerLink="/admin/knowledge/create" color="primary" fill="clear"><PlusIcon className="mr-1" /> Add</IonButton>
              ) : null}
            </div>
          </header>
              
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full p-6 text-center">
                <IonSpinner name="crescent" color={"secondary"} />
                <p className="text-sm text-gray-600 mt-1">Searching resources...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="col-span-full p-6 text-center text-gray-600">No resources found.</div>
            ) : (
              items.map((it) => (
                <article key={it.id} className="bg-white rounded-lg shadow p-2 sm:p-4 hover:shadow-lg">
                  {it.image ? <img src={it.image} alt={it.title} className="w-full h-36 object-cover rounded" /> : null}
                  <h2 className="mt-3 text-lg font-semibold text-gray-800">{it.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{it.summary ?? it.body?.slice(0, 180)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500 bg-amber-400 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">{it.type ?? "Article"}</div>
                    <div className="flex gap-2">
                      <IonButton fill="clear" onClick={() => openView(it)}>View</IonButton>
                      {it.source_url ? (
                        <a href={it.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-amber-600">
                          <LinkIcon size={14} className="mr-1 sm:mr-2 text-amber-600" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <IonButton fill="outline" shape="round" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={20} /></IonButton>
              <IonButton fill="outline" shape="round" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={20} /></IonButton>
            </div>
          </div>
        </div>

        <IonModal isOpen={viewOpen} onDidDismiss={() => setViewOpen(false)}>
          <IonContent>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <IonTitle className="text-lg" color={"primary"}>{selected?.title}</IonTitle>
                <IonButton color={"danger"} fill="clear" onClick={() => setViewOpen(false)}>Close</IonButton>
              </div>
              {selected ? (
                <>
                  {selected.image ? <img src={selected.image} className="w-full h-48 object-cover rounded mb-3" alt={selected.title} /> : null}
                  <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: selected.body ?? selected.summary ?? "" }} />
                  <div className="mt-4 text-xs text-gray-500">
                    <div>Type: {selected.type ?? "Article"}</div>
                    <div>Author: {selected.author ?? "—"}</div>
                    <div>Published: {selected.published_at ? new Date(selected.published_at).toLocaleDateString() : "—"}</div>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-gray-600">No item selected.</div>
              )}
            </div>
          </IonContent>
        </IonModal>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default KnowledgeHub;