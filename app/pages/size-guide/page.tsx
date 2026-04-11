import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide | Sehaj Studio',
  description: 'Find your perfect fit with our comprehensive size guide.',
};

export default function SizeGuidePage() {
  const sizeChart = [
    { size: 'XS', chest: '32', waist: '26', hip: '36', length: '44' },
    { size: 'S', chest: '34', waist: '28', hip: '38', length: '45' },
    { size: 'M', chest: '36', waist: '30', hip: '40', length: '46' },
    { size: 'L', chest: '38', waist: '32', hip: '42', length: '47' },
    { size: 'XL', chest: '40', waist: '34', hip: '44', length: '48' },
    { size: 'XXL', chest: '42', waist: '36', hip: '46', length: '49' },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-[var(--color-sand)]">
        <div className="container text-center">
          <h1 className="font-serif text-4xl text-[var(--color-charcoal)]">Size Guide</h1>
          <p className="mt-2 text-[var(--color-taupe)]">Find your perfect fit</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">How to Measure</h2>
              <p className="text-[var(--color-taupe)] mb-4">
                For the most accurate measurements, use a soft measuring tape and wear fitted clothing or measure over your undergarments.
              </p>
              <ul className="space-y-2 text-[var(--color-taupe)]">
                <li><strong className="text-[var(--color-charcoal)]">Bust/Chest:</strong> Measure around the fullest part of your bust, keeping the tape parallel to the floor.</li>
                <li><strong className="text-[var(--color-charcoal)]">Waist:</strong> Measure around the narrowest part of your natural waistline.</li>
                <li><strong className="text-[var(--color-charcoal)]">Hip:</strong> Measure around the fullest part of your hips, about 8" below your waistline.</li>
                <li><strong className="text-[var(--color-charcoal)]">Length:</strong> Measure from shoulder to the desired hem length.</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Size Chart (Inches)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-beige)]">
                      <th className="py-3 px-4 text-[var(--color-charcoal)] font-medium">Size</th>
                      <th className="py-3 px-4 text-[var(--color-charcoal)] font-medium">Bust</th>
                      <th className="py-3 px-4 text-[var(--color-charcoal)] font-medium">Waist</th>
                      <th className="py-3 px-4 text-[var(--color-charcoal)] font-medium">Hip</th>
                      <th className="py-3 px-4 text-[var(--color-charcoal)] font-medium">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="border-b border-[var(--color-beige)]">
                        <td className="py-3 px-4 text-[var(--color-charcoal)] font-medium">{row.size}</td>
                        <td className="py-3 px-4 text-[var(--color-taupe)]">{row.chest}"</td>
                        <td className="py-3 px-4 text-[var(--color-taupe)]">{row.waist}"</td>
                        <td className="py-3 px-4 text-[var(--color-taupe)]">{row.hip}"</td>
                        <td className="py-3 px-4 text-[var(--color-taupe)]">{row.length}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 bg-[var(--color-sand)]">
              <h3 className="font-serif text-xl text-[var(--color-charcoal)] mb-3">Fit Notes</h3>
              <ul className="space-y-2 text-[var(--color-taupe)]">
                <li>• Our products are designed to have a relaxed, comfortable fit.</li>
                <li>• For a more fitted look, we recommend sizing down.</li>
                <li>• Made-to-order pieces can be customized to your measurements upon request.</li>
                <li>• If you fall between sizes, we recommend sizing up for comfort.</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[var(--color-taupe)]">
                Need help? Contact us at <a href="mailto:hello@sehajstudio.com" className="text-[var(--color-rose-clay)]">hello@sehajstudio.com</a> for personalized sizing assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}