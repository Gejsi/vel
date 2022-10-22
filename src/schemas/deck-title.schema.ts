import { z } from 'zod'

export const MAX_RENAME_TITLE = 100
export const titleSchema = z.string().min(1).max(MAX_RENAME_TITLE)
