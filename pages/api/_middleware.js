import { NextResponse } from 'next/server';
import { RateLimiter, SecurityAuditLogger } from '../../lib/security';

export function middleware(request) {
  // SECURITY: Block all file upload endpoints
  const url = new URL(request.url);
  const blockedEndpoints = ['/api/extract-pdf', '/api/upload', '/api/process-document'];
  
  if (blockedEndpoints.some(endpoint => url.pathname.includes(endpoint))) {
    SecurityAuditLogger.logSecurityIncident('BLOCKED_FILE_UPLOAD_ATTEMPT', {
      ip: request.headers.get('x-forwarded-for') || request.ip || 'unknown',
      userAgent: request.headers.get('user-agent'),
      url: request.url,
      endpoint: url.pathname
    });
    
    return new Response(JSON.stringify({
      error: 'Service Temporarily Unavailable',
      message: 'Document upload functionality is disabled for security and legal compliance.',
      alternatives: [
        { name: 'Manual Entry Tool', url: '/tool' },
        { name: 'Request Demo', url: '/ai-tool' },
        { name: 'Contact Us', url: '/contact' }
      ]
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  const response = NextResponse.next();
  
  // Add security headers to all API responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Get client IP for rate limiting and audit logging
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  
  // Rate limiting
  const rateLimitCheck = RateLimiter.checkLimit(ip, 100, 15); // 100 requests per 15 minutes
  
  if (!rateLimitCheck.allowed) {
    SecurityAuditLogger.logSecurityIncident('RATE_LIMIT_EXCEEDED', {
      ip,
      userAgent: request.headers.get('user-agent'),
      url: request.url
    });
    
    return new Response(JSON.stringify({ 
      error: 'Rate limit exceeded',
      retryAfter: rateLimitCheck.resetTime 
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000).toString(),
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitCheck.resetTime.toString()
      }
    });
  }
  
  // Add rate limit headers to successful responses
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', rateLimitCheck.remaining.toString());
  response.headers.set('X-RateLimit-Reset', rateLimitCheck.resetTime.toString());
  
  // Log API access for audit trail
  SecurityAuditLogger.logDataAccess(null, 'api_call', 'access', request.url);
  
  return response;
}

export const config = {
  matcher: '/api/:path*'
};