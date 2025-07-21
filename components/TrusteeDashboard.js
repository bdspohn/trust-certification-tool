import React, { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const TrusteeDashboard = ({ trusteeId = 'trustee_001' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [trusts, setTrusts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [institutionConnections, setInstitutionConnections] = useState([]);

  // Sample data - in production this would come from API
  const sampleTrusts = [
    {
      id: 'trust_001',
      name: 'John and Mary Smith Family Trust',
      status: 'active',
      lastUpdated: '2024-07-15',
      totalAssets: '$2,350,000',
      connectedInstitutions: ['Wells Fargo', 'Vanguard', 'Charles Schwab'],
      pendingUpdates: ['beneficiary_change'],
      verificationLevel: 'platinum',
      nextReviewDate: '2025-01-15',
      riskScore: 'low'
    },
    {
      id: 'trust_002', 
      name: 'Smith Family Irrevocable Trust',
      status: 'pending_update',
      lastUpdated: '2024-06-20',
      totalAssets: '$4,750,000',
      connectedInstitutions: ['Bank of America', 'First Republic'],
      pendingUpdates: ['trustee_succession', 'asset_addition'],
      verificationLevel: 'gold',
      nextReviewDate: '2024-12-20',
      riskScore: 'medium'
    }
  ];

  const sampleNotifications = [
    {
      id: 'notif_001',
      type: 'update_required',
      title: 'Wells Fargo requesting trust status verification',
      description: 'New account opening requires current trust certification',
      trustId: 'trust_001',
      institutionId: 'wells_fargo',
      priority: 'high',
      deadline: '2024-07-25',
      timestamp: '2024-07-20T10:30:00Z'
    },
    {
      id: 'notif_002',
      type: 'compliance_alert',
      title: 'Annual trust review due',
      description: 'Smith Family Irrevocable Trust annual compliance review',
      trustId: 'trust_002',
      priority: 'medium',
      deadline: '2024-08-15',
      timestamp: '2024-07-18T14:20:00Z'
    }
  ];

  const sampleInstitutions = [
    {
      id: 'wells_fargo',
      name: 'Wells Fargo',
      type: 'Commercial Bank',
      connectionStatus: 'active',
      lastSync: '2024-07-20T08:00:00Z',
      trustsLinked: ['trust_001'],
      apiCalls: 145,
      riskLevel: 'low'
    },
    {
      id: 'vanguard',
      name: 'Vanguard',
      type: 'Investment Firm',
      connectionStatus: 'active',
      lastSync: '2024-07-19T16:30:00Z',
      trustsLinked: ['trust_001'],
      apiCalls: 89,
      riskLevel: 'low'
    }
  ];

  useEffect(() => {
    setTrusts(sampleTrusts);
    setNotifications(sampleNotifications);
    setInstitutionConnections(sampleInstitutions);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending_update': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const handleUpdateTrust = (trustId, updateType) => {
    // This would trigger the legal services framework
    console.log(`Initiating ${updateType} for trust ${trustId}`);
    // Integration point with LegalToolFramework
  };

  const handleNotifyInstitution = (institutionId, trustId) => {
    // API call to notify institution of update
    console.log(`Notifying ${institutionId} about trust ${trustId} update`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{trusts.length}</div>
              <div className="text-sm text-gray-500">Active Trusts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingOffice2Icon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {institutionConnections.reduce((sum, inst) => sum + inst.trustsLinked.length, 0)}
              </div>
              <div className="text-sm text-gray-500">Institution Connections</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BellIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
              <div className="text-sm text-gray-500">Pending Actions</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {institutionConnections.reduce((sum, inst) => sum + inst.apiCalls, 0)}
              </div>
              <div className="text-sm text-gray-500">API Calls (30 days)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className={`p-6 ${getPriorityColor(notification.priority)}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.priority === 'high' ? (
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  ) : (
                    <BellIcon className="h-6 w-6 text-yellow-600" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      Due: {new Date(notification.deadline).toLocaleDateString()}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Take Action →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrusts = () => (
    <div className="space-y-6">
      {trusts.map((trust) => (
        <div key={trust.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{trust.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trust.status)}`}>
                  {trust.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">ID: {trust.id}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Total Assets:</span>
                  <div className="text-lg font-bold text-gray-900">{trust.totalAssets}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                  <div className="text-sm text-gray-900">{trust.lastUpdated}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Risk Score:</span>
                  <div className={`text-sm font-semibold ${getRiskColor(trust.riskScore)}`}>
                    {trust.riskScore.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Connected Institutions:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {trust.connectedInstitutions.map((inst, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {trust.pendingUpdates.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">Pending Updates:</h4>
                  <div className="space-y-2">
                    {trust.pendingUpdates.map((update, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-yellow-700">
                          {update.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <button 
                          onClick={() => handleUpdateTrust(trust.id, update)}
                          className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                        >
                          Update Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-6 flex flex-col space-y-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                Generate Certificate
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                Notify Institutions
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInstitutions = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">🔗 Trust Registry API</h3>
        <p className="text-sm text-blue-800 mb-4">
          Institutions can connect directly to your trust data for real-time verification and updates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">API Endpoint:</span>
            <code className="block mt-1 text-xs bg-blue-100 p-2 rounded">
              api.trusto.inc/registry/trust/{trust.id}
            </code>
          </div>
          <div>
            <span className="font-medium text-blue-700">Real-time Updates:</span>
            <div className="mt-1 text-blue-600">✓ Webhook notifications</div>
          </div>
          <div>
            <span className="font-medium text-blue-700">Security:</span>
            <div className="mt-1 text-blue-600">✓ OAuth 2.0 + mTLS</div>
          </div>
        </div>
      </div>

      {institutionConnections.map((institution) => (
        <div key={institution.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{institution.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(institution.connectionStatus)}`}>
                  {institution.connectionStatus}
                </span>
                <span className="text-xs text-gray-500">{institution.type}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Last Sync:</span>
                  <div className="text-sm text-gray-900">
                    {new Date(institution.lastSync).toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">API Calls (30d):</span>
                  <div className="text-sm font-bold text-gray-900">{institution.apiCalls}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Trusts Linked:</span>
                  <div className="text-sm font-bold text-gray-900">{institution.trustsLinked.length}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Risk Level:</span>
                  <div className={`text-sm font-semibold ${getRiskColor(institution.riskLevel)}`}>
                    {institution.riskLevel.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNotifyInstitution(institution.id, 'all')}
                  className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Send Update Notification
                </button>
                <button className="text-sm border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                  View API Logs
                </button>
                <button className="text-sm border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                  Connection Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <BuildingOffice2Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Connect New Institution</h3>
        <p className="text-gray-500 mb-4">
          Add banks, investment firms, or other financial institutions to your trust registry network.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Add Institution Connection
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: CheckCircleIcon },
    { id: 'trusts', label: 'My Trusts', icon: DocumentTextIcon },
    { id: 'institutions', label: 'Institutions', icon: BuildingOffice2Icon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Trustee Dashboard</h1>
              </div>
              <span className="text-sm text-gray-500">Real-time trust management & institution connectivity</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-700">John Smith, Trustee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.id === 'notifications' && notifications.length > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs rounded-full px-2 py-1">
                    {notifications.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'trusts' && renderTrusts()}
        {activeTab === 'institutions' && renderInstitutions()}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-6 rounded-lg border ${getPriorityColor(notification.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.description}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      Due: {new Date(notification.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrusteeDashboard;