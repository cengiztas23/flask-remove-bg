const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
export default isLocal;
