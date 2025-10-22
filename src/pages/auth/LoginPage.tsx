import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonInputOtp,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";
import LogoImage from "../../assets/hortiLogo.png";
import { closeOutline, mailOutline } from "ionicons/icons";
import { requestReset, verifyOtp, resetPassword } from "../../services/resetPasswordAuth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const history = useHistory();
  
  const [resetEmail, setResetEmail] = useState("");
  const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  const [isForgetPasswordModal, setIsForgetPasswordModal] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      history.replace("/home");
    }
  }, [isLoading, isAuthenticated]);

  const handleResetPassword = async () => {
      if (!resetEmail) return setShowToast(true), setToastMessage('Enter your email');
      try {
        setIsLoadingReset(true);
        const res = await requestReset(resetEmail);
        setIsLoadingReset(false);
        // Backend returns generic message — treat as success for UX if status ok
        setShowToast(true), setToastMessage(res.message || 'If your email exists, an OTP was sent.'), setIsForgetPasswordModal(false);
        // Navigate to VerifyOtp page with email (even if email not registered, avoid enumeration)
        // setShowVerifyOtpModal(true);
        history.push('/verify-otp', { email: resetEmail });
      } catch (err) {
        setIsLoadingReset(false);
        setShowToast(true), setToastMessage('Error sending OTP');
      }
    };

  const handleResetOtp = async () => {
      if (!otp) return setShowToast(true), setToastMessage('Enter the OTP sent to your email');
      try {
        setIsLoadingReset(true);
        const res = await login(resetEmail, otp);
        setIsLoadingReset(false);
        // Redirect based on role
        if (res.role === "admin") {
          history.replace("/admin/dashboard");
        } else {
          history.replace("/home");
        }
      } catch (err: any) {
        setIsLoadingReset(false);
        setShowToast(true), setToastMessage(err.message.message || 'Failed to login. Please check your credentials.');
      }
    };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    try {
      const response = await login(email, password);
      // Redirect based on role
      if (response.role === "admin") {
        history.replace("/admin/dashboard");
      } else {
        history.replace("/home");
      }
      setLoading(false)
    } catch (err: any) {
      setToastMessage(err.message.message || "Failed to login. Please check your credentials.");
      setShowToast(true);
      setLoading(false)
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="max-w-2xl mx-auto sm:my-10 p-6  bg-white h-full sm:h-auto shadow">
          <IonImg src={LogoImage} alt="ABC Logo" className="mx-auto h-44" />
          <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
            Login 
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
              
              <div>
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
                {/* Forgot password link */}
                <div className="flex justify-end mt-2">
                  <Link to="#" onClick={() => setIsForgetPasswordModal(true)} className="text-sm text-[#f8982a] hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            <IonButton
              expand="block"
              type="submit"
              fill="clear"
              className="bg-gradient-to-r"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </IonButton>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/register" className="text-[#f8982a] hover:underline">
              Register
            </Link>
          </p>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="danger"
        />

        <IonModal isOpen={isForgetPasswordModal} initialBreakpoint={0.25} onDidDismiss={() => setIsForgetPasswordModal(false)}>
              <IonContent className="ion-padding">
                <div className="" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem"
                }}>
                  <IonTitle color={'primary'}>Reset Password</IonTitle>
                  <IonButtons slot="end">
                    <IonButton color={'primary'} onClick={() => setIsForgetPasswordModal(false)}>
                      <IonIcon icon={closeOutline} color="primary" slot="icon-only" />
                    </IonButton>
                  </IonButtons>
                </div>
                <div className="" style={{
                  }}
                  >
                    <IonItem lines="none" className="ion-margin-bottom">
                      <IonIcon icon={mailOutline} color="primary" slot="start" />
                      <IonInput
                        type="email"
                        placeholder="Enter your email for reset OTP"
                        value={resetEmail}
                        onIonInput={e => setResetEmail(e.detail.value!)}
                        disabled={isLoadingReset}
                        clearInput={true}
                      />
                    </IonItem>

                  {error && <IonText color="danger">{error}</IonText>}

                  <IonButton expand="block" onClick={handleResetPassword} className="ion-margin-top" disabled={isLoadingReset}>
                    {isLoadingReset ? "Sending..." : "Reset Password"}
                  </IonButton>
                </div>

                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={3000}
                  color="light"
                />
              </IonContent>
            </IonModal>

            {/* VERIFY OTP MODAL */}
            <IonModal isOpen={showVerifyOtpModal} initialBreakpoint={0.25} onDidDismiss={() => setShowVerifyOtpModal(false)}>
              <IonContent className="ion-padding">
                <div className="" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem"
                }}>
                  <IonTitle color={'primary'}>Verify OTP</IonTitle>
                  <IonButtons slot="end">
                    <IonButton color={'primary'} onClick={() => setShowVerifyOtpModal(false)}>
                      <IonIcon icon={closeOutline} color="primary" slot="icon-only" />
                    </IonButton>
                  </IonButtons>
                </div>
                <div className="" style={{
                  }}
                  >
                    <IonItem lines="none" className="ion-margin-bottom">
                      <IonLabel position="floating">Enter OTP sent to your email</IonLabel>
                      <IonInputOtp length={6} value={otp} onIonChange={e => setOtp(e.detail.value!)} disabled={isLoadingReset} />
                    </IonItem>

                  {error && <IonText color="danger">{error}</IonText>}

                  <IonButton expand="block" onClick={handleResetPassword} className="ion-margin-top" disabled={isLoadingReset}>
                    {isLoadingReset ? "Sending..." : "Reset Password"}
                  </IonButton>
                </div>

                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={3000}
                  color="light"
                />
              </IonContent>
            </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
