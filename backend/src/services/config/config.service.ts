require('dotenv').config();
class ConfigService {



  public getPort(): string {
    return process.env.PORT;
  }

  public getEncryptionInfo(): { password: string; algorithm: string } {
    return {
      password: process.env.ENCRYPTION_PASSWORD,
      algorithm: process.env.ENCRYPTION_ALGORITHM,
    };
  }


  public getNodeEnv(): string {
    return process.env.NODE_ENV;
  }

  public isProduction(): boolean {
    const mode = process.env.MODE;
    return mode === 'PROD';
  }

  public isDevelopment(): boolean {
    const mode = process.env.MODE;
    return mode === 'DEV';
  }

  public getFrontendAddress(): string {
    return process.env.FRONTEND_ADDRESS;
  }

  public getAuthSecretToken(): string {
    return process.env.AUTH_SECRET_TOKEN;
  }

  public getTypeOrmConfig(): {
    url: string;
    database: string;
  } {
    return {
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
    };
  }
}

const configService = new ConfigService();

export { configService };
