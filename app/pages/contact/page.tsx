import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Sehaj Studio',
  description: 'Contact Sehaj Studio for inquiries, styling advice, and order support.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-[var(--color-sand)]">
        <div className="container text-center">
          <h1 className="font-serif text-4xl text-[var(--color-charcoal)]">Contact Us</h1>
          <p className="mt-2 text-[var(--color-taupe)]">We'd love to hear from you</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Get in Touch</h2>
                <p className="text-[var(--color-taupe)] mb-6">
                  Have a question about our products? Need styling advice? Want to place a custom order? We're here to help.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-[var(--color-charcoal)]">Email</h3>
                    <a href="mailto:hello@sehajstudio.com" className="text-[var(--color-taupe)] hover:text-[var(--color-rose-clay)]">
                      hello@sehajstudio.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-charcoal)]">Phone</h3>
                    <a href="tel:+919999999999" className="text-[var(--color-taupe)] hover:text-[var(--color-rose-clay)]">
                      +91 99999 99999
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-charcoal)]">Hours</h3>
                    <p className="text-[var(--color-taupe)]">Mon - Sat: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--color-taupe)] mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-beige)] text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-rose-clay)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--color-taupe)] mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-beige)] text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-rose-clay)]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--color-taupe)] mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-beige)] text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-rose-clay)]"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium tracking-wider uppercase hover:bg-[var(--color-taupe)] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center p-8 bg-[var(--color-sand)]">
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-2">Follow Us</h2>
              <p className="text-[var(--color-taupe)] mb-4">Stay updated with our latest collections</p>
              <div className="flex justify-center gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-charcoal)] hover:text-[var(--color-rose-clay)]">
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-charcoal)] hover:text-[var(--color-rose-clay)]">
                  Facebook
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-charcoal)] hover:text-[var(--color-rose-clay)]">
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}