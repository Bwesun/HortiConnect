import {
  IonPage, IonHeader, IonContent, IonTitle, IonToolbar,
  IonInput, IonButton, IonItem, IonLabel, IonToast, IonText, IonLoading,
  IonInputOtp
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { verifyOtp, requestReset } from '../../../services/resetPasswordAuth';
import { useHistory, useLocation } from 'react-router-dom';

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState(false);

  const history = useHistory();
  const location = useLocation<{ email?: string }>();
  const email = location.state?.email || '';

  // Start countdown on mount
  useEffect(() => {
    setCountdown(60); // initial cooldown seconds
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (!otp) return setToast({ show: true, message: 'Enter your OTP' });
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      setLoading(false);
      if (res.message && res.message.toLowerCase().includes('verified')) {
        setToast({ show: true, message: 'OTP Verified' });
        setTimeout(() => history.push('/reset-password', { email }), 800);
      } else {
        setToast({ show: true, message: res.message || 'Invalid OTP' });
      }
    } catch (err) {
      setLoading(false);
      setToast({ show: true, message: 'Error verifying OTP' });
    }
  };

  const handleResend = async () => {
    if (!email) return setToast({ show: true, message: 'Email not found' });
    setLoading(true);
    try {
      await requestReset(email);
      setLoading(false);
      setToast({ show: true, message: 'If your email exists, an OTP has been sent.' });
      setCountdown(60); // restart cooldown
      setCanResend(false);
    } catch (err) {
      setLoading(false);
      setToast({ show: true, message: 'Failed to resend OTP' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='bg-gradient-to-r'><IonTitle color={'light'}>Verify OTP</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel color={'medium'} position="floating">Enter OTP sent to your email</IonLabel>
          <IonInput type="number" value={otp} onIonChange={e => setOtp(e.detail.value!)} />
            <IonInputOtp type="number" color={'primary'} length={6} value={otp} onIonChange={e => setOtp(e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleVerify}>Verify OTP</IonButton>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {!canResend ? (
            <IonText color="medium">Resend OTP in {countdown}s</IonText>
          ) : (
            <IonButton fill="clear" onClick={handleResend}>Resend OTP</IonButton>
          )}
        </div>

        <IonLoading isOpen={loading} message={'Please wait...'} />
        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={2500}
          onDidDismiss={() => setToast({ show: false, message: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default VerifyOtpPage;
