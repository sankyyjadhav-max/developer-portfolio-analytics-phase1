"use client";
import { useCallback, useState } from 'react';
import { api } from '../lib/api';
export function useApi<T=any>() { const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const request=useCallback(async(path:string,options?:RequestInit)=>{setLoading(true);setError('');try{return await api(path,options) as T}catch(e:any){setError(e.message||'Request failed');throw e}finally{setLoading(false)}},[]); return {request,loading,error}; }
