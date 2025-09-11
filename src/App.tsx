import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import { HomeIcon, LayoutDashboard, Network, ShoppingCart, User } from "lucide-react";
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import { StatusBar, Style } from "@capacitor/status-bar"
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ClusterDirectory from './pages/ClusterDirectory';
import ViewCluster from './pages/ViewCluster';
import Profile from './pages/Profile';

setupIonicReact();

const App: React.FC = () => {

  // SET STATUS BAR
  useEffect(() => {
    const setStatusBar = async () => {
      try {
        await StatusBar.setBackgroundColor({ color: "#15803d" });
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Default });
      } catch (error) {
        console.error("Error setting status bar:", error);
      }
    };

    setStatusBar();
  }, []);

  return(
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/clusters" component={ClusterDirectory} />
          <Route exact path="/viewcluster/:id" component={ViewCluster} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <HomeIcon size={20} />
            
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="marketplace" href="/marketplace">
            <ShoppingCart size={20} />
            <IonLabel>Marketplace</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clusters" href="/clusters">
            <Network size={20} />
            <IonLabel>Clusters</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <User size={20} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)};

export default App;
