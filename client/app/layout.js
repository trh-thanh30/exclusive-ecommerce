import "./index.css";

export const metadata = {
  title: {
    template: "%s | The Exclusive",
    default: "Welcome | The Exclusive",
  },
  description: "Buy anything you like, you want and i'll deliver it for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
