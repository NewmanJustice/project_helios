import './globals.css';

export const metadata = {
  title: 'Project Helios',
  description: 'Strategic direction for the Civil legal jurisdiction',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
