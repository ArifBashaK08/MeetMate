import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"

export const metadata: Metadata = {
  title: "Virtual Meet: Our Virtual Collaboration Hub",
  description: "Let's connect and collaborate effortlessly with our seamless video meeting app!",
  icons:{
    icon: "/images/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance={{
        layout:{
          logoImageUrl:"/images/logo.png",
          socialButtonsVariant: "iconButton"
        },
        variables:{
          colorText: "#fff",
          colorPrimary: "#0e78f9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff"
        }
      }}
      >
        <body
          className={`font-poppins bg-dark-2 text-white antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
