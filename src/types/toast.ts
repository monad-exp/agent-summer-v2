import { z } from 'zod'

export const ToastVariantSchema = z.enum(['success', 'error', 'info'])

export const ToastSchema = z.object({
  id: z.string(),
  variant: ToastVariantSchema,
  title: z.string(),
  message: z.string().optional(),
  cta: z.object({ label: z.string(), icon: z.string().optional() }).optional(),
})

export type ToastVariant = z.infer<typeof ToastVariantSchema>
export type Toast = z.infer<typeof ToastSchema>
