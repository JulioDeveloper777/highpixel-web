"use client";

import { useAuth } from "@/hooks/use-auth";
import { socialRepository } from "@/repositories/social-repository";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  handle: string;
  avatar?: string;
  content: string;
  time: string;
}

interface MediaItem {
  type: "image" | "video" | "audio" | "file";
  url: string;
  thumbnail?: string;
  filename?: string;
}

interface PostProps {
  id?: string;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  commentsCount: number;
  comments?: Comment[];
  verified?: boolean;
  media?: MediaItem[];
  onDeleted?: () => void;
}

export const Post = ({
  id,
  author,
  handle,
  avatar,
  time,
  content,
  likes,
  commentsCount,
  comments = [],
  verified = false,
  media = [],
  onDeleted,
}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);

    try {
      if (id) await socialRepository.likePost(id, !liked);
    } catch (e) {
      console.error("Like error", e);
    }
  };

  const [newComment, setNewComment] = useState("");

  const submitComment = async () => {
    if (!newComment.trim()) return;
    try {
      if (id) await socialRepository.createComment(id, newComment.trim());
      setNewComment("");
    } catch (e) {
      console.error("Comment error", e);
    }
  };

  const isValidImageUrl = (url: string) => {
    return Boolean(
      url &&
        typeof url === "string" &&
        url.trim().length > 0 &&
        (url.startsWith("http://") ||
          url.startsWith("https://") ||
          url.startsWith("/")),
    );
  };

  const currentUser = useAuth.getState().user;

  const handleDelete = async () => {
    if (!id) return;
    try {
      await socialRepository.deletePost(id);
      if (onDeleted) onDeleted();
    } catch (e) {
      console.error("Delete post error", e);
    }
  };

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] transition-all hover:border-primary/20">
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex gap-3">
          <Image
            src={avatar}
            alt={author}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-white">{author}</span>
              {verified && (
                <Image
                  src="/verify.png"
                  width={20}
                  height={20}
                  alt="verified"
                  className="h-5 w-5"
                />
              )}
            </div>
            <span className="text-xs text-gray-400">
              {handle} · {time}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {currentUser && String(currentUser.id) === String(author) && (
            <button
              onClick={handleDelete}
              title="Deletar"
              className="rounded bg-red-600 px-2 py-1 text-xs hover:brightness-90"
            >
              Deletar
            </button>
          )}
          <button className="rounded-lg p-2 transition-colors hover:bg-[#2a2a2a]">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-sm text-gray-200">{content}</p>

        {media.length > 0 && (
          <div className="mt-3">
            {/* Uma imagem */}
            {media.length === 1 &&
              media[0].type === "image" &&
              isValidImageUrl(media[0].url) && (
                <Image
                  src={media[0].url}
                  alt="Post media"
                  width={800}
                  height={600}
                  className="max-h-96 w-full rounded-lg object-cover"
                  unoptimized={media[0].url.includes("unsplash.com")}
                />
              )}

            {/* Múltiplas imagens */}
            {media.length > 1 && media.every((m) => m.type === "image") && (
              <div className="grid gap-2">
                {/* 2 imagens */}
                {media.length === 2 && (
                  <div className="grid grid-cols-2 gap-2">
                    {media
                      .filter((item) => isValidImageUrl(item.url))
                      .map((item, index) => (
                        <Image
                          key={index}
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          width={400}
                          height={256}
                          className="h-64 w-full rounded-lg object-cover"
                          unoptimized={item.url.includes("unsplash.com")}
                        />
                      ))}
                  </div>
                )}

                {/* 3 imagens */}
                {media.length === 3 && (
                  <div className="grid grid-cols-3 gap-2">
                    {media
                      .filter((item) => isValidImageUrl(item.url))
                      .map((item, index) => (
                        <Image
                          key={index}
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          width={300}
                          height={192}
                          className="h-48 w-full rounded-lg object-cover"
                          unoptimized={item.url.includes("unsplash.com")}
                        />
                      ))}
                  </div>
                )}

                {/* 4 imagens */}
                {media.length === 4 && (
                  <div className="grid grid-cols-2 gap-2">
                    {media
                      .filter((item) => isValidImageUrl(item.url))
                      .map((item, index) => (
                        <Image
                          key={index}
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          width={400}
                          height={192}
                          className="h-48 w-full rounded-lg object-cover"
                          unoptimized={item.url.includes("unsplash.com")}
                        />
                      ))}
                  </div>
                )}

                {/* 5 imagens */}
                {media.length === 5 && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {media
                        .slice(0, 2)
                        .filter((item) => isValidImageUrl(item.url))
                        .map((item, index) => (
                          <Image
                            key={index}
                            src={item.url}
                            alt={`Media ${index + 1}`}
                            width={400}
                            height={192}
                            className="h-48 w-full rounded-lg object-cover"
                            unoptimized={item.url.includes("unsplash.com")}
                          />
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {media
                        .slice(2, 5)
                        .filter((item) => isValidImageUrl(item.url))
                        .map((item, index) => (
                          <Image
                            key={index + 2}
                            src={item.url}
                            alt={`Media ${index + 3}`}
                            width={300}
                            height={128}
                            className="h-32 w-full rounded-lg object-cover"
                            unoptimized={item.url.includes("unsplash.com")}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Vídeo */}
            {media[0].type === "video" && (
              <video
                controls
                className="max-h-96 w-full rounded-lg"
                src={media[0].url}
              >
                Seu navegador não suporta vídeo.
              </video>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-3 border-t border-[#2a2a2a] px-4 pb-4 pt-3">
        <div className="flex w-full items-center gap-4">
          <button
            onClick={() => {
              handleLike();
            }}
            className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-600"
          >
            <Heart
              className={`h-4 w-4 transition-all ${liked ? "scale-110 fill-red-600 text-red-600" : "group-hover:scale-110"}`}
            />
            <span className="font-medium">{likeCount}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-600"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="font-medium">{commentsCount}</span>
          </button>
        </div>

        {/* Comentários existentes */}
        {showComments && comments.length > 0 && (
          <div className="w-full space-y-4 border-l-2 border-[#2a2a2a] pl-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Image
                  src={comment.avatar || avatar}
                  alt={comment.author}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input para novo comentário */}
        {showComments && (
          <div className="flex w-full items-start gap-3">
            <Image
              src={avatar}
              alt={author}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="flex flex-1 items-center gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitComment();
                }}
                type="text"
                placeholder="Adicionar um comentário..."
                className="flex-1 rounded-lg bg-[#26262f] px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-600"
              />
              <button
                onClick={submitComment}
                className="rounded-lg p-2 transition-colors hover:bg-[#2a2a2a]"
              >
                😊
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
