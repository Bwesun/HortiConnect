import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {

  //Auth Headers
  private getAuthHeaders(): AxiosRequestConfig["headers"] {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Network error" }));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }
    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
    address?: string;
  }) {
    try{
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
      console.error("Backend error:", error); // See actual backend message
    } else {
      console.error("Unknown error:", error.message);
    }
    }
  }

  // Get Current user
  async getCurrentUser() {
  const { data } = await axios.get(`${API_BASE_URL}/auth/me`, {
    headers: this.getAuthHeaders(),
  });

  if (!data.user) {
    throw new Error("Invalid response: missing user field");
  }

  return data; // { success, user }
}


  async updateProfile(userData: {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    userId?: string;
  }) {
    const { data } = await axios.put(`${API_BASE_URL}/auth/profile`, userData, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  // Orders
  async getOrders(params?: { status?: string; search?: string }) {
    const { data } = await axios.get(`${API_BASE_URL}/orders`, {
      headers: this.getAuthHeaders(),
      params,
    });
    return data;
  }

  async createOrder(orderData: {
    product: string;
    pickupAddress: string;
    pickupPhone: string;
    deliveryAddress: string;
    deliveryPhone: string;
    details?: string;
    priority?: string;
  }) {
    const { data } = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async updateOrder(orderId: string, orderData: any) {
    const { data } = await axios.put(
      `${API_BASE_URL}/orders/${orderId}`,
      orderData,
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  async cancelOrder(orderId: string) {
    const { data } = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async getOrderTracking(orderId: string) {
    const { data } = await axios.get(
      `${API_BASE_URL}/orders/tracking/${orderId}`,
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  // Deliveries
  async getDeliveries(params?: {
    status?: string;
    search?: string;
    dispatcherId?: string;
  }) {
    const { data } = await axios.get(`${API_BASE_URL}/deliveries`, {
      headers: this.getAuthHeaders(),
      params,
    });
    return data;
  }

  async updateDeliveryStatus(
    deliveryId: string,
    status: string,
    notes?: string
  ) {
    const { data } = await axios.put(
      `${API_BASE_URL}/deliveries/${deliveryId}/status`,
      { status, notes },
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  async assignDelivery(deliveryId: string, dispatcherId: string) {
    const { data } = await axios.put(
      `${API_BASE_URL}/deliveries/${deliveryId}/assign`,
      { dispatcherId },
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  async getDeliveryStats() {
    const { data } = await axios.get(`${API_BASE_URL}/deliveries/stats`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  // Admin
  async getAdminDashboardStats() {
    const { data } = await axios.get(`${API_BASE_URL}/admin/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async getAnalyticsData(period: string = "7d") {
    const { data } = await axios.get(`${API_BASE_URL}/admin/analytics`, {
      headers: this.getAuthHeaders(),
      params: { period },
    });
    return data;
  }

  async getUsers(params?: {
    role?: string;
    search?: string;
    isActive?: boolean;
  }) {
    const { data } = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: this.getAuthHeaders(),
      params,
    });
    return data;
  }

  async updateUser(userId: string, userData: any) {
    const { data } = await axios.put(
      `${API_BASE_URL}/admin/users/${userId}`,
      userData,
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  async deleteUser(userId: string) {
    const { data } = await axios.delete(
      `${API_BASE_URL}/admin/users/${userId}`,
      { headers: this.getAuthHeaders() }
    );
    return data;
  }

  async getDispatchers() {
    const { data } = await axios.get(`${API_BASE_URL}/admin/dispatchers`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }
}

export const apiService = new ApiService();
