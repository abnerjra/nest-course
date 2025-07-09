import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async execute() {
    // Borrar registros
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
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

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

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
