import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage, IonText } from "@ionic/react";
import React from "react";
import TopNav from "../components/TopNav";
import { ChartBar, Cog, Rainbow } from "lucide-react";

const Dashboard: React.FC = () => {
    return ( 
        <IonPage>
            <IonContent fullscreen>
                <TopNav />
                <div className="m-2">
                    <p className="font-bold text-2xl" style={{
                        color: 'var(--ion-color-dark)',
                    }}>Good morning, Sarah!</p>
                </div>
                <div className="m-2 mt-4">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:justify-center gap-4">
                        <IonCard color={"tertiary"} className="p-2">
                                <IonText className="font-bold text-xs" color={"dark"}>My farm Overview</IonText>
                            <IonCardContent className="ion-no-padding">
                                <Rainbow size={32} style={{
                                    color: 'var(--ion-color-secondary)'
                                }} />
                                <IonText>Upcoming Task: Fertilize com</IonText>
                            </IonCardContent>
                        </IonCard>
                        <IonCard color={"light"} className="p-2">
                                <IonText className="font-bold text-xs" color={"dark"}>Investment Watchlist</IonText>
                            <IonCardContent className="ion-no-padding">
                                <ChartBar size={32} className="" style={{
                                    color: 'var(--ion-color-primary)'
                                }} />
                                <IonText>Upcoming Task: Fertilize com</IonText>
                            </IonCardContent>
                        </IonCard>
                        <IonCard color={"light"} className="p-2">
                                <IonText className="font-bold text-xs" color={"dark"}>My Services</IonText>
                            <IonCardContent className="ion-no-padding">
                                <Cog size={32} style={{
                                    color: 'var(--ion-color-danger)'
                                }} />
                                <IonText>Upcoming Task: Fertilize com</IonText>
                            </IonCardContent>
                        </IonCard>
                    </div>
                </div>
                <div className="m-2 pt-4">
                    <IonText color={"dark"} className="font-bold text-xl">News and Updates Feed</IonText>
                    <div className="">
                        <IonCard color={"light"} className="w-48 p-2">
                            <IonText className="font-bold text-xs" color={"dark"}>My farm Overview</IonText>
                        <IonCardContent className="ion-no-padding">
                            <Rainbow size={32} className="text-amber-500" />
                            <IonText>Upcoming Task: Fertilize com</IonText>
                        </IonCardContent>
                    </IonCard>
                    </div>
                </div>
            </IonContent>
        </IonPage>
     );
}
 
export default Dashboard;