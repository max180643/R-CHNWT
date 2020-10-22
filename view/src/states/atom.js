import { atom } from 'recoil'

export const ShortenLink = atom({
  key: 'shortenLinkData',
  default: [],
})

export const OptionalToggle = atom({
  key: 'optionalToggleData',
  default: false,
})

export const CustomAlias = atom({
  key: 'customAliasData',
  default: null,
})

export default 'atom'
