import { SelectQueryBuilder } from "typeorm";


export async function paginate<Entity>(
    qb:SelectQueryBuilder<Entity>,
    options:{page:number,limit:number}
):Promise<Entity[]>{
const page=options.page ?? 1;
const limit=options.limit ?? 1;
const data= await qb
.skip((page-1)*limit)
.take(limit)
.getMany();
return data;
}