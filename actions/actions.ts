"use server";
import { admindb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import exp from "constants";
import { console } from "inspector";

export async function createNewDocument() {
  auth.protect();
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const { sessionClaims } = await auth();
  //creating document collection in firestore
  const docCollectionRef = admindb.collection("Documents");
  const docRef = await docCollectionRef.add({
    title: "New Tab",
  });
  await admindb
    //creating user collection in firestore
    .collection("users")
    .doc(sessionClaims?.email!)
    //creating room collection in firestore
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });
  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  console.log("deleteDocument", roomId);

  try {
    //delete document reference itself
    await admindb.collection("Documents").doc(roomId).delete();
    const query = await admindb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = admindb.batch();

    //delete room reference in user collection for every user in the room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    //delete room in liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();

  console.log("inviteUserToDocument", roomId, email);

  try {
    await admindb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.error("Error inviting user to document:", error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  console.log("removeUserFromDocument", roomId, email);

  try {
    await admindb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();
      
    return { success: true };
  } catch (error) {
    console.error("Error removing user from document:", error);
    return { success: false };
  }
}
