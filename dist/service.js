"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const env_1 = require("./env");
const URL_GET_TOKEN = "https://accounts.spotify.com/api/token";
exports.getToken = (code) => axios_1.default
    .post(URL_GET_TOKEN, querystring_1.default.stringify({
    code,
    grant_type: "client_credentials",
    redirect_uri: env_1.getRedirectURL()
}), {
    headers: {
        Authorization: `Basic ${env_1.getEncodedAuthorization()}`,
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
    .then(response => {
    const { access_token, expires_in } = response.data;
    return Promise.resolve({
        access_token,
        expires_in,
        error: ""
    });
});
