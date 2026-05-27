import type { Metadata } from "next";
import { LegalPage, Sec } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Go-Orca.Tech collects, uses, and protects your information.",
};

export default function Privacy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="April 29, 2026">
      <p>Go-Orca.Tech (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have.</p>
      <Sec heading="1. Information we collect">
        <p>We collect information you provide directly to us, such as:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Contact details (name, email, company, role) submitted via forms.</li>
          <li>Project details you share with us during scoping and discovery.</li>
          <li>Communications you send to us by email or chat.</li>
        </ul>
        <p>We also collect limited technical data automatically, including IP address, browser type, device information, referring URLs, and pages viewed, via cookies and similar technologies.</p>
      </Sec>
      <Sec heading="2. How we use your information">
        <ul className="ml-5 list-disc space-y-1">
          <li>To respond to inquiries and deliver requested services.</li>
          <li>To provide quotes, proposals, and project deliverables.</li>
          <li>To improve our website, services, and customer experience.</li>
          <li>To send operational updates and, with your consent, marketing communications.</li>
          <li>To comply with legal obligations and enforce our agreements.</li>
        </ul>
      </Sec>
      <Sec heading="3. Sharing your information">
        <p>We do not sell your personal information. We share data only with trusted service providers (e.g., hosting, analytics, email delivery) that help us operate our business, and only as necessary to provide their services. We may also disclose information if required by law.</p>
      </Sec>
      <Sec heading="4. Data retention">
        <p>We keep personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.</p>
      </Sec>
      <Sec heading="5. Your rights">
        <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal information, and to data portability. To exercise any of these rights, contact us at <a className="text-foreground underline" href="mailto:hello@go-orca.tech">hello@go-orca.tech</a>.</p>
      </Sec>
      <Sec heading="6. Security">
        <p>We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission over the internet is 100% secure, however, and we cannot guarantee absolute security.</p>
      </Sec>
      <Sec heading="7. Contact">
        <p>Questions about this policy? Contact us at <a className="text-foreground underline" href="mailto:hello@go-orca.tech">hello@go-orca.tech</a>.</p>
      </Sec>
    </LegalPage>
  );
}
