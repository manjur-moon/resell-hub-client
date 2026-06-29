import {authClient} from "./auth-client"; import axiosInstance from "./axiosInstance";
export async function registerWithEmail({name,email,password,image}){const {data,error}=await authClient.signUp.email({name,email,password,image,callbackURL:'/dashboard'}); if(error) throw new Error(error.message||'Registration failed.'); return data;}
export async function loginWithEmail({email,password}){const {data,error}=await authClient.signIn.email({email,password,callbackURL:'/dashboard',rememberMe:true}); if(error) throw new Error(error.message||'Login failed.'); return data;}
export async function loginWithGoogle(){await authClient.signIn.social({provider:'google',callbackURL:'/dashboard',errorCallbackURL:'/login'});} export async function logoutUser(){const {error}=await authClient.signOut(); if(error) throw new Error(error.message||'Logout failed.'); return true;}
export async function getCurrentUserApi(){const {data}=await axiosInstance.get('/api/auth/me'); return data;}
