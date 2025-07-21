import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { SecurityAuditLogger } from '../../lib/security';

const SecurityDashboard = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [securityMetrics, setSecurityMetrics] = useState({
    totalEvents: 0,
    authenticationAttempts: 0,
    failedLogins: 0,
    securityIncidents: 0,
    dataAccesses: 0
  });
  const [timeRange, setTimeRange] = useState('24h');

  const loadSecurityData = useCallback(() => {
    // In production, this would come from a secure backend API
    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('securityAuditLogs') || '[]');
      
      // Filter by time range
      const now = Date.now();
      const timeRangeMs = {
        '1h': 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000
      };
      
      const cutoff = now - timeRangeMs[timeRange];
      const filteredLogs = logs.filter(log => 
        new Date(log.timestamp).getTime() > cutoff
      );

      setAuditLogs(filteredLogs.slice(-100)); // Show last 100 events

      // Calculate metrics
      const metrics = {
        totalEvents: filteredLogs.length,
        authenticationAttempts: filteredLogs.filter(log => log.eventType === 'AUTHENTICATION').length,
        failedLogins: filteredLogs.filter(log => log.eventType === 'AUTHENTICATION' && !log.success).length,
        securityIncidents: filteredLogs.filter(log => log.eventType === 'SECURITY_INCIDENT').length,
        dataAccesses: filteredLogs.filter(log => log.eventType === 'DATA_ACCESS').length
      };

      setSecurityMetrics(metrics);
    }
  }, [timeRange]);

  useEffect(() => {
    loadSecurityData();
  }, [loadSecurityData]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'WARNING': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'INFO': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Log dashboard access
  useEffect(() => {
    SecurityAuditLogger.logDataAccess(null, 'security_dashboard', 'access');
  }, []);

  return (
    <>
      <Head>
        <title>Security Dashboard - Trusto Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Dashboard</h1>
            <p className="text-gray-600">SOC 2 compliance monitoring and audit trail</p>
            
            {/* Time Range Selector */}
            <div className="mt-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border">
              <div className="text-2xl font-bold text-blue-600">{securityMetrics.totalEvents}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border">
              <div className="text-2xl font-bold text-green-600">{securityMetrics.authenticationAttempts}</div>
              <div className="text-sm text-gray-600">Auth Attempts</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border">
              <div className="text-2xl font-bold text-red-600">{securityMetrics.failedLogins}</div>
              <div className="text-sm text-gray-600">Failed Logins</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border">
              <div className="text-2xl font-bold text-orange-600">{securityMetrics.securityIncidents}</div>
              <div className="text-sm text-gray-600">Security Incidents</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border">
              <div className="text-2xl font-bold text-purple-600">{securityMetrics.dataAccesses}</div>
              <div className="text-sm text-gray-600">Data Accesses</div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Security Audit Log</h2>
              <p className="text-sm text-gray-600 mt-1">
                Real-time security events for SOC 2 compliance monitoring
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditLogs.map((log) => (
                    <tr key={log.eventId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTimestamp(log.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.eventType}
                        {log.subType && <div className="text-xs text-gray-500">{log.subType}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.userId && <div><strong>User:</strong> {log.userId}</div>}
                        {log.success !== undefined && (
                          <div><strong>Success:</strong> {log.success ? 'Yes' : 'No'}</div>
                        )}
                        {log.dataType && <div><strong>Data Type:</strong> {log.dataType}</div>}
                        {log.action && <div><strong>Action:</strong> {log.action}</div>}
                        {log.details && (
                          <div className="text-xs text-gray-600 mt-1">
                            {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                        {log.eventId.substring(0, 8)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {auditLogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No security events found for the selected time range.
                </div>
              )}
            </div>
          </div>

          {/* SOC 2 Compliance Status */}
          <div className="mt-8 bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SOC 2 Compliance Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900">Audit Logging</div>
                <div className="text-green-600 text-sm">✓ Active</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900">Rate Limiting</div>
                <div className="text-green-600 text-sm">✓ Active</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900">Security Headers</div>
                <div className="text-green-600 text-sm">✓ Active</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900">Input Validation</div>
                <div className="text-green-600 text-sm">✓ Active</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Next Steps for Full SOC 2 Compliance:</div>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Implement centralized logging to secure backend</li>
                <li>• Add multi-factor authentication</li>
                <li>• Set up automated backup and disaster recovery</li>
                <li>• Conduct penetration testing</li>
                <li>• Complete employee security training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityDashboard;