import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produk')
export class Produk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  barcode: string;

  @Column()
  nama_produk: string;

  @Column()
  deskripsi_produk: string;

  @Column()
  harga_beli: number;

  @Column()
  harga_jual: number;

  @Column()
  foto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' }) //fungsi onupdate biar update
  updated_at: Date;

  //relasi ke user many to one
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
