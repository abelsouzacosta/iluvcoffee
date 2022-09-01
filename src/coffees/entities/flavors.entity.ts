import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flavors')
export class Flavors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
