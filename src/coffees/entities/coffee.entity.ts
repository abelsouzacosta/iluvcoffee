import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavors.entity';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable({
    name: 'coffees_flavors',
  })
  @ManyToMany(
    //eslint-disable-next-line
    (type) => Flavor,
    (flavor) => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors: Flavor[];
}
