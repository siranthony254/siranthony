import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Github, Download, Mail } from 'lucide-react'
import { AnimatedSection, SectionHeader, GoldLine } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity'
import {
  WEB_DEVELOPMENT_QUERY,
  CASE_STUDIES_QUERY,
  INTELLECTUAL_WORK_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/queries'
import type { WebDevelopment, CaseStudy, IntellectualWork, SiteSettings } from '@/types'

export const metadata: Metadata = {
  title: 'Portfolio - Sir Anthony',
  description: 'Web development projects, case studies, and intellectual work by Sir Anthony - cultural thinker and digital strategist.',
}

export default async function PortfolioPage() {
  const [webProjects, caseStudies, intellectualWork, siteSettings] = await Promise.all([
    sanityFetch<WebDevelopment[]>(WEB_DEVELOPMENT_QUERY),
    sanityFetch<CaseStudy[]>(CASE_STUDIES_QUERY),
    sanityFetch<IntellectualWork[]>(INTELLECTUAL_WORK_QUERY),
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ])

  // Separate projects by category
  const shippedProjects = webProjects?.filter(project => project.category === 'shipped') || []
  const demoProjects = webProjects?.filter(project => project.category === 'demo') || []

  console.log('Portfolio data:', { webProjects, shippedProjects, demoProjects, caseStudies, intellectualWork })

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy pt-32">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

        <div className="container-site pb-20 relative z-10">
          <div className="max-w-4xl">
            <AnimatedSection>
              <p className="eyebrow mb-5">Portfolio</p>
              <GoldLine className="mb-7" />
              <h1
                className="font-display font-semibold text-cream leading-tight mb-6"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                The talk in
                <br />
                <em className="text-gold">Action.</em>
              </h1>
              <p className="font-body text-cream/55 text-xl leading-relaxed max-w-2xl">
                From digital architecture to cultural thinking, these projects represent the intersection 
                of technology and transformation. Each piece tells a story of building something deliberately better.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Shipped Products */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <SectionHeader
            eyebrow="Web Development"
            title="Shipped Products"
            subtitle="Production-ready digital solutions deployed and serving real users. These projects represent completed work that's making an impact."
            className="mb-14"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shippedProjects?.map((project, index) => (
              <AnimatedSection key={project._id} delay={index * 100}>
                <div className="card-navy overflow-hidden h-full group">
                  {project.thumbnail?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.thumbnail.asset.url}
                        alt={project.thumbnail.alt || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs font-body text-gold/60 bg-gold/10 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs font-body text-cream/40">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold text-sm flex items-center gap-2"
                      >
                        View Project <ExternalLink size={14} />
                      </Link>
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-sm flex items-center gap-2"
                        >
                          <Github size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {shippedProjects.length === 0 && (
            <AnimatedSection className="text-center py-12">
              <p className="text-cream/60 text-lg mb-6">Shipped products coming soon.</p>
              <Link href="/work" className="btn-ghost">
                See What I Can Do For You <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Demo Projects */}
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="Web Development"
            title="Demo Projects"
            subtitle="Experimental work and proof-of-concept projects. These showcase capabilities and explore new ideas in web development."
            className="mb-14"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProjects?.map((project, index) => (
              <AnimatedSection key={project._id} delay={index * 100}>
                <div className="card-navy overflow-hidden h-full group">
                  {project.thumbnail?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.thumbnail.asset.url}
                        alt={project.thumbnail.alt || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs font-body text-gold/60 bg-gold/10 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs font-body text-cream/40">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold text-sm flex items-center gap-2"
                      >
                        View Demo <ExternalLink size={14} />
                      </Link>
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-sm flex items-center gap-2"
                        >
                          <Github size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {demoProjects.length === 0 && (
            <AnimatedSection className="text-center py-12">
              <p className="text-cream/60 text-lg">Demo projects coming soon.</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-pad bg-navy">
        <div className="container-site">
          <SectionHeader
            eyebrow="Case Studies"
            title="Deep Dives"
            subtitle="Comprehensive analysis of complex projects. From cultural thinking to technical execution, these studies show how ideas become reality."
            className="mb-14"
          />
          
          <div className="space-y-12">
            {caseStudies?.map((study, index) => (
              <AnimatedSection key={study._id} delay={index * 150}>
                <div className="card-navy overflow-hidden">
                  {study.heroImage?.asset?.url && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.heroImage.asset.url}
                        alt={study.heroImage.alt || study.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-display text-3xl font-semibold text-cream mb-2">
                          {study.title}
                        </h3>
                        <p className="font-body text-gold text-sm">{study.client}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Challenge</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Cultural Thinking</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.culturalThinking}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Execution</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.execution}</p>
                      </div>
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">The Outcome</h4>
                        <p className="font-body text-cream/70 leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>

                    {study.additionalResources && study.additionalResources.length > 0 && (
                      <div>
                        <h4 className="font-display text-gold font-semibold mb-3">Additional Resources</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.additionalResources.map((resource, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-navy/50 rounded-lg">
                              <div className="flex-1">
                                <h5 className="font-body text-cream font-medium text-sm mb-1">{resource.title}</h5>
                                <p className="font-body text-cream/60 text-xs mb-2">{resource.description}</p>
                                <Link
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold text-xs hover:text-gold/80 transition-colors flex items-center gap-1"
                                >
                                  {resource.type === 'document' && <Download size={12} />}
                                  {resource.type === 'video' && <ExternalLink size={12} />}
                                  {resource.type === 'link' && <ExternalLink size={12} />}
                                  {resource.type === 'image' && <ExternalLink size={12} />}
                                  View Resource <ExternalLink size={12} />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {study.projectUrl && (
                      <div className="pt-4 border-t border-gold/20">
                        <Link
                          href={study.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold flex items-center gap-2"
                        >
                          View Live Project <ExternalLink size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {(!caseStudies || caseStudies.length === 0) && (
            <AnimatedSection className="text-center py-12">
              <p className="text-cream/60 text-lg">Case studies coming soon.</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Intellectual Work */}
      <section className="section-pad bg-navy/95">
        <div className="container-site">
          <SectionHeader
            eyebrow="Intellectual Work"
            title="The Thinking"
            subtitle="Essays, scripts, poetry, and books that explore culture, identity, and transformation. Each piece represents a different facet of the conversation."
            className="mb-14"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intellectualWork?.map((work, index) => (
              <AnimatedSection key={work._id} delay={index * 100}>
                <div className="card-navy overflow-hidden h-full group">
                  {work.thumbnail?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={work.thumbnail.asset.url}
                        alt={work.thumbnail.alt || work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-body text-gold bg-gold/10 px-2 py-1 rounded">
                          {work.customCategory || work.category}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                      {work.title}
                    </h3>
                    <p className="font-body text-cream/60 text-sm leading-relaxed mb-4 line-clamp-3">
                      {work.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-body text-cream/40">
                        {new Date(work.publishedDate).toLocaleDateString()}
                      </span>
                      {work.tags && work.tags.length > 0 && (
                        <div className="flex gap-1">
                          {work.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-xs font-body text-cream/30">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {work.externalUrl && (
                        <Link
                          href={work.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold text-sm flex items-center gap-2"
                        >
                          Read More <ExternalLink size={14} />
                        </Link>
                      )}
                      {work.document && (
                        <Link
                          href={work.document.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-sm flex items-center gap-2"
                        >
                          <Download size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {(!intellectualWork || intellectualWork.length === 0) && (
            <AnimatedSection className="text-center py-12">
              <p className="text-cream/60 text-lg">Intellectual work coming soon.</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Social Links */}
      <section className="section-pad bg-navy">
        <div className="container-site text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Connect"
              title="Let's Continue the Conversation"
              subtitle="Follow the journey, share your thoughts, or reach out to collaborate on something meaningful."
              className="mb-12"
            />
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {siteSettings?.socialLinks?.twitter && (
                <Link
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  Twitter
                </Link>
              )}
              {siteSettings?.socialLinks?.linkedin && (
                <Link
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  LinkedIn
                </Link>
              )}
              {siteSettings?.socialLinks?.youtube && (
                <Link
                  href={siteSettings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  YouTube
                </Link>
              )}
              {siteSettings?.socialLinks?.instagram && (
                <Link
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  Instagram
                </Link>
              )}
              {siteSettings?.socialLinks?.tiktok && (
                <Link
                  href={siteSettings.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  TikTok
                </Link>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial/Review CTA */}
      <section className="section-pad bg-navy/95 border-t border-gold/20">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-6">
              Share Your Experience
            </h2>
            <p className="font-body text-cream/55 text-lg max-w-2xl mx-auto mb-10">
              Have you worked with me, attended a session, or been impacted by the content? 
              Your testimonial helps others understand the value of this work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:officialsiranthony@gmail.com?subject=Testimonial%20Request" className="btn-gold flex items-center gap-2">
                <Mail size={16} />
                Share Testimonial
              </Link>
              <Link href="/contact" className="btn-ghost">
                Other Inquiry
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
