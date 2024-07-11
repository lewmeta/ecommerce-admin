import React from "react";

export default function AuthLayout({
    children
}: { children: React.ReactNode }) {

    return (
        <div className="flex items-center justify-center h-full bg-blue-600">{children}</div>
    )
}