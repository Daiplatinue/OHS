import type React from "react"

const LegalText: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600">
      <p className="mb-4">Price displayed are inclusive of all taxes and duties. Free delivery for all orders.</p>

      <p className="mb-4">
        Apple Intelligence is available in beta on all iPhone 16 models, iPhone 15 Pro, iPhone 15 Pro Max, iPad mini
        (A17 Pro), and iPad and Mac models with M1 and later, with Siri and English (Australia, Canada, New Zealand,
        Singapore, South Africa, UK or US), French, German, Italian, Japanese, Korean, Portuguese (Brazil) or Spanish,
        as part of an iOS 18, iPadOS 18 and macOS Sequoia software update, with more languages coming soon. Some
        features may not be available in all regions or languages.
      </p>

      <p className="mb-4">
        Apple TV+ offer available to new and qualified returning subscribers only. $9.99/month after free trial. Only
        one offer per Apple Account and only one offer per family if you're part of a Family Sharing group, regardless
        of the number of devices that you or your family purchase. This offer is not available if you or your family
        have previously accepted an Apple TV+ one year free offer. Offer good for 3 months after eligible device
        activation. Plan automatically renews until cancelled. Restrictions and other terms apply.
      </p>

      <p className="mb-4">
        Special pricing available to qualified customers. To learn more about how to start qualifying for special
        pricing, talk to an Apple Specialist in a store or give us a call on 1800-1651-0525 (Smart / PLDT),
        1800-8474-7382 (Globe).
      </p>

      <p className="mb-4">
        New subscribers only. $9.99/month after trial. Offer is available for new Apple Music subscribers with a new
        eligible device for a limited time only. Offer redemption for eligible audio devices requires connecting or
        pairing to an Apple device running the latest iOS or iPadOS. Offer redemption for Apple Watch requires
        connecting or pairing to an iPhone running the latest iOS. Offer good for 3 months after eligible device
        activation. Only one offer per Apple Account, regardless of the number of eligible devices purchased. Plan
        automatically renews until cancelled. Restrictions and other{" "}
        <a href="#" className="text-blue-600 hover:underline">
          terms
        </a>{" "}
        apply.
      </p>
    </div>
  )
}

export default LegalText