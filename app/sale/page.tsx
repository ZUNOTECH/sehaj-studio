import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sale | Sehaj Studio',
  description: 'Shop limited-time markdowns on curated Sehaj Studio ethnicwear styles.',
};

const saleProducts = [
  {
    handle: 'sunlit-zari-suit-set',
    title: 'Sunlit Zari Suit Set',
    salePrice: '₹8,900',
    originalPrice: '₹12,500',
    image: 'https://images.pexels.com/photos/19401642/pexels-photo-19401642.jpeg?cs=srgb&dl=pexels-dhanno-19401642.jpg&fm=jpg',
    discount: '29% Off',
    note: 'Ready to Ship · Dispatch in 48 hours',
  },
  {
    handle: 'blush-eid-coord',
    title: 'Blush Eid Co-ord',
    salePrice: '₹9,600',
    originalPrice: '₹13,800',
    image: 'https://images.pexels.com/photos/26973348/pexels-photo-26973348.jpeg?cs=srgb&dl=pexels-dhanno-26973348.jpg&fm=jpg',
    discount: '30% Off',
    note: 'Ready to Ship · Dispatch in 72 hours',
  },
  {
    handle: 'ivory-day-sharara',
    title: 'Ivory Day Sharara',
    salePrice: '₹14,200',
    originalPrice: '₹19,700',
    image: 'https://images.pexels.com/photos/14100162/pexels-photo-14100162.jpeg?cs=srgb&dl=pexels-chinarianphotographer-14100162.jpg&fm=jpg',
    discount: '28% Off',
    note: 'Made to Order · Lead time 10-12 days',
  },
  {
    handle: 'plum-occasion-suit',
    title: 'Plum Occasion Suit',
    salePrice: '₹10,500',
    originalPrice: '₹15,200',
    image: 'https://images.pexels.com/photos/20407204/pexels-photo-20407204.jpeg?cs=srgb&dl=pexels-dhanno-20407204.jpg&fm=jpg',
    discount: '31% Off',
    note: 'Ready to Ship · Dispatch in 48 hours',
  },
  {
    handle: 'rose-evening-edit',
    title: 'Rose Evening Edit',
    salePrice: '₹11,900',
    originalPrice: '₹16,800',
    image: 'https://images.pexels.com/photos/20702630/pexels-photo-20702630.jpeg?cs=srgb&dl=pexels-dhanno-20702630.jpg&fm=jpg',
    discount: '29% Off',
    note: 'Made to Order · Lead time 12 days',
  },
  {
    handle: 'lilac-occasion-suit',
    title: 'Lilac Occasion Suit',
    salePrice: '₹9,900',
    originalPrice: '₹14,600',
    image: 'https://images.pexels.com/photos/20407205/pexels-photo-20407205.jpeg?cs=srgb&dl=pexels-dhanno-20407205.jpg&fm=jpg',
    discount: '32% Off',
    note: 'Ready to Ship · Dispatch in 48 hours',
  },
  {
    handle: 'mustard-sharara-edit',
    title: 'Mustard Sharara Edit',
    salePrice: '₹12,400',
    originalPrice: '₹17,200',
    image: 'https://images.pexels.com/photos/20382102/pexels-photo-20382102.jpeg?cs=srgb&dl=pexels-dhanno-20382102.jpg&fm=jpg',
    discount: '28% Off',
    note: 'Made to Order · Lead time 10 days',
  },
  {
    handle: 'winter-ivory-set',
    title: 'Winter Ivory Set',
    salePrice: '₹10,800',
    originalPrice: '₹14,900',
    image: 'https://images.pexels.com/photos/36325981/pexels-photo-36325981.jpeg?cs=srgb&dl=pexels-dhanno-36325981.jpg&fm=jpg',
    discount: '27% Off',
    note: 'Ready to Ship · Dispatch in 72 hours',
  },
];

export default function SalePage() {
  return (
    <section className="sale-page-hero">
      <div className="container">
        <div className="sale-shell">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Sale</span>
          </div>

          <span className="kicker">Limited-Time Sale</span>
          <h1 className="mt-4">Sale Edit</h1>
          <p className="mt-3" style={{ maxWidth: '64ch' }}>
            Select styles are now marked down for a short window. Quantities are limited and prices may change
            without notice once this edit closes.
          </p>

          <div className="sale-kpi-row">
            <span className="sale-kpi-chip">Up to 32% Off</span>
            <span className="sale-kpi-chip">INR Pricing</span>
            <span className="sale-kpi-chip">COD on eligible orders</span>
            <span className="sale-kpi-chip">Mixed ready + made-to-order</span>
          </div>
        </div>

        <div className="collection-grid" style={{ paddingTop: '1.25rem' }}>
          {saleProducts.map((product) => (
            <Link key={product.handle} href={`/products/${product.handle}`} className="collection-card">
              <div className="collection-card-image">
                <img src={product.image} alt={product.title} />
                <span className="sale-tag">{product.discount}</span>
              </div>
              <div className="collection-card-body">
                <h3>{product.title}</h3>
                <p className="collection-card-price">{product.salePrice}</p>
                <p className="collection-card-note">
                  <span className="sale-original-price">{product.originalPrice}</span> · {product.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
