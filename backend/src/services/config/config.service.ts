import { Injectable } from "@nestjs/common";
import "dotenv/config";

@Injectable()
export class ConfigService {
  get Port(): string {
    return process.env.PORT;
  }

  get EncryptionInfo(): { password: string; algorithm: string } {
    return {
      password: process.env.ENCRYPTION_PASSWORD,
      algorithm: process.env.ENCRYPTION_ALGORITHM,
    };
  }

  get NodeEnv(): string {
    return process.env.NODE_ENV;
  }

  get isProduction(): boolean {
    const mode = process.env.MODE;
    return mode === "PROD";
  }

  get isDevelopment(): boolean {
    const mode = process.env.MODE;
    return mode === "DEV";
  }

  get FrontendAddress(): string {
    return process.env.FRONTEND_ADDRESS;
  }

  get AuthSecretToken(): string {
    return process.env.AUTH_SECRET_TOKEN;
  }

  get TypeOrmConfig() {
    return {
      database: process.env.DATABASE_NAME || "restaurant",
      host: process.env.DATABASE_HOST || "127.0.0.1",
      port: process.env.DATABASE_PORT
        ? Number(process.env.DATABASE_PORT)
        : 3306,
      username: process.env.DATABASE_USERNAME || "root",
    };
  }

  get SeedDataConfig(): {
    seedEmail: string;
    seedPassword: string;
    seedRestaurantName: string;
    seedOwnerName: string;
  } {
    return {
      seedEmail: process.env.SEED_EMAIL,
      seedPassword: process.env.SEED_PASSWORD,
      seedRestaurantName: process.env.SEED_RESTAURANT_NAME,
      seedOwnerName: process.env.SEED_OWNER_NAME,
    };
  }
}

const configService = new ConfigService();

export { configService };
