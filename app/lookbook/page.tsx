import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lookbook | Sehaj Studio',
  description: 'Explore our curated lookbook featuring contemporary Indian ethnic wear looks.',
};

const lookbookImages = [
  { id: 1, src: 'https://images.pexels.com/photos/26973350/pexels-photo-26973350.jpeg?cs=srgb&dl=pexels-dhanno-26973350.jpg&fm=jpg', title: 'Elegant Evenings' },
  { id: 2, src: 'https://images.pexels.com/photos/26973348/pexels-photo-26973348.jpeg?cs=srgb&dl=pexels-dhanno-26973348.jpg&fm=jpg', title: 'Festive Grace' },
  { id: 3, src: 'https://images.pexels.com/photos/20791989/pexels-photo-20791989.jpeg?cs=srgb&dl=pexels-dhanno-20791989.jpg&fm=jpg', title: 'Wedding Editorial' },
  { id: 4, src: 'https://images.pexels.com/photos/20420550/pexels-photo-20420550.jpeg?cs=srgb&dl=pexels-dhanno-20420550.jpg&fm=jpg', title: 'Contemporary Classic' },
  { id: 5, src: 'https://images.pexels.com/photos/20382102/pexels-photo-20382102.jpeg?cs=srgb&dl=pexels-dhanno-20382102.jpg&fm=jpg', title: 'Summer Breeze' },
  { id: 6, src: 'https://images.pexels.com/photos/20777182/pexels-photo-20777182.jpeg?cs=srgb&dl=pexels-dhanno-20777182.jpg&fm=jpg', title: 'Evening Charm' },
  { id: 7, src: 'https://images.pexels.com/photos/19401642/pexels-photo-19401642.jpeg?cs=srgb&dl=pexels-dhanno-19401642.jpg&fm=jpg', title: 'Bridal Moments' },
  { id: 8, src: 'https://images.pexels.com/photos/14100162/pexels-photo-14100162.jpeg?cs=srgb&dl=pexels-chinarianphotographer-14100162.jpg&fm=jpg', title: 'Party Ready' },
];

export default function LookbookPage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-24 bg-[var(--color-sand)]">
        <div className="container text-center">
          <span className="text-sm text-[var(--color-gold)] uppercase tracking-widest">Editorial</span>
          <h1 className="font-serif text-5xl text-[var(--color-charcoal)] mt-4">Lookbook</h1>
          <p className="mt-4 text-[var(--color-taupe)] max-w-2xl mx-auto">
            Discover curated looks that celebrate the artistry of contemporary Indian ethnic wear.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lookbookImages.map((image, index) => (
              <div 
                key={image.id} 
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-center text-[var(--color-taupe)]">{image.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
