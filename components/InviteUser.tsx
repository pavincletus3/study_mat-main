"use client";
import React, { FormEvent, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User Invited successfully!");
      } else {
        toast.error("Failed to invite user to room");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a user to collaborate</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to invite 
          </DialogDescription>
        </DialogHeader>
        <form className ="flex gap-2" onSubmit={handleInvite}>
            <Input
                type="email"
                placeholder="Email Address"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={!email || isPending}>
                {isPending ? "Sending Invite..." : "Send Invite"}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
