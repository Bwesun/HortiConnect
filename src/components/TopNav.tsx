import { IonButton, IonIcon, IonImg, IonText } from "@ionic/react";
import React from "react";
import Logo from '../../public/favicon.png'
import { notifications, person } from "ionicons/icons";

const TopNav: React.FC = () => {
    return ( 
        <div className="flex justify-between items-center px-2 md:px-8 lg:px-18" style={{
            background: 'var(--ion-color-light)'
        }}>
            <div className=" flex items-center gap-4">
                <IonImg src={Logo} />
                <IonText className="text-lg" color="primary">HortiConnect</IonText>
            </div>
            <div className="flex justify-end items-center">
                
                    <div className="flex gap-2">
                        <IonButton size="large" fill="clear" shape="round">
                            <IonIcon icon={notifications} slot="icon-only" size="medium" />
                        </IonButton>
                    </div>
            </div>
        </div>
     );
}
 
export default TopNav;