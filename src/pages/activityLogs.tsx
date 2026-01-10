import { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Tag,
  Plus,
  Pencil,
  Trash2,
  Wrench,
  Package,
  BarChart3,
  Car,
  ShoppingCart,
  Users,
  FileText,
  CalendarCheck,
  UserCog
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activityLogsApi } from '@/services/api.service';
import { useAuthChecker } from '@/hooks/useAuthChecker';
import toast from 'react-hot-toast';

type ActivityLog = {
  id: string;
  user_id: string | null;
  user_name: string | null;
  user_role: string | null;
  action: 'create' | 'update' | 'delete' | 'view';
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  description: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  created_at: string;
};

export default function ActivityLogs() {
  const { isAuthenticated } = useAuthChecker();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntityType, setFilterEntityType] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (isAuthenticated) {
      loadActivityLogs();
    }
  }, [isAuthenticated]);

  const applyFilters = useCallback(() => {
    let filtered = [...logs];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.user_name?.toLowerCase().includes(term) ||
          log.entity_name?.toLowerCase().includes(term) ||
          log.description.toLowerCase().includes(term) ||
          log.entity_type.toLowerCase().includes(term)
      );
    }

    // Action filter
    if (filterAction !== 'all') {
      filtered = filtered.filter((log) => log.action === filterAction);
    }

    // Entity type filter
    if (filterEntityType !== 'all') {
      filtered = filtered.filter((log) => log.entity_type === filterEntityType);
    }

    // Role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter((log) => log.user_role === filterRole);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, filterAction, filterEntityType, filterRole]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadActivityLogs = async () => {
    try {
      setLoading(true);
      const data = await activityLogsApi.getAll();
      setLogs(data);
    } catch (err) {
      console.error('Error loading activity logs:', err);
      toast.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    const styles = {
      create: 'bg-green-100 text-green-700 border-green-200',
      update: 'bg-blue-100 text-blue-700 border-blue-200',
      delete: 'bg-red-100 text-red-700 border-red-200',
      view: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[action as keyof typeof styles]}`}>
        {action.toUpperCase()}
      </span>
    );
  };

  const getRoleBadge = (role: string | null) => {
    if (!role) return <span className="text-gray-400">-</span>;

    const styles = {
      admin: 'bg-purple-100 text-purple-700',
      staff: 'bg-blue-100 text-blue-700',
      mechanic: 'bg-orange-100 text-orange-700',
      viewer: 'bg-gray-100 text-gray-700',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[role as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {role.toUpperCase()}
      </span>
    );
  };

  const getEntityIcon = (entityType: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      customer: <User className="h-4 w-4 text-blue-500" />,
      job_order: <Wrench className="h-4 w-4 text-orange-500" />,
      supplier: <Package className="h-4 w-4 text-purple-500" />,
      inventory: <BarChart3 className="h-4 w-4 text-green-500" />,
      mechanic: <UserCog className="h-4 w-4 text-indigo-500" />,
      appointment: <CalendarCheck className="h-4 w-4 text-pink-500" />,
      vehicle: <Car className="h-4 w-4 text-cyan-500" />,
      purchase_order: <ShoppingCart className="h-4 w-4 text-amber-500" />,
      profile: <Users className="h-4 w-4 text-teal-500" />,
      work_assignment: <Wrench className="h-4 w-4 text-slate-500" />,
    };

    return iconMap[entityType] || <FileText className="h-4 w-4 text-gray-500" />;
  };

  // Get unique entity types and roles for filters
  const entityTypes = Array.from(new Set(logs.map((log) => log.entity_type)));
  const roles = Array.from(new Set(logs.map((log) => log.user_role).filter(Boolean)));

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="w-full min-h-screen p-6 flex items-center justify-center">
        <div className="text-lg">Loading activity logs...</div>
      </div>
    );
  }

  return (
    <div className="py-4 px-2 md:px-6 lg:px-18">
        {/* Header */}
        <section className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Activity Logs</h1>
          </div>
          <p className="text-muted-foreground">
            Track all user actions across the system. Monitor who did what and when for complete audit trail.
          </p>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Creates</p>
                <p className="text-2xl font-bold text-green-600">
                  {logs.filter((l) => l.action === 'create').length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Updates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {logs.filter((l) => l.action === 'update').length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Pencil className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deletions</p>
                <p className="text-2xl font-bold text-red-600">
                  {logs.filter((l) => l.action === 'delete').length}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Action Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="view">View</option>
              </select>
            </div>

            {/* Entity Type Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterEntityType}
                onChange={(e) => setFilterEntityType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Types</option>
                {entityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role!}>
                    {role!.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {log.user_name || 'System'}
                      </td>
                      <td className="px-4 py-3 text-sm">{getRoleBadge(log.user_role)}</td>
                      <td className="px-4 py-3 text-sm">{getActionBadge(log.action)}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{getEntityIcon(log.entity_type)}</span>
                          <span className="text-gray-700 font-medium">
                            {log.entity_type.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{log.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">No activity logs found</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchTerm || filterAction !== 'all' || filterEntityType !== 'all'
                          ? 'Try adjusting your filters'
                          : 'Activities will appear here as users interact with the system'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredLogs.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rows per page:</span>
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
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-700 px-2">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
