export interface ProfileItem {
  avatar_large_url: string;
  follower_count: number;
  following_count: number;
  profile_deep_link: string;
  username: string;
  bio_description: string;
  display_name: string;
  likes_count: number;
  video_count: number;
}

export interface ProfileProps {
  success: boolean;
  data: ProfileItem;
}

export interface VideoItem {
  comment_count: number;
  cover_image_url: string;
  embed_html: string;
  embed_link: string;
  height: number;
  share_count: number;
  share_url: string;
  width: number;
  create_time: number;
  id: string;
  like_count: number;
  title: string;
  view_count: number;
}

export interface VideoProps {
  success: boolean;
  cursor: number;
  has_more: boolean;
  data: VideoItem[];
}
