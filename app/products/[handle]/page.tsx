import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ handle: string }>;
}

const productMap: Record<string, {
  title: string;
  price: string;
  availabilityLabel: 'Ready to Ship' | 'Made to Order';
  leadTime: string;
  fabric: string;
  care: string;
  fit: string;
  cod: string;
  occasionTags: string[];
  gallery: string[];
}> = {
  'ivory-chanderi-co-ord-set': {
    title: 'Ivory Chanderi Co-ord Set',
    price: '₹12,500',
    availabilityLabel: 'Ready to Ship',
    leadTime: 'Dispatch in 48 hours',
    fabric: 'Chanderi silk blend with tonal thread detailing',
    care: 'Dry clean only. Steam lightly before wear.',
    fit: 'Easy straight fit top with fluid tapered bottoms. True to size.',
    cod: 'COD available for eligible pin codes at checkout.',
    occasionTags: ['Day Function', 'House Ceremony', 'Cocktail Lunch'],
    gallery: [
      'https://images.pexels.com/photos/20791989/pexels-photo-20791989.jpeg?cs=srgb&dl=pexels-dhanno-20791989.jpg&fm=jpg',
      'https://images.pexels.com/photos/36325981/pexels-photo-36325981.jpeg?cs=srgb&dl=pexels-dhanno-36325981.jpg&fm=jpg',
      'https://images.pexels.com/photos/19401642/pexels-photo-19401642.jpeg?cs=srgb&dl=pexels-dhanno-19401642.jpg&fm=jpg',
    ],
  },
};

function getProductByHandle(handle: string) {
  return (
    productMap[handle] ?? {
      title: 'Rose Zari Suit Set',
      price: '₹18,500',
      availabilityLabel: 'Made to Order' as const,
      leadTime: 'Lead time: 10-14 days',
      fabric: 'Soft georgette with zari embroidery and satin lining',
      care: 'Dry clean only. Store flat in breathable garment cover.',
      fit: 'Slim through bodice with comfortable hip ease. Size up for relaxed fit.',
      cod: 'COD availability is location-dependent and shown at checkout.',
      occasionTags: ['Sangeet', 'Evening Event', 'Wedding Guest'],
      gallery: [
        'https://images.pexels.com/photos/20407204/pexels-photo-20407204.jpeg?cs=srgb&dl=pexels-dhanno-20407204.jpg&fm=jpg',
        'https://images.pexels.com/photos/20407205/pexels-photo-20407205.jpeg?cs=srgb&dl=pexels-dhanno-20407205.jpg&fm=jpg',
        'https://images.pexels.com/photos/20407207/pexels-photo-20407207.jpeg?cs=srgb&dl=pexels-dhanno-20407207.jpg&fm=jpg',
      ],
    }
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  return {
    title: `${product.title} | Sehaj Studio`,
    description: `${product.title}. ${product.fabric}. ${product.availabilityLabel} at Sehaj Studio.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  const isReady = product.availabilityLabel === 'Ready to Ship';

  return (
    <div className="pdp-wrap">
      <div className="container">
        <div className="pdp-shell">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections/all">Shop</Link>
            <span>/</span>
            <span>{product.title}</span>
          </div>

          <div className="pdp-grid">
            <div>
              <div className="pdp-main-image">
                <img src={product.gallery[0]} alt={product.title} />
              </div>
              <div className="pdp-thumb-row">
                {product.gallery.slice(1).map((image) => (
                  <div className="pdp-thumb" key={image}>
                    <img src={image} alt={`${product.title} alternate view`} />
                  </div>
                ))}
                <div className="pdp-thumb">
                  <img src={product.gallery[0]} alt={`${product.title} detail`} />
                </div>
              </div>
            </div>

            <div>
              <span className={`availability-tag ${isReady ? 'availability-ready' : 'availability-made'}`}>
                {product.availabilityLabel}
              </span>
              <h1 className="mt-4">{product.title}</h1>
              <p className="pdp-price">{product.price}</p>

              <div className="info-pills">
                {product.occasionTags.map((tag) => (
                  <span key={tag} className="info-pill">{tag}</span>
                ))}
              </div>

              <p className="mt-4 text-[var(--color-taupe)]">
                Elegant contemporary Indian dressing cut with a modern silhouette, handcrafted details,
                and seasonless drape for high-rotation occasion wear.
              </p>

              <div className="mt-6">
                <p className="text-sm text-[var(--color-charcoal)] uppercase tracking-wider">Select Size</p>
                <div className="size-grid">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                    <button key={size} className={`size-chip ${index === 2 ? 'active' : ''}`} type="button">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary mt-6" style={{ width: '100%' }} type="button">
                Add to Bag
              </button>

              <div className="notice-box">{product.leadTime}</div>
              <div className="notice-box" style={{ borderLeftColor: '#aa445f', background: 'rgba(170, 68, 95, 0.08)', color: '#6a2f42' }}>
                {product.cod}
              </div>

              <div className="pdp-meta-grid">
                <article className="pdp-meta-card">
                  <h4>Fit Notes</h4>
                  <p>{product.fit}</p>
                </article>
                <article className="pdp-meta-card">
                  <h4>Fabric</h4>
                  <p>{product.fabric}</p>
                </article>
                <article className="pdp-meta-card">
                  <h4>Care</h4>
                  <p>{product.care}</p>
                </article>
                <article className="pdp-meta-card">
                  <h4>Size Guide</h4>
                  <p>
                    Need help choosing your size? Visit our <Link href="/pages/size-guide">size guide</Link> for measurements and fit support.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
