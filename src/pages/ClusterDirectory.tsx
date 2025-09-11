import { IonBadge, IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
import { Locate, MapPinIcon, Pin, UserIcon, UsersIcon } from 'lucide-react';

const ClusterDirectory: React.FC = () => {
  const groups = [
    {
      name: 'Kano Tomato Growers',
      location: 'Kano State',
      members: 125,
      crop: 'Tomato',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Replace with actual image path
    },
    {
      name: 'Kaduna Pepper Association',
      location: 'Kaduna State',
      members: 87,
      crop: 'Pepper',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Replace with actual image path
    },
    {
      name: 'Kaduna Vegetable Network',
      location: 'Kaduna State',
      crop: 'Mixed Vegetables',
      members: 156,
      image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <IonPage>
      <IonContent className="">
        <h1 className=''><span className='text-lg sm:text-2xl font-semibold sm:font-extrabold text-gray-800 p-2 sm:p-4'>Cluster Directory</span></h1>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 p-2 sm:p-4">
          {groups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <IonImg src={group.image} alt={group.crop} className="w-full h-28 sm:h-48 object-cover" />
              <div className="p-2 sm:p-4">
                <h2 className=""><span className='text-lg sm:text-xl sm:font-semibold text-gray-800'>{group.name}</span> </h2>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-600 flex gap-1 items-center text-xs sm:text-lg"><MapPinIcon size={18} /> {group.location}</p>
                  <p className="text-gray-600 flex gap-1 items-center text-xs sm:text-lg mb-1"><UsersIcon size={18} /> {group.members} members</p>
                </div>
                <p className="text-gray-600 flex gap-3 items-center"><IonBadge  className='px-3 py-1 rounded-full bg-[#fdd8ad] text-amber-600 text-xs sm:text-sm font-medium'>{group.crop}</IonBadge></p>
                <IonButton routerLink={`/viewcluster/${group.name}`} color="primary" size='small' expand="block" className="mt-2 sm:mt-4">View Details</IonButton>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClusterDirectory;
