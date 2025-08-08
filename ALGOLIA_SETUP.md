# Algolia Setup Guide

## Step 1: Create an Algolia Account

1. Go to [algolia.com](https://www.algolia.com/) and sign up for a free account.
2. Complete the onboarding steps.

## Step 2: Create an Application

1. In the Algolia dashboard, create a new application.
2. Choose a datacenter region close to your users.
3. Select the "Free" plan for now.

## Step 3: Get Your API Keys

1. In your Algolia application dashboard, go to "API Keys".
2. You will find the following keys:
   - **Application ID**: This is your App ID.
   - **Search-Only API Key**: This is a public key for the frontend.
   - **Admin API Key**: This is a private key for the backend (keep this secret).

## Step 4: Add to Environment Variables

Add these to your `.env` files:

### Server (.env)
```
ALGOLIA_APP_ID=your_app_id_here
ALGOLIA_ADMIN_KEY=your_admin_api_key_here
```

### Client (.env)
```
REACT_APP_ALGOLIA_APP_ID=your_app_id_here
REACT_APP_ALGOLIA_SEARCH_KEY=your_search_only_api_key_here
```

## Step 5: Create Indices

1. In your Algolia dashboard, go to "Indices".
2. Create the following indices:
   - `products`
   - `questions`

## Step 6: Configure Index Settings

For each index, you will want to configure search settings. For the `products` index, for example:

1. Click on the `products` index.
2. Go to "Configuration".
3. Under "Searchable Attributes", add attributes like `title`, `description`, `tags`, etc.
4. Under "Custom Ranking", you can add metrics like `sales_count` or `likes_count` to influence relevance.

## Step 7: Test the Integration

Once the credentials and indices are set up, you can test the search integration.