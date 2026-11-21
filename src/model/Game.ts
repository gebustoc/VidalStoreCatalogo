import { IsHexColor, IsNotEmpty, isNotEmpty, IsString } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
export class Game{
    @PrimaryGeneratedColumn()
    id:number= 0

    @IsNotEmpty()
    @IsString()
    @Column({unique:true})
    slug:string= ""


    @IsNotEmpty()
    @IsString()
    @Column()
    name:string= ""

    @Column()
    @IsString()
    lowercasename:string= ""

    @IsNotEmpty()
    @Column()
    @IsString()
    released:string= "2018-10-26"


    @IsNotEmpty()
    @Column()
    @IsString()
    background_image:string= ""

    @IsNotEmpty()
    @Column()
    @IsHexColor()
    saturated_color:string= ""

    @IsNotEmpty()
    @Column()
    @IsHexColor()
    dominant_color:string= ""
}
