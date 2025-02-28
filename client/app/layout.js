import "./_styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ClientProvider from "./_providers/ClientProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${poppins.className} bg-primary-100`}>
        <ClientProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "4px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 4000 },
              style: {
                fontSize: "14px",
                color: "#9CA3AF",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />

          {/* <Header /> */}
          <div className="flex-1 px-8 py-8">
            <main className="w-full mx-auto max-w-7xl">{children}</main>
          </div>
          {/* <Footer /> */}
        </ClientProvider>
      </body>
    </html>
  );
}
