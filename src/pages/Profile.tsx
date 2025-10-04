import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage, IonModal, IonInput, IonItem, IonLabel, IonToast, IonSpinner, IonTextarea } from '@ionic/react';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, MailIcon, PhoneIcon, UsersIcon, LogOutIcon, EditIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const Profile: React.FC = () => {
  const auth = useAuth() as any;
  const { user, isLoading, logout } = auth ?? {};
  const history = useHistory();

  // Example state for form fields (expand as needed)
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [about, setAbout] = useState<string>(''); // <-- added
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  useEffect(() => {
    // populate form from user when available
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setPhone(user.phone ?? '');
      setAbout(user.about ?? ''); // <-- populate about
    }
  }, [user]);

  function formatDate(dateString?: string): string {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  const handleSave = async () => {
    if (!name.trim()) {
      setToast({ show: true, msg: 'Name is required', color: 'danger' });
      return;
    }
    if (!email.trim()) {
      setToast({ show: true, msg: 'Email is required', color: 'danger' });
      return;
    }

    setSaving(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      // attempt to update current user profile
      const res = await fetch(`${API_URL.replace(/\/api\/?$/, '')}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          about: about.trim() === '' ? null : about.trim(), // <-- include about
        }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || `Save failed (${res.status})`);
      }
      const payload = await res.json().catch(() => null);
      // update auth context if available
      if (auth && typeof auth.setUser === 'function') {
        const updated = payload?.data ?? { ...user, name: name.trim(), email: email.trim(), phone: phone.trim(), about: about.trim() };
        auth.setUser(updated);
      }
      setToast({ show: true, msg: 'Profile updated', color: 'success' });
      setShowModal(false);
    } catch (err: any) {
      console.error('Profile save error', err);
      setToast({ show: true, msg: err?.message.message ?? 'Save failed', color: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  // Logout logic here
  const handleLogout = async () => {
    await logout();
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <div className="max-w-2xl m-auto">
          {/* Header/Profile Banner */}
          <div className="bg-gradient-to-r from-green-700 to-[#f8982a] text-white p-2 sm:p-6 rounded-t-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white p-0.5 sm:p-1 sm:mb-0 sm:mr-6">
                <img
                  src={user?.avatar ?? 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                  alt={user?.name ?? 'Profile'}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold">{user?.name ?? 'Guest User'}</h1>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <BriefcaseIcon size={16} className="mr-1" />
                  {user?.role ?? 'Member'}
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <MapPinIcon size={16} className="mr-1" />
                  {user?.address ?? '—'}
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <CalendarIcon size={16} className="mr-1" />
                  Joined {formatDate(user?.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className='flex justify-between'>
                <IonButton color="primary" size='small' fill='outline' onClick={() => setShowModal(true)} className="text-sm sm:text-base"><EditIcon size={18} className="mr-1" /> Edit Profile</IonButton>
                <IonButton color="danger" size='small' fill='outline' onClick={handleLogout} className="text-sm sm:text-base"><LogOutIcon size={18} className="mr-1" /> Logout</IonButton>
              </div>

              {/* About Section */}
              <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</span> </h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                {user?.about ?? 'No profile description provided.'}
              </p>

              {/* Contact Info */}
              <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Contact Information</span> </h3>
              <ul className="text-gray-700 space-y-2 mb-6 text-sm sm:text-base">
                <li className='flex gap-2 items-center'><MailIcon size={18} className="mr-1 text-amber-600" /> {user?.email ?? '—'}</li>
                <li className='flex gap-2 items-center'><PhoneIcon size={18} className="mr-1 text-amber-600" />Phone: {user?.phone ?? '—'}</li>
              </ul>

              {/* Cluster Affiliations */}
              {/* <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Cluster Affiliations</span> </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6 text-sm sm:text-base">
                {(user?.clusters ?? ['Kano Vegetable Cluster', 'Tomato Value Chain Network']).map((c: string, i: number) => (
                  <li key={i} className='flex gap-2 items-center'><UsersIcon size={18} className="mr-1 text-amber-600" /> {c}</li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <IonModal color='light' isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent color={"light"}>
            <div className="p-2 sm:p-4 bg-gray-50">
              <h2 className="text-xl text-green-700 font-bold mb-4">Edit Profile</h2>

              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput value={name} onIonChange={e => setName(e.detail.value ?? '')} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput value={email} onIonChange={e => setEmail(e.detail.value ?? '')} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput value={phone} onIonChange={e => setPhone(e.detail.value ?? '')} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">About</IonLabel>
                <IonTextarea value={about} onIonChange={e => setAbout(e.detail.value ?? '')} rows={4} />
              </IonItem>

              <div className="flex justify-end gap-2 mt-6">
                <IonButton onClick={() => setShowModal(false)} color="danger" shape='round'>Cancel</IonButton>
                <IonButton onClick={handleSave} color="primary" shape='round' disabled={saving}>
                  {saving ? <IonSpinner /> : 'Save'}
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === 'danger' ? 'danger' : 'success'} duration={2500} />

        {/* Footer */}
        <div className="bg-gray-200 text-center text-sm text-gray-600 p-4">
          © 2025 HortiNigeria Agribusiness Clusters<br />
          Funded by the Embassy of the Kingdom of the Netherlands<br />
          Implemented by IFDC and partners
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
