import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import { HomeIcon, LayoutDashboard, Network, ShoppingCart, User } from "lucide-react";

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
import MarketPlace from './pages/Marketplace';
import ContactSeller from './pages/ContactSeller';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { useAuth } from './contexts/AuthContext';
import LogoImage from "./assets/hortiLogo.png";
import ViewProfile from './pages/ViewProfile';


setupIonicReact();

const App: React.FC = () => {
  const { isLoading } = useAuth();
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

  if (isLoading) {
    return (
      <div className='flex items-center flex-col justify-center h-screen bg-white gap-4'>
        <IonImg src={LogoImage} alt='HortiNg Logo' className="mx-auto h-32" />
        <IonSpinner name='crescent' color={'primary'} />
      </div>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <AppContent />
      </IonReactRouter>
    </IonApp>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showTabBar = !['/login', '/register'].includes(location.pathname);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/home" component={Home} />
        <PrivateRoute exact path="/clusters" component={ClusterDirectory} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/viewcluster/:id" component={ViewCluster} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/marketplace" component={MarketPlace} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/contactseller/:id" component={ContactSeller} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/viewprofile/:id" component={ViewProfile} isAuthenticated={isAuthenticated} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      {showTabBar && (
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
      )}
    </IonTabs>
  );
};

interface PrivateRouteProps {
  component: React.FC<any>;
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default App;
