"use client";

import { useState, useSyncExternalStore } from "react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { LoginForm } from "@/components/admin/login-form";
import { Loading } from "@/components/admin/status";
import { getToken, saveToken, subscribeToken } from "@/lib/admin";

export function AdminPanel() {
  const token = useSyncExternalStore<string | null | undefined>(
    subscribeToken,
    getToken,
    () => undefined,
  );
  const [notice, setNotice] = useState<string | null>(null);

  function login(next: string) {
    setNotice(null);
    saveToken(next);
  }

  function logout(message: string | null) {
    saveToken(null);
    setNotice(message);
  }

  if (token === undefined) {
    return <Loading className="flex-1" />;
  }

  if (!token) {
    return <LoginForm notice={notice} onLogin={login} />;
  }

  return <AdminDashboard token={token} onLogout={logout} />;
}
