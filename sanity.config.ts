import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './sanity/schemas'
import { deleteWithRevalidation } from './sanity/plugins/deleteWithRevalidation'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name:    'sir-anthony-studio',
  title:   'Sir Anthony — Content Studio',
  projectId,
  dataset,
  basePath: '/studio',

  auth: {
    providers: [
      { 
        name: 'google',
        title: 'Google',
        url: 'https://accounts.google.com'
      },
      { 
        name: 'github',
        title: 'GitHub', 
        url: 'https://github.com'
      },
    ],
  },

  plugins: [
    deleteWithRevalidation(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sir Anthony Content')
          .items([
            // ── Conversations ──────────────────────────────────────
            S.listItem()
              .title('Conversations')
              .child(
                S.list()
                  .title('Conversations')
                  .items([
                    S.documentTypeListItem('post').title('All Posts'),
                    S.documentTypeListItem('videoConversation').title('Video Conversations'),
                    S.documentTypeListItem('author').title('Authors'),
                    S.documentTypeListItem('faq').title('FAQs'),
                  ])
              ),

            S.divider(),

            // ── Gallery ───────────────────────────────────────────
            S.listItem()
              .title('Gallery')
              .child(
                S.list()
                  .title('Gallery')
                  .items([
                    S.documentTypeListItem('gallery').title('Gallery Collections'),
                  ])
              ),
            // ── Body of Work ──────────────────────
            S.listItem()
              .title('Body of Work')
              .child(
                S.list()
                  .title('Body of Work')
                  .items([
                    S.documentTypeListItem('ebook').title('Ebooks'),
                    S.documentTypeListItem('caseStudy').title('Case Studies'),
                    S.documentTypeListItem('intellectualWork').title('Intellectual Work'),
                  ])
              ),

            S.divider(),

            // ── Work With Me ───────────────────────────────────────
            S.listItem()
              .title('Work With Me')
              .child(
                S.list()
                  .title('Work With Me')
                  .items([
                    S.documentTypeListItem('service').title('Services'),
                    S.documentTypeListItem('speakingTopic').title('Speaking Topics'),
                    S.documentTypeListItem('testimonial').title('Testimonials'),
                  ])
              ),

            S.divider(),

            // ── Sales ────────────────────────────
            S.listItem()
              .title('Sales')
              .child(
                S.list()
                  .title('Sales')
                  .items([
                    S.documentTypeListItem('purchase').title('Purchases'),
                  ])
              ),

            S.divider(),

            // ── Mic'd Up ───────────────────────────────────────────
            S.listItem()
              .title("Mic'd Up Initiative")
              .child(
                S.list()
                  .title("Mic'd Up")
                  .items([
                    S.documentTypeListItem('micdupEvent').title('Events & Activities')
                  ])
              ),

            S.divider(),

            // ── Settings (singletons) ──────────────────────────────
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Settings')
                      ),
                    S.listItem()
                      .title('Impact Numbers')
                      .child(
                        S.document()
                          .schemaType('impactNumbers')
                          .documentId('impactNumbers')
                          .title('Impact Numbers')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
