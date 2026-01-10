import { useState, useEffect } from 'react';
import { Eye, Pencil, Trash2, UserPlus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Users, Shield, Briefcase, UserCog, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profilesApi } from '@/services/api.service';
import supabase from '@/helper/supabaseClient';
import type { Database } from '@/types/database.types';
import toast from 'react-hot-toast';
import { UserFormModal } from '@/components/modals/UserFormModal';
import { UserDetailsModal } from '@/components/modals/UserDetailsModal';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadUsers();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profilesApi.getAll();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load users';
      setError(message);
      toast.error(message);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await profilesApi.update(id, { is_active: !currentStatus });
      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      await loadUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user status';
      toast.error(message);
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteClick = (user: Profile) => {
    // Safety check 1: Cannot delete yourself
    if (user.id === currentUserId) {
      toast.error('You cannot delete your own account');
      return;
    }

    // Safety check 2: Cannot delete if only 1 user left
    if (users.length <= 1) {
      toast.error('Cannot delete the last remaining user');
      return;
    }

    // Safety check 3: Cannot delete the last admin
    const adminCount = users.filter(u => u.role === 'admin').length;
    if (user.role === 'admin' && adminCount <= 1) {
      toast.error('Cannot delete the last admin account');
      return;
    }

    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    setDeleting(true);
    try {
      await profilesApi.delete(selectedUser.id);
      toast.success('User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      toast.error(message);
      console.error('Error deleting user:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (user: Profile) => {
    setSelectedUserId(user.id);
    setShowDetailsModal(true);
  };

  const handleEdit = (user: Profile) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSuccess = () => {
    loadUsers();
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesSearch = !searchQuery ||
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.includes(searchQuery);
    return matchesRole && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter, searchQuery]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'staff':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'mechanic':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'viewer':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const staffCount = users.filter(u => u.role === 'staff').length;
  const mechanicCount = users.filter(u => u.role === 'mechanic').length;
  const activeCount = users.filter(u => u.is_active).length;

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-gray-900 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen p-6 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="py-4 px-2 md:px-6 lg:px-18">
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users and their roles. Add new staff members, mechanics, or administrators and control access levels.
          </p>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <h2 className="text-3xl font-bold text-gray-900">{totalUsers}</h2>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Admins</p>
                <h2 className="text-3xl font-bold text-purple-600">{adminCount}</h2>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Staff</p>
                <h2 className="text-3xl font-bold text-blue-600">{staffCount}</h2>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mechanics</p>
                <h2 className="text-3xl font-bold text-green-600">{mechanicCount}</h2>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCog className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <h2 className="text-3xl font-bold text-teal-600">{activeCount}</h2>
              </div>
              <div className="p-3 bg-teal-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          {/* Filters and Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2">Search Users</label>
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-sm text-gray-700 mb-2">Filter by Role</label>
                <Select value={roleFilter || "all"} onValueChange={(value) => setRoleFilter(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full rounded-lg">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all" className="rounded-lg">All Roles</SelectItem>
                    <SelectItem value="admin" className="rounded-lg">Admin</SelectItem>
                    <SelectItem value="staff" className="rounded-lg">Staff</SelectItem>
                    <SelectItem value="mechanic" className="rounded-lg">Mechanic</SelectItem>
                    <SelectItem value="viewer" className="rounded-lg">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Add User
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Full Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{user.full_name}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{user.email || 'N/A'}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{user.phone || 'N/A'}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => handleToggleActive(user.id, user.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            user.is_active
                              ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
                          }`}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleView(user)}
                            className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 rounded bg-green-100 hover:bg-green-200 transition-colors"
                            title="Edit User"
                          >
                            <Pencil className="h-4 w-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className={`p-2 rounded transition-colors ${
                              user.id === currentUserId
                                ? 'bg-gray-100 cursor-not-allowed opacity-50'
                                : 'bg-red-100 hover:bg-red-200'
                            }`}
                            title={user.id === currentUserId ? "Cannot delete your own account" : "Delete User"}
                            disabled={user.id === currentUserId}
                          >
                            <Trash2 className={`h-4 w-4 ${user.id === currentUserId ? 'text-gray-400' : 'text-red-600'}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={String(itemsPerPage)} onValueChange={(value) => { setItemsPerPage(Number(value)); setCurrentPage(1); }}>
                <SelectTrigger className="w-[80px] rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="10" className="rounded-lg">10</SelectItem>
                  <SelectItem value="25" className="rounded-lg">25</SelectItem>
                  <SelectItem value="50" className="rounded-lg">50</SelectItem>
                  <SelectItem value="100" className="rounded-lg">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700 px-2">
                {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <UserFormModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={handleSuccess}
        />

        <UserFormModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSuccess={handleSuccess}
          user={selectedUser}
        />

        <UserDetailsModal
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          userId={selectedUserId}
        />

        <DeleteConfirmationModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          itemName={selectedUser?.full_name}
          loading={deleting}
        />
    </div>
  );
}
