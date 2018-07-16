import express from "express"
import path from "path"
import bodyParser from "body-parser"
import { getToken } from "./service"
import * as env from "./env"

const app = express()
app.set("views", path.join(process.cwd(), "views"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${env.getApiClient()}&redirect_uri=${env.getRedirectURL()}`
  )
})

app.get("/spitchify_callback", (req, res) => {
  const code = req.query.code
  getToken(code)
    .then(data => {
      res.render("callback", data)
    })
    .catch(ex => {
      console.log(ex)
      res.send(`ERROR: ${ex}`)
    })
})

app.listen(env.getPort(), () => {
  console.log(env.getRedirectURL())
})
