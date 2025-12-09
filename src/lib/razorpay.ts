// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (
  orderData: {
    id: string;
    amount: number;
    currency: string;
    key_id: string;
  },
  options: {
    name: string;
    description: string;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    onSuccess: (paymentId: string, orderId: string, signature: string) => Promise<void>;
    onError: (error: string) => void;
  }
) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    options.onError('Failed to load Razorpay SDK');
    return;
  }

  if (!window.Razorpay) {
    options.onError('Razorpay SDK not available');
    return;
  }

  const razorpay = new window.Razorpay({
    key: orderData.key_id,
    amount: orderData.amount,
    currency: orderData.currency,
    name: options.name,
    description: options.description,
    order_id: orderData.id,
    prefill: options.prefill || {},
    handler: async function (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) {
      try {
        await options.onSuccess(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      } catch (error) {
        options.onError(error instanceof Error ? error.message : 'Payment verification failed');
      }
    },
    modal: {
      ondismiss: function () {
        options.onError('Payment cancelled by user');
      },
    },
  });

  razorpay.open();
};

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}


