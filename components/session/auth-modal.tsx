"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { signIn } from "@/lib/auth/auth-client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export interface AuthModalRef {
  open: () => void;
  close: () => void;
}

const AuthModal = forwardRef<AuthModalRef>((_, ref) => {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const handleOAuth = async (provider: "google" | "github") => {
    await signIn.social(
      { provider, callbackURL: "/" },
      {
        onRequest: () => setLoading(provider),
        onResponse: () => {
          setLoading(null);
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-neutral-800">
        <DialogTitle className="text-2xl font-semibold">Sign In</DialogTitle>
        <DialogDescription className="text-neutral-500">
          Choose your provider to continue.
        </DialogDescription>

        <div className="flex flex-col gap-3 pt-4">
          <button
            disabled={loading !== null}
            onClick={() => handleOAuth("google")}
            className="flex w-full border-2 border-neutral-800 bg-neutral-900 font-medium rounded-lg py-3 items-center justify-center gap-3"
          >
            {loading === "google" ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Image src={"/google.svg"} alt="google" width={20} height={20} />
            )}
            <p>Sign in with Google</p>
          </button>

          <button
            disabled={loading !== null}
            onClick={() => handleOAuth("github")}
            className="flex w-full border-2 border-neutral-800 bg-neutral-900 font-medium rounded-lg py-3 items-center justify-center gap-3"
          >
            {loading === "github" ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Image src={"/git.svg"} alt="github" width={20} height={20} />
            )}
            <p>Sign in with GitHub</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

AuthModal.displayName = "AuthModal";
export default AuthModal;
