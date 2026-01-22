export type BoxType =
  | "location"
  | "youtube"
  | "github"
  | "twitter"
  | "linkedin"
  | "telegram"
  | "blog"
  | "empty";
export interface BoxData {
  type: BoxType;
  text: string;
  url: string;
  username: string;
}
export type BoxSize = "small" | "medium" | "large";
