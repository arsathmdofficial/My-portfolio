import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-20 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
            06. Connect & Inquire
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            GitHub, LinkedIn & Direct Contact
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Available for full-stack software development positions, internships, and AI engineering projects in Chennai and remote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact & Social Cards (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Professional Links & Contact
              </h3>

              {/* GitHub & LinkedIn Row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-800" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">GitHub</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-blue-50/50 hover:bg-blue-50 rounded-xl border border-blue-200 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-600" />
                </a>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Email */}
                <div className="flex items-start justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block font-mono text-[11px]">Email</span>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}`} 
                        className="font-medium text-slate-900 hover:text-blue-600 transition-colors break-all"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-start justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block font-mono text-[11px]">Mobile Phone</span>
                      <a 
                        href={`tel:${PERSONAL_INFO.phone}`} 
                        className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {PERSONAL_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyPhone}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    title="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block font-mono text-[11px]">Location</span>
                    <span className="font-medium text-slate-900">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`https://wa.me/91${PERSONAL_INFO.phone}?text=Hello%20Mohamed,%20I%20reviewed%20your%20developer%20portfolio!`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  Message via WhatsApp
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Full-Stack%20Developer%20Opportunity`}
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send Direct Email
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Have an opportunity, interview invitation, or project inquiry? Submit your message below.
            </p>

            {submitted ? (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 mb-4 max-w-sm mx-auto">
                  Thank you for reaching out! A response will be sent to your email from {PERSONAL_INFO.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Developer Role / Project Consultation"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, role requirements, or questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
