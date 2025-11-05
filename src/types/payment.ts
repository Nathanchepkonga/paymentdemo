export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PaymentProvider {
  name: string;
  type: 'mobile' | 'bank' | 'wallet';
}

export interface Country {
  name: string;
  code: string;
  providers: PaymentProvider[];
  currencies: string[];
}

export type PaymentStatus = 'idle' | 'selecting' | 'processing' | 'success' | 'error';
