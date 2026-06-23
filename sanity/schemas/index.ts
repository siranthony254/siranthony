import { postSchema }          from './post'
import { authorSchema }        from './author'
import { serviceSchema }       from './service'
import { speakingTopicSchema } from './speakingTopic'
import { testimonialSchema }   from './testimonial'
import { micdupEventSchema }   from './micdupEvent'
import { gallerySchema }       from './gallery'
import { siteSettingsSchema }  from './siteSettings'
import { webDevelopmentSchema } from './webDevelopment'
import { caseStudySchema }     from './caseStudy'
import { intellectualWorkSchema } from './intellectualWork'
import { faqSchema }             from './faq'

export const schemaTypes = [
  // Content
  postSchema,
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
  webDevelopmentSchema,
  caseStudySchema,
  intellectualWorkSchema,
]
