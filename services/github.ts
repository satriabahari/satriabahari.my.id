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

const fetcher = async (username: string, token: string) => {
  try {
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
    return response.data.data.user;
  } catch (error) {
    console.error("GitHub API Fetch Error:", error);
    return null;
  }
};

const getCachedGithubData = unstable_cache(
  async (username: string, token: string) => fetcher(username, token),
  ["github-stats-key"],
  { tags: ["github-data-tag"] },
);

export const getGithubData = async () => {
  const { username, token } = GITHUB_ACCOUNTS;

  if (!username || !token) {
    console.error("Missing GitHub Credentials");
    return { status: 500, data: null };
  }

  const data = await getCachedGithubData(username, token);

  if (!data) {
    return { status: 502, data: null };
  }

  return { status: 200, data };
};
