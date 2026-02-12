"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authenticate, AUTH_ERRORS } from "@/lib/auth";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const clearError = () => {
    setError(null);
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const newFieldErrors: { identifier?: string; password?: string } = {};
    if (!identifier.trim()) {
      newFieldErrors.identifier = "L'identifiant est requis";
    }
    if (!password.trim()) {
      newFieldErrors.password = "Le mot de passe est requis";
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = authenticate(identifier.trim(), password);

      if (result.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("auth_user", result.username);
          document.cookie = `auth_user=${result.username}; path=/; max-age=2592000`;
        }
        router.push("/gallery");
        router.refresh();
      } else {
        setError(AUTH_ERRORS[result.error]);
      }
    } catch {
      setError(AUTH_ERRORS.invalid);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold text-[#2d2d2d]">
              Login Your Account
            </h1>
            <p className="text-sm text-[#8a8a8a]">
              Hey, Enter your details to get sign in
              <br />
              to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              <span>{error}</span>
            </div>
          )}

          {/* Identifier field */}
          <div className="flex flex-col gap-1.5">
            <input
              id="identifier"
              type="text"
              placeholder="Enter Email address"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                clearError();
              }}
              disabled={isLoading}
              autoComplete="username"
              aria-invalid={!!fieldErrors.identifier}
              className={cn(
                "h-12 w-full rounded-xl border border-[#e0dcd4] bg-transparent px-4 text-sm text-[#2d2d2d] placeholder:text-[#b5b0a8] outline-none transition-all focus:border-[#f0b45d] focus:ring-2 focus:ring-[#f0b45d]/30 disabled:opacity-50",
                fieldErrors.identifier && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
              )}
            />
            {fieldErrors.identifier && (
              <p className="animate-in fade-in duration-150 text-xs text-red-500">
                {fieldErrors.identifier}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Passcode"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                disabled={isLoading}
                autoComplete="current-password"
                aria-invalid={!!fieldErrors.password}
                className={cn(
                  "h-12 w-full rounded-xl border border-[#e0dcd4] bg-transparent px-4 pr-16 text-sm text-[#2d2d2d] placeholder:text-[#b5b0a8] outline-none transition-all focus:border-[#f0b45d] focus:ring-2 focus:ring-[#f0b45d]/30 disabled:opacity-50",
                  fieldErrors.password && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8a8a8a] transition-colors hover:text-[#2d2d2d] disabled:pointer-events-none"
                aria-label={
                  showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="animate-in fade-in duration-150 text-xs text-red-500">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Trouble link */}
          <a
            href="#"
            className="text-sm text-[#2d2d2d] hover:underline"
          >
            Having trouble in sign in?
          </a>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f0b45d] text-sm font-semibold text-[#2d2d2d] transition-all hover:bg-[#e8a74e] active:scale-[0.98] disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e0dcd4]" />
            <span className="text-xs text-[#b5b0a8]">Or Sign in with</span>
            <div className="h-px flex-1 bg-[#e0dcd4]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              disabled={isLoading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e0dcd4] bg-transparent text-xs font-medium text-[#2d2d2d] transition-all hover:bg-[#f5efe6] disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e0dcd4] bg-transparent text-xs font-medium text-[#2d2d2d] transition-all hover:bg-[#f5efe6] disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e0dcd4] bg-transparent text-xs font-medium text-[#2d2d2d] transition-all hover:bg-[#f5efe6] disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-[#8a8a8a]">
            Not Registered Yet?{" "}
            <a href="#" className="font-medium text-[#f0b45d] hover:underline">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
