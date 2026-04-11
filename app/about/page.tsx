import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Sehaj Studio',
  description: 'Learn about Sehaj Studio - contemporary Indian ethnic wear crafted with intention and heritage.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-24 bg-[var(--color-sand)]">
        <div className="container text-center">
          <span className="text-sm text-[var(--color-gold)] uppercase tracking-widest">Our Story</span>
          <h1 className="font-serif text-5xl text-[var(--color-charcoal)] mt-4">About Sehaj Studio</h1>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Our Vision</h2>
              <p className="text-[var(--color-taupe)] leading-relaxed">
                Sehaj Studio was born from a simple belief: that contemporary Indian ethnic wear should feel as effortless as it looks elegant. We bridge the gap between traditional craftsmanship and modern design sensibility, creating pieces that resonate with the modern woman who values both heritage and innovation.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-[var(--color-charcoal)]">The Art of Craft</h2>
              <p className="text-[var(--color-taupe)] leading-relaxed">
                Each piece in our collection is crafted with intention. We work with master artisans who have inherited generations of expertise - from hand-embroidered chikankari to delicate gota work, from finest chanderi silk to luxurious Banarasi weaves. Our commitment to craftsmanship ensures that every garment tells a story of heritage and precision.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Sustainable Luxury</h2>
              <p className="text-[var(--color-taupe)] leading-relaxed">
                We believe in slow fashion - creating pieces that transcend seasons and become cherished parts of your wardrobe. Our made-to-order model ensures minimal waste while allowing you to own something truly special, crafted just for you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-[var(--color-charcoal)]">The Sehaj Aesthetic</h2>
              <p className="text-[var(--color-taupe)] leading-relaxed">
                Our design philosophy embraces "Soft Poetic" - quiet luxury, warm neutrals, and graceful silhouettes. We steer away from loud festive clichés, opting instead for refined elegance that speaks to the woman who knows her worth. Our pieces are designed for moments that matter, from intimate gatherings to grand celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-sand)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="font-serif text-4xl text-[var(--color-charcoal)] mb-2">Craft</div>
              <p className="text-[var(--color-taupe)]">Handcrafted with heritage techniques</p>
            </div>
            <div>
              <div className="font-serif text-4xl text-[var(--color-charcoal)] mb-2">Quality</div>
              <p className="text-[var(--color-taupe)]">Premium fabrics and meticulous finish</p>
            </div>
            <div>
              <div className="font-serif text-4xl text-[var(--color-charcoal)] mb-2">Intent</div>
              <p className="text-[var(--color-taupe)]">Designed for meaningful moments</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}