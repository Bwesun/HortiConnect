import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonInput,
  IonTextarea,
  IonText,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingBag, Tag, Truck } from "lucide-react";
import TopNav from "../components/TopNav";
import { add } from "ionicons/icons";
import { useAuth } from "../contexts/AuthContext";
// import './marketplace.css';

type Listing = {
  id: number;
  title: string;
  category: string;
  price: string;
  location: string;
  image: string | 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80';
  type?: 'buy' | 'sell';
  buyer_name?: string;
  buyer_id?: string;
  seller_name?: string;
  seller_id?: string;
  contact?: string;
  description?: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT = 10; // items per page


const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // modal + create listing state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Produce",
    price: "",
    location: "",
    image: "",
    contact: "",
    description: "",
    type: "sell", // <-- added: choose buy or sell
  });

  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // fetch listings from backend on mount / when filters change / page changes
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(LIMIT));
        if (searchTerm) params.set("q", searchTerm);
        if (categoryFilter && categoryFilter !== "all") params.set("category", categoryFilter);
        // send the listing type so backend can filter by 'buy' or 'sell'
        params.set("type", activeTab);

        const res = await fetch(`${API_URL}/listings?${params.toString()}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error(`Failed to load listings (${res.status})`);
        const payload = await res.json();
        const rows = Array.isArray(payload?.data) ? payload.data : [];
        const total = Number(payload?.total ?? rows.length);
        setListings(rows);
        setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch listings error:", err);
        setLoading(false);
      }
    };
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, categoryFilter, activeTab]);

  // when user changes search/category/tab, reset to first page
  useEffect(() => setPage(1), [searchTerm, categoryFilter, activeTab]);

  // filter listings based on active tab, search term, and category
  const filteredListings = listings
    .filter((l) => (l.type ?? 'sell') === activeTab) // filter by buy/sell type selected in tabs
    .filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || listing.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

  const handleFormChange = (key: keyof typeof form, value: any) => {
    setForm((s) => ({ ...s, [key]: value }));
  };

  // send listing to backend and add to local state on success
  const handleCreateListing = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!form.title.trim() || !form.price.trim()) {
      setErrorMsg("Title and price are required.");
      return;
    }
    setIsSubmitting(true); // prevent multiple submissions
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          price: form.price,
          location: form.location || null,
          image: form.image || null,
          contact: form.contact || null,
          description: form.description || null,
          type: form.type, // send type to backend
          seller_name: form.type === 'sell' ? (user?.name ?? "You") : null,
          buyer_name: form.type === 'buy' ? (user?.name ?? "You") : null,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Failed to create listing (${res.status})`);
      }

      const payload = await res.json();
      const created: Listing = payload?.data ?? payload?.listing ?? payload;

      // ensure minimal normalization
      const normalized: Listing = {
        id: created.id ?? Date.now(),
        title: created.title ?? form.title,
        category: created.category ?? form.category,
        price: created.price ?? form.price,
        location: created.location ?? form.location ?? "Unknown",
        image: created.image ?? form.image ?? "https://via.placeholder.com/400x300?text=No+Image",
        type: (created.type as any) ?? form.type,
        seller_name: (created as any).seller_name ?? (form.type === 'sell' ? user?.name ?? "You" : undefined),
        seller_id: (created as any).seller_id ?? undefined,
        buyer_name: (created as any).buyer_name ?? (form.type === 'buy' ? user?.name ?? "You" : undefined),
        buyer_id: (created as any).buyer_id ?? undefined,
        contact: created.contact ?? form.contact ?? undefined,
        description: created.description ?? form.description ?? undefined,
      };

      setListings((s) => [normalized, ...s]);
      setSuccessMsg("Listing created");
      // reset form and close modal
      setForm({
        title: "",
        category: "Produce",
        price: "",
        location: "",
        image: "",
        contact: "",
        description: "",
        type: "sell",
      });
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message.message ?? "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // format price with commas
  const formatCurrency = (value: string) => {
    // Remove any non-numeric characters except for decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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
            <IonLabel className="text-xs sm:text-sm" color={"primary"}>Buy Products & Services</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sell">
            <Tag size={18} className="text-amber-700" />
            <IonLabel className="text-xs sm:text-sm" color="primary">Sell Requests</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="flex items-end mb-2 sm:mb-4 justify-center p-2">
          {/* Filters */}
          <IonSearchbar
          className="sm:flex-1 border-b border-b-gray-200 rounded"
            placeholder="Search marketplace"
            color={"light"}
            mode="ios"
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)}
          />

          <IonSelect className="flex-3 sm:flex-1 ml-2 sm:ml-4 border-b border-b-gray-200 rounded"
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
                        <IonItem className="w-full" lines="none" routerLink={`/viewprofile/${activeTab === "buy" ? listing.buyer_id : listing.seller_id}`} key={listing.id}>
                            <div className="flex flex-wra w-full h-42 md:h-44 lg:h-48  rounded-2xl shadow-md transition-transform duration-200 hover:-translate-y-1 bg-white mb-3 overflow-hidden">
                              {/* Image */}
                              <div className="w-32 sm:w-43 h-full md:w-40 md:h-48">
                                  <img
                                  src={listing.image || 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'}
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
                                ₦{formatCurrency(listing.price)}
                                </p>

                                <div className="flex items-center text-gray-500 text-sm  mt-1">
                                <Truck size={16} className="mr-1" />
                                {listing.location}
                                </div>

                                <p className="text-sm text-gray-600 mt-1">
                                {activeTab === "buy" ? "Buyer: " : "Seller: "}
                                <span className="font-semibold">
                                    {listing.buyer_name || listing.seller_name || "N/A"}
                                </span>
                                </p>
                                <IonButton routerLink={`/viewprofile/${activeTab === "buy" ? listing.buyer_id : listing.seller_id}`}>{activeTab === "buy" ? "Contact Buyer" : "Contact Seller"}</IonButton>
                            </div>
                            </div>
                        </IonItem>

                ))}
                </div>
                </IonRow>
            </IonGrid>
        ) : loading ? (
          <IonCard>
            <IonCardContent className="ion-text-center ">
              <IonSpinner name="crescent" color={"primary"} />
              <p>Please wait, loading listings...</p>
            </IonCardContent>
          </IonCard>
        ) : filteredListings.length === 0 && !loading ? (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <IonText>No listings found.</IonText>
            </IonCardContent>
          </IonCard>
        )  : null }

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 sm:px-6 py-1 sm:py-3 text-amber-600 rounded disabled:opacity-50"
          >
            <ChevronLeftIcon size={16} className="inline mr-2" />
            Prev
          </button>
          <div className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 sm:px-6 py-1 sm:py-3 text-amber-600 rounded disabled:opacity-50"
          >
            Next
            <ChevronRightIcon size={16} className="inline ml-2" />
          </button>
        </div>

        {/* FLOATING BUTTON */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-2 sm:mb-8 mr-4 sm:mr-8">
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        {/* Create Listing Modal */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonContent>
            <div className="max-w-2xl mx-auto  p-6 rounded-md bg-white  shadow">
              <IonText color="primary" className="text-lg font-semibold mb-3">Create Listing</IonText>
              <IonText className="text-sm text-gray-600 mb-4 block">
                Fill in the details below to create a new marketplace listing.
              </IonText>
              {errorMsg && <div className="mb-2 text-sm text-red-600">{errorMsg}</div>}
              {successMsg && <div className="mb-2 text-sm text-green-600">{successMsg}</div>}
              <div className="space-y-3">
                <IonItem lines="none">
                  <IonInput
                    placeholder="Title"
                    value={form.title}
                    onIonInput={(e: any) => handleFormChange("title", e.target?.value ?? e.detail?.value)}
                  />
                </IonItem>
                <IonItem lines="none">
                  <IonSelect value={form.category} placeholder="Category" onIonChange={(e) => handleFormChange("category", e.detail.value)}>
                    <IonSelectOption value="Produce">Produce</IonSelectOption>
                    <IonSelectOption value="Inputs">Inputs</IonSelectOption>
                    <IonSelectOption value="Services">Services</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem lines="none">
                  <IonInput placeholder="Price (e.g. ₦5,000 per crate)" value={form.price} onIonInput={(e: any) => handleFormChange("price", e.target?.value ?? e.detail?.value)} />
                </IonItem>
                <IonItem lines="none">
                  <IonInput placeholder="Location" value={form.location} onIonInput={(e: any) => handleFormChange("location", e.target?.value ?? e.detail?.value)} />
                </IonItem>
                <IonItem lines="none">
                  <IonInput placeholder="Image URL" value={form.image} onIonInput={(e: any) => handleFormChange("image", e.target?.value ?? e.detail?.value)} />
                </IonItem>
                <IonItem lines="none">
                  <IonInput placeholder="Contact" value={form.contact} onIonInput={(e: any) => handleFormChange("contact", e.target?.value ?? e.detail?.value)} />
                </IonItem>
                <IonItem lines="none">
                  <IonTextarea placeholder="Description" value={form.description} onIonInput={(e: any) => handleFormChange("description", e.target?.value ?? e.detail?.value)} />
                </IonItem>
                <IonItem lines="none">
                  <IonSelect value={form.type} placeholder="Listing Type" onIonChange={(e) => handleFormChange("type", e.detail.value)}>
                    <IonSelectOption value="sell">Sell (I'm selling)</IonSelectOption>
                    <IonSelectOption value="buy">Buy (I'm looking to buy)</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <IonButton color="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</IonButton>
                <IonButton color="primary" onClick={handleCreateListing} disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* TOAST */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  )};
  
  export default Marketplace;
