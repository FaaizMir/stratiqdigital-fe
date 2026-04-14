import "./globals.css";

export const metadata = {
  title: "Stratiq Digital Sourcing",
  description: "Stratiq Digital Sourcing is a sourcing and supply chain management company that helps brands find the right suppliers, manage quality, and scale their operations. We leverage technology and data to provide our clients with the best possible service.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
