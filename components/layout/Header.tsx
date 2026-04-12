'use client';

import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections/all', label: 'Shop All' },
  { href: '/collections/co-ord-sets', label: 'Co-ord Sets' },
  { href: '/collections/suit-sets', label: 'Suit Sets' },
  { href: '/collections/sharara-suits', label: 'Sharara Suits' },
  { href: '/collections/new-arrivals', label: 'New Arrivals' },
  { href: '/sale', label: 'Sale', isSale: true },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'About' },
];

const utilityLinks = [
  { href: '/account', label: 'My Account' },
  { href: '/pages/size-guide', label: 'Size Guide' },
  { href: '/pages/shipping-returns', label: 'Shipping & Returns' },
  { href: '/pages/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsOpen } = useCartStore();

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="icon-btn mobile-toggle"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''} ${link.isSale ? 'nav-link-sale' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="brand-mark" aria-label="Sehaj Studio Home">
          Sehaj <span className="accent">Studio</span>
        </Link>

        <div className="header-icons">
          <Link href="/search" className="icon-btn" aria-label="Search">
            <Search size={18} />
          </Link>
          <Link href="/account" className="icon-btn" aria-label="My account">
            <User size={18} />
          </Link>
          <Link href="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart size={18} />
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-label="Open cart"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="mobile-menu" aria-label="Mobile Menu">
            <div className="mobile-menu-header">
              <span className="brand-mark" style={{ fontSize: '1rem', justifySelf: 'start' }}>
                Sehaj <span className="accent">Studio</span>
              </span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mobile-menu-links">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mobile-utility">
              {utilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
