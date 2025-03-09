import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

type DocLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export default async function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = await params;
  auth.protect();
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
