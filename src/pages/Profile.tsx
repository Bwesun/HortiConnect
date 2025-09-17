import React, { useState } from 'react';
import { IonButton, IonContent, IonPage, IonModal, IonInput, IonItem, IonLabel } from '@ionic/react';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, MailIcon, PhoneIcon, UsersIcon, LogOutIcon, Edit2Icon, EditIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const history = useHistory();

  // Example state for form fields (expand as needed)
  const [name, setName] = useState('Matur Innocent');
  const [email, setEmail] = useState('adamu.ibrahim@example.com');
  const [phone, setPhone] = useState('+234 812 345 6789');

  const handleSave = () => {
    // Save logic here
    setShowModal(false);
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
                  src='https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                  alt='Matur Innocent'
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold">{user?.name}</h1>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <BriefcaseIcon size={16} className="mr-1" />
                  {user?.role}
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <MapPinIcon size={16} className="mr-1" />
                  Abuja
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center sm:justify-start sm:mt-1 text-xs sm:text-base">
                  <CalendarIcon size={16} className="mr-1" />
                  Joined 20 January 2025
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className='flex justify-between'>
                <IonButton color="primary" fill='outline' onClick={() => setShowModal(true)} className="text-sm sm:text-base"><EditIcon size={18} className="mr-1" /> Edit Profile</IonButton>
                <IonButton color="danger" fill='outline' onClick={handleLogout} className="text-sm sm:text-base"><LogOutIcon size={18} className="mr-1" /> Logout</IonButton>
              </div>

              {/* About Section */}
              <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</span> </h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                Vegetable farmer specializing in tomatoes and peppers with 10 years of experience.
              </p>

              {/* Contact Info */}
              <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Contact Information</span> </h3>
              <ul className="text-gray-700 space-y-2 mb-6 text-sm sm:text-base">
                <li className='flex gap-2 items-center'><MailIcon size={18} className="mr-1 text-amber-600" /> {email}</li>
                <li className='flex gap-2 items-center'><PhoneIcon size={18} className="mr-1 text-amber-600" />Phone: {phone}</li>
              </ul>

              {/* Cluster Affiliations */}
              <h3><span className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Cluster Affiliations</span> </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6 text-sm sm:text-base">
                <li className='flex gap-2 items-center'><UsersIcon size={18} className="mr-1 text-amber-600" /> Kano Vegetable Cluster</li>
                <li className='flex gap-2 items-center'><UsersIcon size={18} className="mr-1 text-amber-600" />Tomato Value Chain Network</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <IonModal color='light' isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonContent color={"light"}>
                <div className="p-2 sm:p-4">
                    <h2 className="text-xl text-green-700 font-bold mb-4">Edit Profile</h2>
                    <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                    <IonLabel position="stacked">Phone</IonLabel>
                    <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} />
                    </IonItem>
                    <div className="flex justify-end gap-2 mt-6">
                    <IonButton onClick={() => setShowModal(false)} color="danger" shape='round'>Cancel</IonButton>
                    <IonButton onClick={handleSave} color="primary" shape='round'>Save</IonButton>
                    </div>
                </div>

            </IonContent>
        </IonModal>

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
