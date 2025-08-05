import { Module } from '@nestjs/common'
import { env } from 'src/constants/environment.constant'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.database,
      synchronize: env.database.synchronize,
      logging: ['schema', 'error', 'warn'],
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
})
export class DatabaseModule {}
