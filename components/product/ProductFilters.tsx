'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string | null;
  availabilityModel: string | null;
}

interface SortOption {
  label: string;
  value: string;
}

interface ProductFiltersProps {
  products: Product[];
  sortOptions: SortOption[];
}

const filterOptions = {
  size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  price: [
    { label: 'Under ₹5,000', value: 'under-5000' },
    { label: '₹5,000 - ₹10,000', value: '5000-10000' },
    { label: '₹10,000 - ₹20,000', value: '10000-20000' },
    { label: 'Above ₹20,000', value: 'above-20000' },
  ],
  occasion: ['Wedding', 'Party', 'Festival', 'Office', 'Daily'],
  pattern: ['Solid', 'Printed', 'Embroidered', 'Embellished'],
  fabric: ['Cotton', 'Silk', 'Chiffon', 'Georgette', 'Velvet'],
};

export function ProductFilters({ products, sortOptions }: ProductFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[filterType] || [];
      if (current.includes(value)) {
        return { ...prev, [filterType]: current.filter(v => v !== value) };
      }
      return { ...prev, [filterType]: [...current, value] };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    Object.entries(activeFilters).forEach(([filterType, values]) => {
      if (values.length === 0) return;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--color-beige)] text-[var(--color-charcoal)]"
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-[var(--color-rose-clay)] text-white text-xs flex items-center justify-center rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="text-[var(--color-taupe)]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-transparent border border-[var(--color-beige)] text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-rose-clay)]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={cn(
        'lg:block',
        isFilterOpen ? 'block' : 'hidden'
      )}>
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(filterOptions).map(([filterType, options]) => (
            <div key={filterType} className="mb-4">
              <h4 className="text-sm font-medium text-[var(--color-charcoal)] mb-2 capitalize">{filterType}</h4>
              <div className="flex flex-wrap gap-2">
                {options.map(option => {
                  const value = typeof option === 'string' ? option : option.value;
                  const label = typeof option === 'string' ? option : option.label;
                  const isActive = activeFilters[filterType]?.includes(value);
                  
                  return (
                    <button
                      key={value}
                      onClick={() => toggleFilter(filterType, value)}
                      className={cn(
                        'px-4 py-2 text-sm border transition-colors',
                        isActive
                          ? 'bg-[var(--color-charcoal)] text-white border-[var(--color-charcoal)]'
                          : 'bg-transparent text-[var(--color-taupe)] border-[var(--color-beige)] hover:border-[var(--color-charcoal)]'
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--color-rose-clay)] hover:underline mb-6"
          >
            Clear all filters
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--color-taupe)]">No products found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-[var(--color-rose-clay)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}