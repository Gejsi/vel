import { z } from 'zod'

export const MIN_DECK_TITLE_LENGTH = 1
export const MAX_DECK_TITLE_LENGTH = 100

export const deckTitleSchema = z
  .string()
  .min(MIN_DECK_TITLE_LENGTH)
  .max(MAX_DECK_TITLE_LENGTH)
