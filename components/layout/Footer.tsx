import Link from 'next/link';

const shopLinks = [
  { href: '/collections/all', label: 'Shop All' },
  { href: '/collections/co-ord-sets', label: 'Co-ord Sets' },
  { href: '/collections/suit-sets', label: 'Suit Sets' },
  { href: '/collections/sharara-suits', label: 'Sharara Suits' },
  { href: '/collections/new-arrivals', label: 'New Arrivals' },
  { href: '/sale', label: 'Sale' },
];

const helpLinks = [
  { href: '/account', label: 'My Account' },
  { href: '/pages/size-guide', label: 'Size Guide' },
  { href: '/pages/shipping-returns', label: 'Shipping & Returns' },
  { href: '/pages/contact', label: 'Contact Us' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/lookbook', label: 'Lookbook' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <p className="footer-kicker">Sehaj Studio</p>
            <h3>Quiet Luxury With A Bold Indian Pulse</h3>
            <p>
              Contemporary Indian occasion wear with softness, structure, and elevated drape.
              Crafted for intimate celebrations and statement entrances.
            </p>
            <div className="footer-trust-strip">
              <span>COD</span>
              <span>Pan-India Shipping</span>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="footer-links-wrap">
            <div className="footer-links">
              <h4>Shop</h4>
              <ul>
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>Help</h4>
              <ul>
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>Social</h4>
              <ul>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                <li><a href="mailto:hello@sehajstudio.com">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>The Insider Edit</h4>
            <p>Early access to drops, styling notes, and occasion curation from Sehaj Studio.</p>
            <form className="footer-subscribe-form">
              <input type="email" placeholder="Enter your email" aria-label="Email address" />
              <button type="button">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sehaj Studio. All rights reserved.</p>
          <div className="footer-mini-links">
            <Link href="/pages/privacy">Privacy Policy</Link>
            <Link href="/pages/terms">Terms of Service</Link>
            <Link href="/pages/shipping-returns">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
