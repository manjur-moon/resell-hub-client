"use client";
import {Toaster} from "react-hot-toast"; import {AuthProvider} from "./AuthProvider"; import QueryProvider from "./QueryProvider"; import {ThemeProvider} from "./ThemeProvider";
export default function Providers({children}){return <ThemeProvider><QueryProvider><AuthProvider>{children}<Toaster position="top-center"/></AuthProvider></QueryProvider></ThemeProvider>}
