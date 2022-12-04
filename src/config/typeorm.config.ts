import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'alex',
    password: 'alex123',
    database: 'tasks_db',
    autoLoadEntities: true,
    synchronize: true,
}