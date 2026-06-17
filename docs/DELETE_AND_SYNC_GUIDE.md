# Delete & Sync Guide

This guide explains how the custom delete functionality works in your Sanity Studio and how it keeps your Next.js site in sync.

## Overview

The delete functionality consists of three main components:

1. **Custom Delete Action Plugin** (`sanity/plugins/deleteWithRevalidation.ts`) - Adds a "Delete & Sync" button to all document types in Sanity Studio
2. **Revalidation API Route** (`src/app/api/revalidate/route.ts`) - Handles webhook calls from Sanity to trigger Next.js revalidation
3. **Webhook Configuration** (`sanity/webhooks.json`) - Configuration for Sanity webhooks

## How It Works

### 1. Deleting a Document

When you click the **"Delete & Sync"** button in Sanity Studio:

1. A confirmation dialog appears
2. Upon confirmation:
   - A webhook is sent to your site's `/api/revalidate` endpoint
   - The document is deleted from Sanity storage
   - The site's cache is invalidated for relevant paths

### 2. Automatic Revalidation

The revalidation API route intelligently invalidates cache based on document type:

| Document Type | Revalidated Paths |
|--------------|-------------------|
| `post` | `/conversations`, `/` |
| `author` | `/conversations`, `/about` |
| `gallery` | `/gallery` |
| `service` | `/work`, `/` |
| `speakingTopic` | `/work` |
| `testimonial` | `/work`, `/` |
| `micdupEvent` | `/micdup`, `/` |
| `webDevProject` | `/portfolio`, `/` |
| `caseStudy` | `/portfolio`, `/` |
| `intellectualWork` | `/portfolio`, `/` |
| `siteSettings` | `/`, `/about`, `/contact` |

## Setup Instructions

### Step 1: Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (usually `production`)
- `SANITY_API_TOKEN` - API token with write permissions
- `SANITY_WEBHOOK_SECRET` - A secret key for webhook verification
- `NEXT_PUBLIC_SITE_URL` - Your production site URL

### Step 2: Generate API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** > **Tokens**
4. Click **"Add API token"**
5. Give it a name (e.g., "Revalidation Token")
6. Set permissions to **Editor** or higher
7. Copy the token and add it to your `.env.local`

### Step 3: Set Up Webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** > **Webhooks**
4. Click **"Add webhook"**
5. Configure the webhook:

   **Basic Settings:**
   - Name: `Revalidate Site`
   - URL: `https://your-domain.com/api/revalidate`

   **Triggers:**
   - ✅ `publishDocument`
   - ✅ `deleteDocument`
   - ✅ `updateDocument`

   **Headers:**
   - Name: `Content-Type`
   - Value: `application/json`
   
   - Name: `X-Sanity-Secret`
   - Value: `<your SANITY_WEBHOOK_SECRET>`

6. Click **Save**

### Step 4: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open Sanity Studio at `http://localhost:3000/studio`

3. Create or edit a document

4. Click the **"Delete & Sync"** button in the document actions menu

5. Verify:
   - The document is deleted from Sanity
   - The site reflects the changes immediately

## Troubleshooting

### Delete button not appearing

- Ensure the document is published (not just a draft)
- The button doesn't appear for singleton documents like `siteSettings`

### Changes not syncing to site

1. Check your environment variables are set correctly
2. Verify the webhook is configured in Sanity
3. Check the browser console and server logs for errors
4. Ensure `SANITY_WEBHOOK_SECRET` matches in both places

### Webhook verification failing

- Make sure the `X-Sanity-Secret` header in your webhook matches `SANITY_WEBHOOK_SECRET` in your `.env.local`

## Manual Revalidation

You can also manually trigger revalidation by calling the API:

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "X-Sanity-Secret: your-secret" \
  -d '{"type": "deleteDocument", "documentId": "doc-id", "documentType": "post"}'
```

## Security Notes

- Always use a strong, random `SANITY_WEBHOOK_SECRET`
- Keep your `SANITY_API_TOKEN` secure and never commit it to version control
- The webhook secret is verified server-side to prevent unauthorized revalidation calls

## Additional Resources

- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Next.js Revalidation Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating)
- [Sanity API Tokens](https://www.sanity.io/docs/api-tokens)