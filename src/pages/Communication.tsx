import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonButton, IonSpinner, IonToast, IonText } from "@ionic/react";
import { UsersIcon, MessageSquare, MessagesSquare, Plus, CogIcon } from "lucide-react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

type Group = {
  id: number | string;
  name: string;
  about?: string;
  image?: string;
  members?: number;
  created_at?: string;
  is_public?: boolean;
};

const Communication: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });
  const {user} = useAuth();

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

  useEffect(() => { load(); }, []);

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <TopNav />
        <div className="max-w-6xl mx-auto p-4">
          <header className="flex items-center justify-between mb-4">
            <div>
              <IonText color={"primary"} className="text-lg font-bold text-gray-800 flex items-center gap-2"><MessagesSquare /> Communication Groups</IonText>
              <p className="text-sm text-gray-600">Groups created by admin for conversations and alerts.</p>
            </div>
            {user?.role === 'admin' && (
              <div>
                <IonButton size="small" routerLink="/admin/groups" fill="clear"><CogIcon size={16} className="mr-2"/> Manage</IonButton>
              </div>
            )}
          </header>

          {loading ? (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <IonSpinner name="dots" color={"primary"} />
              <p className="text-sm text-gray-600 mt-2">Loading groups...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No groups yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map(g => (
                <div key={g.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center">
                      <UsersIcon size={18} />
                    </div>
                    <div className="flex-1">
                      <IonText className="font-semibold text-gray-800">{g.name}</IonText>
                      <p className="text-sm text-gray-600 line-clamp-2">{g.about}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-500">{g.members ?? 0} members</div>
                    <div className="flex gap-2">
                      <Link to={{ pathname: `/chat/${g.id}`, state: { group: g } }} className="text-sm inline-flex items-center text-[#f8982a] font-medium">
                        Open Chat
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === "danger" ? "danger" : "success"} duration={2000} />
      </IonContent>
    </IonPage>
  );
};

export default Communication;