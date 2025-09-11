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
} from "@ionic/react";
import { Link } from "react-router-dom";
import { ShoppingBag, Tag, Truck } from "lucide-react";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Marketplace</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Tabs */}
        <IonSegment
          value={activeTab}
          onIonChange={(e) => setActiveTab(e.detail.value as string)}
        >
          <IonSegmentButton value="buy">
            <ShoppingBag size={18} />
            <IonLabel>Buy Products & Services</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sell">
            <Tag size={18} />
            <IonLabel>Sell Requests</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Filters */}
        <IonSearchbar
          placeholder="Search marketplace"
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
        />

        <IonSelect
          value={categoryFilter}
          placeholder="Filter by Category"
          onIonChange={(e) => setCategoryFilter(e.detail.value)}
        >
          <IonSelectOption value="all">All Categories</IonSelectOption>
          <IonSelectOption value="Produce">Produce</IonSelectOption>
          <IonSelectOption value="Inputs">Inputs</IonSelectOption>
          <IonSelectOption value="Services">Services</IonSelectOption>
        </IonSelect>

        {/* Listings */}
        {filteredListings.length > 0 ? (
          <IonGrid>
            <IonRow>
              {filteredListings.map((listing) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={listing.id}>
                  <IonCard>
                    <IonImg src={listing.image} alt={listing.title} />
                    <IonCardHeader>
                      <IonCardTitle>{listing.title}</IonCardTitle>
                      <IonCardSubtitle>{listing.category}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText color="dark">
                        <h2>{listing.price}</h2>
                      </IonText>
                      <div className="flex items-center">
                        <Truck size={16} />
                        <IonText className="ion-margin-start">
                          {listing.location}
                        </IonText>
                      </div>
                      <p>
                        {activeTab === "buy" ? "Seller: " : "Buyer: "}
                        <strong>
                          Innocure
                        </strong>
                      </p>

                      <Link
                        to={`/marketplace/contact/`}
                      >
                        <IonButton expand="block" color="success">
                          {activeTab === "buy"
                            ? "Contact Seller"
                            : "Contact Buyer"}
                        </IonButton>
                      </Link>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
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
