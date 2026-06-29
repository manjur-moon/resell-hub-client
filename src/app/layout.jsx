import Providers from "@/providers/Providers";
import "./globals.css";
export const metadata={title:"ReSell Hub",description:"A modern second-hand marketplace platform"};
export default function RootLayout({children}){return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>}
