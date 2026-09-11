import React from "react";
import { Link } from "react-router-dom";

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
                ©️ since 1991 ||Krishna Jewellers||. All Rights Reserved.
            </div>

            <div style={{ marginTop: "12px" }}>
                <Link 
                    to="/admin" 
                    style={{ color: "var(--gold)", fontSize: "11px", opacity: 0.7, textDecoration: "none" }}
                >
                    ⚙ Store Admin Portal
                </Link>
            </div>

            <div style={{ marginTop: "10px" }}>
                <Link 
                    to="/privacy-policy"
                    style={{ color: "rgba(212,175,55,0.6)", fontSize: "11px", textDecoration: "none" }}
                >
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
