import { UserDTO } from "./user";

export interface FindPeopleResponse {
  totalElements?: number;
  users?: UserDTO[];
}
