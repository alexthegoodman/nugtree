import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import MixpanelClient from "../helpers/mixpanel";
// import type { Request } from "express";
import Stripe from "stripe";

const prisma = new PrismaClient();
const mixpanel = new MixpanelClient();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import stripe from "stripe";
stripe ? new stripe(process.env.STRIPE_SECRET_KEY as string) : null;

export interface Context {
  prisma: PrismaClient;
  mixpanel: MixpanelClient;
  headers: any;
  currentUser: User;
  stripe: Stripe;
}

export const context = {
  prisma,
  mixpanel,
  stripe,
};
