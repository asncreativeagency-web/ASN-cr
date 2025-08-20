import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const PrivacyPolicyDialogContent = () => (
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Privacy Policy</DialogTitle>
    </DialogHeader>
    <DialogDescription asChild>
      <div className="asn-body space-y-4 text-left text-sm">
        <p><strong>Last updated:</strong> 27 July 2025</p>
        <p>This privacy notice for ASN Creative Agency (doing business as ASN) ("Company," "we," "us," or "our") describes how and why we collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:</p>
        <ul className="list-disc pl-6">
          <li>Visit our website at https://asncreativeagency.in, or any website of ours that links to this privacy notice</li>
          <li>Engage with us in other related ways, including sales, marketing, or events</li>
        </ul>
        <h4 className="font-bold mt-4">Information We Collect</h4>
        <p>We collect personal information that you provide to us, including but not limited to:</p>
        <ul className="list-disc pl-6">
          <li>Name, contact details (email, phone), company name</li>
          <li>Project details, service inquiries</li>
          <li>Communication content (messages, attachments)</li>
        </ul>
        <p>We also collect information automatically (via cookies and tracking technologies):</p>
        <ul className="list-disc pl-6">
          <li>IP address, browser/device info, usage data</li>
          <li>Analytics on how you interact with our site/services</li>
        </ul>
        <h4 className="font-bold mt-4">How We Use Your Information</h4>
        <ul className="list-disc pl-6">
          <li>To provide, operate, and maintain our website and services</li>
          <li>To respond to inquiries, provide customer support, and improve client experience</li>
          <li>For analytics, security, and compliance purposes</li>
          <li>To process client projects/communications as per your requests</li>
        </ul>
        <h4 className="font-bold mt-4">How We Share Information</h4>
        <ul className="list-disc pl-6">
          <li>With third-party vendors and partners who help us operate the site and deliver services (e.g., CRM, hosting, analytics providers)</li>
          <li>When required by law, legal process, or to protect rights and safety</li>
        </ul>
        <h4 className="font-bold mt-4">Data Security</h4>
        <p>We use industry-standard measures (encryption, secure hosting, access controls) to protect your information. However, no online system is 100% secure.</p>
        <h4 className="font-bold mt-4">International Data Transfers</h4>
        <p>Your data may be processed and stored in countries outside your own, including India and other countries where our partners operate.</p>
        <h4 className="font-bold mt-4">Your Rights</h4>
        <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information, or restrict its processing. Contact us to make such requests.</p>
        <h4 className="font-bold mt-4">Cookies and Tracking</h4>
        <p>We use cookies for analytics, personalization, and service improvement. You can adjust your browser settings to manage or block cookies.</p>
        <h4 className="font-bold mt-4">Updates to This Policy</h4>
        <p>We may update this notice from time to time. The revised version will be indicated by an updated "Last updated" date and will be effective when accessible.</p>
        <h4 className="font-bold mt-4">Contact Us</h4>
        <p>For any questions or concerns, contact: <a href="mailto:contact@asncreativeagency.in?subject=Privacy%20Policy%20Inquiry&body=Hello!%20I%20have%20a%20question%20about%20the%20privacy%20policy." className="underline">contact@asncreativeagency.in</a></p>
      </div>
    </DialogDescription>
  </DialogContent>
);

export default PrivacyPolicyDialogContent; 