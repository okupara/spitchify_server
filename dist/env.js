"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT = 3000, API_CLIENT = "", API_SECRET = "", REDIRECT_PROTOCOL = "http", REDIRECT_HOST = "127.0.0.1" } = process.env;
const CALLBACK_URL = `${REDIRECT_PROTOCOL}://${REDIRECT_HOST}:${PORT}/spitchify_callback`;
exports.getPort = () => PORT;
exports.getApiClient = () => API_CLIENT;
exports.getRedirectProtocol = () => REDIRECT_PROTOCOL;
exports.getRedirectHost = () => REDIRECT_HOST;
exports.getRedirectURL = () => CALLBACK_URL;
exports.getEncodedAuthorization = () => console.log(`${API_CLIENT}:${API_SECRET}`) ||
    Buffer.from(`${API_CLIENT}:${API_SECRET}`).toString("base64");
