"use client";

import { PostItem, socialRepository } from "@/repositories/social-repository";
import { useEffect, useState } from "react";
import { CreatePost } from "./create-post";
import { Post } from "./post";
import { socketClient } from '@/services/socket';

const timelinePosts: PostItem[] = [];

// Fetch feed from backend
const useFeed = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);

  const fetch = async () => {
    try {
      const res = await socialRepository.getFeed();
      setPosts(res.data || []);
    } catch (e) {
      console.error("Error fetching feed", e);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await fetch();
      // connect socket and subscribe to new posts
      await socketClient.connect();
      socketClient.on('posts:new', (p: any) => {
        try {
          // prepend new post to feed
          setPosts((prev) => [
            {
              _id: p.id,
              authorId: p.authorId,
              createdAt: p.createdAt,
              content: p.content,
              asset: p.asset,
              Likes: p.Likes || [],
              Comments: p.Comments || [],
            },
            ...prev,
          ]);
        } catch (err) {
          // ignore
        }
      });
    })();

    return () => {
      mounted = false;
      socketClient.off('posts:new');
    };
  }, []);

  return { posts, refresh: fetch };
};

export const TimelineFeed = () => {
  const { posts, refresh } = useFeed();

  return (
    <div className="flex-1 space-y-4">
      <CreatePost onCreated={refresh} />

      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          author={String(post.authorId)}
          handle={`@${String(post.authorId)}`}
          avatar={post.asset || "/avatar.jpg"}
          time={new Date(post.createdAt || "").toLocaleString()}
          content={post.content}
          likes={post.Likes ? post.Likes.length : 0}
          commentsCount={post.Comments ? post.Comments.length : 0}
          comments={post.Comments || []}
          media={post.asset ? [{ type: "image", url: post.asset }] : []}
          verified={false}
          onDeleted={refresh}
        />
      ))}
    </div>
  );
};
