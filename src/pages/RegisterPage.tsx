import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register({ name, phone, role, address, email, password });
      console.log("Registration successful");
      history.push("/home");
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.");
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create HortiNigeria Account
      </h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircleIcon size={20} className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onInput={(e) => setName(e.currentTarget.value!)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value!)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={phone}
              onInput={(e) => setPhone(e.currentTarget.value!)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={role}
              onChange={(e) => setRole(e.currentTarget.value!)}
              required
            >
              <option value="user">Select your role</option>
              <option value="farmer">Farmer</option>
              <option value="agrodealer">Agrodealer</option>
              <option value="service_provider">Service Provider</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Userusername
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value!)}
              required
            />
          </div> */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value!)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value!)}
              required
              placeholder="State, Local Government Area"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-700 to-[#f8982a] text-white py-2 px-4 rounded font-medium hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-[#f8982a] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
