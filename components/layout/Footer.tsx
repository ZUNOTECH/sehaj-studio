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
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Sehaj Studio</h3>
            <p>
              Contemporary Indian occasion wear with softness, structure, and elevated drape.
              Crafted for intimate celebrations and statement entrances.
            </p>
            <div className="footer-pills">
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
