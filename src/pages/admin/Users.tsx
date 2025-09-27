import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import TopNav from "../../components/TopNav";
import { Edit, Trash2Icon, RefreshCcwIcon, X, Eye } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
const LIMIT = 15;

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  address?: string;
  created_at?: string;
};

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  // modal state for viewing full user details
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(LIMIT));
      if (q) params.set("q", q);
      if (roleFilter && roleFilter !== "all") params.set("role", roleFilter);

      const res = await fetch(`${API_URL}/admin/users?${params.toString()}`, {
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) throw new Error("Failed to load users");
      const payload = await res.json();
      setUsers(payload?.data ?? []);
      setTotalPages(Math.max(1, Math.ceil((payload?.total ?? 0) / LIMIT)));
    } catch (err: any) {
      console.error(err);
      setToast({ show: true, msg: err?.message ?? "Error loading users", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, roleFilter]);

  const updateRole = async (userId: string, role: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${encodeURIComponent(userId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      setToast({ show: true, msg: "Role updated", color: "success" });
      fetchUsers();
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? "Update failed", color: "danger" });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    try {
      const res = await fetch(`${API_URL}/admin/users/${encodeURIComponent(userId)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Delete failed");
      }
      setToast({ show: true, msg: "User deleted", color: "success" });
      // refresh page (keep same page if possible)
      fetchUsers();
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? "Delete failed", color: "danger" });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNav />
        <div className="p-4 max-w-6xl mx-auto space-y-4">
          <header className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-700">Manage Users</h2>
              <p className="text-sm text-gray-600">Search, filter and administer platform users.</p>
            </div>
            <div className="flex items-center gap-2">
              <IonInput className="border-b border-gray-300" placeholder="Search User" value={q} onIonInput={(e: any) => setQ(e.detail?.value ?? e.target?.value ?? "")} style={{ width: 220 }} />
              <IonSelect value={roleFilter} onIonChange={(e) => setRoleFilter(e.detail?.value ?? "all")} interface="popover">
                <IonSelectOption value="all">All roles</IonSelectOption>
                <IonSelectOption value="admin">Admin</IonSelectOption>
                <IonSelectOption value="user">User</IonSelectOption>
                <IonSelectOption value="farmer">Farmer</IonSelectOption>
                <IonSelectOption value="agrodealer">Agrodealer</IonSelectOption>
                <IonSelectOption value="service-provider">Service Provider</IonSelectOption>
                <IonSelectOption value="food-processor">Food Processor</IonSelectOption>
              </IonSelect>
              <IonButton color="secondary" fill="clear" slot="en" onClick={() => { setPage(1); fetchUsers(); }}>
                <RefreshCcwIcon className="w-6 h-6" />
              </IonButton>
              {/* <Link to="/admin/users/create">
                <IonButton color="primary">Create User</IonButton>
              </Link> */}
            </div>
          </header>

          <div className="bg-white rounded shadow overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-700">
                <tr className="text-sm sm:text-md">
                  <th className="px-4 py-2 text-left">S/N</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Joined</th>
                  <th className="px-4 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-6 text-center"><IonSpinner /></td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={7} className="p-6 text-center text-gray-600">No users found</td></tr>
                ) : users.map((u, i) => (
                  <tr key={u.id} className="border-b-gray-100 border-b text-gray-700 hover:bg-gray-300 hover:text-black text-xs sm:text-sm">
                    <td className="px-4 py-2">{(page - 1) * LIMIT + i + 1}</td>
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.phone ?? "—"}</td>
                    <td className="px-4 py-2">
                      <IonSelect value={u.role ?? "user"} onIonChange={(e) => updateRole(u.id, e.detail?.value)} interface="popover">
                        <IonSelectOption value="admin">Admin</IonSelectOption>
                        <IonSelectOption value="user">User</IonSelectOption>
                        <IonSelectOption value="farmer">Farmer</IonSelectOption>
                        <IonSelectOption value="agrodealer">Agrodealer</IonSelectOption>
                        <IonSelectOption value="service-provider">Service Provider</IonSelectOption>
                        <IonSelectOption value="food-processor">Food Processor</IonSelectOption>
                      </IonSelect>
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <IonButton color="medium" fill="clear"  size="small"
                          onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}
                          className="mx-2"
                          aria-label={`View ${u.name}`}
                        >
                          <Eye className="sm:mx-2" size={16} />
                        </IonButton>
                        <IonButton color="danger" fill="clear" className="sm:mx-2" size="small" onClick={() => deleteUser(u.id)}>
                            <Trash2Icon size={16} />
                        </IonButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* User details modal */}
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar className="px-4" color={"primary"}>
                <IonTitle>User details</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="p-4">
                <div className="p-2 sm:p-4">
                    {selectedUser ? (
                        <div className="space-y-3">
                        <p className="text-lg sm:text-2xl text-green-700 font-semibold">{selectedUser.name}</p>
                        <div className="text-sm text-gray-600">Role: <span className="font-medium text-gray-800">{selectedUser.role ?? 'user'}</span></div>
                        <div className="text-sm text-gray-600">Email: <a href={`mailto:${selectedUser.email}`} className="text-amber-600">{selectedUser.email}</a></div>
                        <div className="text-sm text-gray-600">Phone: <a href={`tel:${selectedUser.phone ?? ''}`} className="text-amber-600">{selectedUser.phone ?? '—'}</a></div>
                        <div className="text-sm text-gray-600">Address: <span className="text-gray-800">{selectedUser.address ?? '—'}</span></div>
                        <div className="text-sm text-gray-600">Joined: <span className="text-gray-800">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '—'}</span></div>

                        <div className="flex justify-between gap-2 mt-4">
                            <IonButton color="medium" shape="round" onClick={() => { /* optional: navigate to edit page */ window.location.href = `/users/${selectedUser.id}`; }}>
                                <Edit className="mr-2" size={16} /> Edit User
                            </IonButton>
                            <IonButton color="danger" shape="round"  onClick={() => { deleteUser(selectedUser.id); setIsModalOpen(false); }}>
                                <Trash2Icon className="mr-2" size={16} /> Delete User
                            </IonButton>
                            
                        </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 p-6">No user selected.</div>
                    )}
                </div>
            </IonContent>
          </IonModal>

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <IonButton disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</IonButton>
              <IonButton disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</IonButton>
            </div>
          </div>
        </div>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default ManageUsers;