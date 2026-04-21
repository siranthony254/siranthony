import { postSchema }          from './post'
import { authorSchema }        from './author'
import { serviceSchema }       from './service'
import { speakingTopicSchema } from './speakingTopic'
import { testimonialSchema }   from './testimonial'
import { micdupEventSchema }   from './micdupEvent'
import { siteSettingsSchema }  from './siteSettings'

export const schemaTypes = [
  // Content
  postSchema,
  authorSchema,
  // Services
  serviceSchema,
  speakingTopicSchema,
  // Social proof
  testimonialSchema,
  // Mic'd Up
  micdupEventSchema,
  // Config
  siteSettingsSchema,
]
