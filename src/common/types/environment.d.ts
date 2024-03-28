declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB_NAME: string;
      PGADMIN_DEFAULT_EMAIL: string;
      PGADMIN_DEFAULT_PASSWORD: string;
      SERVER_PORT: string;
    }
  }
}

export {};
