import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async execute() {
    // Borrar registros
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = [];
    data.results.forEach(({ name, url }) => {
      const segment = url.split('/')
      const no: number = +segment[segment.length - 2];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed !!!';
  }

  async executeResolveOptionOne() {
    // Borrar registros
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    const insertPromiseArray: Promise<any>[] = [];

    data.results.forEach(({ name, url }) => {
      const segment = url.split('/')
      const no: number = +segment[segment.length - 2];
      // const pokemon = await this.pokemonModel.create({ name, no });
      insertPromiseArray.push(
        this.pokemonModel.create({ name, no })
      );
    });

    await Promise.all(insertPromiseArray);

    return 'Seed executed !!!';
  }
}
