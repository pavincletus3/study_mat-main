"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [ispending, startTransition] = useTransition();
  const router = useRouter();
  const handlecreateDocument = () => {
    startTransition(async () => {
      //create new document
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <Button onClick={handlecreateDocument} disabled={ispending}>
      {ispending ? "Creating Tab..." : "Create Tab"}
    </Button>
  );
}
export default NewDocumentButton;
