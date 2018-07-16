import querystring from "querystring"
import axios from "axios"

import request from "request"

import { getRedirectURL, getEncodedAuthorization } from "./env"
import { rejects } from "assert"

const URL_GET_TOKEN = "https://accounts.spotify.com/api/token"
console.log(getEncodedAuthorization())

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
      console.log("zuuu", access_token, expires_in)
      return Promise.resolve({
        access_token,
        expires_in,
        error: ""
      })
    })
