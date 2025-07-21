// SOC 2 Security Controls Implementation
import crypto from 'crypto';

// Security audit logging for SOC 2 compliance
export class SecurityAuditLogger {
  static logSecurityEvent(event) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      eventId: crypto.randomUUID(),
      ...event,
      // SOC 2 required fields
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      ipAddress: event.ipAddress || 'unknown',
      sessionId: event.sessionId || 'anonymous'
    };

    // In production, this would go to a secure logging service
    console.log('[SECURITY AUDIT]', JSON.stringify(auditEntry));
    
    // Also store for SOC 2 evidence collection
    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('securityAuditLogs') || '[]');
      existingLogs.push(auditEntry);
      // Keep only last 1000 entries in browser
      if (existingLogs.length > 1000) {
        existingLogs.splice(0, existingLogs.length - 1000);
      }
      localStorage.setItem('securityAuditLogs', JSON.stringify(existingLogs));
    }

    return auditEntry.eventId;
  }

  static logAuthentication(success, userId = null, method = 'email') {
    return this.logSecurityEvent({
      eventType: 'AUTHENTICATION',
      success,
      userId,
      method,
      severity: success ? 'INFO' : 'WARNING'
    });
  }

  static logDataAccess(userId, dataType, action, recordId = null) {
    return this.logSecurityEvent({
      eventType: 'DATA_ACCESS',
      userId,
      dataType, // 'trust_document', 'certification', 'user_data'
      action, // 'read', 'create', 'update', 'delete'
      recordId,
      severity: 'INFO'
    });
  }

  static logSystemEvent(eventType, details, severity = 'INFO') {
    return this.logSecurityEvent({
      eventType: 'SYSTEM_EVENT',
      subType: eventType,
      details,
      severity
    });
  }

  static logSecurityIncident(incidentType, details, severity = 'HIGH') {
    return this.logSecurityEvent({
      eventType: 'SECURITY_INCIDENT',
      incidentType,
      details,
      severity,
      requiresNotification: severity === 'HIGH' || severity === 'CRITICAL'
    });
  }

  static logPrivacyEvent(eventType, userId, dataType, details = {}) {
    return this.logSecurityEvent({
      eventType: 'PRIVACY_EVENT',
      subType: eventType, // 'data_export', 'data_deletion', 'consent_given', 'consent_withdrawn'
      userId,
      dataType,
      details,
      severity: 'INFO'
    });
  }
}

// Input validation and sanitization for security
export class SecurityValidator {
  static validateInput(input, type = 'text', maxLength = 1000) {
    if (!input) return { valid: true, sanitized: '' };

    // Convert to string
    let sanitized = String(input);

    // Length check
    if (sanitized.length > maxLength) {
      SecurityAuditLogger.logSecurityIncident('INPUT_TOO_LONG', {
        inputLength: sanitized.length,
        maxLength,
        inputType: type
      });
      return { valid: false, error: `Input exceeds maximum length of ${maxLength}`, sanitized: '' };
    }

    switch (type) {
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(sanitized)) {
          return { valid: false, error: 'Invalid email format', sanitized: '' };
        }
        break;

      case 'phone':
        // Remove all non-digits
        sanitized = sanitized.replace(/\D/g, '');
        if (sanitized.length < 10 || sanitized.length > 15) {
          return { valid: false, error: 'Invalid phone number', sanitized: '' };
        }
        break;

      case 'alphanumeric':
        if (!/^[a-zA-Z0-9\s\-_.]+$/.test(sanitized)) {
          return { valid: false, error: 'Contains invalid characters', sanitized: '' };
        }
        break;

      case 'name':
        // Allow letters, spaces, hyphens, apostrophes
        if (!/^[a-zA-Z\s\-'.]+$/.test(sanitized)) {
          return { valid: false, error: 'Invalid name format', sanitized: '' };
        }
        break;

      case 'text':
      default:
        // Remove HTML tags and suspicious patterns
        sanitized = sanitized
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
        break;
    }

    return { valid: true, sanitized, original: input };
  }

  static validateFileUpload(file) {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    const maxSize = 50 * 1024 * 1024; // 50MB
    const minSize = 100; // 100 bytes

    if (!allowedTypes.includes(file.type)) {
      SecurityAuditLogger.logSecurityIncident('INVALID_FILE_TYPE', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });
      return { valid: false, error: 'Invalid file type' };
    }

