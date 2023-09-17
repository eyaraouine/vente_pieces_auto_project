import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "../generic/crud/crud.Service";
import { Categories } from "./entities/categories.entity";
import { Repository } from "typeorm";
import { CreateCategoriesDto } from "./dto/create-categories.dto";
import { UpdateCategoriesDto } from "./dto/update-categories.dto";
import { PiecesInfos } from "./interfaces/piecesInfos";

@Injectable()
export class CategoriesService extends CrudService<Categories, CreateCategoriesDto, UpdateCategoriesDto> {

    constructor(@InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>) {
        super(categoriesRepository);
    }
    async getAllCategories() {
        const categories = await this.categoriesRepository
            .createQueryBuilder('categories')
            .where('categories.parent IS NULL')
            .getMany();
        return categories;
    }
    async getSubCategories(id: number) {
        const subCategories = await this.categoriesRepository
            .createQueryBuilder('categories')
            .where('categories.parent = :parentId', { parentId: id })
            .getMany();

        return subCategories;
    }
    async getCategoryByLabel(label:string):Promise<Categories>{
        const category = await this.categoriesRepository
        .createQueryBuilder('categories')
        .where('categories.label = :label', { label })
        .getOne();

      return category;
    }
    async getPiecesInfosBySubCategory(id: number): Promise<PiecesInfos[]> {
        const subCategory = await this.categoriesRepository.findOne(id);
      
        if (!subCategory || subCategory.parent === null) {
          // La catégorie n'existe pas ou n'a pas de parent, renvoyer une liste vide
          return [];
        }
      
        const piecesInfos = subCategory.piecesInfos;
      
        if (!piecesInfos || piecesInfos.length === 0) {
          // Aucune pièce trouvée pour cette sous-catégorie
          return [];
        }
      
      return piecesInfos;
   
      }
      async getCategoryAndSubCategoryByPieceCode(pieceCode: string):Promise<{category:Categories,subCategory:Categories,pieceName:string}> {
        // const subCategory = await this.categoriesRepository
        //   .createQueryBuilder('categories')
        //   .leftJoinAndSelect('categories.piecesInfos', 'piecesInfos')
        //   .where('piecesInfos.code = :code', { code: pieceCode })
        //   .getOne();
        //   console.log(subCategory)
          const subCategory = await this.categoriesRepository.createQueryBuilder('categories')
          .where(`JSON_CONTAINS(categories.piecesInfos, '[{"code": "${pieceCode}"}]')`)
          .getOne()
       console.log("nouveau",subCategory)
         if (!subCategory) {
          return null; // Gérez le cas où le morceau n'est pas trouvé
        }
         const category = await this.categoriesRepository.findOne(subCategory.parent);
         console.log(category)
         const pieceName = subCategory.piecesInfos.find(p => p.code === pieceCode)?.name || '';
        console.log(pieceName)
         // // Accédez aux informations de catégorie et de sous-catégorie à partir de pieceInfo
    
         return { category: category, subCategory:subCategory,pieceName:pieceName  };
        
      }
    }
    

