import { 
  User, InsertUser, 
  Contact, InsertContact, 
  RoiResult, InsertRoiResult, 
  EmailShare, InsertEmailShare, 
  users, contacts, roiResults, emailShares 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContact(id: number): Promise<Contact | undefined>;
  getContactByEmail(email: string): Promise<Contact | undefined>;
  
  // ROI Results methods
  createRoiResult(result: InsertRoiResult): Promise<RoiResult>;
  getRoiResult(id: number): Promise<RoiResult | undefined>;
  getRoiResultsByContactId(contactId: number): Promise<RoiResult[]>;
  
  // Email Share methods
  createEmailShare(share: InsertEmailShare): Promise<EmailShare>;
  getEmailShare(id: number): Promise<EmailShare | undefined>;
  updateEmailShareSent(id: number, sent: boolean): Promise<EmailShare | undefined>;
  getEmailSharesByRoiResultId(roiResultId: number): Promise<EmailShare[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private roiResults: Map<number, RoiResult>;
  private emailShares: Map<number, EmailShare>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private roiResultCurrentId: number;
  private emailShareCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.roiResults = new Map();
    this.emailShares = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.roiResultCurrentId = 1;
    this.emailShareCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async getContactByEmail(email: string): Promise<Contact | undefined> {
    return Array.from(this.contacts.values()).find(
      (contact) => contact.email === email,
    );
  }
  
  // ROI Results methods
  async createRoiResult(insertRoiResult: InsertRoiResult): Promise<RoiResult> {
    const id = this.roiResultCurrentId++;
    const roiResult: RoiResult = { 
      ...insertRoiResult, 
      id, 
      createdAt: new Date() 
    };
    this.roiResults.set(id, roiResult);
    return roiResult;
  }
  
  async getRoiResult(id: number): Promise<RoiResult | undefined> {
    return this.roiResults.get(id);
  }
  
  async getRoiResultsByContactId(contactId: number): Promise<RoiResult[]> {
    return Array.from(this.roiResults.values()).filter(
      (result) => result.contactId === contactId,
    );
  }
  
  // Email Share methods
  async createEmailShare(insertEmailShare: InsertEmailShare): Promise<EmailShare> {
    const id = this.emailShareCurrentId++;
    const emailShare: EmailShare = { 
      ...insertEmailShare, 
      id, 
      sent: false,
      sentAt: null,
      createdAt: new Date() 
    };
    this.emailShares.set(id, emailShare);
    return emailShare;
  }
  
  async getEmailShare(id: number): Promise<EmailShare | undefined> {
    return this.emailShares.get(id);
  }
  
  async updateEmailShareSent(id: number, sent: boolean): Promise<EmailShare | undefined> {
    const emailShare = this.emailShares.get(id);
    if (!emailShare) return undefined;
    
    const updated: EmailShare = { 
      ...emailShare, 
      sent, 
      sentAt: sent ? new Date() : null 
    };
    this.emailShares.set(id, updated);
    return updated;
  }
  
  async getEmailSharesByRoiResultId(roiResultId: number): Promise<EmailShare[]> {
    return Array.from(this.emailShares.values()).filter(
      (share) => share.roiResultId === roiResultId,
    );
  }
}

export const storage = new MemStorage();
