// Client data layer for handling pre-provisioned and localStorage-backed client accounts

export interface AccountManager {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export const ACCOUNT_MANAGER: AccountManager = {
  name: 'Michael C.',
  email: 'michael@gravitas.uno',
  phone: '075 436 4071',
  website: 'https://www.michaelchigbu.cv',
};

export interface ClientAccount {
  username: string;
  client_name: string;
  website?: string;
  account_status: string;
  contact_info?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  profile?: {
    bio?: string;
    avatar_url?: string;
    industry?: string;
    established?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: string;
  plan?: string;
  price?: string;
  next_billing_date?: string;
  features?: string[];
}

export interface ServiceRequest {
  id: string;
  service_name: string;
  description: string;
  status: string;
  created_at: string;
}

export interface ServicesData {
  services: Service[];
  service_requests: ServiceRequest[];
}

export interface Subscription {
  id: string;
  service: string;
  amount: string;
  frequency: string;
  status: string;
  next_billing_date: string;
  auto_renew: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: string;
  payment_method: string;
}

export interface Invoice {
  id: string;
  date: string;
  due_date: string;
  amount: string;
  status: string;
  items: Array<{
    description: string;
    amount: string;
  }>;
}

export interface PaymentMethod {
  id: string;
  type: string;
  brand?: string;
  last4?: string;
  exp_month?: string;
  exp_year?: string;
  is_default: boolean;
}

export interface BillingData {
  subscriptions: Subscription[];
  transactions: Transaction[];
  invoices: Invoice[];
  payment_methods: PaymentMethod[];
}

export interface TicketMessage {
  id: string;
  from: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  messages: TicketMessage[];
}

export interface SupportData {
  tickets: SupportTicket[];
}

export interface ConversationMessage {
  id: string;
  from: string;
  message: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  with: string;
  messages: ConversationMessage[];
}

export interface MessagingData {
  conversations: Conversation[];
}

/**
 * Load pre-provisioned data from public client-area directory
 */
async function loadPreProvisionedData<T>(username: string, filename: string): Promise<T | null> {
  try {
    const response = await fetch(`/client-area/${username}/${filename}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(`No pre-provisioned ${filename} found for ${username}`);
  }
  return null;
}

/**
 * Load local override data from localStorage
 */
function loadLocalData<T>(username: string, key: string): T | null {
  const storageKey = `gravitas_client_${username}_${key}`;
  const data = localStorage.getItem(storageKey);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(`Failed to parse local ${key} data:`, error);
    }
  }
  return null;
}

/**
 * Save local override data to localStorage
 */
export function saveLocalData<T>(username: string, key: string, data: T): void {
  const storageKey = `gravitas_client_${username}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

/**
 * Merge pre-provisioned and local data
 */
function mergeData<T extends Record<string, any>>(preProvisioned: T | null, local: T | null): T | null {
  if (!preProvisioned && !local) return null;
  if (!preProvisioned) return local;
  if (!local) return preProvisioned;
  
  // Deep merge - local data overrides pre-provisioned
  return { ...preProvisioned, ...local };
}

/**
 * Load account data for a username
 */
export async function loadAccountData(username: string): Promise<ClientAccount | null> {
  const preProvisioned = await loadPreProvisionedData<ClientAccount>(username, 'account.json');
  const local = loadLocalData<ClientAccount>(username, 'account');
  
  const merged = mergeData(preProvisioned, local);
  
  // If no data exists, create a shadow account
  if (!merged) {
    const shadowAccount: ClientAccount = {
      username,
      client_name: username,
      account_status: 'active',
    };
    return shadowAccount;
  }
  
  return merged;
}

/**
 * Load services data for a username
 */
export async function loadServicesData(username: string): Promise<ServicesData> {
  const preProvisioned = await loadPreProvisionedData<ServicesData>(username, 'services.json');
  const local = loadLocalData<ServicesData>(username, 'services');
  
  const merged = mergeData(preProvisioned, local);
  
  return merged || { services: [], service_requests: [] };
}

/**
 * Load billing data for a username
 */
export async function loadBillingData(username: string): Promise<BillingData> {
  const preProvisioned = await loadPreProvisionedData<BillingData>(username, 'billing.json');
  const local = loadLocalData<BillingData>(username, 'billing');
  
  const merged = mergeData(preProvisioned, local);
  
  return merged || { subscriptions: [], transactions: [], invoices: [], payment_methods: [] };
}

/**
 * Load support data for a username
 */
export async function loadSupportData(username: string): Promise<SupportData> {
  const preProvisioned = await loadPreProvisionedData<SupportData>(username, 'support.json');
  const local = loadLocalData<SupportData>(username, 'support');
  
  const merged = mergeData(preProvisioned, local);
  
  return merged || { tickets: [] };
}

/**
 * Load messaging data for a username
 */
export async function loadMessagingData(username: string): Promise<MessagingData> {
  const preProvisioned = await loadPreProvisionedData<MessagingData>(username, 'messaging.json');
  const local = loadLocalData<MessagingData>(username, 'messaging');
  
  const merged = mergeData(preProvisioned, local);
  
  return merged || { conversations: [] };
}
