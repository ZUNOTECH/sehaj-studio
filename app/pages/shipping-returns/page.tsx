import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Sehaj Studio',
  description: 'Shipping and returns policy for Sehaj Studio orders.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-[var(--color-sand)]">
        <div className="container text-center">
          <h1 className="font-serif text-4xl text-[var(--color-charcoal)]">Shipping & Returns</h1>
          <p className="mt-2 text-[var(--color-taupe)]">Everything you need to know</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Shipping Information</h2>
              <div className="space-y-4 text-[var(--color-taupe)]">
                <p>
                  <strong className="text-[var(--color-charcoal)]">Free Shipping:</strong> Complimentary shipping on all orders above ₹5,000 within India.
                </p>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Standard Shipping:</strong> ₹500 for orders below ₹5,000. Delivery within 5-7 business days.
                </p>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Express Shipping:</strong> ₹1,000. Delivery within 2-3 business days (select pincodes only).
                </p>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Delivery Time:</strong> Ready to ship items are dispatched within 2-3 business days. Made to order pieces require 2-4 weeks for production.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Cash on Delivery</h2>
              <div className="space-y-4 text-[var(--color-taupe)]">
                <p>
                  COD is available on select products. Look for the COD badge on product pages. A nominal convenience fee may apply.
                </p>
                <p>
                  COD orders are subject to verification. We may contact you to confirm your order before dispatch.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Returns & Exchanges</h2>
              <div className="space-y-4 text-[var(--color-taupe)]">
                <p>
                  We want you to love your purchase. If you're not completely satisfied, we offer returns within 7 days of delivery for ready-to-ship items only.
                </p>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Eligibility:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Items must be unworn, unwashed, and in original packaging</li>
                  <li>Customized or made-to-order pieces are not eligible for return</li>
                  <li>Sale items are final sale</li>
                  <li>Tags must be attached</li>
                </ul>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Process:</strong> Contact us at hello@sehajstudio.com with your order number to initiate a return. We'll provide return shipping instructions.
                </p>
                <p>
                  <strong className="text-[var(--color-charcoal)]">Refunds:</strong> Refunds are processed within 7-10 business days of receiving the returned item. Original shipping charges are non-refundable.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">International Shipping</h2>
              <p className="text-[var(--color-taupe)]">
                Currently, we ship within India only. For international orders, please contact us at hello@sehajstudio.com and we'll try our best to accommodate your request.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-4">Care Instructions</h2>
              <p className="text-[var(--color-taupe)]">
                To maintain the quality of your garment, we recommend dry cleaning only. Store in a cool, dry place away from direct sunlight. For specific care instructions, check the product page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}