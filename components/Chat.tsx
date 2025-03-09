"use client";

import {
  useRoom,
  useSelf,
  useStorage,
  useMutation,
  useOthers,
} from "@liveblocks/react/suspense";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageSquare, Send, Trash2, Smile, Paperclip, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useOwner from "@/lib/useOwner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const room = useRoom();
  const self = useSelf();
  const others = useOthers();
  const messages = useStorage((root) => root.messages);
  const isOwner = useOwner();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Force scroll to bottom when chat is opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the sheet animation is complete
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Update new messages count when messages change
  useEffect(() => {
    if (!isOpen && messages) {
      const newCount = messages.filter(
        (msg) =>
          msg.timestamp > lastSeenTimestamp && msg.userId !== self?.info?.name
      ).length;
      setNewMessages(newCount);
    }
  }, [messages, isOpen, lastSeenTimestamp, self?.info?.name]);

  // Reset new messages count when opening the chat
  useEffect(() => {
    if (isOpen) {
      setNewMessages(0);
      setLastSeenTimestamp(Date.now());
    }
  }, [isOpen]);

  const insertMessage = useMutation(({ storage }, text) => {
    storage.get("messages").push({
      userId: self?.info?.name || "Anonymous",
      text,
      timestamp: Date.now(),
    });
  }, []);

  const deleteMessage = useMutation(({ storage }, index) => {
    storage.get("messages").delete(index);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      insertMessage(message);
      setMessage("");
    }
  };

  const getUserAvatar = (userId: string) => {
    // Check if it's the current user
    if (userId === self?.info?.name) {
      return self?.info?.avatar;
    }

    // Check other users
    const otherUser = others.find((other) => other.info?.name === userId);
    return otherUser?.info?.avatar;
  };

  // Format timestamp into human-readable format
  const formatMessageTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();

    // Same day formatting
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Otherwise show full date
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background border-2 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <MessageSquare className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                  </Button>
                  {newMessages > 0 && (
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs font-medium flex items-center justify-center shadow-md animate-in zoom-in">
                      {newMessages}
                    </div>
                  )}
                </div>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={16}>
              <p>Open chat{newMessages > 0 ? ` (${newMessages} new)` : ""}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px] p-0 border-l border-l-primary/20 shadow-2xl rounded-l-xl"
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="p-4 border-b bg-gradient-to-r from-background to-background/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Chat</span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {others.length + 1}{" "}
                    {others.length + 1 === 1 ? "user" : "users"} active
                  </span>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto bg-muted/30 dark:bg-muted/10 scroll-smooth"
            >
              <div className="space-y-4 p-4">
                {messages?.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-muted-foreground text-sm italic">
                    No messages yet. Start the conversation!
                  </div>
                )}
                {messages?.map((msg, index) => {
                  const isCurrentUser = msg.userId === self?.info?.name;
                  const showUserAvatar =
                    index === 0 || messages[index - 1]?.userId !== msg.userId;

                  return (
                    <div
                      key={index}
                      className={`flex items-end gap-2 group ${
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {showUserAvatar ? (
                        <Avatar
                          className={`h-8 w-8 border-2 border-background shadow-md shrink-0 transition-all duration-300 ${
                            isCurrentUser
                              ? "ring-primary/20"
                              : "ring-muted-foreground/20"
                          }`}
                        >
                          <AvatarImage src={getUserAvatar(msg.userId)} />
                          <AvatarFallback
                            className={`${
                              isCurrentUser
                                ? "bg-primary/20 text-primary"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            {msg.userId[0]}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 shrink-0" />
                      )}
                      <div className="relative flex flex-col min-w-0 max-w-[75%]">
                        {showUserAvatar && (
                          <p
                            className={`text-xs font-medium mb-1 ${
                              isCurrentUser ? "text-right mr-2" : "ml-2"
                            }`}
                          >
                            {msg.userId}
                          </p>
                        )}
                        <div
                          className={`relative rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg"
                              : "bg-card dark:bg-card/80 rounded-tl-none shadow-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                          <span
                            className={`block text-xs opacity-70 mt-1 ${
                              isCurrentUser
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatMessageTime(msg.timestamp)}
                          </span>
                        </div>
                        {(isOwner || isCurrentUser) && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`absolute -top-2 ${
                                    isCurrentUser ? "-left-2" : "-right-2"
                                  } h-6 w-6 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-full`}
                                  onClick={() => deleteMessage(index)}
                                >
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete message</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} className="h-px" />
              </div>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="border-t p-4 bg-background"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="pr-16 py-6 rounded-full pl-4 border-primary/20 focus-visible:ring-primary/30"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                    >
                      <Smile className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {others.length > 0
                    ? `${others.map((other) => other.info?.name).join(", ")} ${
                        others.length === 1 ? "is" : "are"
                      } online`
                    : ""}
                </p>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
