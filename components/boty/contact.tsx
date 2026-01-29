"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Check } from "lucide-react"
import emailjs from '@emailjs/browser'

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@buyshez.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 5pm"
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Business St, Suite 100\nNew York, NY 10001",
    description: "Come visit our office"
  }
]

export function Contact() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Initialize EmailJS - Replace with your public key
    emailjs.init('your_public_key')

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const infoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInfoVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    if (infoRef.current) {
      infoObserver.observe(infoRef.current)
    }

    if (formRef.current) {
      formObserver.observe(formRef.current)
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
      if (infoRef.current) {
        infoObserver.unobserve(infoRef.current)
      }
      if (formRef.current) {
        formObserver.unobserve(formRef.current)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration - Replace with your actual IDs
      const serviceId = 'your_service_id'
      const templateId = 'your_template_id'
      const publicKey = 'your_public_key'

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Buyshez Team'
        }
      )

      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary-foreground mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Get In Touch
          </span>
          <h2 className={`font-serif text-7xl leading-tight text-primary-foreground mb-4 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Contact us
          </h2>
          <p className={`text-lg text-primary-foreground/80 max-w-2xl mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Ready to transform your business? Let's discuss your project and how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div ref={infoRef}>
            <h3 className="font-serif text-3xl text-primary-foreground mb-8">Let's talk</h3>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className={`group transition-all duration-700 ease-out ${
                    infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: infoVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 group-hover:bg-primary-foreground/20 boty-transition">
                      <info.icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-primary-foreground mb-1">{info.title}</h4>
                      <p className="text-primary-foreground font-medium mb-1 whitespace-pre-line">{info.value}</p>
                      <p className="text-primary-foreground/80 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <div className={`bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 boty-shadow ${formVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={formVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20 mb-4">
                    <Check className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary-foreground mb-2">Message sent!</h3>
                  <p className="text-primary-foreground/80">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-xl text-sm tracking-wide boty-transition hover:bg-primary-foreground/90 boty-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}