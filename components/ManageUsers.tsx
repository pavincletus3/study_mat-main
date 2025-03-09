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
import {
  deleteDocument,
  inviteUserToDocument,
  removeUserFromDocument,
} from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Users, X, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [removingUsers, setRemovingUsers] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      setRemovingUsers((prev) => new Set(prev).add(userId));
      const { success } = await removeUserFromDocument(room.id, userId);
      if (success) {
        toast.success("User removed successfully");
      } else {
        toast.error("Error removing user");
      }
      setRemovingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        asChild
        variant="outline"
        className="flex items-center gap-2 hover:bg-accent/50 transition-colors"
      >
        <DialogTrigger>
          <Users className="h-4 w-4" />
          <span>Users</span>
          <Badge variant="secondary" className="ml-2">
            {usersInRoom?.docs.length || 0}
          </Badge>
        </DialogTrigger>
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Users With Access
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Manage who has access to this Tab
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            {usersInRoom?.docs.map((doc) => (
              <div
                key={doc.data().userId}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-colors",
                  "hover:bg-accent/50",
                  removingUsers.has(doc.data().userId) && "opacity-50"
                )}
              >
                <div className="flex flex-col">
                  <p className="font-medium">
                    {doc.data().userId === user?.emailAddresses[0].toString()
                      ? `You (${doc.data().userId})`
                      : doc.data().userId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doc.data().role === "owner" ? "Tab Owner" : "Editor"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      doc.data().role === "owner" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {doc.data().role}
                  </Badge>
                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0].toString() && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(doc.data().userId)}
                        disabled={removingUsers.has(doc.data().userId)}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                      >
                        {removingUsers.has(doc.data().userId) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;
