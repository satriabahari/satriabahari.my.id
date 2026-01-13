import axios from "axios";
import { UMAMI_ACCOUNT } from "@/common/constants/umami";
import { UmamiResponse, UmamiDataPoint } from "@/common/types/umami";

const { api_key, endpoint, base_url, parameters, websites } = UMAMI_ACCOUNT;

const getWebsiteIdByDomain = (domain: string) => {
  const found = websites.find((w) => w.domain === domain);
  return found?.website_id;
};

export const getPageViewsByDataRange = async (domain: string) => {
  const website_id = getWebsiteIdByDomain(domain);
  if (!website_id) {
    return {
      status: 404,
      data: {},
      error: `Website not found for domain "${domain}"`,
    };
  }

  const url = `${base_url}/${website_id}${endpoint.page_views}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-umami-api-key": api_key || "",
      },
      params: parameters,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      data: {},
      error: error?.message || "Unknown error",
    };
  }
};

export const getWebsiteStats = async (domain: string) => {
  const website_id = getWebsiteIdByDomain(domain);
  if (!website_id) {
    return {
      status: 404,
      data: {},
      error: `Website not found for domain "${domain}"`,
    };
  }

  const url = `${base_url}/${website_id}${endpoint.sessions}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-umami-api-key": api_key || "",
      },
      params: { startAt: parameters.startAt, endAt: parameters.endAt },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      data: {},
      error: error?.message || "Unknown error",
    };
  }
};

const mergeData = (allResults: UmamiResponse[]): UmamiResponse => {
  const combined: UmamiResponse = {
    pageviews: [],
    sessions: [],
    websiteStats: {
      pageviews: { value: 0 },
      visitors: { value: 0 },
      visits: { value: 0 },
      countries: { value: 0 },
      events: { value: 0 },
    },
  };

  allResults.forEach((result) => {
    combined.websiteStats.pageviews.value +=
      result.websiteStats.pageviews.value;
    combined.websiteStats.visitors.value += result.websiteStats.visitors.value;
    combined.websiteStats.visits.value += result.websiteStats.visits.value;
    combined.websiteStats.events.value += result.websiteStats.events.value;
    combined.websiteStats.countries.value = Math.max(
      combined.websiteStats.countries.value,
      result.websiteStats.countries.value,
    );

    const mergeChart = (target: UmamiDataPoint[], source: UmamiDataPoint[]) => {
      source.forEach((item) => {
        const existing = target.find((p) => p.x === item.x);
        if (existing) existing.y += item.y;
        else target.push({ ...item });
      });
    };

    mergeChart(combined.pageviews, result.pageviews);
    mergeChart(combined.sessions, result.sessions);
  });

  combined.pageviews.sort(
    (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
  );
  combined.sessions.sort(
    (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
  );

  return combined;
};

export const getAllWebsiteData = async (): Promise<UmamiResponse> => {
  const { websites } = UMAMI_ACCOUNT;

  const results = await Promise.all(
    websites.map(async (w) => {
      const pv = await getPageViewsByDataRange(w.domain);
      const st = await getWebsiteStats(w.domain);
      return {
        pageviews: pv.data.pageviews,
        sessions: pv.data.sessions,
        websiteStats: st.data,
      };
    }),
  );

  return mergeData(results);
};
