import { PRODUCT_BRAND_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export default function DataDeletionPage() {
  return (
    <article className="prose max-w-none">
      <h1>Data Deletion</h1>
      <p>To request deletion of your data associated with {PRODUCT_BRAND_NAME}, please email us from the address linked to your account.</p>
      <ol>
        <li>Send an email to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the subject: <strong>“Data Deletion Request”</strong>.</li>
        <li>Include any relevant identifiers (e.g., your Facebook Page/IG handle or email used with our service).</li>
        <li>We will confirm receipt and complete deletion as required by platform policy.</li>
      </ol>
      <p>If you reached this page from Meta’s review flow: this page serves as our Data Deletion Instructions endpoint.</p>
      <p className="italic">Plain version (for reviewers): To delete your data, email {SUPPORT_EMAIL}.</p>
    </article>
  );
}