import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  healthz() {
    return { message: "ok" };
  }
}
