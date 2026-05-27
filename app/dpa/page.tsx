import type { Metadata } from "next";
import { LegalPage, Sec } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description: "How Go-Orca.Tech processes personal data on behalf of clients under GDPR and similar regulations.",
};

export default function Dpa() {
  return (
    <LegalPage eyebrow="Legal" title="Data Processing Addendum" updated="April 29, 2026">
      <p>This Data Processing Addendum (&ldquo;DPA&rdquo;) forms part of the agreement between the client (&ldquo;Controller&rdquo;) and Go-Orca.Tech (&ldquo;Processor&rdquo;) for the provision of services that involve processing of personal data.</p>
      <Sec heading="1. Definitions"><p>&ldquo;Personal Data&rdquo;, &ldquo;Processing&rdquo;, &ldquo;Controller&rdquo;, &ldquo;Processor&rdquo;, &ldquo;Data Subject&rdquo;, and &ldquo;Sub-processor&rdquo; have the meanings given in applicable data protection laws.</p></Sec>
      <Sec heading="2. Roles and scope"><p>The Controller determines the purposes and means of processing. Go-Orca.Tech acts as a Processor and processes Personal Data only on documented instructions from the Controller.</p></Sec>
      <Sec heading="3. Security measures">
        <ul className="ml-5 list-disc space-y-1">
          <li>Encryption in transit (TLS) and at rest where supported.</li>
          <li>Role-based access controls and the principle of least privilege.</li>
          <li>Strong authentication for all systems handling Personal Data.</li>
          <li>Logging, monitoring, and regular review of access events.</li>
          <li>Secure software development practices and code review.</li>
          <li>Regular backups and tested recovery procedures.</li>
        </ul>
      </Sec>
      <Sec heading="4. Sub-processors"><p>Go-Orca.Tech may engage sub-processors (e.g., cloud hosting, email delivery, analytics). We maintain a list of current sub-processors available on request.</p></Sec>
      <Sec heading="5. Contact"><p>To request a signed copy of this DPA, contact <a className="text-foreground underline" href="mailto:hello@go-orca.tech">hello@go-orca.tech</a>.</p></Sec>
    </LegalPage>
  );
}
