import { GraphQLServer } from "graphql-yoga"
import { buildSchema } from "type-graphql"
import * as env from "./env"
import { AlbumResolver } from "./resolvers"
import bindUserOauth from "./user-oauth"

const bootStrap = async () => {
  const schema = await buildSchema({
    resolvers: [AlbumResolver]
  })

  const server = new GraphQLServer({ schema })

  const serverOptions = {
    port: env.port,
    endpoint: "/graphql",
    playground: "/playground"
  }

  bindUserOauth(server.express)

  server.start(serverOptions, () => {
    console.log(`Server is running... the port is ${serverOptions.port}.`)
  })
}

bootStrap()
