import { atom } from "recoil";

export interface ShortenLinkItem {
  id: string;
  shortURL: string;
  fullURL: string;
}

export const ShortenLinkState = atom({
  key: "shortenLinkItems",
  default: [] as ShortenLinkItem[],
})