// User interfaces
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    isVerified: boolean;
    linkedAccounts?: LinkedAccount[];
  }
  
  export interface LinkedAccount {
    platform: string;
    icon: string;
    url: string;
  }
  
  // Post interfaces
  export interface BasePost {
    id: string;
    userId: string;
    userName: string;
    userPicture?: string;
    timePosted: string;
    description: string;
    category: string;
    location: string;
    schedule: string;
    additionalNotes?: string;
    proof?: string;
  }
  
  export interface SkillRequest extends BasePost {
    request: string;
    skillsOffered: string[];
  }
  
  export interface SkillOffer extends BasePost {
    skills: string[];
    skillsRequested: string[];
  }
  
  // Report interfaces
  export interface Report {
    id?: string;
    reportedUserName: string;
    reason: string;
    description: string;
    proofFile?: File | null;
    createdAt?: Date;
  }
  
  // Form interfaces
  export interface SkillRequestForm {
    request: string;
    description: string;
    category: string;
    location: string;
    skillsOffered: string;
    schedule: string;
    additionalNotes: string;
    proof: File | null;
  }
  
  export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }