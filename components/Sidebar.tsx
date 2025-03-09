"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState, useCallback } from "react";
import SidebarOption from "./SideBarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  userId: string;
  roomId: string;
}

function Sidebar() {
  const [width, setWidth] = useState(256); // 256px = 16rem (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const [groupData, setGroupData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const { user } = useUser();
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth > 180 && newWidth < 480) {
          // Min 180px, Max 480px
          setWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupData(grouped);
  }, [data]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const menuOption = (
    <div className="space-y-6">
      <div className="px-2">
        <NewDocumentButton />
      </div>
      <div className="space-y-6">
        {groupData.owner.length === 0 ? (
          <div className="text-center py-6 px-4">
            <p className="text-gray-600 text-sm font-medium">
              No documents yet
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Create your first document to get started
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-900 px-2">
                MY TABS
              </h2>
              <div className="space-y-2.5">
                {groupData.owner.map((doc) => (
                  <SidebarOption
                    key={doc.id}
                    id={doc.id}
                    href={`/doc/${doc.id}`}
                  />
                ))}
              </div>
            </div>

            {groupData.editor.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-900 px-2">
                  SHARED WITH ME
                </h2>
                <div className="space-y-2.5">
                  {groupData.editor.map((doc) => (
                    <SidebarOption
                      key={doc.id}
                      id={doc.id}
                      href={`/doc/${doc.id}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{ width: `${width}px` }}
        className="relative bg-white border-r border-gray-200"
      >
        <div className="md:hidden p-2">
          <Sheet>
            <SheetTrigger>
              <MenuIcon
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                size={40}
              />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4">{menuOption}</div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:block h-full">
          <div className="p-4">{menuOption}</div>
        </div>

        {/* Resize handle */}
        <div
          onMouseDown={startResizing}
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors ${
            isResizing ? "bg-blue-500" : "bg-transparent"
          }`}
        />
      </div>
    </>
  );
}

export default Sidebar;
