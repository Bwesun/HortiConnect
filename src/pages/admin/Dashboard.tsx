import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import {
  Users as UsersIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  Settings as SettingsIcon,
  ArrowRight as ArrowRightIcon,
  NetworkIcon,
  ChevronRightIcon,
  CogIcon,
  LogOutIcon,
  UsersRoundIcon,
  LucideNetwork,
} from "lucide-react";
import TopNav from "../../components/TopNav";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT = 8;

type StatCard = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  link?: string;
};

type Listing = {
  id: number;
  title: string;
  price: string;
  location?: string;
  seller_name?: string;
  buyer_name?: string;
  type?: "buy" | "sell";
  contact?: string;
  created_at?: string;
};

// Simple inline SVG stats chart (no external deps)
const StatsChart: React.FC<{ stats: { users: number; listings: number; clusters: number } }> = ({ stats }) => {
  const items = [
    { key: "users", label: "Users", value: Number(stats.users || 0), color: "#f59e0b" }, // amber
    { key: "listings", label: "Listings", value: Number(stats.listings || 0), color: "#10b981" }, // green
    { key: "clusters", label: "Clusters", value: Number(stats.clusters || 0), color: "#f97316" }, // orange
  ];

  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Platform overview</h4>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.key} className="flex items-center gap-3">
            <div className="w-24 text-xs text-gray-600">{it.label}</div>
            <div className="flex-1 bg-gray-100 rounded h-4 overflow-hidden">
              <div
                style={{ width: `${(it.value / max) * 100}%`, background: it.color, height: "100%" }}
                className="transition-all"
                title={`${it.label}: ${it.value}`}
              />
            </div>
            <div className="w-16 text-right text-sm font-medium text-gray-800">{it.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    records: 0,
    revenue: 0,
    clusters: 0,
  });
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) throw new Error("failed");
        const payload = await res.json();
        setStats({
          users: payload?.data?.users ?? 0,
          listings: payload?.data?.listings ?? 0,
          records: payload?.data?.records ?? 0,
          revenue: payload?.data?.revenue ?? 0,
          clusters: payload?.data?.clusters ?? 0,
        });
      } catch {
        // fallback / keep zeros
      }
    };

    const fetchListings = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
        const res = await fetch(`${API_URL}/listings?${params.toString()}`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) throw new Error("failed");
        const payload = await res.json();
        setRecentListings(payload?.data ?? []);
        setTotalPages(Math.max(1, Math.ceil((payload?.total ?? 0) / LIMIT)));
      } catch {
        // fallback demo data
        setRecentListings((r) =>
          r.length ? r : [
            { id: 1, title: "Tomatoes - Fresh crate", price: "₦5,000", location: "Kano", seller_name: "Ibrahim Farms", type: "sell", contact: "+2348000000000", created_at: new Date().toISOString() },
            { id: 2, title: "Organic Seedlings", price: "₦3,500", location: "Kaduna", seller_name: "Green Valley", type: "sell", contact: "+2348000000001", created_at: new Date().toISOString() }
          ]
        );
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      // clear any other auth state if stored
      localStorage.removeItem("user");
    } catch (e) {
      /* ignore */
    }
    history.replace("/login");
  };

  const cards: StatCard[] = [
    { title: "Registered Users", value: stats.users, icon: <UsersIcon size={20} className="text-amber-600" />, link: "/admin/users" },
    { title: "Marketplace Listings", value: stats.listings, icon: <ShoppingCartIcon size={20} className="text-amber-600" />, link: "/marketplace" },
    { title: "Clusters", value: stats.clusters, icon: <NetworkIcon size={20} className="text-amber-600" />, link: "/admin/clusters" },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNav />
        <div className="p-4 max-w-6xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Overview of platform activity and quick administration actions.</p>
            </div>
            <div className="flex items-center gap-2">
              <IonButton color="primary" fill="clear" onClick={handleLogout}>
                Logout
                <LogOutIcon className="ml-2" />
              </IonButton>
            </div>
          </header>

          {/* stats + chart row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((c, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 uppercase">{c.title}</div>
                      <div className="text-2xl font-bold text-gray-900">{c.value}</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded">{c.icon}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* stats chart */}
            <div>
              <StatsChart stats={{ users: Number(stats.users), listings: Number(stats.listings), clusters: Number(stats.clusters) }} />
            </div>
          </div>

          {/* quick actions */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-3">
            <Link to="/admin/users">
                <IonButton color="primary">
                  <UsersRoundIcon className="mr-2" /> 
                  User Directory
                </IonButton>
              </Link>
            <Link to="/admin/clusters">
              <IonButton color="secondary">
                <LucideNetwork className="mr-2" />
                Clusters Directory
              </IonButton>
            </Link>
            {/* <Link to="/admin/users">
              <IonButton color="light">User Directory</IonButton>
            </Link>
            <Link to="/admin/reports">
              <IonButton color="medium">Generate Report</IonButton>
            </Link> */}
            <IonButton color="danger" onClick={() => { navigator.clipboard.writeText(JSON.stringify({ users: stats.users })); }}>Export Snapshot</IonButton>
          </div>

          {/* Recent Listings */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="">
                <span className="mr-2 text-lg font-medium text-gray-800">Recent Listings</span>
                {loading && <span className="text-sm sm:text-2xl text-gray-500 italic">Loading...</span>}
              </h3>
              <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seller/Buyer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentListings.map((l, i) => (
                    <tr key={l.id ?? i}>
                      <td className="px-4 py-2 text-sm text-gray-700">{(page - 1) * LIMIT + i + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{l.title}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{l.type ?? "sell"}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{l.seller_name ?? l.buyer_name ?? "—"}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{l.price}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}</td>
                      <td className="px-4 py-2 text-right">
                        <Link to={`/marketplace/${l.id}`} className="text-amber-600 inline-flex items-center">
                          View <ArrowRightIcon size={14} className="ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">Showing {recentListings.length} items</div>
              <div className="flex items-center gap-2">
                <button className="px-3 sm:px-6 py-1 sm:py-3 text-amber-600 rounded disabled:opacity-50" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                <button className="px-3 sm:px-6 py-1 sm:py-3 text-amber-600 rounded disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  Next
                  <ChevronRightIcon size={16} className="inline ml-2" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;