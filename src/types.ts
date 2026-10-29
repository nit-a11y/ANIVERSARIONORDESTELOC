export interface GuestRsvp {
  id: string;
  fullName: string;
  department: string;
  phone: string;
  attending: boolean;
  createdAt: string;
}
export interface MuralMessage {
  id: string; author: string; department: string; message: string;
  likes: number; timeAgo: string; avatarSeed: string;
}
export interface SongTrack {
  id: string; title: string; artist: string; genre: string; votes: number;
}
