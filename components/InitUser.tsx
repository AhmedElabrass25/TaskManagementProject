// components/InitUser.tsx

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/store/slices/userSlice";

export default function InitUser() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return null; // 👈 مش بيعرض حاجة
}