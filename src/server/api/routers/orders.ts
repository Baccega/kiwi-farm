import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { orders } from "~/server/db/schema";
import { formSchema } from "~/types/types";

export const ordersRouter = createTRPCRouter({
  add: publicProcedure
    .input(formSchema)
    .mutation(async ({ input, ctx }): Promise<{ message: string; error: unknown; }> => {
      try {
        await ctx.db.insert(orders).values(input).execute();
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=New order!${JSON.stringify(input)}`);
        return {
          message: `Done`,
          error: null,
        };
      } catch (error: unknown) {
        return {
          message: `Error`,
          error: error,
        };
      }
    }),
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.orders.findMany();
  }),
});
