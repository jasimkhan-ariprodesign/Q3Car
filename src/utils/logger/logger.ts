// 1. Global toggle (set to false before production builds)
const LOGGING_ENABLED = true;

const _logger = {
  info: (...args: any) => LOGGING_ENABLED && console.info('[ℹ️ INFO]', ...args),

  warn: (...args: any) => LOGGING_ENABLED && console.warn('[⚠️ WARN]', ...args),

  error: (...args: any) => LOGGING_ENABLED && console.error('[❌ ERROR]', ...args),

  debug: (...args: any) => LOGGING_ENABLED && console.debug('[🐛 DEBUG]', ...args),

  log: (...args: any) => LOGGING_ENABLED && console.log('[📝 LOG]', ...args),

  success: (...args: any) => LOGGING_ENABLED && console.log('[✅ SUCCESS]', ...args),
};

export default _logger;
