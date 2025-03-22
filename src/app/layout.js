
import "./globals.css";
import ServerHeader from "@/components/ServerHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import ServerFooter from "@/components/ServerFooter";
import { GlobalProvider } from "@/context/GlobalContext";



export const metadata = {
  title: "MoatMad",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <GlobalProvider>
        <ServerHeader />
        {children}
        <ServerFooter />
        </GlobalProvider>
      </body>
    </html>
  );
}
