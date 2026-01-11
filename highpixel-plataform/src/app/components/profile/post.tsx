"use client";

import { Input } from "@heroui/react";
import { Avatar } from "@nextui-org/react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button-nxt";
import Image from "next/image";
import { comment } from "postcss";

interface Comment {
  id: number;
  avatar: string;
  author: string;
  handle: string;
  content: string;
  time: string;
}

interface PostProps {
  avatar: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  commentsCount: number;
  comments?: Comment[];
  verified?: boolean;
}

export const PostFromUserProfile = ({
  author,
  handle,
  avatar,
  time,
  content,
  likes,
  commentsCount,
  comments = [],
  verified = false,
}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="mb-4 rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-4 transition-all hover:border-primary/20">
      <div className="flex-row items-start justify-between pb-2">
        <div className="flex gap-3">
          <div>
            <div className="flex items-center gap-4">
              <Avatar
                src="https://cdn.discordapp.com/avatars/885158216101687307/c223e0f29f44bf1c195f271f254496d3.png?size=2048"
                name="Julio"
                size="lg"
                className="h-10 w-10"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold">{author}</span>
                  <Image src="/verify.png" width={20} height={20} alt="verified" className="ml-1" />
                </div>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2">
        <p className="text-sm text-foreground">{content}</p>
      </div>

      <div className="flex-col items-start gap-3 border-t border-border pt-3">
        <div className="flex w-full items-center gap-4">
          <button
            onClick={handleLike}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-red-600"
          >
            <Heart
              className={`h-4 w-4 transition-all ${liked ? "scale-110 fill-red-600 text-red-600" : "group-hover:scale-110"}`}
            />
            <span className="font-medium">{likeCount}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="font-medium">{commentsCount}</span>
          </button>
        </div>

        {showComments && comments.length > 0 && (
          <div className="w-full h-full space-y-5 border-l-2 border-border mt-5 mb-5 pl-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar src={comments[0]?.avatar} className="h-8 w-8" />
                <div className="flex-1">
                  <div className="mb-3 flex flex-col justify-center items-start">
                    <span className="text-sm font-bold">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground bg-[#26272e] p-3 rounded-md">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showComments && (
          <div className="flex w-full items-start gap-3">
            <Avatar src="/avatar.jpg" className="h-8 w-8" />
            <div className="flex flex-1 items-center gap-2">
              <Input
                type="text"
                placeholder="Adicionar um comentário..."
                classNames={{
                  input:
                    "bg-[#26272e] text-foreground outline-none focus:outline-none placeholder:text-muted-foreground",
                  inputWrapper:
                    "bg-[#26272e] text-foreground outline-none focus:outline-none",
                }}
                radius="sm"
                size="md"
              />
              <Button variant="default" className="bg-transparent hover:bg-zinc-900/60" size="sm">
                😊
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
