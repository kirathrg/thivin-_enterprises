// API Client for Customer Panel
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth-token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('auth-token', token);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Request failed: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  signin: async (email: string, password: string) => {
    const response = await apiClient.post<{
      access_token: string;
      refresh_token?: string;
      user?: any;
    }>('/auth/signin', { email, password });
    
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    return response;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await apiClient.post<{
      access_token: string;
      refresh_token?: string;
      user?: any;
    }>('/auth/signup', { name, email, password });
    
    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }
    return response;
  },
};

// Products API
export const productsApi = {
  getAll: async () => {
    return apiClient.get<any[]>('/products');
  },

  getByHandle: async (handle: string) => {
    return apiClient.get<any>(`/products/${handle}`);
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: {
    items: Array<{
      product_handle: string;
      quantity: number;
      price: number;
    }>;
    shipping_address: {
      full_name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    payment_method: string;
    payment_id?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
  }) => {
    return apiClient.post<any>('/orders', orderData);
  },

  getMyOrders: async () => {
    return apiClient.get<any[]>('/orders');
  },

  getById: async (orderId: string) => {
    return apiClient.get<any>(`/orders/${orderId}`);
  },
};

// Razorpay API
export const razorpayApi = {
  createOrder: async (amount: number, currency: string = 'INR', receipt?: string) => {
    const response = await fetch(`${API_BASE_URL}/razorpay/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency, receipt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to create order';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  verifyPayment: async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/razorpay/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Payment verification failed';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },
};

export default apiClient;


