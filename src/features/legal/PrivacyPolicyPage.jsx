import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../shared/components/Navbar";
import { Footer } from "../../shared/components/Footer";

export function PrivacyPolicyPage() {
    return (
        <div className="website-root" id="top">
            <Navbar onResetHome={() => {}} />

            <main style={{ background: "#fffaf0", minHeight: "100vh", padding: "0 0 40px 0" }}>

                {/* Hero Banner */}
                <div className="pp-hero">
                    <div className="pp-hero-inner">
                        <p className="pp-hero-eyebrow">Legal &amp; Transparency</p>
                        <h1 className="pp-hero-title">Privacy Policy</h1>
                        <p className="pp-hero-sub">
                            Effective Date: 11 September 2026 &nbsp;|&nbsp; Last Updated: 11 September 2026
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="pp-content">

                    <p className="pp-intro">
                        Krishna Jewellers ("we", "us", or "our") operates the Krishna Jewellers mobile
                        application ("App"). This Privacy Policy explains how we handle information when
                        you use our App.
                    </p>

                    <Section number="1" title="Information We Collect">
                        <p>
                            The Krishna Jewellers App is designed to display jewellery designs, jewellery
                            information, shop information, and gold rates.
                        </p>
                        <p>The App does <strong>not</strong> directly collect or store personal information from users.</p>
                        <p>We do not require users to create an account or provide:</p>
                        <ul className="pp-list">
                            <li>Name</li>
                            <li>Mobile number</li>
                            <li>Email address</li>
                            <li>Password</li>
                            <li>Home address</li>
                            <li>Payment or banking information</li>
                            <li>Government identification information</li>
                        </ul>
                    </Section>

                    <Section number="2" title="Jewellery Designs">
                        <p>
                            The App displays jewellery photographs and related information for viewing purposes.
                            The App does not currently provide online jewellery purchasing or payment functionality.
                        </p>
                    </Section>

                    <Section number="3" title="Get Enquiry – WhatsApp">
                        <p>
                            The App provides a "Get Enquiry" button that allows users to contact Krishna
                            Jewellers through WhatsApp regarding jewellery designs.
                        </p>
                        <p>
                            When a user chooses this option, the App redirects the user to WhatsApp. Any
                            information provided by the user through WhatsApp is handled according to
                            WhatsApp's own privacy policy.
                        </p>
                        <p>
                            The Krishna Jewellers App does <strong>not</strong> collect or store WhatsApp
                            conversations or personal information through the App.
                        </p>
                    </Section>

                    <Section number="4" title="Gold Rates">
                        <p>
                            The App displays current/live gold-rate information provided through our system.
                            Gold rates are for informational purposes and may change from time to time.
                        </p>
                    </Section>

                    <Section number="5" title="Google Maps, Instagram and Facebook">
                        <p>
                            The App may provide buttons or links to Google Maps, Instagram, and Facebook.
                            These buttons are provided only to help users access Krishna Jewellers' shop
                            location, social media pages, and other publicly available business information.
                        </p>
                        <p>The App does <strong>not</strong> collect the user's Google Maps, Instagram, or Facebook account information.</p>
                        <p>
                            When a user opens these third-party services, their use is governed by the
                            respective service's own privacy policy and terms.
                        </p>
                    </Section>

                    <Section number="6" title="Permissions">
                        <p>The App does <strong>not</strong> require access to the following permissions for its normal operation:</p>
                        <ul className="pp-list">
                            <li>Camera</li>
                            <li>Microphone</li>
                            <li>Contacts</li>
                            <li>Photos / Gallery</li>
                            <li>Device location</li>
                            <li>SMS</li>
                            <li>Call logs</li>
                        </ul>
                    </Section>

                    <Section number="7" title="Payments">
                        <p>
                            The App does not currently provide online payment or checkout functionality.
                            No payment or banking information is collected through the App.
                        </p>
                    </Section>

                    <Section number="8" title="Third-Party Services">
                        <p>
                            The App may redirect users to third-party services such as WhatsApp, Google Maps,
                            Instagram, and Facebook. These services operate independently and may collect or
                            process information according to their own privacy policies.
                        </p>
                        <p>
                            Krishna Jewellers does <strong>not</strong> control the privacy practices of
                            these third-party services.
                        </p>
                    </Section>

                    <Section number="9" title="Data Security">
                        <p>
                            Because the App does not directly collect or store users' personal information,
                            Krishna Jewellers does not maintain a personal user database through the App.
                            We take reasonable measures to maintain the security and proper functioning of the App.
                        </p>
                    </Section>

                    <Section number="10" title="Children's Privacy">
                        <p>
                            The App is not specifically directed toward children and does not knowingly
                            collect personal information from children.
                        </p>
                    </Section>

                    <Section number="11" title="Changes to This Privacy Policy">
                        <p>
                            We may update this Privacy Policy from time to time if the App or its features
                            change. Any updated Privacy Policy will be made available through the Privacy
                            Policy page.
                        </p>
                    </Section>

                    <Section number="12" title="Contact Us">
                        <div className="pp-contact-card">
                            <div className="pp-contact-row">
                                <span className="pp-contact-label">Business Name</span>
                                <span className="pp-contact-value">Krishna Jewellers</span>
                            </div>
                            <div className="pp-contact-row">
                                <span className="pp-contact-label">Phone</span>
                                <span className="pp-contact-value">+91 99841 23388</span>
                            </div>
                            <div className="pp-contact-row">
                                <span className="pp-contact-label">Address</span>
                                <span className="pp-contact-value">Khushipura, Rath, Uttar Pradesh 210431</span>
                            </div>
                        </div>
                        <p style={{ marginTop: "12px" }}>
                            For questions regarding this Privacy Policy, users may contact Krishna Jewellers
                            using the contact details above.
                        </p>
                    </Section>

                    <Section number="13" title="Acceptance">
                        <p>
                            By using the Krishna Jewellers App, you acknowledge that you have read and
                            understood this Privacy Policy.
                        </p>
                    </Section>

                    {/* Back link */}
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Link to="/" className="pp-back-btn">
                            ← Back to Home
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

function Section({ number, title, children }) {
    return (
        <div className="pp-section">
            <h2 className="pp-section-title">
                <span className="pp-section-num">{number}.</span>
                {title}
            </h2>
            <div className="pp-section-body">{children}</div>
        </div>
    );
}

export default PrivacyPolicyPage;
