import { postSchema }          from './post'
import { authorSchema }        from './author'
import { serviceSchema }       from './service'
import { speakingTopicSchema } from './speakingTopic'
import { testimonialSchema }   from './testimonial'
import { micdupEventSchema }   from './micdupEvent'
import { gallerySchema }       from './gallery'
import { siteSettingsSchema }  from './siteSettings'

export const schemaTypes = [
  // Content
  postSchema,
  authorSchema,
  gallerySchema,
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
