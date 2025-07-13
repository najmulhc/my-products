import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://najmulhudachowdhury:RrkeVcen5Olx9yhR@product-cluster.5amvvrx.mongodb.net/my-products?retryWrites=true&w=majority&appName=Product-cluster',
      {},
    ),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
