import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ handle: string }>;
}

const collectionInfo: Record<string, { title: string; description: string }> = {
  all: {
    title: 'Shop All',
    description: 'A complete edit of Sehaj Studio signatures across co-ords, suit sets, and sharara silhouettes.',
  },
  'co-ord-sets': {
    title: 'Co-ord Sets',
    description: 'Structured pairings with modern lines and occasion-ready ease.',
  },
  'suit-sets': {
    title: 'Suit Sets',
    description: 'Timeless suit forms reimagined with soft tailoring and contemporary drape.',
  },
  'sharara-suits': {
    title: 'Sharara Suits',
    description: 'Fluid movement, celebratory mood, and refined statement volume.',
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Fresh drops crafted for this season’s intimate and festive calendars.',
  },
};

const filters = {
  size: ['XS', 'S', 'M', 'L', 'XL'],
  price: ['Under ₹10k', '₹10k-₹20k', '₹20k+'],
  occasion: ['Wedding', 'Cocktail', 'Festive', 'Day Event'],
  pattern: ['Solid', 'Printed', 'Embroidered'],
  fabric: ['Silk Blend', 'Chanderi', 'Organza', 'Georgette'],
};

const demoProducts = [
  {
    handle: 'ivory-chanderi-co-ord-set',
    title: 'Ivory Chanderi Co-ord Set',
    price: 12500,
    image: 'https://images.pexels.com/photos/26973348/pexels-photo-26973348.jpeg?cs=srgb&dl=pexels-dhanno-26973348.jpg&fm=jpg',
    availabilityModel: 'ready_to_ship',
    leadTime: 'Dispatch in 48 hours',
  },
  {
    handle: 'rose-zari-suit-set',
    title: 'Rose Zari Suit Set',
    price: 18500,
    image: 'https://images.pexels.com/photos/20407204/pexels-photo-20407204.jpeg?cs=srgb&dl=pexels-dhanno-20407204.jpg&fm=jpg',
    availabilityModel: 'made_to_order',
    leadTime: 'Lead time: 10-14 days',
  },
  {
    handle: 'olive-silk-sharara-set',
    title: 'Olive Silk Sharara Set',
    price: 22000,
    image: 'https://images.pexels.com/photos/20702630/pexels-photo-20702630.jpeg?cs=srgb&dl=pexels-dhanno-20702630.jpg&fm=jpg',
    availabilityModel: 'ready_to_ship',
    leadTime: 'Dispatch in 72 hours',
  },
  {
    handle: 'saffron-organza-anarkali',
    title: 'Saffron Organza Anarkali',
    price: 15800,
    image: 'https://images.pexels.com/photos/20382102/pexels-photo-20382102.jpeg?cs=srgb&dl=pexels-dhanno-20382102.jpg&fm=jpg',
    availabilityModel: 'made_to_order',
    leadTime: 'Lead time: 12 days',
  },
  {
    handle: 'midnight-thread-suit',
    title: 'Midnight Thread Suit Set',
    price: 19800,
    image: 'https://images.pexels.com/photos/20791989/pexels-photo-20791989.jpeg?cs=srgb&dl=pexels-dhanno-20791989.jpg&fm=jpg',
    availabilityModel: 'ready_to_ship',
    leadTime: 'Dispatch in 48 hours',
  },
  {
    handle: 'clay-zardozi-sharara',
    title: 'Rose Clay Zardozi Sharara',
    price: 24500,
    image: 'https://images.pexels.com/photos/14100162/pexels-photo-14100162.jpeg?cs=srgb&dl=pexels-chinarianphotographer-14100162.jpg&fm=jpg',
    availabilityModel: 'made_to_order',
    leadTime: 'Lead time: 14 days',
  },
  {
    handle: 'sage-printed-coord',
    title: 'Sage Printed Co-ord Set',
    price: 13200,
    image: 'https://images.pexels.com/photos/13584944/pexels-photo-13584944.jpeg?cs=srgb&dl=pexels-abdullah-khan-314140297-13584944.jpg&fm=jpg',
    availabilityModel: 'ready_to_ship',
    leadTime: 'Dispatch in 48 hours',
  },
  {
    handle: 'gold-drape-suit',
    title: 'Antique Gold Drape Suit',
    price: 17800,
    image: 'https://images.pexels.com/photos/20420550/pexels-photo-20420550.jpeg?cs=srgb&dl=pexels-dhanno-20420550.jpg&fm=jpg',
    availabilityModel: 'made_to_order',
    leadTime: 'Lead time: 9-12 days',
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const info = collectionInfo[handle] ?? {
    title: handle
      .split('-')
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(' '),
    description: 'Curated contemporary Indian ethnicwear from Sehaj Studio.',
  };

  return {
    title: `${info.title} | Sehaj Studio`,
    description: info.description,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle } = await params;
  const info = collectionInfo[handle] ?? {
    title: 'Collection',
    description: 'Curated contemporary Indian ethnicwear from Sehaj Studio.',
  };

  const filterChips = [
    ...filters.size.slice(0, 3),
    ...filters.price.slice(0, 2),
    ...filters.occasion.slice(0, 2),
    ...filters.pattern.slice(0, 2),
    ...filters.fabric.slice(0, 2),
  ];

  return (
    <div>
      <section className="collection-hero">
        <div className="container">
          <div className="collection-shell">
            <div className="breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>{info.title}</span>
            </div>

            <h1 className="collection-title">{info.title}</h1>
            <p className="collection-description">{info.description}</p>

            <div className="collection-toolbar">
              <div className="filter-list">
                <button className="filter-chip active" type="button">All</button>
                {filterChips.map((chip) => (
                  <button key={chip} className="filter-chip" type="button">
                    {chip}
                  </button>
                ))}
              </div>
              <p className="text-sm text-[var(--color-taupe)]">{demoProducts.length} pieces</p>
            </div>
          </div>

          <div className="collection-grid">
            {demoProducts.map((product) => {
              const isReady = product.availabilityModel === 'ready_to_ship';
              return (
                <Link key={product.handle} href={`/products/${product.handle}`} className="collection-card">
                  <div className="collection-card-image">
                    <img src={product.image} alt={product.title} />
                    <span className={`availability-tag ${isReady ? 'availability-ready' : 'availability-made'}`}>
                      {isReady ? 'Ready to Ship' : 'Made to Order'}
                    </span>
                  </div>
                  <div className="collection-card-body">
                    <h3>{product.title}</h3>
                    <p className="collection-card-price">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="collection-card-note">{product.leadTime}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
