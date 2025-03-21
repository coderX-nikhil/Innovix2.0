import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  User, 
  Edit, 
  Trash2, 
  Search, 
  ArrowUpDown, 
  Shield, 
  Eye,
  X,
  Save,
  Check,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useTeamStore } from '../store/teamStore';
import { TeamMember, PermissionLevel } from '../types';

const TeamManagement: React.FC = () => {
  const { 
    teamMembers, 
    currentUser, 
    addTeamMember, 
    updateTeamMember, 
    deleteTeamMember, 
    updatePermission,
    hasPermission
  } = useTeamStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  
  // Form state for adding/editing team members
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff',
    status: 'active',
  });
  
  // Filtering and sorting
  const filteredMembers = teamMembers.filter(member => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           member.role.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'email':
        comparison = a.email.localeCompare(b.email);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'staff',
      status: 'active',
    });
    setIsAddModalOpen(true);
  };
  
  const handleOpenEditModal = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
    });
    setIsEditModalOpen(true);
  };
  
  const handleOpenPermissionsModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsPermissionsModalOpen(true);
  };
  
  const handleAddMember = () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }
    
    // Create default permissions based on role
    const defaultPermissions = {
      dashboard: formData.role === 'admin' ? 'full_access' : 'read',
      products: formData.role === 'admin' ? 'full_access' : 'read',
      orders: formData.role === 'admin' ? 'full_access' : 'read',
      customers: formData.role === 'admin' ? 'full_access' : 'read',
      analytics: formData.role === 'admin' ? 'full_access' : 'read',
      promotions: formData.role === 'admin' ? 'full_access' : 'no_access',
      content: formData.role === 'admin' ? 'full_access' : 'no_access',
      team: formData.role === 'admin' ? 'full_access' : 'no_access',
      settings: formData.role === 'admin' ? 'full_access' : 'no_access',
    };
    
    addTeamMember({
      name: formData.name,
      email: formData.email,
      role: formData.role as 'admin' | 'manager' | 'staff',
      status: formData.status as 'active' | 'inactive',
      permissions: defaultPermissions,
    });
    
    setIsAddModalOpen(false);
  };
  
  const handleUpdateMember = () => {
    if (!selectedMember) return;
    
    updateTeamMember(selectedMember.id, {
      name: formData.name,
      email: formData.email,
      role: formData.role as 'admin' | 'manager' | 'staff',
      status: formData.status as 'active' | 'inactive',
    });
    
    setIsEditModalOpen(false);
  };
  
  const handleDeleteMember = (id: string) => {
    // Don't allow deleting yourself
    if (id === currentUser?.id) {
      alert('You cannot delete your own account');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeamMember(id);
    }
  };
  
  const handleUpdatePermission = (section: keyof Permissions, level: PermissionLevel) => {
    if (!selectedMember) return;
    updatePermission(selectedMember.id, section, level);
  };
  
  // Check if current user has permission to manage team
  const canManageTeam = currentUser && hasPermission(currentUser.id, 'team', 'write');
  
  if (!canManageTeam) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You don't have permission to access team management. Please contact an administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <Button
          onClick={handleOpenAddModal}
          className="flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Add Team Member
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search team members..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown size={18} className="text-gray-400" />
            </div>
            <select
              className="pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="role-asc">Role (A-Z)</option>
              <option value="role-desc">Role (Z-A)</option>
              <option value="status-asc">Status (Active first)</option>
              <option value="status-desc">Status (Inactive first)</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      member.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.role === 'admin' && <Shield size={12} className="mr-1" />}
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status === 'active' ? (
                        <span className="w-2 h-2 mr-1 rounded-full bg-green-400"></span>
                      ) : (
                        <span className="w-2 h-2 mr-1 rounded-full bg-red-400"></span>
                      )}
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastLogin ? (
                      new Date(member.lastLogin).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleOpenPermissionsModal(member)}
                      >
                        <Shield size={18} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleOpenEditModal(member)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteMember(member.id)}
                        disabled={member.id === currentUser?.id}
                      >
                        <Trash2 size={18} className={member.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedMembers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No team members found. Try adjusting your search.</p>
          </div>
        )}
      </div>
      
      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Add Team Member</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t bg-gray-50 rounded-b-lg">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMember}
              >
                Add Member
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Member Modal */}
      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Edit Team Member</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  disabled={selectedMember.id === currentUser?.id} // Can't change your own role
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
                {selectedMember.id === currentUser?.id && (
                  <p className="text-xs text-gray-500 mt-1">You cannot change your own role</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  disabled={selectedMember.id === currentUser?.id} // Can't deactivate yourself
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {selectedMember.id === currentUser?.id && (
                  <p className="text-xs text-gray-500 mt-1">You cannot deactivate your own account</p>
                )}
              </div>
            </div>
            <div className="flex justify-end p-6 border-t bg-gray-50 rounded-b-lg">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateMember}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Permissions Modal */}
      {isPermissionsModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Manage Permissions: {selectedMember.name}</h2>
              <button
                onClick={() => setIsPermissionsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  {selectedMember.role === 'admin' ? (
                    <span className="font-medium text-purple-700">Admins automatically have full access to all areas.</span>
                  ) : (
                    'Configure what this team member can do in different areas of the admin panel.'
                  )}
                </p>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Permission Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(selectedMember.permissions).map(([section, level]) => (
                        <tr key={section} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm capitalize">{section}</td>
                          <td className="px-4 py-3">
                            {selectedMember.role === 'admin' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                <Shield size={12} className="mr-1" />
                                Full Access
                              </span>
                            ) : (
                              <select
                                className="w-full p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={level}
                                onChange={(e) => handleUpdatePermission(section as keyof Permissions, e.target.value as PermissionLevel)}
                              >
                                <option value="no_access">No Access</option>
                                <option value="read">View Only</option>
                                <option value="write">Edit</option>
                                <option value="full_access">Full Access</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <span className="font-bold">Permission levels:</span>
                      </p>
                      <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                        <li><span className="font-medium">No Access</span>: Cannot view or access this section</li>
                        <li><span className="font-medium">View Only</span>: Can view but not modify data</li>
                        <li><span className="font-medium">Edit</span>: Can view and modify most data</li>
                        <li><span className="font-medium">Full Access</span>: Can perform all actions including deletion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t bg-gray-50 rounded-b-lg">
              <Button
                onClick={() => setIsPermissionsModalOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement; 