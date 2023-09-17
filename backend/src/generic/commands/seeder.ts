import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { PieceService } from '../../piece/piece.service';
import { Categories } from '../../categories/entities/categories.entity';
import { carParts } from './data';
import { Providers } from '../../providers/entities/providers.entity';



import {
  randFullName,
  randPhoneNumber,
  randAvatar,
  randEmail,
  randText,
  randAddress,
  randVehicleManufacturer,
  randVehicleModel,
  randVehicleFuel,
  randNumber,
  randDomainName,
} from '@ngneat/falso';
import { Piece } from '../../piece/entities/piece.entity';
import { Cars } from '../../cars/entities/cars.entity';
import { CategoriesService } from '../../categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const pieceService: PieceService = app.get(PieceService);
  const categoryService: CategoriesService = app.get(CategoriesService);
  const providers = [];
  const cars = [];

  for (let i = 0; i < 10; i++) {
    const provider = new Providers();
    provider.name = randFullName();
    provider.phone = randPhoneNumber();
    provider.email = randEmail();
    const address = randAddress();
    provider.address = address.street + ',' + address.zipCode;
    provider.city = address.city;
    provider.logo = randAvatar()+ `?random=${Math.random()}`;
    provider.observation = randText();

    providers.push(provider);

    const car = new Cars();
    car.brand = randVehicleManufacturer();
    car.model = randVehicleModel();
    car.motorization = randVehicleFuel();
    car.carCode = randPhoneNumber()
    cars.push(car);
  }

  for (let i = 0; i < carParts.length; i++) {
    let category = new Categories();
  

    category.label = carParts[i].category.name;
    category.image = carParts[i].category.image;
    category = await categoryService.addEntity(category);
    for (let j = 0; j < carParts[i].subcategories.length; j++) {
      let subCategory = new Categories();
      subCategory.label = carParts[i].subcategories[j].name;
      subCategory.image = carParts[i].subcategories[j].image;
      subCategory.parent = category.id;
      let pieceInfosArray =[]
      for(let i=0;i<=10;i++ ){
        const name = randDomainName;
        const code = randPhoneNumber();  
        pieceInfosArray.push({ name, code })  
    }
    subCategory.piecesInfos = pieceInfosArray

      subCategory = await categoryService.addEntity(subCategory);
      
      for (let k = 0; k < carParts[i].subcategories[j].pieces.length; k++) {
        const piece = new Piece();
        piece.category = category;
        piece.subCategory = subCategory;
        piece.piece = carParts[i].subcategories[j].pieces[k].name;
        piece.image = carParts[i].subcategories[j].pieces[k].image;
        piece.description = randText();
        piece.price = Math.floor(Math.random() * 1000);
        piece.provider =
          providers[Math.floor(Math.random() * providers.length)];
        piece.cars = cars[Math.floor(Math.random() * cars.length)];
        piece.constructorReference = "XA" + (Math.floor(Math.random() * 1000) + 1000);

        pieceService.addEntity(piece);
      }
    }
  }
  await app.close();
}
bootstrap();
