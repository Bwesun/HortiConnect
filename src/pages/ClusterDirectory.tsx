import React, { useEffect, useState } from 'react';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import {
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  TrendingUpIcon,
  MailIcon,
  PhoneIcon,
  Contact as ContactIcon,
  X,
  AlertTriangle,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import hortiLogo from '../assets/hortiLogo.png';

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
  image?: string;
  created_at?: string;
};

const sampleGroups: Cluster[] = [
  {
    id: 'kano-tomato',
    name: 'Kano Tomato Growers',
    location: 'Kano State',
    members: 125,
    about:
      'The Kano Tomato Growers cluster brings together tomato farmers in Kano State to improve productivity, market access, and sustainability.',
    date_established: '2020-01-01',
    chairperson: 'Ibrahim Mohammed',
    chair_email: 'info@horticluster.org',
    chair_phone: '+2348001234567',
    chair_location: 'Kano Agricultural Center',
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'kaduna-pepper',
    name: 'Kaduna Pepper Association',
    location: 'Kaduna State',
    members: 87,
    about: 'Pepper growers network in Kaduna promoting shared inputs and market linkages.',
    date_established: '2019-06-01',
    chairperson: 'Aisha Bello',
    chair_email: 'aisha@pepperkaduna.ng',
    chair_phone: '+2348001112222',
    chair_location: 'Kaduna Agricultural Hall',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'kaduna-veg',
    name: 'Kaduna Vegetable Network',
    location: 'Kaduna State',
    members: 156,
    about: 'Mixed vegetable producers collaborating on aggregation and buyer introductions.',
    date_established: '2018-09-10',
    chairperson: 'Hassan Musa',
    chair_email: 'hassan@vegnet.ng',
    chair_phone: '+2348003334444',
    chair_location: 'Kaduna Market Hall',
    image:
      'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
  },
];

const ClusterDirectory: React.FC = () => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Cluster | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg?: string; color?: string }>({
    show: false,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
        const res = await fetch(`${API_URL}/clusters?${params.toString()}`, {
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        if (!res.ok) {
          // fallback to sample if public endpoint not available or auth required
          setClusters(sampleGroups);
          setTotalPages(1);
          setLoading(false);
          return;
        }
        const payload = await res.json();
        setClusters(payload?.data ?? sampleGroups);
        setTotalPages(Math.max(1, Math.ceil((payload?.total ?? clusters.length) / LIMIT)));
      } catch (err: any) {
        console.error(err);
        setToast({ show: true, msg: 'Unable to load clusters — showing sample data', color: 'danger' });
        setClusters(sampleGroups);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openView = (c: Cluster) => {
    setSelected(c);
    setViewOpen(true);
  };

  const joinCluster = (c: Cluster) => {
    setToast({ show: true, msg: `Request to join ${c.name} sent (demo)`, color: 'success' });
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <TopNav />

        <div className="px-2 sm:px-4 max-w-6xl mx-auto">
          <h1><span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 p-2 sm:p-4">Cluster Directory</span> </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 sm:p-4">
            {loading ? (
              <div className="col-span-full p-8 text-center">
                <IonSpinner name="crescent" color={'primary'} />
                <p className="text-gray-600 mt-2 text-sm sm:text-md">Loading clusters...</p>
              </div>
            ) : clusters.length === 0 ? (
              <div className="col-span-full p-6 text-center text-gray-600">
                <AlertTriangle className="mx-auto mb-2 text-red-600" size={48} />
                <p className="text-sm sm:text-md">No clusters found</p>
              </div>
            ) : (
              clusters.map((group, index) => (
                <div key={group.id ?? index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* <IonImg src={group.image ?? hortiLogo} alt={group.name} className="w-full h-28 sm:h-40 bg-black/70 object-cover" /> */}
                  <div className="px-3 py-1 sm:p-4 ">
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">{group.name}</span>
                    <div className="flex gap-2 items-center mt-2 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPinIcon size={14} className="text-green-600" /> {group.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon size={14} className="text-amber-600" /> {group.members} members
                      </span>
                    </div>

                    <p className="mt-2 text-gray-700 text-xs line-clamp-3">{group.about}</p>

                    <div className=" my-2 flex gap-2 justify-end">
                      <IonButton shape='round' size='small' color={'primary'} fill='clear' slot='start' onClick={() => openView(group)}>
                        View Details
                      </IonButton>
                      {/* <IonButton color="primary" size="small" onClick={() => joinCluster(group)}>
                        Join
                      </IonButton> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <IonButton shape='round' fill='outline' disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeftIcon size={20}  />
              </IonButton>
              <IonButton shape='round' fill='outline' disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <ChevronRightIcon size={20}  />
              </IonButton>
            </div>
          </div>
        </div>
          
        {/* View Cluster Modal */}
        <IonModal isOpen={viewOpen} onDidDismiss={() => setViewOpen(false)}>
          <IonHeader>
            <IonToolbar className="ion-padding-horizontal bg-gradient-to-r">
              <IonTitle color={'light'}>Cluster details</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setViewOpen(false)}><X size={24} /></IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="p-4">
              {selected ? (
                <>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{selected.name}</h3>
                    <p className="text-sm text-gray-700 mt-2">{selected.about ?? '—'}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPinIcon />{' '}
                        <div>
                          <strong>Location</strong>
                          <div className="text-gray-800">{selected.location ?? '—'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon />{' '}
                        <div>
                          <strong>Members</strong>
                          <div className="text-gray-800">{selected.members ?? '—'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon />{' '}
                        <div>
                          <strong>Established</strong>
                          <div className="text-gray-800">
                            {selected.date_established ? new Date(selected.date_established).toLocaleDateString() : '—'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ContactIcon />{' '}
                        <div>
                          <strong>Chairperson</strong>
                          <div className="text-gray-800">{selected.chairperson ?? '—'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MailIcon />{' '}
                        <div>
                          <strong>Email</strong>
                          <div className="text-gray-800">
                            <a href={`mailto:${selected.chair_email ?? ''}`} className="text-amber-600">
                              {selected.chair_email ?? '—'}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon />{' '}
                        <div>
                          <strong>Phone</strong>
                          <div className="text-gray-800">
                            <a href={`tel:${selected.chair_phone ?? ''}`} className="text-amber-600">
                              {selected.chair_phone ?? '—'}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon />{' '}
                        <div>
                          <strong>Chair location</strong>
                          <div className="text-gray-800">{selected.chair_location ?? '—'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    {/* <IonButton color="primary" shape='round' onClick={() => { setViewOpen(false); }}>
                      Open
                    </IonButton> */}
                    <IonButton color="secondary" routerLink={`/viewcluster/${selected.id}`} shape='round' onClick={() => setViewOpen(false)}>
                      Visit
                    </IonButton>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-600 p-6">No cluster selected.</div>
              )}
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={toast.show}
          onDidDismiss={() => setToast({ show: false })}
          message={toast.msg}
          color={toast.color === 'danger' ? 'danger' : 'success'}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ClusterDirectory;
