import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { UrlsModule } from './urls/urls.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-graphql'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Automatically generates schema file
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ExampleModule,
    UrlsModule, // Import the new module
  ],
  controllers: [AppController], //like waiter taking orders, defines request response
  providers: [AppService], //chef making foods, handles actual business logic
})
export class AppModule {}
//imports means connecting other modules
