const SOCKET_URL = import.meta.env.DEV
  ? "http://localhost:3006"
  : window.location.origin;

export { SOCKET_URL };
