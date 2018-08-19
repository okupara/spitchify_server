import { Resolver, ResolverInterface, Query, Arg } from "type-graphql"
import { Album } from "./typedefs"

@Resolver(of => Album)
export class AlbumResolver {
  @Query(returns => Album)
  getAlbum(@Arg("title") title: string) {
    return {
      id: "11111",
      title: "hoge",
      artist: "fooooo"
    }
  }
}
