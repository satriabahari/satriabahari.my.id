export interface UmamiDataPoint {
  x: string;
  y: number;
}

export interface UmamiStat {
  value: number;
}

export interface UmamiWebsiteStats {
  pageviews: UmamiStat;
  visitors: UmamiStat;
  visits: UmamiStat;
  countries: UmamiStat;
  events: UmamiStat;
}

export interface UmamiResponse {
  pageviews: UmamiDataPoint[];
  sessions: UmamiDataPoint[];
  websiteStats: UmamiWebsiteStats;
}
