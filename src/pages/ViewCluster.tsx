import { IonButton, IonContent, IonPage } from '@ionic/react';
import { CalendarIcon, ClipboardListIcon, Contact, ContactIcon, MailIcon, MapPinIcon, PhoneIcon, TrendingUpIcon, UserIcon, UsersIcon } from 'lucide-react';

const KanoTomatoCluster: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        {/* Header Section */}
        <div className="relative h-48 sm:h-62 w-full rounded-t-lg overflow-hidden sm:mb-4 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className=""><span className='text-xl sm:text-3xl font-semibold sm:font-bold'>Kano Tomato Growers</span> </h1>
            <div className="mt-2 flex gap-2 text-xs sm:text-sm">
              <span className="bg-red-400 px-3 py-1 rounded-full">Tomato</span>
              <span className="bg-green-600 px-3 py-1 rounded-full flex gap-1"><MapPinIcon size={18} /> Kano State</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="p-2 sm:p-6">
          <h2 className=""><span className='sm:text-2xl text-xl font-semibold text-gray-800 sm:mb-2'>About the Cluster</span> </h2>
          <p className="text-gray-700 text-sm sm:text-lg">
            The Kano Tomato Growers cluster brings together tomato farmers in Kano State to improve productivity, market access, and sustainability. The cluster provides production and marketing support and connects members to buyers and processors.
          </p>
        </section>

        {/* Cluster Details */}
        <section className="p-2 sm:p-6 bg-white rounded-lg shadow-md mx-2 sm:mx-4 mb-6">
          <ul className="text-gray-700 sm:space-y-2 flex flex-wrap sm:justify-around gap-2 sm:gap-4 mb-4 sm:mb-8">
            <li className='flex items-center'>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                    <UsersIcon size={20} />
                </div>
                <span>
                    <strong className='text-sm sm:text-lg'>Members:</strong>
                    <p className='text-sm sm:text-lg'>125</p>
                </span>
            </li>
            <li className='flex items-center'>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                    <CalendarIcon size={20} />
                </div>
                <span>
                    <strong className='text-sm sm:text-lg'>Established:</strong>
                    <p className='text-sm sm:text-lg'>January 2020</p>
                </span>
            </li>
            <li className='flex items-center'>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-1 sm:mr-3">
                    <UserIcon size={20} />
                </div>
                <span>
                    <strong className='text-sm sm:text-lg'>Chairperson:</strong>
                    <p className='text-sm sm:text-lg'>Ibrahim Mohammed</p>
                </span>
            </li>
          </ul>

        {/* Key Achievements */}
          <h2><span className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4 flex gap-4"><TrendingUpIcon size={24} className='text-[#fc9219]' /> Key Achievements</span> </h2>
          <ul className=" text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-4">
            <li className='text-sm sm:text-lg'><span className="text-green-600 mr-2">•</span> Increased average yields by 30% in the past year</li>
            <li className='text-sm sm:text-lg'><span className="text-green-600 mr-2">•</span> Secured direct market linkages with 5 major processors</li>
            <li className='text-sm sm:text-lg'><span className="text-green-600 mr-2">•</span> Secured affordable financing for 70% of members</li>
            <li className='text-sm sm:text-lg'><span className="text-green-600 mr-2">•</span> Reduced post-harvest losses from 35% to 15%</li>
          </ul>

        {/* Upcoming Activities */}
          <h2> <span className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4 flex gap-1 sm:gap-4 items-center"> <ClipboardListIcon size={24} className="mr-2 text-[#f8982a]" />Upcoming Activities</span></h2>
          <ul className="text-gray-700 space-y-2">
            <li className='border-l-4 border-green-600 pl-4 py-0.5 sm:py-1 '> 
                <h3><span className='text-lg sm:text-2xl'>Monthly Member Meeting</span> </h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <CalendarIcon size={15} />
                        <p className='text-xs sm:text-sm'>Every last Friday</p>
                    </span>
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <MapPinIcon size={15} />
                        <p className='text-xs sm:text-sm'>Kano Agricultural Center</p>
                    </span>
                </div>
            </li>
            <li className='border-l-4 border-green-600 pl-4 py-1 '> 
                <h3><span className='text-lg sm:text-2xl'>Training Workshop </span></h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <CalendarIcon size={15} />
                        <p className='text-xs sm:text-sm'>June 15, 2023</p>
                    </span>
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <MapPinIcon size={15} />
                        <p className='text-xs sm:text-sm'>Kano Agricultural Center</p>
                    </span>
                </div>
            </li>
            <li className='border-l-4 border-green-600 pl-4 py-1 '> 
                <h3><span className='text-lg sm:text-2xl'>Bulk Purchase of Inputs </span></h3>
                <div className='flex items-center gap-2'> 
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <CalendarIcon size={15} />
                        <p className='text-xs sm:text-sm'>July 1, 2023</p>
                    </span>
                    <span className='flex items-center gap-1 sm:gap-2'>
                        <MapPinIcon size={15} />
                        <p className='text-xs sm:text-sm'>Various Locations</p>
                    </span>
                </div>
            </li>
          </ul>
        </section>

        {/* Leadership Team */}
        {/* <section className="p-6 bg-white rounded-lg shadow-md mx-4 mb-6">
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
        </section> */}

        {/* Contact Information */}
        <section className="p-2 sm:p-6 bg-white rounded-lg shadow-md mx-2 sm:mx-2 mb-4 sm:mb-6">
          <h2><span className="text-lg font-semibold text-gray-800 mb-4 flex gap-2 sm:gap-4 items-center"><ContactIcon size={24} className='text-[#fc9219] mr-2' /> Contact Information</span> </h2>
          <ul className="text-gray-700 space-y-1 sm:space-y-2">
            <li className='flex gap-1 sm:gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <PhoneIcon size={20} />
                </div>
                <span>
                    <p className='text-xs sm:text-sm'>Phone</p>
                    <strong className='text-sm sm:text-lg'>+234 800 123 4567</strong>
                </span>
            </li>
            <li className='flex gap-1 sm:gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <MailIcon size={20} />
                </div>
                <span>
                    <p className='text-xs sm:text-sm'>Email</p>
                    <strong className='text-sm sm:text-lg'>info@horticluster.org</strong>
                </span>
            </li>
            <li className='flex gap-1 sm:gap-4 items-center'>
                <div className="w-10 h-10 rounded-full bg-[#f5e3ce] bg-opacity-20 text-[#fc9219] flex items-center justify-center mr-3">
                    <MapPinIcon size={20} />
                </div>
                <span>
                    <p className='text-xs sm:text-sm'>Location</p>
                    <strong className='text-sm sm:text-lg'>Kano State</strong>
                </span>
            </li>
          </ul>
          <IonButton expand="block" color="primary" className='mt-4 sm:block hidden'>Join This Cluster</IonButton>
          <IonButton expand="block" size='small' color="primary" className='mt-4 sm:hidden block'>Join This Cluster</IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default KanoTomatoCluster;
