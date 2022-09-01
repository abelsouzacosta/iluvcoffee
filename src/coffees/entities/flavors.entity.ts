import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity('flavors')
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable({
    name: 'coffees_flavors',
    joinColumn: {
      name: 'flavor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'coffee_id',
      referencedColumnName: 'id',
    },
  })
  // eslint-disable-next-line
  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
