import { z } from "zod";

export const routeParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createGamingPcSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  priceCents: z.number().int().positive(),
  gpu: z.string().min(1),
  cpu: z.string().min(1),
  ramGb: z.number().int().positive(),
  storageGb: z.number().int().positive(),
  mainboard: z.string().min(1),
  inStock: z.boolean().optional(),
});

export const updateGamingPcSchema = createGamingPcSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type PcRouteParams = {
  id: string;
};

export type CreateGamingPcBody = z.infer<typeof createGamingPcSchema>;
export type UpdateGamingPcBody = z.infer<typeof updateGamingPcSchema>;
