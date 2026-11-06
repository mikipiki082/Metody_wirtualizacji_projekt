"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, LoaderCircle, LogIn } from "lucide-react";
import { Note } from "@/components/admin/status";
import { Field, fieldClass } from "@/components/form-field";
import { getInquiries, UnauthorizedError } from "@/lib/admin";
import { cn } from "@/lib/utils";

type Props = {
  notice: string | null;
  onLogin: (token: string) => void;
};

export function LoginForm({ notice, onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!password) {
      setError("Podaj hasło");
      return;
    }

    setChecking(true);
    setError(null);
    try {
      await getInquiries(password);
      onLogin(password);
    } catch (err) {
      setChecking(false);
      setError(
        err instanceof UnauthorizedError
          ? "Nieprawidłowe hasło"
          : (err as Error).message,
      );
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8 lg:px-12 2xl:px-20">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-md flex-col gap-6 border border-border bg-card/85 p-6 backdrop-blur-sm sm:p-8"
      >
        <div>
          <KeyRound className="mb-5 size-8 text-redline" />
          <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
            Panel administratora
          </p>
          <h1 className="mt-1 font-display text-3xl uppercase sm:text-4xl">
            Zaloguj się
          </h1>
          <p className="mt-2 text-steel">
            Zarządzaj flotą i odpowiadaj na zapytania klientów.
          </p>
        </div>

        {notice && <Note tone="error">{notice}</Note>}

        <Field
          id="haslo"
          label="Hasło administratora"
          error={error ?? undefined}
        >
          <div className="relative">
            <input
              id="haslo"
              type={visible ? "text" : "password"}
              className={cn(fieldClass, "h-14 pr-14")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
              className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-steel transition-colors hover:text-foreground"
            >
              {visible ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          disabled={checking}
          className="chamfer-sm flex items-center justify-center gap-3 bg-redline px-6 py-4 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright disabled:opacity-60"
        >
          {checking ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <LogIn className="size-5" />
          )}
          Zaloguj
        </button>
      </form>
    </section>
  );
}
