import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export interface PostType {
  id: string;
  username?: string;
  content?: string;
  text?: string;
  timestamp?: any;
}

export function usePosts() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, "id">),
      }));
      setPosts(snapshotDocs);
    });

    return unsubscribe;
  }, []);

  return posts;
}
