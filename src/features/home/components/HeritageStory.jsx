import React from "react";
import { ShieldCheck, Award, HeartHandshake, Gem } from "lucide-react";

export function HeritageStory() {
    const values = [
        {
            icon: <ShieldCheck size={28} className="val-icon" />,
            title: "100% BIS Hallmarked",
            desc: "Government certified 916 purity stamp guaranteed on all gold items."
        },
        {
            icon: <Gem size={28} className="val-icon" />,
            title: "Master Craftsmanship",
            desc: "Intricately handcrafted by skilled artisans preserving traditional heritage."
        },
        {
            icon: <Award size={28} className="val-icon" />,
            title: "35+ Years of Trust",
            desc: "Serving generations in Bundelkhand with absolute transparency since 1991."
        },
        {
            icon: <HeartHandshake size={28} className="val-icon" />,
            title: "Lifetime Exchange",
            desc: "Transparent valuation policy for exchange, melt, and bespoke resizing."
        }
    ];

    return (
        <section className="heritage-section" id="about">
            <div className="section-header">
                <span className="section-subtitle">THE KRISHNA PROMISE</span>
                <h2 className="section-title">Why Families Trust Krishna Jewellers</h2>
                <div className="gold-accent-line"></div>
            </div>

            <div className="values-grid">
                {values.map((v, i) => (
                    <div key={i} className="value-card">
                        <div className="value-icon-box">{v.icon}</div>
                        <h3>{v.title}</h3>
                        <p>{v.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
