"use client";

import { Post } from "@/app/components/timeline/post";
import { useAuth } from "@/hooks/use-auth";
import { socialRepository } from "@/repositories/social-repository";
import { Button } from "@heroui/react";
import { Info, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";
  const [profile, setProfile] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth.getState().user;

  const fetchProfile = async () => {
    try {
      const res = await socialRepository.getProfile(slug);
      setProfile(res);
    } catch (e) {
      console.error("Error loading profile", e);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await socialRepository.searchPosts("", 1, 50);
      // filter posts by authorId matching profile.userid when profile loaded
      const all = res.data || [];
      const filtered = profile
        ? all.filter((p: any) => String(p.authorId) === String(profile.userid))
        : [];
      setPosts(filtered);
    } catch (e) {
      console.error("Error loading posts", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!profile) return;
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const toggleFollow = async () => {
    if (!profile) return;
    try {
      if (profile.isFollowing) await socialRepository.unfollow(profile.slug);
      else await socialRepository.follow(profile.slug);
      // refresh profile to update isFollowing/followers
      await fetchProfile();
    } catch (e) {
      console.error("Follow toggle error", e);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0b0b0b] text-white">
      <header className="flex w-full items-center justify-between border-b border-[#1e1e1e] bg-[#111] px-8 py-4">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-bold">
            <span className="text-white">rocket</span>
            <span className="text-[#6b6bff]">community</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-300">{currentUser?.name || ""}</p>
          <Image
            src={currentUser?.avatarUrl || "/avatar.jpg"}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </header>

      <div className="relative h-52 w-full overflow-hidden md:h-64">
        <Image
          src={profile?.banner || "/banner.png"}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-[-60px] flex flex-col gap-6 px-6 md:flex-row">
        <aside className="flex w-full flex-shrink-0 flex-col gap-4 md:w-72">
          <div className="relative rounded-2xl bg-[#151515] p-5 text-center">
            <div className="absolute right-3 top-3 cursor-pointer">✏️</div>
            <Image
              src={profile?.avatar || "/avatar.jpg"}
              alt="Avatar"
              width={80}
              height={80}
              className="mx-auto rounded-full border-4 border-[#1a1a1a]"
            />
            <h2 className="mt-3 text-lg font-semibold">
              {profile?.username || profile?.name || "Usuário"}
            </h2>
            <p className="text-sm text-gray-400">
              {profile?.nickname || profile?.slug}
            </p>
            <p className="mt-3 text-sm text-gray-300">{profile?.bio}</p>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
              <MapPin size={14} /> {profile?.region_city || ""}
            </div>

            <div className="mt-4 border-t border-[#222] pt-3 text-xs text-gray-500">
              SINCE:{" "}
              {new Date(profile?.createdAt || Date.now()).toLocaleDateString()}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                onClick={toggleFollow}
                variant={profile?.isFollowing ? "flat" : "bordered"}
              >
                {profile?.isFollowing ? "Seguindo" : "Seguir"}
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#151515] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">Insígnias</h3>
              <Info size={14} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">
              {profile?.badges?.length
                ? `${profile.badges.length} insígnias`
                : "Este usuário ainda não possui insígnias."}
            </p>
          </div>
        </aside>

        <section className="flex flex-1 flex-col gap-6">
          <div className="flex gap-6 border-b border-[#222]">
            <button className="pb-2 text-gray-400 hover:text-white">
              Detalhes
            </button>
            <button className="border-b-2 border-[#6b6bff] pb-2 text-white">
              Timeline
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {loading && (
              <div className="text-sm text-gray-400">Carregando posts...</div>
            )}
            {!loading && posts.length === 0 && (
              <div className="text-sm text-gray-400">
                Nenhum post encontrado.
              </div>
            )}
            {posts.map((p) => (
              <Post
                key={p._id}
                id={p._id}
                author={String(p.authorId)}
                handle={`@${String(p.authorId)}`}
                avatar={p.asset || "/avatar.jpg"}
                time={new Date(p.createdAt || "").toLocaleString()}
                content={p.content}
                likes={p.Likes ? p.Likes.length : 0}
                commentsCount={p.Comments ? p.Comments.length : 0}
                comments={p.Comments || []}
                media={p.asset ? [{ type: "image", url: p.asset }] : []}
                verified={false}
                onDeleted={fetchPosts}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
