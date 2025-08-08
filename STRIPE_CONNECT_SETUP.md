# Stripe Connect Setup Guide

## Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com/) and sign up for an account.
2. Complete the account activation process.

## Step 2: Set up a Connect Platform

1. In your Stripe dashboard, go to "Connect".
2. Click "Get Started" and choose "Platform or marketplace".
3. Configure your platform settings.

## Step 3: Get Your API Keys

1. In your Stripe dashboard, go to "Developers" > "API keys".
2. You will find your:
   - **Publishable key**: This is for the frontend.
   - **Secret key**: This is for the backend (keep this secret).

## Step 4: Get Your Connect Client ID

1. Go to "Settings" > "Connect settings".
2. At the bottom of the page, you'll find your **Client ID**. It starts with `ca_`.

## Step 5: Add to Environment Variables

Add these to your `.env` files:

### Server (.env)
```
STRIPE_SECRET_KEY=your_secret_key_here
