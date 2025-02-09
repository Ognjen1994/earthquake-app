import { AppDataSource } from "../database/data-source";
import { Earthquake } from "../database/entities/Earthquake";

export const resolvers = {
  Query: {
    earthquakes: async (
      _parent: unknown,
      { limit = 100, offset = 0 }: { limit: number; offset: number }
    ): Promise<Earthquake[]> => {
      return AppDataSource.getRepository(Earthquake)
        .createQueryBuilder("earthquake")
        .orderBy("earthquake.date", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
    },

    earthquakeCount: async (): Promise<number> => {
      const count = await AppDataSource.getRepository(Earthquake).count();

      return count;
    },
  },

  Mutation: {
    addEarthquake: async (
      _parent: unknown,
      {
        location,
        magnitude,
        date,
      }: { location: string; magnitude: number; date: string }
    ): Promise<Earthquake> => {
      const earthquake = new Earthquake();
      earthquake.location = location;
      earthquake.magnitude = magnitude;
      earthquake.date = new Date(date);

      return AppDataSource.getRepository(Earthquake).save(earthquake);
    },

    updateEarthquake: async (
      _parent: unknown,
      {
        id,
        location,
        magnitude,
        date,
      }: { id: string; location?: string; magnitude?: number; date?: string }
    ): Promise<Earthquake | null> => {
      const repository = AppDataSource.getRepository(Earthquake);
      await repository.update(id, { location, magnitude, date });

      return repository.findOneBy({ id });
    },

    deleteEarthquake: async (
      _parent: unknown,
      { id }: { id: string }
    ): Promise<boolean> => {
      await AppDataSource.getRepository(Earthquake).delete(id);

      return true;
    },
  },
};
