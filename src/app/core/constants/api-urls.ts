import { environment } from "src/enviroments/enviroment";

export function backendUrl(endpoint: string) {
  return environment.url_back_end.concat(endpoint);
}
