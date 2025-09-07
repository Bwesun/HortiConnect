import { IonButton, IonContent, IonPage } from '@ionic/react';
import { CalendarIcon, ClipboardListIcon, MailIcon, MapPinIcon, PhoneIcon, TrendingUpIcon, UserIcon, UsersIcon } from 'lucide-react';

const KanoTomatoCluster: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        {/* Header Section */}
        <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className="text-3xl font-bold">Kano Tomato Growers</h1>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-red-400 px-3 py-1 rounded-full">Tomato</span>
              <span className="bg-green-600 px-3 py-1 rounded-full">Kano State</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">About the Cluster</h2>
          <p className="text-gray-700">
            The Kano Tomato Growers cluster brings together tomato farmers in Kano State to improve productivity, market access, and sustainability. The cluster provides production and marketing support and connects members to buyers and processors.
          </p>
        </section>

        {/* Cluster Details */}
        <section className="p-6 bg-white rounded-lg shadow-md mx-4 mb-6">
          <ul className="text-gray-700 space-y-2 grid grid-cols-2 md:grid-cols-4 mb-8">
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <UsersIcon size={20} />
                </div>
                <span>
                    <strong>Members:</strong>
                    <p className='text-sm'>125</p>
                </span>
            </li>
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <CalendarIcon size={20} />
                </div>
                <span>
                    <strong>Established:</strong>
                    <p className='text-sm'>January 2020</p>
                </span>
            </li>
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <UserIcon size={20} />
                </div>
                <span>
                    <strong>Chairperson:</strong>
                    <p className='text-sm'>Ibrahim Mohammed</p>
                </span>
            </li>
          </ul>

        {/* Key Achievements */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex gap-4"><TrendingUpIcon size={24} className='text-[#fc9219]' /> Key Achievements</h2>
          <ul className=" text-gray-700 space-y-2 mb-8">
            <li><span className="text-green-600 mr-2">•</span> Increased average yields by 30% in the past year</li>
            <li><span className="text-green-600 mr-2">•</span> Secured direct market linkages with 5 major processors</li>
            <li><span className="text-green-600 mr-2">•</span> Secured affordable financing for 70% of members</li>
            <li><span className="text-green-600 mr-2">•</span> Reduced post-harvest losses from 35% to 15%</li>
          </ul>

        {/* Upcoming Activities */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex gap-4 items-center"> <ClipboardListIcon size={24} className="mr-2 text-[#f8982a]" />Upcoming Activities</h2>
          <ul className="text-gray-700 space-y-2">
            <li className='border-l-4 border-green-600 pl-4 py-1 '> 
                <h3>Monthly Member Meeting </h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-2'>
                        <CalendarIcon size={17} />
                        <p className='text-sm'>Every last Friday</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <MapPinIcon size={17} />
                        <p className='text-sm'>Kano Agricultural Center</p>
                    </span>
                </div>
            </li>
            <li className='border-l-4 border-green-600 pl-4 py-1 '> 
                <h3>Training Workshop </h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-2'>
                        <CalendarIcon size={17} />
                        <p className='text-sm'>June 15, 2023</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <MapPinIcon size={17} />
                        <p className='text-sm'>Kano Agricultural Center</p>
                    </span>
                </div>
            </li>
            <li className='border-l-4 border-green-600 pl-4 py-1 '> 
                <h3>Bulk Purchase of Inputs </h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-2'>
                        <CalendarIcon size={17} />
                        <p className='text-sm'>July 1, 2023</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <MapPinIcon size={17} />
                        <p className='text-sm'>Various Locations</p>
                    </span>
                </div>
            </li>
          </ul>
        </section>

        {/* Leadership Team */}
        <section className="p-6 bg-white rounded-lg shadow-md mx-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Ibrahim Mohammed', role: 'Chairperson', image: '/assets/ibrahim.jpg' },
              { name: 'Aisha Bello', role: 'Secretary', image: '/assets/aisha.jpg' },
              { name: 'Hassan Musa', role: 'Treasurer', image: '/assets/hassan.jpg' },
            ].map((leader, index) => (
              <div key={index} className="text-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
                />
                <h3 className="text-md font-semibold text-gray-800">{leader.name}</h3>
                <p className="text-sm text-gray-600">{leader.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="p-6 bg-white rounded-lg shadow-md mx-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
          <ul className="text-gray-700 space-y-2">
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <PhoneIcon size={20} />
                </div>
                <span>
                    <p className='text-sm'>Phone</p>
                    <strong>+234 800 123 4567</strong>
                </span>
            </li>
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <MailIcon size={20} />
                </div>
                <span>
                    <p className='text-sm'>Email</p>
                    <strong>info@horticluster.org</strong>
                </span>
            </li>
            <li className='flex gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <MapPinIcon size={20} />
                </div>
                <span>
                    <p className='text-sm'>Location</p>
                    <strong>Kano State</strong>
                </span>
            </li>
          </ul>
          <IonButton expand="block" color="primary" className='mt-4'>Join This Cluster</IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default KanoTomatoCluster;
