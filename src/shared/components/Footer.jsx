import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText } from "lucide-react";

export function Footer() {
    return (
        <footer>
            <div className="footer-brand">
                Krishna Jewellers
            </div>

            <div>
                Fine Gold Jewellery • Rath, Uttar Pradesh
            </div>

            <div style={{ marginTop: "8px" }}>
                © Since 1991 || Krishna Jewellers || All Rights Reserved.
            </div>

            <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                <Link 
                    to="/admin" 
                    style={{ 
                        color: "var(--gold)", 
                        fontSize: "12px", 
                        opacity: 0.85, 
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                >
                    <ShieldCheck size={14} /> Store Admin Console
                </Link>

                <Link 
                    to="/privacy-policy"
                    style={{ 
                        color: "rgba(212,175,55,0.7)", 
                        fontSize: "12px", 
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                    }}
                >
                    <FileText size={14} /> Privacy Policy
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
