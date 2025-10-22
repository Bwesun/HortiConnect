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
  setupIonicReact,
  useIonToast
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { HomeIcon, LayoutDashboard, Network, ShoppingCart, User } from "lucide-react";
import { App as CapacitorApp } from '@capacitor/app';

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
import { useEffect, useRef } from 'react';
import { StatusBar, Style } from "@capacitor/status-bar"
import Dashboard from './pages/admin/Dashboard';
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
import ManageUsers from './pages/admin/Users';
import ManageClusters from './pages/admin/Clusters';
import KnowledgeHub from './pages/KnowledgeHub';
import KnowledgeEditor from './pages/admin/KnowledgeEditor';
import Communication from './pages/Communication';
import ManageGroups from './pages/admin/Groups';
import Chat from './pages/Chat';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import VerifyOtpPage from './pages/auth/passwordreset/VerifyOPT';
import ResetPasswordPage from './pages/auth/passwordreset/ResetPaswordPage';


setupIonicReact();

const App: React.FC = () => {
  const { isLoading } = useAuth();
  const [present] = useIonToast();
  const location = useLocation();
  const lastBackPress = useRef<number>(0);

  // HANDLE ANDROID BACK BUTTON
  useEffect(() => {
    const handler = CapacitorApp.addListener('backButton', () => {
      const currentTime = new Date().getTime();
      const isAtRoot = ['/home', '/'].includes(location.pathname);

      if (isAtRoot) {
        if (currentTime - lastBackPress.current < 2000) {
          CapacitorApp.exitApp(); // Exit the app
        } else {
          lastBackPress.current = currentTime;

          // Trigger vibration
          Haptics.impact({ style: ImpactStyle.Medium });

          // Show toast
          present({
            message: 'Press back again to exit',
            duration: 2000,
            position: 'bottom',
          });
        }
      } else {
        window.history.back(); // Navigate back
      }
    });

    return () => {
      CapacitorApp.removeAllListeners(); // Clean up listener
    };
  }, [location.pathname, present]);

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
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const showTabBar = !['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/knowledgehub" component={KnowledgeHub} />
        <Route exact path="/verify-otp" component={VerifyOtpPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />

        <PrivateRoute exact path="/clusters" component={ClusterDirectory} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/viewcluster/:id" component={ViewCluster} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/marketplace" component={MarketPlace} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/contactseller/:id" component={ContactSeller} isAuthenticated={isAuthenticated} />
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} /> */}
        <PrivateRoute exact path="/viewprofile/:id" component={ViewProfile} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/communication' component={Communication} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/chat/:id' component={Chat} isAuthenticated={isAuthenticated} />

        {/* ADMIN */}
        <PrivateRoute exact path='/admin/dashboard' component={Dashboard} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/users' component={ManageUsers} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/clusters' component={ManageClusters} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/knowledge' component={KnowledgeHub} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/knowledge/create' component={KnowledgeEditor} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/knowledge/edit/:id' component={KnowledgeEditor} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path='/admin/groups' component={ManageGroups} isAuthenticated={isAuthenticated} />



        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      {showTabBar && (
        <IonTabBar slot="bottom">
          {user?.role === 'admin' ? (
            <IonTabButton tab="home" href="/admin/dashboard">
              <LayoutDashboard size={20} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
          ) : (
            <IonTabButton tab="home" href="/home">
              <HomeIcon size={20} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
          )}
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
