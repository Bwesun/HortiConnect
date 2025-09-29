import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  CalendarIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ClipboardListIcon,
  Contact as ContactIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import defaultClusterImage from '../assets/hortiLogo.png';

const API_URL = import.meta.env.VITE_API_URL;

type Cluster = {
  id?: string | number;
  name?: string;
  about?: string;
  location?: string;
  members?: number;
  date_established?: string;
  chairperson?: string;
  chair_email?: string;
  chair_phone?: string;
  chair_location?: string;
  image?: string;
  created_at?: string;
};

const ViewCluster: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation<{ cluster?: Cluster } | any>();
  const history = useHistory();

  const [cluster, setCluster] = useState<Cluster | null>(location?.state?.cluster ?? null);
  const [loading, setLoading] = useState<boolean>(!Boolean(location?.state?.cluster));
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({ show: false });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (cluster || !id) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/clusters/${encodeURIComponent(id)}`, {
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) {
          throw new Error(`Failed to load cluster (${res.status})`);
        }
        const payload = await res.json();
        if (mounted) setCluster(payload?.data ?? null);
      } catch (err: any) {
        console.error(err);
        setToast({ show: true, msg: 'Unable to load cluster — showing fallback', color: 'danger' });
        // fallback minimal demo
        if (mounted && !cluster) {
          setCluster({
            id: id,
            name: 'Unknown Cluster',
            about: 'No detailed information is available for this cluster.',
            location: '',
            members: 0,
            date_established: undefined,
            chairperson: undefined,
            chair_email: undefined,
            chair_phone: undefined,
            chair_location: undefined,
            image: undefined,
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const joinCluster = async () => {
    if (!cluster?.id) return;
    try {
      const res = await fetch(`${API_URL}/clusters/${encodeURIComponent(String(cluster.id))}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || 'Join request failed');
      }
      setToast({ show: true, msg: 'Join request sent', color: 'success' });
    } catch (err: any) {
      setToast({ show: true, msg: err?.message ?? 'Join request failed', color: 'danger' });
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
      <IonContent className="bg-gray-100">
        <TopNav />

        <div
          className="relative h-48 sm:h-62 w-full rounded-t-lg overflow-hidden sm:mb-4 bg-cover bg-center"
          style={{
            backgroundImage: defaultClusterImage ? `url(${cluster?.image ?? defaultClusterImage})` : `url(${defaultClusterImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 bg-opacity-10 flex flex-col justify-center items-center text-white text-center p-4">
            <h1>
              <span className="text-xl sm:text-3xl font-semibold sm:font-bold">{cluster?.name ?? 'Cluster'}</span>
            </h1>
            <div className="mt-2 flex gap-2 text-xs sm:text-sm">
              {cluster?.location ? (
                <span className="bg-green-600 px-3 py-1 rounded-full flex gap-1"><MapPinIcon size={18} /> {cluster.location}</span>
              ) : null}
              <span className="bg-amber-500 px-3 py-1 rounded-full">
                {typeof cluster?.members === 'number' ? `${cluster.members} members` : 'Members'}
              </span>
            </div>
          </div>
        </div>

        <section className="p-2 sm:p-6">
          <h2 className="sm:text-2xl text-xl font-semibold text-gray-800 sm:mb-2">About the Cluster</h2>
          <p className="text-gray-700 text-sm sm:text-lg">{cluster?.about ?? 'No description available.'}</p>
        </section>

        <section className="p-2 sm:p-6 bg-white rounded-lg shadow-md mx-2 sm:mx-4 mb-6">
          <ul className="text-gray-700 sm:space-y-2 flex flex-wrap sm:justify-around gap-2 sm:gap-4 mb-4 sm:mb-8">
            <li className="flex items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                <UsersIcon size={20} />
              </div>
              <span>
                <strong className="text-sm sm:text-lg">Members:</strong>
                <p className="text-sm sm:text-lg">{cluster?.members ?? '—'}</p>
              </span>
            </li>

            <li className="flex items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                <CalendarIcon size={20} />
              </div>
              <span>
                <strong className="text-sm sm:text-lg">Established:</strong>
                <p className="text-sm sm:text-lg">{cluster?.date_established ? new Date(cluster.date_established).toLocaleDateString() : '—'}</p>
              </span>
            </li>

            <li className="flex items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                <UserIcon size={20} />
              </div>
              <span>
                <strong className="text-sm sm:text-lg">Chairperson:</strong>
                <p className="text-sm sm:text-lg">{cluster?.chairperson ?? '—'}</p>
              </span>
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4 flex gap-4 items-center">
            <TrendingUpIcon size={24} className="text-[#fc9219]" /> Key Achievements
          </h2>
          {/* If there is an achievements array in future, render it. For now show short placeholder when none */}
          <ul className="text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-4">
            <li className="text-sm sm:text-lg"><span className="text-green-600 mr-2">•</span> Improved member coordination and market access</li>
            <li className="text-sm sm:text-lg"><span className="text-green-600 mr-2">•</span> Regular trainings and aggregation activities</li>
            <li className="text-sm sm:text-lg"><span className="text-green-600 mr-2">•</span> Crop production optimization</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4 flex gap-1 sm:gap-4 items-center">
            <ClipboardListIcon size={24} className="mr-2 text-[#f8982a]" /> Upcoming Activities
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li className="border-l-4 border-green-600 pl-4 py-0.5 sm:py-1">
              <h3><span className="text-lg sm:text-2xl">Monthly Member Meeting</span></h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 sm:gap-2"><CalendarIcon size={15} /><p className="text-xs sm:text-sm">Every last Friday</p></span>
                <span className="flex items-center gap-1 sm:gap-2"><MapPinIcon size={15} /><p className="text-xs sm:text-sm">{cluster?.location ?? 'Location'}</p></span>
              </div>
            </li>
            <li className="border-l-4 border-green-600 pl-4 py-0.5 sm:py-1">
              <h3><span className="text-lg sm:text-2xl">Seminar on Product selection</span></h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 sm:gap-2"><CalendarIcon size={15} /><p className="text-xs sm:text-sm">30 October 2025</p></span>
                <span className="flex items-center gap-1 sm:gap-2"><MapPinIcon size={15} /><p className="text-xs sm:text-sm">{cluster?.location ?? 'Location'}</p></span>
              </div>
            </li>
          </ul>
        </section>

        <section className="p-2 sm:p-6 bg-white rounded-lg shadow-md mx-2 sm:mx-2 mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex gap-2 sm:gap-4 items-center">
            <ContactIcon size={24} className="text-[#fc9219] mr-2" /> Contact Information
          </h2>
          <ul className="text-gray-700 space-y-1 sm:space-y-2">
            <li className="flex gap-1 sm:gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                <PhoneIcon size={20} />
              </div>
              <span>
                <p className="text-xs sm:text-sm">Phone</p>
                <strong className="text-sm sm:text-lg"><a className="text-amber-600" href={`tel:${cluster?.chair_phone ?? ''}`}>{cluster?.chair_phone ?? '—'}</a></strong>
              </span>
            </li>

            <li className="flex gap-1 sm:gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                <MailIcon size={20} />
              </div>
              <span>
                <p className="text-xs sm:text-sm">Email</p>
                <strong className="text-sm sm:text-lg"><a className="text-amber-600" href={`mailto:${cluster?.chair_email ?? ''}`}>{cluster?.chair_email ?? '—'}</a></strong>
              </span>
            </li>

            <li className="flex gap-1 sm:gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                <MapPinIcon size={20} />
              </div>
              <span>
                <p className="text-xs sm:text-sm">Chair location</p>
                <strong className="text-sm sm:text-lg">{cluster?.chair_location ?? cluster?.location ?? '—'}</strong>
              </span>
            </li>
          </ul>

          <div className="mt-4 flex gap-2">
            {/* <IonButton expand="block" color="primary" className="mt-4 sm:block hidden" onClick={joinCluster}>Join This Cluster</IonButton> */}
            {/* <IonButton expand="block" size="small" color="primary" className="mt-4 sm:hidden block" onClick={joinCluster}>Join This Cluster</IonButton> */}
            <IonButton fill="clear" onClick={() => history.push('/clusters')}><ChevronLeftIcon size={20} /> Back</IonButton>
          </div>
        </section>

        <IonToast isOpen={toast.show} onDidDismiss={() => setToast({ show: false })} message={toast.msg} color={toast.color === 'danger' ? 'danger' : 'success'} duration={2500} />
      </IonContent>
    </IonPage>
  );
};

export default ViewCluster;
