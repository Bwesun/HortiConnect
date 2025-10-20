import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage, IonSpinner, IonToast } from '@ionic/react';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, MailIcon, PhoneIcon, UsersIcon, AlertCircle, AlertTriangle, CopyIcon, ClipboardIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Clipboard } from '@capacitor/clipboard';

const API_URL = import.meta.env.VITE_API_URL;

type UserProfile = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  address?: string;
  created_at?: string;
};

const ViewProfile: React.FC = () => {
  const [fetchedUser, setFetchedUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [toast, setToast] = useState<{ show: boolean; msg?: string }>({ show: false });

  function formatDate(dateString?: string): string {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  useEffect(() => {
    if (!id) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const fetchProfile = async () => {
      setLoadingUser(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/users/${encodeURIComponent(id)}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error(`Unable to load profile (${res.status})`);
        const payload = await res.json();
        setFetchedUser(payload?.data ?? payload?.user ?? null);
      } catch (err: any) {
        console.error(err);
        setError(err?.message.message ?? 'Failed to load profile');
        setToast({ show: true, msg: err?.message.message ?? 'Failed to load profile' });
      } finally {
        setLoadingUser(false);
      }
    };
    fetchProfile();
  }, [id]);

    //   Copy Email
  const copyEmail = async () => {
        const action = await Clipboard.write({
            string: fetchedUser?.email
        });
        setToast({ show: true, msg: "Email copied"});
    };
    
    // Copy Phone
    const copyPhone = async () => {
        const action = await Clipboard.write({
            string: fetchedUser?.phone
        });
        setToast({ show: true, msg: "Phone Number copied"});
    };

  if (loadingUser) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="flex items-center justify-center h-64">
            <IonSpinner name="crescent" color={'primary'} />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!fetchedUser) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="flex items-center text-green-700 justify-center h-64 text-center flex-col gap-2">
            <AlertTriangle size={28} /> 
            Oops! Profile not found.
            <IonButton size='small' shape='round' fill='clear' color={'secondary'} routerLink='/marketplace' >Go Back</IonButton>
        </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <div className="max-w-2xl m-auto">
          {/* Header/Profile Banner */}
          <div className="bg-gradient-to-r from-green-700 to-[#f8982a] text-white p-2 sm:p-6 rounded-t-lg pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white p-0.5 sm:p-1 sm:mb-0 sm:mr-6">
                <img
                  src="https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt={fetchedUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold">{fetchedUser.name}</h1>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <BriefcaseIcon size={16} className="mr-1" />
                  {fetchedUser.role ?? 'user'}
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <MapPinIcon size={16} className="mr-1" />
                  {fetchedUser.address ?? '—'}
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <CalendarIcon size={16} className="mr-1" />
                  Joined {formatDate(fetchedUser.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <h3>
                <span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Contact Information</span>
              </h3>
              <ul className="text-gray-700 space-y-2 mb-6 text-sm sm:text-base">
                <li className="flex gap-2 items-center">
                  <MailIcon size={18} className="mr-1 text-amber-600" /> <a href={`mailto:${fetchedUser.email ?? ''}`} className="text-amber-600">{fetchedUser.email ?? '—'}</a>
                  <CopyIcon size={12} onClick={copyEmail} />
                </li>
                <li className="flex gap-2 items-center">
                  <PhoneIcon size={18} className="mr-1 text-amber-600" /> <a href={`tel:${fetchedUser.phone ?? ''}`} className="text-amber-600">{fetchedUser.phone ?? '—'}</a>
                  <CopyIcon size={12} onClick={copyPhone} />
                </li>
              </ul>

              <h3>
                <span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Cluster Affiliations</span>
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6 text-sm sm:text-base">
                <li className="flex gap-2 items-center">
                  <UsersIcon size={18} className="mr-1 text-amber-600" /> Kano Vegetable Cluster
                </li>
                <li className="flex gap-2 items-center">
                  <UsersIcon size={18} className="mr-1 text-amber-600" /> Tomato Value Chain Network
                </li>
              </ul>

              <div className="flex gap-3">
                <IonButton color="secondary" size='small'>Contact {fetchedUser.role === 'buyer' ? 'Buyer' : 'Seller'}</IonButton>
                <IonButton fill="clear" color="medium" size='small' onClick={() => setToast({ show: true, msg: 'Feature coming' })}>
                  View listings
                </IonButton>
              </div>
            </div>
          </div>
        </div>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} duration={2000} />

        <div className="bg-gray-200 text-center text-sm text-gray-600 p-4">
          © 2025 HortiNigeria Agribusiness Clusters
          <br />
          Funded by the Embassy of the Kingdom of the Netherlands
          <br />
          Implemented by IFDC and partners
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewProfile;
