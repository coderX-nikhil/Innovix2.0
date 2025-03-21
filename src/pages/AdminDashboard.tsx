import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useTeamStore } from '../store/teamStore';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useTeamStore();
  
  // Mock data for the dashboard
  const stats = [
    {
      name: 'Total Sales',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
    },
    {
      name: 'Active Orders',
      value: '24',
      change: '+4.75%',
      changeType: 'increase',
      icon: ShoppingCart,
    },
    {
      name: 'Low Stock Items',
      value: '12',
      change: '-2.4%',
      changeType: 'decrease',
      icon: AlertCircle,
    },
    {
      name: 'Team Members',
      value: '8',
      change: '+1',
      changeType: 'increase',
      icon: Users,
    },
  ];
  
  const recentActivity = [
    {
      id: 1,
      type: 'order',
      description: 'New order #1234 received',
      time: '5 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'inventory',
      description: 'Low stock alert for iPhone 13 Pro',
      time: '1 hour ago',
      status: 'warning',
    },
    {
      id: 3,
      type: 'user',
      description: 'New team member added',
      time: '2 hours ago',
      status: 'success',
    },
    {
      id: 4,
      type: 'order',
      description: 'Order #1233 cancelled',
      time: '3 hours ago',
      status: 'error',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, {currentUser?.name}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-black p-3">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                  )}
                  <span className="sr-only">
                    {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {stat.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                      {activity.type}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <p>{activity.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <Package className="mr-2 h-5 w-5" />
              Add New Product
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <Users className="mr-2 h-5 w-5" />
              Manage Team
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;