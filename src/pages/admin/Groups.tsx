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
  IonSpinner,
  IonToast,
  IonToggle,
  IonText,
} from "@ionic/react";
import { Trash2, Edit, Plus, RefreshCcwDot, Users2Icon, X } from "lucide-react";
import TopNav from "../../components/TopNav";

type Group = {
  id?: number | string;
  name?: string;
  about?: string;
  image?: string;
  is_public?: boolean;
  members?: number;
  created_at?: string;
};

const API_URL = import.meta.env.VITE_API_URL;

const ManageGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Group | null>(null);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/groups`);
      if (!res.ok) throw new Error("Failed to load groups");
      const payload = await res.json();
      setGroups(payload?.data ?? []);
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: "Unable to load groups", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const openCreate = () => {
    setSelected({ name: "", about: "", image: "", is_public: true });
    setModalOpen(true);
  };

  const openEdit = (g: Group) => {
    setSelected({ ...g });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selected || !selected.name || selected.name.trim() === "") {
      setToast({ show: true, msg: "Name is required", color: "danger" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: selected.name,
        about: selected.about ?? null,
        image: selected.image ?? null,
        is_public: selected.is_public !== false,
      };
      const method = selected.id ? "PUT" : "POST";
      const url = selected.id ? `${API_URL}/admin/groups/${selected.id}` : `${API_URL}/admin/groups`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });
      console.log(res);
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Save failed");
      }
      setToast({ show: true, msg: "Saved", color: "success" });
      setModalOpen(false);
      setSelected(null);
      await load();
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: err?.message.message ?? "Save failed", color: "danger" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: number | string) => {
    if (!id || !confirm("Delete group?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/groups/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) throw new Error("Delete failed");
      setToast({ show: true, msg: "Deleted", color: "success" });
      await load();
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: err?.message.message ?? "Delete failed", color: "danger" });
    }
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <TopNav />
        <div className="max-w-6xl mx-auto p-4">
          <header className="flex items-center justify-between mb-4">
            <div>
              <IonText className="text-lg sm:text-2xl font-semibold text-gray-800">Manage Groups</IonText>
              <p className="text-sm text-gray-600">Create, edit and remove communication groups (admin only).</p>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-2">
              <IonButton color="primary" size="small" shape="round" onClick={openCreate}><Plus className="" />Create Group</IonButton>
              <IonButton fill="clear" onClick={load}><RefreshCcwDot size={20} /></IonButton>
            </div>
          </header>

          <section className="bg-white rounded-lg shadow p-4">
            {loading ? (
              <div className="p-8 text-center"><IonSpinner /></div>
            ) : groups.length === 0 ? (
              <div className="p-6 text-center text-gray-600">No groups found.</div>
            ) : (
              <div className="divide-y">
                {groups.map((g) => (
                  <div key={g.id} className="smpy-3 flex items-center justify-between flex-wrap">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center">
                          <Users2Icon size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{g.name}</div>
                          <div className="text-xs text-gray-500">{g.about ?? ""}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500 mr-4">{g.members ?? 0} members</div>
                      <IonButton shape="round" fill="clear" onClick={() => openEdit(g)}><Edit size={20} /></IonButton>
                      <IonButton shape="round" color="danger" fill="clear" onClick={() => handleDelete(g.id)}><Trash2 size={20} /></IonButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <IonModal isOpen={modalOpen} onDidDismiss={() => { setModalOpen(false); setSelected(null); }}>
          <IonHeader>
            <IonToolbar className="bg-gradient-to-r px-2">
              <IonTitle>{selected?.id ? "Edit Group" : "Create Group"}</IonTitle>
              <IonButtons slot="end"><IonButton fill="clear" onClick={() => { setModalOpen(false); setSelected(null); }}><X /></IonButton></IonButtons>
            </IonToolbar>
          </IonHeader>
            <IonContent>
                <div className="p-4 bg-white">
                    {selected ? (
                    <div className="space-y-3">
                        <IonInput placeholder="Group name" value={selected.name ?? ""} onIonInput={(e: any) => setSelected(s => ({ ...(s ?? {}), name: e.detail?.value }))} />
                        <IonInput placeholder="Short about" value={selected.about ?? ""} onIonInput={(e: any) => setSelected(s => ({ ...(s ?? {}), about: e.detail?.value }))} />
                        <IonInput placeholder="Image URL" value={selected.image ?? ""} onIonInput={(e: any) => setSelected(s => ({ ...(s ?? {}), image: e.detail?.value }))} />
                        <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-700">Public</div>
                        <IonToggle checked={selected.is_public !== false} onIonChange={(e: any) => setSelected(s => ({ ...(s ?? {}), is_public: !!e.detail?.checked }))} />
                        </div>

                        <div className="flex items-center justify-end gap-2">
                        <IonButton shape="round" color="primary" onClick={handleSave} disabled={saving}>
                            {saving ? <IonSpinner /> : (selected.id ? "Update" : "Create")}
                        </IonButton>
                        </div>
                    </div>
                    ) : (
                    <div className="p-6 text-center flex flex-col">
                        <IonSpinner color={"primary"} />
                        <p>Updating Group...</p>
                    </div>
                    )}
                </div>

            </IonContent>
        </IonModal>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default ManageGroups;