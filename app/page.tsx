import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    handle: 'co-ord-sets',
    title: 'Co-ord Sets',
    description: 'Clean lines, sharp tailoring, and effortless festive polish.',
    image: 'https://images.pexels.com/photos/20791989/pexels-photo-20791989.jpeg?cs=srgb&dl=pexels-dhanno-20791989.jpg&fm=jpg',
  },
  {
    handle: 'suit-sets',
    title: 'Suit Sets',
    description: 'Soft structure for intimate functions and elevated daywear.',
    image: 'https://images.pexels.com/photos/19401642/pexels-photo-19401642.jpeg?cs=srgb&dl=pexels-dhanno-19401642.jpg&fm=jpg',
  },
  {
    handle: 'sharara-suits',
    title: 'Sharara Suits',
    description: 'Movement-rich silhouettes with graceful, modern drama.',
    image: 'https://images.pexels.com/photos/14100162/pexels-photo-14100162.jpeg?cs=srgb&dl=pexels-chinarianphotographer-14100162.jpg&fm=jpg',
  },
];

const featuredProducts = [
  {
    handle: 'ivory-chanderi-co-ord-set',
    title: 'Ivory Chanderi Co-ord Set',
    price: '₹12,500',
    image: 'https://images.pexels.com/photos/26973348/pexels-photo-26973348.jpeg?cs=srgb&dl=pexels-dhanno-26973348.jpg&fm=jpg',
    availability: 'Ready to Ship',
    note: 'Dispatch in 48 hours',
  },
  {
    handle: 'rose-zari-suit-set',
    title: 'Rose Zari Suit Set',
    price: '₹18,500',
    image: 'https://images.pexels.com/photos/20407204/pexels-photo-20407204.jpeg?cs=srgb&dl=pexels-dhanno-20407204.jpg&fm=jpg',
    availability: 'Made to Order',
    note: 'Lead time: 10-14 days',
  },
  {
    handle: 'olive-silk-sharara',
    title: 'Olive Silk Sharara Set',
    price: '₹22,000',
    image: 'https://images.pexels.com/photos/20702630/pexels-photo-20702630.jpeg?cs=srgb&dl=pexels-dhanno-20702630.jpg&fm=jpg',
    availability: 'Ready to Ship',
    note: 'Dispatch in 72 hours',
  },
  {
    handle: 'saffron-organza-anarkali',
    title: 'Saffron Organza Anarkali',
    price: '₹15,800',
    image: 'https://images.pexels.com/photos/20382102/pexels-photo-20382102.jpeg?cs=srgb&dl=pexels-dhanno-20382102.jpg&fm=jpg',
    availability: 'Made to Order',
    note: 'Lead time: 12 days',
  },
];

const lookbookStrip = [
  {
    title: 'City Mehendi',
    image: 'https://images.pexels.com/photos/20777182/pexels-photo-20777182.jpeg?cs=srgb&dl=pexels-dhanno-20777182.jpg&fm=jpg',
  },
  {
    title: 'Cocktail Edit',
    image: 'https://images.pexels.com/photos/28949659/pexels-photo-28949659.jpeg?cs=srgb&dl=pexels-dhanno-28949659.jpg&fm=jpg',
  },
  {
    title: 'House Warming',
    image: 'https://images.pexels.com/photos/13584944/pexels-photo-13584944.jpeg?cs=srgb&dl=pexels-abdullah-khan-314140297-13584944.jpg&fm=jpg',
  },
  {
    title: 'Sangeet Night',
    image: 'https://images.pexels.com/photos/20420550/pexels-photo-20420550.jpeg?cs=srgb&dl=pexels-dhanno-20420550.jpg&fm=jpg',
  },
];

