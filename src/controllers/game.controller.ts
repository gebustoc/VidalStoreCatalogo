import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Game } from '../model/Game.js';
import { GameService } from '../service/game.service.js';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';


@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("/v1/catalogo")
  async getGames() : Promise<Array<Game>>{
    return this.gameService.getGames();
  }

  @Get("/v1/catalogo/:id")
  async getGame(@Param("id") idText : string) : Promise<Game|null>{
    let id :undefined|number= undefined;    
    try{id = Number.parseInt(idText)}
    catch(error){throw new BadRequestException(`id must be a valid integer:${error}`)}


    if (!(Number.isInteger(id)) ){throw new BadRequestException("id must be a valid integer")}
    const game :Game|null= await this.gameService.getGame(id)

    if (game==null){throw new NotFoundException("Game Could Not Be Found.")}
    return game;
  }

  @Put("/v1/catalogo/:id")
  async putGame(@Body() body:Game,@Param("id") idText : string ){
    let id :undefined|number= undefined;    
    try{id = Number.parseInt(idText)}
    catch(error){throw new BadRequestException(`id must be a valid integer:${error}`)}


    const evento = plainToInstance(Game, body);
    const errores = validateSync(evento, { whitelist: true, forbidNonWhitelisted: true });
    if (errores.length !== 0)throw new BadRequestException("missing body"); 

    return this.gameService.writeGame(id,body);  
  }

  @Post("/v1/catalogo")
  async addGame(@Body() body:object){
    if (body==null){throw new BadRequestException(`no body provided`)}
    
    const evento = plainToInstance(Game, body);
    const errores = validateSync(evento, { whitelist: true, forbidNonWhitelisted: true });
    if (errores.length !== 0)throw new BadRequestException("Bad Body"); 
    return this.gameService.addGame(body as Game);
  }

}
