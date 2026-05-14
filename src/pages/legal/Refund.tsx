import { LegalLayout } from "./LegalLayout";

const Refund = () => {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="May 8, 2026">
      <h2>1. Subscription Cancellations</h2>
      <p>You may cancel your ClickBio subscription at any time. Your cancellation will take effect at the end of the current paid term. If you cancel, you will continue to have access to the premium features through the end of your billing cycle.</p>

      <h2>2. Refund Eligibility</h2>
      <p>We offer a 7-day money-back guarantee for all new subscriptions. If you are not satisfied with ClickBio Pro or Standard within the first 7 days of your initial purchase, you are eligible for a full refund.</p>
      <p>To request a refund, please contact our support team at clickbio@gmail.com with your account details and the reason for your request.</p>

      <h2>3. Exceptions</h2>
      <p>Refunds will not be provided for:</p>
      <ul>
        <li>Subscription renewals (unless requested within 24 hours of the renewal charge).</li>
        <li>Partial months of service.</li>
        <li>Accounts terminated due to violation of our Terms and Conditions.</li>
      </ul>

      <h2>4. Processing Time</h2>
      <p>Once a refund is approved, it will be processed immediately. However, please allow 5-10 business days for the funds to appear in your account, depending on your bank or payment provider.</p>

      <h2>5. Changes to This Policy</h2>
      <p>We reserve the right to modify this refund policy at any time. Any changes will be effective immediately upon posting to this website. Your continued use of the service constitutes acceptance of the modified policy.</p>
    </LegalLayout>
  );
};

export default Refund;
