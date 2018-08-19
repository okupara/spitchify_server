import querystring from "querystring"
import axios from "axios"
import path from "path"
import bodyParser from "body-parser"
import { Request, Response, Application } from "express"
import * as env from "./env"
import { isActiveString } from "./util"

const URL_GET_TOKEN = "https://accounts.spotify.com/api/token"

export default (expressApp: Application) => {
  expressApp.set("views", path.join(process.cwd(), "views"))
  expressApp.set("view engine", "ejs")
  expressApp.use(bodyParser.urlencoded({ extended: false }))
  expressApp.use(bodyParser.json())

  expressApp.get("/login", (_, res) => {
    if (
      isActiveString(env.apiClient) === false ||
      isActiveString(env.apiSecret) === false
    ) {
      throw new Error("it should be set the your client ID and client secret.")
    }
    res.redirect(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${
        env.apiClient
      }&redirect_uri=${env.redirectUrl}`
    )
  })

  expressApp.get("/spitchify_callback", (req, res) => {
    const code = req.query.code
    getToken(code)
      .then(data => {
        // TODO: redirect to a page like "/completed".
        res.render("callback", data)
      })
      .catch(ex => {
        console.log(ex)
        res.send(`ERROR: ${ex}`)
      })
  })
}

export const getToken = (code: string) =>
  axios
    .post(
      URL_GET_TOKEN,
      querystring.stringify({
        code,
        grant_type: "client_credentials",
        redirect_uri: env.redirectUrl
      }),
      {
        headers: {
          Authorization: `Basic ${env.getEncodedAuthorization()}`,
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