    if (file.size > maxSize) {
      SecurityAuditLogger.logSecurityIncident('FILE_TOO_LARGE', {
        fileName: file.name,
        fileSize: file.size,
        maxSize
      });
      return { valid: false, error: 'File too large' };
    }

    if (file.size < minSize) {
      return { valid: false, error: 'File too small or empty' };
    }

    // Log successful file validation
    SecurityAuditLogger.logDataAccess(null, 'file_upload', 'validate', file.name);

    return { valid: true };
  }
}

// Rate limiting for API protection
export class RateLimiter {
  static limits = new Map();

  static checkLimit(identifier, maxRequests = 100, windowMinutes = 15) {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const key = `${identifier}_${Math.floor(now / windowMs)}`;

    const current = this.limits.get(key) || 0;
    
    if (current >= maxRequests) {
      SecurityAuditLogger.logSecurityIncident('RATE_LIMIT_EXCEEDED', {
        identifier,
        currentRequests: current,
        maxRequests,
        windowMinutes
      });
      return { allowed: false, remaining: 0, resetTime: Math.ceil(now / windowMs) * windowMs };
    }

    this.limits.set(key, current + 1);
    
    // Clean up old entries
    for (const [oldKey] of this.limits) {
      const keyTime = parseInt(oldKey.split('_').pop());
      if (now - keyTime > windowMs * 2) {
        this.limits.delete(oldKey);
      }
    }

    return { 
      allowed: true, 
      remaining: maxRequests - current - 1,
      resetTime: Math.ceil(now / windowMs) * windowMs
    };
  }
}

// Session security management
export class SessionManager {
  static generateSecureSessionId() {
    return crypto.randomBytes(32).toString('hex');
  }

  static createSession(userId, metadata = {}) {
    const sessionId = this.generateSecureSessionId();
    const session = {
      sessionId,
      userId,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      metadata,
      isActive: true
    };

    SecurityAuditLogger.logAuthentication(true, userId, 'session_created');
    
    if (typeof window !== 'undefined') {
      // Store session securely in browser
      sessionStorage.setItem('trusto_session', JSON.stringify(session));
    }

    return session;
  }

  static validateSession(sessionId) {
    if (typeof window === 'undefined') return null;

    const sessionData = sessionStorage.getItem('trusto_session');
    if (!sessionData) return null;

    try {
      const session = JSON.parse(sessionData);
      if (session.sessionId !== sessionId || !session.isActive) {
        return null;
      }

      // Check if session expired (24 hours)
      const maxAge = 24 * 60 * 60 * 1000;
      if (Date.now() - new Date(session.createdAt).getTime() > maxAge) {
        this.destroySession(sessionId);
        return null;
      }

      // Update last activity
      session.lastActivity = new Date().toISOString();
      sessionStorage.setItem('trusto_session', JSON.stringify(session));

      return session;
    } catch (error) {
      SecurityAuditLogger.logSecurityIncident('SESSION_VALIDATION_ERROR', {
        error: error.message
      });
      return null;
    }
  }

  static destroySession(sessionId) {
    SecurityAuditLogger.logSystemEvent('SESSION_DESTROYED', { sessionId });
    
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('trusto_session');
    }
  }
}

// Data encryption utilities
export class DataEncryption {
  static encryptSensitiveData(data, key = null) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }

    // In production, use a proper encryption key from environment
    const algorithm = 'aes-256-gcm';
    const secretKey = key || process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
    
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipher(algorithm, secretKey);
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        algorithm
      };
    } catch (error) {
      SecurityAuditLogger.logSecurityIncident('ENCRYPTION_ERROR', {
        error: error.message
      });
      throw new Error('Encryption failed');
    }
  }

  static decryptSensitiveData(encryptedData, key = null) {
    const secretKey = key || process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
    
    try {
      const decipher = crypto.createDecipher(encryptedData.algorithm, secretKey);
      
      let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      SecurityAuditLogger.logSecurityIncident('DECRYPTION_ERROR', {
        error: error.message
      });
      throw new Error('Decryption failed');
    }
  }
}

// Security headers for web application
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.hotjar.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;",
};

export default {
  SecurityAuditLogger,
  SecurityValidator,
  RateLimiter,
  SessionManager,
  DataEncryption,
  securityHeaders
};