export interface AchievementItem {
  id: number;
  credential_id?: string;
  slug?: string;
  name: string;
  issuing_organization: string;
  type: string;
  category: string;
  url_credential?: string;
  issue_date: string;
  expiration_date?: string;
  image: string;
  is_show?: boolean;
}