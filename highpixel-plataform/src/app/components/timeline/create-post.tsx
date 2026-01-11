/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useAuth } from "@/hooks/use-auth";
import { socialRepository } from "@/repositories/social-repository";
import { Avatar, Button } from "@heroui/react";
import { Image } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onCreated?: () => void;
}

// Mirror of backend uploadConfig.post for client-side validation
const uploadConfigPost = {
  default: {
    mimeTypes: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "video/mp4": "mp4",
      "video/avi": "avi",
      "video/mkv": "mkv",
    },
    limits: {
      "image/jpeg": 5242880,
      "image/png": 5242880,
      "image/gif": 5242880,
      "video/mp4": 26214400,
      "video/avi": 26214400,
      "video/mkv": 26214400,
    },
  },
  premium: {
    mimeTypes: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "video/mp4": "mp4",
      "video/avi": "avi",
      "video/mkv": "mkv",
    },
    limits: {
      "image/jpeg": 10485760,
      "image/png": 10485760,
      "image/gif": 10485760,
      "video/mp4": 52428800,
      "video/avi": 52428800,
      "video/mkv": 52428800,
    },
  },
};

export const CreatePost = ({ onCreated }: Props) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth.getState().user;

  const isUserPremium = (user: any) => {
    if (!user) return false;
    if (typeof user.isPremium === "boolean") return user.isPremium;
    if (user.stripeSubscriptionStatus)
      return String(user.stripeSubscriptionStatus).toLowerCase() === "active";
    if (Array.isArray(user.features)) return user.features.includes("premium");
    return false;
  };

  const validateFile = (f?: File) => {
    if (!f) return { ok: true };

    const isPremium = isUserPremium(currentUser);
    const cfg = isPremium ? uploadConfigPost.premium : uploadConfigPost.default;

    const mime = f.type;
    if (!Object.prototype.hasOwnProperty.call(cfg.mimeTypes, mime)) {
      return { ok: false, reason: `Tipo de arquivo não permitido: ${mime}` };
    }

    const max = (cfg.limits as Record<string, number>)[mime];
    if (typeof max === "undefined")
      return {
        ok: false,
        reason: "Tipo de arquivo não possui limite configurado",
      };

    if (f.size > max) {
      return {
        ok: false,
        reason: `Arquivo muito grande. Máximo: ${Math.round(max / (1024 * 1024))} MB`,
      };
    }

    return { ok: true };
  };

  const submit = async () => {
    if (!content && !file) {
      toast.error("Digite algo ou anexe um arquivo antes de publicar.");
      return;
    }

    const v = validateFile(file);
    if (!v.ok) {
      toast.error(v.reason || "Arquivo inválido");
      return;
    }

    setLoading(true);
    try {
      await socialRepository.createPost(content, file);
      setContent("");
      setFile(undefined);
      toast.success("Post publicado com sucesso");
      if (onCreated) onCreated();
    } catch (err: any) {
      console.error("Create post error", err);
      const msg = err?.response?.data?.message || "Erro ao publicar o post";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-4 transition-all hover:border-primary/30">
      <div className="flex items-start gap-3">
        <Avatar
          src={
            (currentUser as any)?.avatar ||
            currentUser?.avatarUrl ||
            "/avatar.jpg"
          }
        />
        <div className="relative flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="No que você está pensando?"
            className="w-full resize-none rounded-lg bg-secondary p-3 text-sm text-white outline-none"
            rows={3}
          />

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                <Image className="h-5 w-5" />
                <span>Anexar</span>
              </label>
              {file && (
                <span className="text-xs text-gray-400">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={submit} disabled={loading}>
                {loading ? "Enviando..." : "Publicar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
