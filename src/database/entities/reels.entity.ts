export class Reel {
  id?: string;
  user_id: string;
  images: Array<string>;
  text: string;
  music_track: string;
  share_count: number;
  comment_count: number;
  like_count: number;
  save_count: number;
  timestamp: Date;
  created_at: Date;
  updated_at: Date;
}
