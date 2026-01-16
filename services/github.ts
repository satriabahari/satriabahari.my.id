import axios from "axios";

import { GITHUB_ACCOUNTS } from "@/common/constants/github";
import { unstable_cache } from "next/cache";

const GITHUB_USER_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

export const getGithubData = async () => {
  const { username, token } = GITHUB_ACCOUNTS;

  const cachedData = unstable_cache(
    async () => {
      const response = await axios.post(
        GITHUB_USER_ENDPOINT,
        {
          query: GITHUB_USER_QUERY,
          variables: { username },
        },
        {
          headers: { Authorization: `bearer ${token}` },
        },
      );

      if (response.status > 400) return { status: response.status, data: {} };
      return { status: response.status, data: response.data.data.user };
    },
    ["github-stats-key"],
    {
      tags: ["github-data-tag"],
    },
  );

  return cachedData();
};
