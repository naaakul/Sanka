// // utils/prisma.ts
// import { PrismaClient } from "@prisma/client";

// /**
//  * Single source Prisma client for Next.js (prevents many instances in dev)
//  * and an extension that replaces prisma.$use middleware behavior.
//  */

// // allow a single global instance during hot-reload in dev
// declare global {
//   // eslint-disable-next-line no-var
//   var __prisma?: PrismaClient;
// }

// const base = global.__prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   global.__prisma = base;
// }

// /**
//  * Extended client: intercepts queries.
//  * We use $allModels -> $allOperations so we can check operation & model,
//  * which mirrors what prisma.$use provided.
//  */
// export const prisma = base.$extends({
//   query: {
//     $allModels: {
//       async $allOperations(params: any) {
//         // params ≈ { operation, model, args, query, ... }
//         const { operation, model, args, query } = params;

//         // Replace your old prisma.$use middleware that targeted:
//         // if (params.action === "create" && (params.model === "Session" || params.model === "Account"))
//         if (operation === "create" && (model === "Session" || model === "Account")) {
//           const data: any = args?.data;
//           if (data) {
//             // --- <=== PUT YOUR OLD MIDDLEWARE LOGIC HERE ===> ---
//             // Example placeholders (comment these out or replace with real logic):
//             // if (!data.id) data.id = generateSomeId();       // example
//             // data.createdAt = new Date();                    // example
//             //
//             // YOUR ORIGINAL: e.g. hashing, normalizing fields, setting defaults, etc.
//           }
//         }

//         // run the original query (with possibly modified args)
//         return query(args);
//       },
//     },
//   },
// });
