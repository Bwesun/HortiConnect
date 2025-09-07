import { IonButton, IonContent, IonPage } from "@ionic/react";
import { ArrowRightIcon, BarChartIcon, BookOpenIcon, CreditCardIcon, MessageSquareIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";

const Home: React.FC = () => {

    const features = [
        {
            title: 'Cluster Directory',
            icon: <UsersIcon size={24} />,
            description:
                'Access profiles of clusters, value chain focus, membership, and contacts.',
            link: '/directory',
        },
        {
            title: 'Marketplace',
            icon: <ShoppingCartIcon size={24} />,
            description:
                'Post and find supply and demand for fresh produce, inputs, and services.',
            link: '/marketplace',
        },
        {
            title: 'Knowledge Hub',
            icon: <BookOpenIcon size={24} />,
            description:
                'Access multimedia resources on horticultural practices and business skills.',
            link: '/knowledge-hub',
        },
        {
            title: 'Communication',
            icon: <MessageSquareIcon size={24} />,
            description:
                'Engage in chat groups, receive alerts, and view event calendars.',
            link: '/communication',
        },
        // {
        //     title: 'Monitoring Dashboard',
        //     icon: <BarChartIcon size={24} />,
        //     description: 'Track production, sales, losses, and impact metrics.',
        //     link: '/dashboard',
        // },
    ]
    return ( 
        <IonPage>
            <IonContent fullscreen>
                <TopNav />
                <div className="m-2">
                    <section className="relative rounded-2xl overflow-hidden mb-8">
                        <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                            "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
                        }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-[#f8982a]/70"></div>
                        <div className="relative text-white p-6 md:p-8 lg:p-10">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Welcome to HortiNigeria Agribusiness Clusters
                            </h1>
                            <p className="text-lg mb-6">
                            Connecting farmers, processors, agrodealers, and service providers
                            to foster collaboration, innovation, and inclusive market
                            development in Nigeria's horticulture sector.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <IonButton routerLink="/clusters" shape="round" color="light" className="font-bold">
                                    <p style={{ color: "#f8921d" }}>Explore Clusters</p>
                                </IonButton>
                                <IonButton routerLink="/marketplace" shape="round" color="light" fill="outline" className="font-bold hover:bg-gray-50 hover:rounded-2xl ">
                                    <span className="hover:text-amber-500">Visit Marketplace</span>
                                </IonButton>
                            </div>
                        </div>
                        </div>
                    </section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="h-12 w-12 rounded-full bg-[#f8982a] bg-opacity-20 text-[#f8982a]/ flex items-center justify-center mb-4 text-white">
                            {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{feature.description}</p>
                            <Link
                            to={feature.link}
                            className="inline-flex items-center text-[#f8982a] font-medium"
                            >
                            Explore <ArrowRightIcon size={16} className="ml-1" />
                            </Link>
                        </div>
                        ))}
                    </div>
                    <section className="bg-gray-100 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        About HortiNigeria
                        </h2>
                        <p className="text-gray-700 mb-4">
                        HortiNigeria, funded by the Embassy of the Kingdom of the Netherlands
                        and implemented by IFDC and partners, is strengthening Nigeria's
                        horticulture sector by improving productivity, incomes, and
                        sustainability for smallholder and entrepreneurial farmers.
                        </p>
                        <p className="text-gray-700">
                        Our Agribusiness Cluster (ABC) approach brings together various
                        stakeholders to foster collaboration, innovation, and inclusive market
                        development in Kano and Kaduna states.
                        </p>
                    </section>
                </div>
            </IonContent>
        </IonPage>
     );
}
 
export default Home;