import React from "react";

export function FamilySection() {
    return (
        <section className="section family" id="family">
            <div className="section-heading">
                <div className="section-label">
                    Our Family
                </div>
                <h2>
                    Our Family, Our Legacy
                </h2>
                <p>
                    A jewellery business is built with trust, relationships and generations of dedication.
                </p>
            </div>

            <div className="family-grid">
                <div className="family-card">
                    <img 
                        src="/images/papa.jpg" 
                        className="family-photo" 
                        alt="Swargiya Shree Brij Kishor Soni"
                        onError={(e) => { e.target.src = "http://localhost:3000/images/papa.jpg"; }}
                    />
                    <div className="family-info">
                        <h3>
                            Swargiya Shree<br />
                            Brij Kishor Soni
                        </h3>
                        <span>In Loving Memory</span>
                    </div>
                </div>

                <div className="family-card">
                    <img 
                        src="/images/tauji.jpg" 
                        className="family-photo" 
                        alt="Shree Nand Kishor Soni"
                        onError={(e) => { e.target.src = "http://localhost:3000/images/tauji.jpg"; }}
                    />
                    <div className="family-info">
                        <h3>Shree Nand Kishor Soni</h3>
                        <span>Family</span>
                    </div>
                </div>

                <div className="family-card">
                    <img 
                        src="/images/rahul.jpg" 
                        className="family-photo" 
                        alt="Rahul Soni"
                        onError={(e) => { e.target.src = "http://localhost:3000/images/rahul.jpg"; }}
                    />
                    <div className="family-info">
                        <h3>Rahul Soni</h3>
                        <span>Family</span>
                    </div>
                </div>

                <div className="family-card">
                    <img 
                        src="/images/krishna.jpg" 
                        className="family-photo" 
                        alt="Krishna Soni"
                        onError={(e) => { e.target.src = "http://localhost:3000/images/krishna.jpg"; }}
                    />
                    <div className="family-info">
                        <h3>Krishna Soni</h3>
                        <span>Family</span>
                    </div>
                </div>
            </div>

            <div className="family-quote">
                "Jewellery may be made of gold, but the true value of a family business is built on trust, love and generations."
            </div>
        </section>
    );
}

export default FamilySection;
