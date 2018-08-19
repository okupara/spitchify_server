const {
  PORT = 3000,
  API_CLIENT = "",
  API_SECRET = "",
  REDIRECT_PROTOCOL = "http",
  REDIRECT_HOST = "127.0.0.1"
} = process.env

const CALLBACK_URL = `${REDIRECT_PROTOCOL}://${REDIRECT_HOST}:${PORT}/spitchify_callback`
export const getPort = () => PORT
export const getApiClient = () => API_CLIENT
export const getRedirectProtocol = () => REDIRECT_PROTOCOL
export const getRedirectHost = () => REDIRECT_HOST
export const getRedirectURL = () => CALLBACK_URL
export const getEncodedAuthorization = () =>
  Buffer.from(`${API_CLIENT}:${API_SECRET}`).toString("base64")
