import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";
import LogoImage from "../../assets/hortiLogo.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();

  useEffect(() => {
  if (isAuthenticated) {
    console.log("User is authenticated");
    history.replace("/home");
  }
}, [isAuthenticated, history]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const loggedInUser = await login(email, password);
      console.log("Login successful:", loggedInUser);
      console.log('Token:', localStorage.getItem('token'));
      history.replace("/home");
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Failed to login. Please check your credentials.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="max-w-2xl mx-auto sm:my-10 p-6  bg-white h-full sm:h-auto shadow">
          <IonImg src={LogoImage} alt="HortiConnect Logo" className="mx-auto h-44" />
      <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
        Create HortiConnect Account
      </h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircleIcon size={20} className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IonItem lines="none">
              <IonInput
                type="email"
                label="Email Address"
                labelPlacement="floating"
                value={email}
                color={"primary"}
                onIonInput={(e) => setEmail(e.detail.value!)}
                required
                className=""
              />
            </IonItem>
          
          <IonItem lines="none">
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                value={password}
                color={"primary"}
                onIonInput={(e) => setPassword(e.detail.value!)}
                required
                className=""
              />
            </IonItem>
        </div>
        <IonButton
          expand="block"
          type="submit"
          fill="clear"
          className="bg-gradient-to-r"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </IonButton>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/register" className="text-[#f8982a] hover:underline">
          Register
        </Link>
      </p>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
