import {
  PRODUCT_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  SUPPORT_EMAIL,
  COUNTRY_JURISDICTION
} from "@/lib/constants";

export default function TermsPage() {
  return (
    <article className="prose max-w-none">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toISOString().slice(0, 10)}</p>
      <p>These Terms of Service (“Terms”) govern your use of {PRODUCT_BRAND_NAME}. By accessing or using the site, you agree to these Terms.</p>
      <h2>Use of the Site</h2>
      <p>You may use the site only for lawful purposes and in accordance with these Terms. We may update, suspend, or discontinue any part of the site at any time.</p>
      <h2>Intellectual Property</h2>
      <p>The site and its content are owned by {COMPANY_LEGAL_NAME} and protected by applicable laws. No rights are granted except as expressly set out here.</p>
      <h2>Disclaimer</h2>
      <p>The site is provided “as is” without warranties of any kind. To the fullest extent permitted by law, we disclaim all warranties, express or implied.</p>
      <h2>Limitation of Liability</h2>
      <p>To the maximum extent permitted by {COUNTRY_JURISDICTION} law, {COMPANY_LEGAL_NAME} will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
      <h2>Changes</h2>
      <p>We may modify these Terms from time to time. Your continued use constitutes acceptance of the updated Terms.</p>
      <h2>Contact</h2>
      <p>Questions about these Terms? Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
    </article>
  );
}