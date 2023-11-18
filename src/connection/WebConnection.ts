import ky from "ky";

export class WebConnection {

  /** WebApiパス */
  public static apiPath = "http://localhost:8080/api";

  /** WebSocketパス */
  public static websocketPath = "http://localhost:8080/websocket";

  /** api-client */
  private client = ky.create({ prefixUrl: WebConnection.apiPath });

  public async get<T>(path: string) {
    try {
      const data = await this.client.get(path).json<T>();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public async post<T>(path: string, data: T) {
    try {
      await this.client.post(path, {
        json: data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const client = new WebConnection();
