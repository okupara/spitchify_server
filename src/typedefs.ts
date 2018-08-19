import { ObjectType, Field } from "type-graphql"
import "reflect-metadata"

@ObjectType()
export class Album {
  @Field() id: string
  @Field() artist: string
  @Field() title: string
}
