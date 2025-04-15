import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-graphql'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Automatically generates schema file
    }),
    ExampleModule, // Import the new module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
