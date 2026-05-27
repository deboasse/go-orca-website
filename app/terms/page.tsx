import type { Metadata } from "next";
import { LegalPage, Sec } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Go-Orca.Tech website and services.",
};

export default function Terms() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updated="April 29, 2026">
      <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Go-Orca.Tech website and services. By using the site, you agree to these Terms.</p>
      <Sec heading="1. Services"><p>Go-Orca.Tech designs, develops, and supports custom software including CRMs, web and mobile apps, integrations, and product development. Specific deliverables, timelines, and fees are defined in a separate written engagement signed by both parties.</p></Sec>
      <Sec heading="2. Use of the website"><p>You agree to use the website only for lawful purposes. You may not attempt to interfere with the site, gain unauthorized access, or use it to transmit harmful code or unsolicited communications.</p></Sec>
      <Sec heading="3. Quotes and proposals"><p>Quotes provided through forms or discovery calls are estimates. Final pricing and scope are confirmed in a written agreement. Submissions through our forms do not create a contract until both parties have signed.</p></Sec>
      <Sec heading="4. Intellectual property"><p>All website content, including text, graphics, logos, and code samples, is owned by Go-Orca.Tech or licensed to us and is protected by intellectual property laws.</p></Sec>
      <Sec heading="5. Confidentiality"><p>Information shared with us during scoping or discovery will be treated as confidential and used only to evaluate or deliver the requested services. Mutual NDAs are available on request.</p></Sec>
      <Sec heading="6. Disclaimers"><p>The website is provided &ldquo;as is&rdquo; without warranties of any kind.</p></Sec>
      <Sec heading="7. Limitation of liability"><p>To the maximum extent permitted by law, Go-Orca.Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.</p></Sec>
      <Sec heading="8. Contact"><p>Questions? <a className="text-foreground underline" href="mailto:hello@go-orca.tech">hello@go-orca.tech</a></p></Sec>
    </LegalPage>
  );
}
