import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { Link } from "react-router-dom";
import TopNav from "../../components/TopNav";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT = 12;

type Cluster = {
  id: number | string;
  name: string;
  about?: string;
  location?: string;
  members?: number;
  date_established?: string;
  chairperson?: string;
  chair_email?: string;
  chair_phone?: string;
  chair_location?: string;
  created_at?: string;
};

const ManageClusters: React.FC = () => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  const [selected, setSelected] = useState<Cluster | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<Partial<Cluster>>({});
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (query) params.set("q", query);
      const res = await fetch(`${API_URL}/admin/clusters?${params.toString()}`, {
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) throw new Error("Failed to load");
      const p = await res.json();
      setClusters(p?.data ?? []);
      setTotalPages(Math.max(1, Math.ceil((p?.total ?? 0) / LIMIT)));
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? "Load failed", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, query]);

  const openView = (c: Cluster) => { setSelected(c); setViewOpen(true); };
  const openEdit = (c?: Cluster) => {
    setForm(c ? { ...c } : {});
    setEditOpen(true);
  };

  const save = async () => {
    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id ? `${API_URL}/admin/clusters/${form.id}` : `${API_URL}/admin/clusters`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Save failed");
      }
      setToast({ show: true, msg: "Saved", color: "success" });
      setEditOpen(false);
      load();
    } catch (err: any) {
        console.error(err);
      setToast({ show: true, msg: err?.message ?? "Save failed", color: "danger" });
    }
  };

  const remove = async (id?: number | string) => {
    if (!id || !confirm("Delete cluster?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/clusters/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) throw new Error("Delete failed");
      setToast({ show: true, msg: "Deleted", color: "success" });
      load();
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? "Delete failed", color: "danger" });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNav />
        <div className="p-4 max-w-5xl mx-auto space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Manage Clusters</h2>
              <p className="text-sm text-gray-600">Create and administer cluster records.</p>
            </div>
            <div className="flex items-center gap-2">
              <IonInput placeholder="Search clusters" value={query} onIonInput={(e: any) => setQuery(e.detail?.value ?? "")} />
              <IonButton onClick={() => { setPage(1); load(); }}>Refresh</IonButton>
              <IonButton color="primary" onClick={() => openEdit()}>Create Cluster</IonButton>
            </div>
          </header>

          <div className="bg-white rounded shadow overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="text-sm sm:text-md text-gray-600">
                  <th className="px-4 py-2 text-left"></th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Members</th>
                  <th className="px-4 py-2 text-left">Established</th>
                  <th className="px-4 py-2 text-left">Chairperson</th>
                  <th className="px-4 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-6 text-center"><IonSpinner /></td></tr>
                ) : clusters.length === 0 ? (
                  <tr><td colSpan={7} className="p-6 text-center text-gray-600">No clusters found</td></tr>
                ) : clusters.map((c, i) => (
                  <tr key={c.id} className="border-b-gray-100 border-b text-gray-700 hover:bg-gray-300 hover:text-black text-xs sm:text-sm">
                    <td className="px-4 py-2">{(page - 1) * LIMIT + i + 1}</td>
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.location ?? "—"}</td>
                    <td className="px-4 py-2">{c.members ?? "—"}</td>
                    <td className="px-4 py-2">{c.date_established ? new Date(c.date_established).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-2">{c.chairperson ?? "—"}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <IonButton fill="clear" onClick={() => openView(c)}>View</IonButton>
                        <IonButton fill="clear" onClick={() => openEdit(c)}>Edit</IonButton>
                        <IonButton color="danger" fill="clear" onClick={() => remove(c.id)}>Delete</IonButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <IonButton disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</IonButton>
              <IonButton disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</IonButton>
            </div>
          </div>
        </div>

        {/* view modal */}
        <IonModal isOpen={viewOpen} onDidDismiss={() => setViewOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Cluster details</IonTitle>
              <IonButtons slot="end"><IonButton onClick={() => setViewOpen(false)}>Close</IonButton></IonButtons>
            </IonToolbar>
          </IonHeader>
          <div className="p-4">
            {selected ? (
              <>
                <h3 className="text-xl font-semibold">{selected.name}</h3>
                <p className="text-sm text-gray-700 mt-2">{selected.about ?? "—"}</p>
                <div className="mt-4 text-sm space-y-1">
                  <div><strong>Location:</strong> {selected.location ?? "—"}</div>
                  <div><strong>Members:</strong> {selected.members ?? "—"}</div>
                  <div><strong>Date established:</strong> {selected.date_established ? new Date(selected.date_established).toLocaleDateString() : "—"}</div>
                  <div><strong>Chairperson:</strong> {selected.chairperson ?? "—"}</div>
                  <div><strong>Chair email:</strong> <a href={`mailto:${selected.chair_email ?? ""}`} className="text-amber-600">{selected.chair_email ?? "—"}</a></div>
                  <div><strong>Chair phone:</strong> <a href={`tel:${selected.chair_phone ?? ""}`} className="text-amber-600">{selected.chair_phone ?? "—"}</a></div>
                  <div><strong>Chair location:</strong> {selected.chair_location ?? "—"}</div>
                </div>
              </>
            ) : <div className="text-center p-6 text-gray-600">No cluster selected.</div>}
          </div>
        </IonModal>

        {/* edit/create modal */}
        <IonModal isOpen={editOpen} onDidDismiss={() => setEditOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{form?.id ? "Edit cluster" : "Create cluster"}</IonTitle>
              <IonButtons slot="end"><IonButton onClick={() => setEditOpen(false)}>Close</IonButton></IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="p-4 space-y-3">
                <IonInput placeholder="Cluster name" value={form.name ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, name: e.detail?.value }))} />
                <IonTextarea placeholder="About the cluster" value={form.about ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, about: e.detail?.value }))} />
                <IonInput placeholder="Location" value={form.location ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, location: e.detail?.value }))} />
                <IonInput type="number" placeholder="Members" value={form.members ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, members: Number(e.detail?.value) }))} />
                <IonInput type="date" placeholder="Date established" value={form.date_established ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, date_established: e.detail?.value }))} />
                <IonInput placeholder="Chairperson" value={form.chairperson ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, chairperson: e.detail?.value }))} />
                <IonInput placeholder="Chair email" value={form.chair_email ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, chair_email: e.detail?.value }))} />
                <IonInput placeholder="Chair phone" value={form.chair_phone ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, chair_phone: e.detail?.value }))} />
                <IonInput placeholder="Chair location" value={form.chair_location ?? ""} onIonInput={(e: any) => setForm(f => ({ ...f, chair_location: e.detail?.value }))} />
                <div className="flex gap-2">
                <IonButton onClick={save} color="primary">Save</IonButton>
                <IonButton fill="clear" onClick={() => setEditOpen(false)}>Cancel</IonButton>
                </div>
            </div>
          </IonContent>
        </IonModal>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default ManageClusters;