import React, { useState } from 'react';
import { IonButton, IonContent, IonImg, IonPage, IonModal, IonInput, IonItem, IonLabel } from '@ionic/react';
import { UserIcon, BriefcaseIcon, MapPinIcon, CalendarIcon, MailIcon, PhoneIcon, UsersIcon, Lightbulb } from 'lucide-react';

const Profile: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Example state for form fields (you can expand as needed)
  const [name, setName] = useState('Matur Innocent');
  const [email, setEmail] = useState('adamu.ibrahim@example.com');
  const [phone, setPhone] = useState('+234 812 345 6789');

  const handleSave = () => {
    // Save logic here
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-gradient-to-r from-green-700 to-[#f8982a] text-white p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-38 h-38 rounded-full bg-white p-1 md:mb-0 md:mr-6">
                    <img
                    src='https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                    alt='Matur Innnocent'
                    className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-white text-opacity-90 flex items-center justify-center md:justify-start mt-1">
                    <BriefcaseIcon size={16} className="mr-1" />
                    Farmer
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center md:justify-start mt-1">
                    <MapPinIcon size={16} className="mr-1" />
                    Abuja
                </p>
                <p className="text-white text-opacity-90 flex items-center justify-center md:justify-start mt-1">
                    <CalendarIcon size={16} className="mr-1" />
                    Joined 20 January 2025
                </p>
                </div>
            </div>
            </div>
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className='flex justify-end'>
                <IonButton color="primary" fill='clear' onClick={() => setShowModal(true)}>Edit Profile</IonButton>
              </div>

              {/* About Section */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-700 mb-6">
                Vegetable farmer specializing in tomatoes and peppers with 10 years of experience.
              </p>

              {/* Contact Info */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li className='flex gap-2'><MailIcon size={20} className="mr-1" /> {email}</li>
                <li className='flex gap-2'><PhoneIcon size={20} className="mr-1" />Phone: {phone}</li>
              </ul>

              {/* Cluster Affiliations */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cluster Affiliations</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                <li className='flex gap-2'><UsersIcon size={20} className="mr-1" /> Kano Vegetable Cluster</li>
                <li className='flex gap-2'><UsersIcon size={20} className="mr-1" />Tomato Value Chain Network</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <IonModal color='light' isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonContent color={"light"}>
                <div className="p-4">
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
