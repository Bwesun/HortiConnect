import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import TopNav from '../components/TopNav';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <TopNav />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
