export interface GuestRsvp {
  id: string;
  fullName: string;
  department: string;
  phone: string;
  attending: boolean;
  hasGuest: boolean;
  guestName?: string;
  needVan: boolean;
  foodPreference: 'churrasco' | 'frutos_do_mar' | 'vegetariano';
  drinkPreference: 'cerveja' | 'caipirinha' | 'nao_alcoolico';
  createdAt: string;
}

export interface MuralMessage {
  id: string;
  author: string;
  department: string;
  message: string;
  likes: number;
  timeAgo: string;
  avatarSeed: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  votes: number;
}
