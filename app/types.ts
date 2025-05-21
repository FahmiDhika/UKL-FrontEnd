export interface IUser {
  nama_nasabah: string;
  gender: string;
  alamat: string;
  telepon: string;
  username: string;
  password: string;
  foto: string;
}

export interface IPlaylist {
  uuid: string;
  playlist_name: string;
  song_count: number;
}