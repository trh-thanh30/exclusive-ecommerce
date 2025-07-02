import "./_styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ClientProvider from "./_providers/ClientProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s | The Exclusive",
    default: "Welcome | The Exclusive",
  },
  description: "Buy anything you like, you want and I'll deliver it for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${poppins.className} bg-primary-50 dark:bg-primary-100`}>
        <ClientProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "4px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 4000 },
              style: {
                fontSize: "12px",
                fontWeight: "500",
                color: "#202C46",
                textWrap: "nowrap",
                maxWidth: "400px",
                padding: "14px 20px",
              },
            }}
          />

          <main className="w-full mx-auto min-h-svh">{children}</main>

          <Script
            src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
            strategy="afterInteractive"
          />
          <df-messenger
            intent="WELCOME"
            chat-title="Exclusvie-chatai"
            agent-id="cb530104-3919-49df-9cc3-66d2c5e9dfdc"
            language-code="en"
          />
        </ClientProvider>
      </body>
    </html>
  );
}
