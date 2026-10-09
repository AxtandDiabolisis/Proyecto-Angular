const isLocalAngularDevServer = typeof window !== 'undefined'
  && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  && window.location.port === '4200';

export const API_BASE_URL = isLocalAngularDevServer
  ? 'http://127.0.0.1:8000'
  : '/api';
