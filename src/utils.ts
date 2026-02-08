import { html, type TemplateResult } from "lit";
import type { BoxSize } from "./types";
import "./components/YouTubeLinkLarge.js";
import { channelID, defaultData } from "./config";

export const getIconPath = (boxType: string): string => {
  switch (boxType) {
    case "location":
      return "/icons/map.png";
    case "youtube":
      return "/icons/youtube.svg";
    case "github":
      return "/icons/github.svg";
    case "twitter":
      return "/icons/twitter.svg";
    case "linkedin":
      return "/icons/linkedin.svg";
    case "telegram":
      return "/icons/telegram.svg";
    case "blog":
      return "/icons/blog.svg";
    case "email":
      return "/icons/email.svg";
    case "empty":
      return "/icons/empty.svg";
    default:
      return "/icons/default.svg";
  }
};

export const formatIsoDateToDmy = (isoDate: string): string => {
  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return isoDate;
  }

  return `${day}/${month}/${year}`;
};

/* Fetch Github Info and format body content */

export type GithubInfo = {
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
  updated_at: string;
};
export const getGithubInfo = async (): Promise<GithubInfo | null> => {
  try {
    const info = await fetch("https://api.github.com/users/claudebarde");
    if (info.ok) {
      const data: GithubInfo = await info.json();
      // TODO: Validate data structure with Zod
      return data;
    }
  } catch (error) {
    console.error("Error fetching Github info:", error);
  }
  return null;
};
export const getGithubBody = (
  info: GithubInfo,
  boxSize: BoxSize
): TemplateResult => {
  switch (boxSize) {
    case "small":
      return html`<p>Repos: ${info.public_repos}</p>
        <p>Followers: ${info.followers}</p>
        <p>Last activity: ${formatIsoDateToDmy(info.updated_at)}</p>`;
    case "medium":
      return html`GitHub Profile Repositories: ${info.public_repos} Followers:
      ${info.followers}`;
    case "large":
      return html`<p>Repos: ${info.public_repos}</p>
        <p>Followers: ${info.followers}</p>
        <p>Last activity: ${formatIsoDateToDmy(info.updated_at)}</p>`;
    default:
      return html``;
  }
};

/* Fetch Telegram Info and format body content */
export type TelegramInfo = {
  username: string;
  url: string;
};
export const getTelegramInfo = async (): Promise<TelegramInfo | null> => {
  return {
    username: defaultData.telegram.username,
    url: defaultData.telegram.url
  };
};
export const getTelegramBody = (
  info: TelegramInfo,
  boxSize: BoxSize
): TemplateResult => {
  switch (boxSize) {
    case "small":
      return html`<div
        style="display: flex; flex-direction: column;height: 100%;width: 100%;justify-content: flex-start;align-items: center;"
      >
        <a
          href="${info.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="link-button"
        >
          Contact me<br />On Telegram!
        </a>
      </div>`;
    case "medium":
      return html`Join me on Telegram: ${info.username}`;
    case "large":
      return html`<p>Connect with me on Telegram!</p>
        <p>
          Feel free to reach out for chats, collaborations, or any inquiries you
          might have.
        </p>
        <p>Looking forward to connecting with you!</p>
        <p style="text-align: center;">
          <a
            href="${info.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="large-link-button"
          >
            Contact me on Telegram!
          </a>
        </p>`;
    default:
      return html``;
  }
};

/* Gets YouTube videos */
export type YoutubeInfo = {
  apiKey: string;
  channelId: string;
};
export type YoutubeData = {
  videoId: string;
  title: string;
  publishedAt: string;
  description: string;
  thumbnail: string;
  url: string;
  viewCount: string;
  likeCount: string;
  duration: string;
};
export async function getChannelVideos(): Promise<Array<YoutubeData>> {
  const data = await fetch(
    `/.netlify/functions/loadYoutubeData?channelId=${channelID}`
  );
  if (data.ok) {
    const jsonData = await data.json();
    return jsonData as Array<YoutubeData>;
  } else {
    console.error("Failed to fetch YouTube data:", data.statusText);
    return [];
  }
}
export const getYoutubeBody = (
  data: Array<YoutubeData>,
  boxSize: BoxSize
): TemplateResult => {
  switch (boxSize) {
    case "small":
      return html`<div>Under construction 🚧</div>`;
    case "medium":
      return html`<div>Under construction 🚧</div>`;
    case "large":
      return html` ${data.map(
        info =>
          html`<youtube-link-large
            title="${info.title}"
            url="${info.url}"
            thumbnail="${info.thumbnail}"
            description="${info.description}"
            publishedAt="${info.publishedAt}"
            viewCount="${info.viewCount}"
            likeCount="${info.likeCount}"
          />`
      )}`;
    default:
      return html``;
  }
};