export default function Home() {
  return (
    <div>
      <section className="home-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="kicker">Sehaj Studio</span>
              <h1 className="hero-title mt-4">
                Modern Indian dressing with a
                <span className="pop"> bold feminine pulse</span>
              </h1>
              <p className="hero-subtitle">
                Premium contemporary Indian ethnic wear for women who want softness, drape, and presence.
                Quiet where it should be, striking where it matters.
              </p>

              <div className="hero-actions">
                <Link href="/collections/all" className="btn btn-primary">
                  Shop Collection <ArrowRight size={16} />
                </Link>
                <Link href="/lookbook" className="btn btn-secondary">View Lookbook</Link>
              </div>

              <div className="hero-notes">
                <span className="note-chip">India first · INR</span>
                <span className="note-chip">COD available</span>
                <span className="note-chip">Ready to Ship + Made to Order</span>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="https://images.pexels.com/photos/26973350/pexels-photo-26973350.jpeg?cs=srgb&dl=pexels-dhanno-26973350.jpg&fm=jpg"
                alt="Editorial portrait in contemporary Indian ethnicwear"
              />
              <div className="hero-caption">Season Edit 01 · Soft Tailoring for Summer Evenings</div>
              <div className="hero-orb" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <span className="kicker">Shop by Category</span>
          <h2 className="page-section-title mt-4">Designed for Occasion-led Dressing</h2>
          <p className="page-section-subtitle">Explore the core wardrobes of Sehaj Studio.</p>

          <div className="category-grid mt-8">
            {categories.map((cat) => (
              <Link key={cat.handle} href={`/collections/${cat.handle}`} className="category-card">
                <img src={cat.image} alt={cat.title} />
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <span className="kicker">New Arrivals</span>
          <h2 className="page-section-title mt-4">Fresh Drops with Statement Restraint</h2>
          <p className="page-section-subtitle">A premium curation balancing modern cuts and heritage techniques.</p>

          <div className="product-grid mt-8">
            {featuredProducts.map((product) => {
              const isReady = product.availability === 'Ready to Ship';
              return (
                <Link key={product.handle} href={`/products/${product.handle}`} className="product-card-modern">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.title} />
                    <span className={`availability-tag ${isReady ? 'availability-ready' : 'availability-made'}`}>
                      {product.availability}
                    </span>
                  </div>
                  <div className="product-body">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price}</p>
                    <p className="lead-note">{product.note}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="story-block">
            <span className="kicker" style={{ color: '#f4d390' }}>Seasonal Story</span>
            <h2 className="mt-4">Dusk Petals: a palette of rose clay, saffron, and antique gold.</h2>
            <p className="mt-4" style={{ maxWidth: '62ch' }}>
              This chapter draws from old city courtyards, hand-finished textures, and fluid silhouettes that catch
              movement beautifully. The mood is not loud-festive, but undeniably celebratory.
            </p>
            <Link href="/lookbook" className="btn btn-pop mt-6">Explore the Story</Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <span className="kicker">Craft Narrative</span>
          <h2 className="page-section-title mt-4">Texture, Technique, Tailoring</h2>
          <p className="page-section-subtitle">Each piece is built with a fabric-first lens and fitted for real movement.</p>

          <div className="craft-grid mt-8">
            <article className="craft-card">
              <h3>Drape</h3>
              <p>Chiffon, silk blends, and organza chosen to fall softly and hold shape through long events.</p>
            </article>
            <article className="craft-card">
              <h3>Tailoring</h3>
              <p>Proportion-led cuts with fit notes at product level so online purchase decisions stay confident.</p>
            </article>
            <article className="craft-card">
              <h3>Finish</h3>
              <p>Clean inside seams, thoughtful lining, and hand-led details that feel premium up close.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <span className="kicker">Lookbook Strip</span>
          <div className="look-strip mt-8">
            {lookbookStrip.map((look) => (
              <Link key={look.title} href="/lookbook" className="look-card">
                <img src={look.image} alt={look.title} />
                <span>{look.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="trust-row">
            <div className="trust-pill">Pan India Shipping</div>
            <div className="trust-pill">COD on Eligible Orders</div>
            <div className="trust-pill">Transparent Lead-time Messaging</div>
            <div className="trust-pill">Responsive Styling Support</div>
          </div>
        </div>
      </section>
    </div>
  );
}
