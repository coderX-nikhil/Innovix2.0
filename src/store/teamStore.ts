import { create } from 'zustand';
import { TeamMember, PermissionLevel } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TeamStore {
  teamMembers: TeamMember[];
  currentUser: TeamMember | null;
  
  // Actions
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  updatePermission: (userId: string, section: keyof TeamMember['permissions'], level: PermissionLevel) => void;
  hasPermission: (userId: string, section: keyof TeamMember['permissions'], minimumLevel: 'read' | 'write' | 'full_access') => boolean;
}

// Helper function to determine if a permission level meets the minimum requirement
const meetsMinimumPermission = (
  actual: PermissionLevel, 
  minimum: 'read' | 'write' | 'full_access'
): boolean => {
  const levels: Record<PermissionLevel, number> = {
    'no_access': 0,
    'read': 1,
    'write': 2,
    'full_access': 3
  };
  
  return levels[actual] >= levels[minimum];
};

// Initial team data
const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@innovix.com',
    role: 'admin',
    status: 'active',
    lastLogin: new Date().toISOString(),
    permissions: {
      dashboard: 'full_access',
      products: 'full_access',
      orders: 'full_access',
      customers: 'full_access',
      analytics: 'full_access',
      promotions: 'full_access',
      content: 'full_access',
      team: 'full_access',
      settings: 'full_access',
    }
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'john@innovix.com',
    role: 'manager',
    status: 'active',
    lastLogin: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    permissions: {
      dashboard: 'read',
      products: 'write',
      orders: 'write',
      customers: 'write',
      analytics: 'read',
      promotions: 'write',
      content: 'read',
      team: 'read',
      settings: 'no_access',
    }
  },
  {
    id: '3',
    name: 'Sarah Staff',
    email: 'sarah@innovix.com',
    role: 'staff',
    status: 'active',
    lastLogin: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    permissions: {
      dashboard: 'read',
      products: 'read',
      orders: 'read',
      customers: 'read',
      analytics: 'read',
      promotions: 'no_access',
      content: 'no_access',
      team: 'no_access',
      settings: 'no_access',
    }
  },
  {
    id: '4',
    name: 'Mike Marketing',
    email: 'mike@innovix.com',
    role: 'staff',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
    permissions: {
      dashboard: 'read',
      products: 'read',
      orders: 'no_access',
      customers: 'read',
      analytics: 'read',
      promotions: 'write',
      content: 'write',
      team: 'no_access',
      settings: 'no_access',
    }
  }
];

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: initialTeamMembers,
  currentUser: initialTeamMembers[0], // Set admin as the current user for demo
  
  addTeamMember: (member) => {
    const newMember: TeamMember = {
      id: uuidv4(),
      ...member
    };
    
    set((state) => ({
      teamMembers: [...state.teamMembers, newMember]
    }));
  },
  
  updateTeamMember: (id, updates) => {
    set((state) => ({
      teamMembers: state.teamMembers.map(member => 
        member.id === id ? { ...member, ...updates } : member
      ),
      // Update currentUser if that's the user being updated
      currentUser: state.currentUser?.id === id 
        ? { ...state.currentUser, ...updates } 
        : state.currentUser
    }));
  },
  
  deleteTeamMember: (id) => {
    set((state) => ({
      teamMembers: state.teamMembers.filter(member => member.id !== id)
    }));
  },
  
  updatePermission: (userId, section, level) => {
    set((state) => ({
      teamMembers: state.teamMembers.map(member => {
        if (member.id === userId) {
          return {
            ...member,
            permissions: {
              ...member.permissions,
              [section]: level
            }
          };
        }
        return member;
      }),
      // Update currentUser permissions if that's the user being updated
      currentUser: state.currentUser?.id === userId
        ? {
            ...state.currentUser,
            permissions: {
              ...state.currentUser.permissions,
              [section]: level
            }
          }
        : state.currentUser
    }));
  },
  
  hasPermission: (userId, section, minimumLevel) => {
    const state = useTeamStore.getState();
    const user = state.teamMembers.find(member => member.id === userId);
    
    if (!user) return false;
    
    // Admins always have full access
    if (user.role === 'admin') return true;
    
    // Inactive users have no access
    if (user.status === 'inactive') return false;
    
    return meetsMinimumPermission(user.permissions[section], minimumLevel);
  }
})); 