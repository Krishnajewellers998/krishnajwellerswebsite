import React from "react";

export function InstagramIcon({ size = 20, className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
}

export function FacebookIcon({ size = 20, className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className={className}
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    );
}

export function WhatsAppIcon({ size = 20, className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className={className}
        >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526s-.677-1.63-.928-2.232c-.244-.587-.492-.507-.677-.517l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.507 1.078 2.908 1.229 3.109c.15.2 2.122 3.24 5.14 4.544.718.31 1.279.496 1.716.635.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.175-1.429-.075-.125-.276-.2-.577-.35z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.006L2 22l5.176-1.314A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167a8.12 8.12 0 0 1-4.148-1.135l-.297-.177-3.08.783.822-3-.194-.312A8.136 8.136 0 1 1 12 20.167z" />
        </svg>
    );
}
