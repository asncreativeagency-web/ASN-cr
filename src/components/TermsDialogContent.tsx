import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const TermsDialogContent = () => (
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Terms of Service</DialogTitle>
    </DialogHeader>
    <DialogDescription asChild>
      <div className="asn-body space-y-4 text-left text-sm">
        <p><strong>Last updated:</strong> 27 July 2025</p>
        <h4 className="font-bold mt-4">AGREEMENT TO TERMS</h4>
        <p>These Terms and Conditions constitute a legally binding agreement between you ("User," "you") and ASN Creative Agency ("we," "us," or "our"), governing your access to and use of https://asncreativeagency.in and any related services ("Site").</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Use of Site</strong><br />
            By accessing this Site, you agree to be bound by all terms herein. If you do not agree, do not use the Site.
          </li>
          <li>
            <strong>Services & Client Accounts</strong><br />
            You may use our contact or client portal features to engage our services. You agree to provide accurate information and keep your login credentials secure.
          </li>
          <li>
            <strong>Acceptable Use</strong><br />
            You must not use this Site to:
            <ul className="list-disc pl-6">
              <li>Violate any law/regulation</li>
              <li>Circumvent security or attempt to access restricted content</li>
              <li>Post, upload, or transmit any unlawful, harmful, or infringing content</li>
            </ul>
          </li>
          <li>
            <strong>Intellectual Property</strong><br />
            All content, trademarks, and site materials are owned by ASN Creative Agency or its licensors. Do not copy, reproduce, or distribute without permission.
          </li>
          <li>
            <strong>Payments & Fees</strong><br />
            Service fees, billing, and payment terms will be governed by the specific service agreement provided upon engagement. Any late fees or penalties will be assessed as outlined in your contract.
          </li>
          <li>
            <strong>Limitation of Liability</strong><br />
            ASN Creative Agency is not liable for indirect, incidental, or consequential damages arising from your use of the site or services.
          </li>
          <li>
            <strong>Termination</strong><br />
            We reserve the right to suspend or terminate your account or access for violations of these Terms or our policies.
          </li>
          <li>
            <strong>Changes to Terms</strong><br />
            ASN Creative Agency reserves the right to update these Terms. Continued use after changes constitutes acceptance.
          </li>
          <li>
            <strong>Governing Law</strong><br />
            These terms shall be governed by the laws of India (or your jurisdiction as mutually agreed in project contracts).
          </li>
          <li>
            <strong>Contact</strong><br />
            Questions about these Terms? Email: <a href="mailto:contact@asncreativeagency.com" className="underline">contact@asncreativeagency.com</a>
          </li>
        </ol>
        <p className="text-xs text-muted-foreground mt-4">This is a sample. Consult a lawyer for further customization, especially for complex international projects.</p>
      </div>
    </DialogDescription>
  </DialogContent>
);

export default TermsDialogContent; 