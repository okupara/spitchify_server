import querystring from "querystring"
import axios from "axios"
import { getRedirectURL, getEncodedAuthorization } from "./env"

const URL_GET_TOKEN = "https://accounts.spotify.com/api/token"

export const getToken = (code: string) =>
  axios
    .post(
      URL_GET_TOKEN,
      querystring.stringify({
        code,
        grant_type: "client_credentials",
        redirect_uri: getRedirectURL()
      }),
      {
        headers: {
          Authorization: `Basic ${getEncodedAuthorization()}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(response => {
      const { access_token, expires_in } = response.data
      return Promise.resolve({
        access_token,
        expires_in,
        error: ""
      })
    })
