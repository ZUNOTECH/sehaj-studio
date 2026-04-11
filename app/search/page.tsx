'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, X } from 'lucide-react';
import { searchProducts } from '@/lib/shopify/client';
import { formatPrice } from '@/lib/shopify/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/Input';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const products = await searchProducts(query, 20);
      setResults(products);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-[var(--color-sand)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-serif text-4xl text-[var(--color-charcoal)] mb-4">Search</h1>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-6 py-4 pr-12 bg-[var(--color-cream)] border border-[var(--color-beige)] text-[var(--color-charcoal)] placeholder:text-[var(--color-taupe-light)] focus:outline-none focus:border-[var(--color-rose-clay)]"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[var(--color-taupe)] hover:text-[var(--color-charcoal)]"
              >
                <SearchIcon size={24} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-taupe)]">Searching...</p>
            </div>
          ) : searched ? (
            results.length > 0 ? (
              <>
                <p className="mb-8 text-[var(--color-taupe)]">
                  {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {results.map((product: unknown, index: number) => {
                    const p = product as {
                      id: string;
                      handle: string;
                      title: string;
                      availableForSale: boolean;
                      priceRange: { minVariantPrice: { amount: string } };
                      featuredImage: { url: string; altText: string | null } | null;
                      metafields: { key: string; value: string }[] | null;
                    };
                    return (
                      <ProductCard
                        key={p.id}
                        id={p.id}
                        handle={p.handle}
                        title={p.title}
                        price={p.priceRange.minVariantPrice.amount}
                        image={p.featuredImage?.url || null}
                        availabilityModel={p.metafields?.find(m => m.key === 'availability_model')?.value || null}
                        index={index}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <SearchIcon size={48} className="mx-auto text-[var(--color-taupe-light)] mb-4" />
                <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-2">No results found</h2>
                <p className="text-[var(--color-taupe)]">Try different keywords or browse our collections.</p>
                <Link href="/collections/all" className="inline-block mt-6 text-[var(--color-rose-clay)] hover:underline">
                  View All Products
                </Link>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-[var(--color-taupe)]">Enter a search term to find products.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}