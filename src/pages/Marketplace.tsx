import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonImg,
  IonText,
  IonItem,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { ShoppingBag, Tag, Truck } from "lucide-react";
import TopNav from "../components/TopNav";
// import './marketplace.css';

const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for marketplace listings
  const listings = {
    buy: [
      {
        id: 1,
        title: "Premium Tomatoes",
        category: "Produce",
        price: "₦5,000 per crate",
        location: "Kano",
        seller: "Ibrahim Farms",
        sellerId: "ibrahim-farms",
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        title: "Organic Peppers",
        category: "Produce",
        price: "₦3,500 per bag",
        location: "Kaduna",
        seller: "Green Valley Farms",
        sellerId: "green-valley",
        image:
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 3,
        title: "NPK Fertilizer",
        category: "Inputs",
        price: "₦15,000 per 50kg",
        location: "Kano",
        seller: "AgriSupplies Ltd",
        sellerId: "agri-supplies",
        image:
          "https://images.unsplash.com/photo-1615640325997-31b4aac21778?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 4,
        title: "Tractor Services",
        category: "Services",
        price: "₦25,000 per hectare",
        location: "Kaduna",
        seller: "Modern Agric Services",
        sellerId: "modern-agric",
        image:
          "https://images.unsplash.com/photo-1588751049611-ef43ff18dc15?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
    ],
    sell: [
      {
        id: 5,
        title: "Looking for Quality Onions",
        category: "Produce",
        price: "₦4,000 per bag",
        location: "Kano",
        buyer: "Northern Processors Ltd",
        buyerId: "northern-processors",
        image:
          "https://images.unsplash.com/photo-1618512496248-a4e1f96a5e00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 6,
        title: "Seeking Fresh Vegetables",
        category: "Produce",
        price: "Negotiable",
        location: "Kaduna",
        buyer: "Fresh Foods Market",
        buyerId: "fresh-foods",
        image:
          "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
    ],
  };

  const filteredListings = listings[activeTab === "buy" ? "buy" : "sell"].filter(
    (listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || listing.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }
  );

  return (
    <IonPage>
      <IonContent className="" fullscreen>
        <TopNav />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-2 sm:ml-4">Marketplace</h2>
        {/* Tabs */}
        <IonSegment color={"primary"}
          value={activeTab}
          onIonChange={(e) => setActiveTab(e.detail.value as string)}
        >
          <IonSegmentButton value="buy">
            <ShoppingBag size={18} className="text-amber-700" />
            <IonLabel color={"primary"}>Buy Products & Services</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sell">
            <Tag size={18} className="text-amber-700" />
            <IonLabel color="primary">Sell Requests</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="flex items-end mb-2 sm:mb-4 justify-center p-2">
          {/* Filters */}
          <IonSearchbar
          className="sm:flex-1"
            placeholder="Search marketplace"
            color={"light"}
            mode="ios"
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)}
          />

          <IonSelect className="flex-3 sm:flex-1 ml-2 sm:ml-4"
            color={"primary"}
            value={categoryFilter}
            placeholder="Filter by Category"
            onIonChange={(e) => setCategoryFilter(e.detail.value)}
          >
            <IonSelectOption value="all">All Categories</IonSelectOption>
            <IonSelectOption value="Produce">Produce</IonSelectOption>
            <IonSelectOption value="Inputs">Inputs</IonSelectOption>
            <IonSelectOption value="Services">Services</IonSelectOption>
          </IonSelect>
          
        </div>

        {/* Listings */}
        {filteredListings.length > 0 ? (
            <IonGrid>
                <IonRow className="">
                    <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 mt-4">
                    {filteredListings.map((listing) => (
                        <IonItem className="w-full" lines="none" routerLink="/contactseller/2" key={listing.id}>
                            <div className="flex flex-wra w-full h-42 md:h-44 lg:h-48  rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-1 bg-white mb-3 overflow-hidden">
                              {/* Image */}
                              <div className="w-38 h-full md:w-40 md:h-48">
                                  <img
                                  src={listing.image}
                                  alt={listing.title}
                                  className="w-full h-full object-cover"
                                  />
                              </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-2 sm:p-4">
                                {/* <span className="sm:flex hidden text-sm font-semibold text-gray-900"> {listing.title}</span> */}
                                <span className="text-sm font-semibold text-gray-900"> {listing.title}</span>
                                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded mt-1">
                                {listing.category}
                                </span>

                                <p className="text-sm sm:text-lg font-semibold text-gray-800 mt-1">
                                {listing.price}
                                </p>

                                <div className="flex items-center text-gray-500 text-sm  mt-1">
                                <Truck size={16} className="mr-1" />
                                {listing.location}
                                </div>

                                <p className="text-sm text-gray-600 mt-1">
                                {activeTab === "buy" ? "Seller: " : "Buyer: "}
                                <span className="font-semibold">
                                    Censono Tech Ltd
                                </span>
                                </p>
                                <IonButton routerLink="/contactseller/1">Contact Seller</IonButton>
                            </div>
                            </div>
                        </IonItem>

                ))}
                </div>
                </IonRow>
            </IonGrid>
        ) : (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <IonText>No listings found matching your criteria.</IonText>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Marketplace;
