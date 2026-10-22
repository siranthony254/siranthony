import { postSchema }          from './post'
import { authorSchema }        from './author'
import { serviceSchema }       from './service'
import { speakingTopicSchema } from './speakingTopic'
import { testimonialSchema }   from './testimonial'
import { micdupEventSchema }   from './micdupEvent'
import { gallerySchema }       from './gallery'
import { videoConversationSchema } from './videoConversation'
import { ebookSchema }         from './ebook'
import { purchaseSchema }      from './purchase'
import { siteSettingsSchema }  from './siteSettings'
import { caseStudySchema }     from './caseStudy'
import { intellectualWorkSchema } from './intellectualWork'
import { faqSchema }             from './faq'
import { impactNumbersSchema }   from './impactNumbers'

export const schemaTypes = [
  // Content
  postSchema,
  videoConversationSchema,
  ebookSchema,
  purchaseSchema,
  authorSchema,
  gallerySchema,
  faqSchema,
  // Services
  serviceSchema,
  speakingTopicSchema,
  // Social proof
  testimonialSchema,
  // Mic'd Up
  micdupEventSchema,
  // Config
  siteSettingsSchema,
  impactNumbersSchema,
  caseStudySchema,
  intellectualWorkSchema,
]
