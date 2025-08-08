import Stripe from 'stripe';
import { supabase } from '../supabaseClient.js';

class StripeConnectService {
  static async createAccount(userId) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
      const account = await stripe.accounts.create({
        type: 'express',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          user_id: userId,
        },
      });

      // Store Stripe account ID in database
      const { data, error } = await supabase
        .from('users')
        .update({ stripe_account_id: account.id })
        .eq('id', userId)
        .select();

      if (error) throw error;
      return account;
    } catch (error) {
      console.error('Error creating Stripe Connect account:', error);
      throw error;
    }
  }

  static async createAccountLink(accountId) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.BASE_URL}/stripe/onboard/refresh`,
        return_url: `${process.env.BASE_URL}/stripe/onboard/return`,
        type: 'account_onboarding',
      });

      return accountLink.url;
    } catch (error) {
      console.error('Error creating Stripe Connect account link:', error);
      throw error;
    }
  }

  static async getAccount(accountId) {
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
     try {
       const account = await stripe.accounts.retrieve(accountId);
       return account;
     } catch (error) {
       console.error('Error retrieving Stripe Connect account:', error);
       throw error;
     }
  }

  static async createPayout(accountId, amount) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
      const payout = await stripe.payouts.create({
        amount: amount,
        currency: 'usd',
      }, {
        stripeAccount: accountId,
      });
      return payout;
    } catch (error) {
      console.error('Error creating Stripe Connect payout:', error);
      throw error;
    }
  }
}

export default StripeConnectService;