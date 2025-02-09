import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Earthquake {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  location: string;

  @Column("float")
  magnitude: number;

  @Column({ type: "timestamp" })
  date: Date;
}
