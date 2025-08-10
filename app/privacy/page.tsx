import {
  PRODUCT_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  COUNTRY_JURISDICTION
} from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <article className="prose max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toISOString().slice(0, 10)}</p>
      <p>
        This Privacy Policy describes how {COMPANY_LEGAL_NAME} (“we”, “us”, or “our”)
        collects, uses, and discloses information in connection with {PRODUCT_BRAND_NAME}.
        This policy is intended as general information and does not constitute legal advice.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Account and contact details you provide (e.g., name, email).</li>
        <li>Usage information related to accessing our site.</li>
        <li>Communications you send to us (e.g., support requests).</li>
      </ul>
      <h2>How We Use Information</h2>
      <ul>
        <li>To provide, maintain, and improve our services and site.</li>
        <li>To communicate with you, including support and updates.</li>
        <li>To comply with legal obligations and enforce our terms.</li>
      </ul>
      <h2>Sharing of Information</h2>
      <p>
        We may share information with service providers who assist us; with authorities when required by law; or in connection with a business transaction. We do not sell your personal information.
      </p>
      <h2>Data Retention</h2>
      <p>
        We retain information for as long as reasonably necessary for the purposes described in this policy, unless a longer retention period is required by law.
      </p>
      <h2>Your Choices</h2>
      <p>
        You may contact us to access, update, or request deletion of your information using the details below.
      </p>
      <h2>International Use</h2>
      <p>
        Our processing may occur in {COUNTRY_JURISDICTION} or other locations. By using our site, you acknowledge such processing.
      </p>
      <h2>Contact Us</h2>
      <p>
        Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a><br />
        Address: {BUSINESS_ADDRESS}
      </p>
    </article>
  );
}