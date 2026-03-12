import type { CorsOptions } from "cors";
import type { IDotenvConfig } from "./dotenv.interface.js";

export class CorsConfig {
  private _config: CorsOptions;

  constructor(private readonly dotenvConfig: IDotenvConfig) {
    this._config = {
      origin: this.dotenvConfig.get("CLIENT_URL_NAME"),
      credentials: true,
    };
  }

  public get config(): CorsOptions {
    return this._config;
  }
}
