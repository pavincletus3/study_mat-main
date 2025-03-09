"use client";
import React, { FormEvent, useState, useTransition } from "react";
import * as Y from "yjs";

type Language = "english" | "tamil" | "telugu" | "german" | "hindi";

const languages: Language[] = ["english", "tamil", "telugu", "german", "hindi"];

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { BotIcon, LanguagesIcon } from "lucide-react";
import Markdown from "react-markdown";

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [translation, setTranslation] = useState("");
  const [englishSummary, setEnglishSummary] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      // Call API to get translation in selected language
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text, english_summary } = await res.json();
        setTranslation(translated_text);
        setEnglishSummary(english_summary || "English summary not available");
        toast.success("Tab Translated successfully!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon /> Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the tab</DialogTitle>
          <DialogDescription>
            This will Give the Summary for the document in selected language
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">{question}</p>}
        </DialogHeader>
        {translation && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is Translating..." : "Says:"}
              </p>
            </div>
            <p>
              {isPending ? (
                "Translating..."
              ) : (
                <Markdown>{translation}</Markdown>
              )}
            </p>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
        {englishSummary && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">English Summary</h3>
            <p>{englishSummary}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument;
