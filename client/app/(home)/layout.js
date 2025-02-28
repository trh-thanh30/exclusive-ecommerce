import "../_styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { Poppins } from "next/font/google";
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

export default function HomeLayOut({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${poppins.className} bg-primary-100`}>
        <Header />
        <div className="flex-1 px-8 py-8">
          <main className="w-full mx-auto max-w-7xl">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
