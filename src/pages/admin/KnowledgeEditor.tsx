import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import TopNav from "../../components/TopNav";

const API_URL = import.meta.env.VITE_API_URL;

type KnowledgeItem = {
  id?: number | string;
  title?: string;
  summary?: string;
  body?: string;
  type?: string;
  tags?: string[];
  author?: string;
  source_url?: string;
  image?: string;
  published_at?: string;
};

const KnowledgeEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();

  const [form, setForm] = useState<KnowledgeItem>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/knowledge/${encodeURIComponent(id)}`, {
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const payload = await res.json();
        if (mounted) {
          setForm({
            ...payload.data,
            tags: Array.isArray(payload.data?.tags) ? payload.data.tags : (payload.data?.tags ? String(payload.data.tags).split(",") : []),
            published_at: payload.data?.published_at ? payload.data.published_at.split("T")[0] : payload.data?.published_at,
          });
        }
      } catch (err: any) {
        console.error(err);
        setToast({ show: true, msg: "Unable to load item", color: "danger" });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const handleSave = async () => {
    if (!form.title || form.title.trim() === "") {
      setToast({ show: true, msg: "Title is required", color: "danger" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: typeof form.tags === "string" ? (form.tags as any).split(",").map((t: string) => t.trim()).filter(Boolean) : form.tags,
      };
      const method = form.id || id ? "PUT" : "POST";
      const url = form.id || id ? `${API_URL}/admin/knowledge/${form.id ?? id}` : `${API_URL}/admin/knowledge`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Save failed");
      }
      setToast({ show: true, msg: "Content Updated!", color: "success" });
      history.push("/admin/knowledge");
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: err?.message ?? "Update failed", color: "danger" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="bg-gray-100">
          <TopNav />
          <div className="p-8 text-center">
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding-horizontal">
          <IonTitle>{id ? "Edit Knowledge Item" : "Create Knowledge Item"}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push("/admin/knowledge")}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <TopNav />

        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <IonInput
              placeholder="Title"
              value={form.title ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, title: e.detail?.value }))}
            />
            <IonInput
              placeholder="Type (guide, video, fact-sheet)"
              value={form.type ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, type: e.detail?.value }))}
            />
            <IonInput
              placeholder="Author"
              value={form.author ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, author: e.detail?.value }))}
            />
            <IonInput
              placeholder="Tags (comma separated)"
              value={form.tags ? (Array.isArray(form.tags) ? form.tags.join(", ") : String(form.tags)) : ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, tags: e.detail?.value }))}
            />
            <div id="quillcontainer"></div>
            <IonInput
              placeholder="Source URL"
              value={form.source_url ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, source_url: e.detail?.value }))}
            />
            <IonInput
              type="date"
              placeholder="Published at"
              value={form.published_at ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, published_at: e.detail?.value }))}
            />
            <IonInput
              placeholder="Image URL"
              value={form.image ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, image: e.detail?.value }))}
            />
            <IonInput
              placeholder="Short summary"
              value={form.summary ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, summary: e.detail?.value }))}
            />
            <IonTextarea
              placeholder="Body (HTML allowed)"
              value={form.body ?? ""}
              onIonInput={(e: any) => setForm(f => ({ ...f, body: e.detail?.value }))}
              rows={8}
            />
            <div className="flex items-center justify-end gap-2">
              <IonButton color="medium" onClick={() => history.push("/admin/knowledge")}>Cancel</IonButton>
              <IonButton color="primary" onClick={handleSave} disabled={saving}>
                {saving ? <IonSpinner name="dots" /> : id ? "Update" : "Create"}
              </IonButton>
            </div>
          </div>
        </div>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default KnowledgeEditor;