import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { type ShopifyProductKey } from "../shared/shopifyCatalog";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { addShopifyProductToCart, getShopifyCatalog, getStoredCart, updateShopifyCartLine } from "./shopify";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  shopify: router({
    catalog: publicProcedure.query(async () => {
      const products = await getShopifyCatalog();
      return { products };
    }),
    cart: publicProcedure.query(async ({ ctx }) => {
      const cart = await getStoredCart(ctx.req, ctx.res);
      return { cart };
    }),
    addToCart: publicProcedure
      .input(
        z.object({
          productKey: z.custom<ShopifyProductKey>(),
          quantity: z.number().int().min(1).max(10).default(1),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const cart = await addShopifyProductToCart(ctx.req, ctx.res, input.productKey, input.quantity);
        return { cart };
      }),
    updateCartLine: publicProcedure
      .input(
        z.object({
          lineId: z.string().min(1),
          quantity: z.number().int().min(0).max(20),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const cart = await updateShopifyCartLine(ctx.req, ctx.res, input.lineId, input.quantity);
        return { cart };
      }),
  }),
});

export type AppRouter = typeof appRouter;
