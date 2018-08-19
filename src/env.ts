const {
  PORT = 3333,
  API_CLIENT = "",
  API_SECRET = "",
  REDIRECT_PROTOCOL = "http",
  REDIRECT_HOST = "127.0.0.1"
} = process.env

const CALLBACK_URL = `${REDIRECT_PROTOCOL}://${REDIRECT_HOST}:${PORT}/spitchify_callback`
export const port = PORT
export const apiClient = API_CLIENT
export const apiSecret = API_SECRET
export const redirectProtocol = REDIRECT_PROTOCOL
export const redirectHost = REDIRECT_HOST
export const redirectUrl = CALLBACK_URL
export const getEncodedAuthorization = () =>
  Buffer.from(`${API_CLIENT}:${API_SECRET}`).toString("base64")
