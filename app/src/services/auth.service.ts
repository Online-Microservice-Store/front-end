"use client";
import axios from "axios";
import {BACKEND_URL} from '@/constants/index';
const BASEURL = `${BACKEND_URL}/auth`;

export const login = async (body:any) => {
    const url = `${BASEURL}/login`;

    const {data} = await axios.post(url, body);

    console.log('object received');
    console.log(data);
    return data;
}

export const logout = async () => {
    document.cookie = `token=; path=/; secure; samesite=none; maxAge: 0; httpOnly: true`;
    document.cookie = `rols=; path=/; secure; samesite=none; maxAge: 0; httpOnly: true`;
    // res.status(200).json('Logout successfully');
}