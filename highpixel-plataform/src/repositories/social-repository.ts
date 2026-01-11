import api from '@/services/api';

export interface PostMedia {
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
}

export interface PostItem {
  _id: string;
  authorId: string;
  content: string;
  published?: boolean;
  Comments?: any[];
  Likes?: any[];
  isLiked?: boolean;
  createdAt?: string;
  asset?: string;
}

const base = '/v1/social';

export const socialRepository = {
  async getFeed(page = 1, perPage = 20) {
    const { data } = await api.get<{ data: PostItem[]; totalCount: number }>(`${base}/timeline/posts/engineFeedSearch`, {
      params: { page, perPage }
    });

    return data;
  },

  async createPost(content: string, file?: File) {
    const form = new FormData();
    form.append('content', content || '');
    if (file) form.append('asset', file);

    const { data } = await api.post(`${base}/timeline/posts/create`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  },

  async likePost(postId: string, unlike = false) {
    const { data } = await api.patch(`${base}/timeline/posts/like`, { postId, unlike });
    return data;
  },

  async createComment(postId: string, content: string) {
    const { data } = await api.post(`${base}/timeline/posts/comments/create`, { postId, content });
    return data;
  },

  async getProfile(ident: string) {
    const { data } = await api.get(`${base}/profiles/${ident}`);
    return data;
  },
  async searchProfiles(query = '', page = 1, perPage = 5, randomize = true) {
    const { data } = await api.get(`${base}/profile/search`, {
      params: {
        query,
        page,
        per_page: perPage,
        randomize: String(randomize),
      }
    });

    return data;
  },
  async searchPosts(query = '', page = 1, perPage = 20) {
    const { data } = await api.get(`${base}/timeline/posts/search`, {
      params: { query, page, per_page: perPage },
    });

    return data;
  },

  async deletePost(postId: string) {
    const { data } = await api.delete(`${base}/timeline/posts/delete`, {
      data: { postId },
    });

    return data;
  },

  async follow(ident: string) {
    const { data } = await api.put(`${base}/profiles/subscribers/follow`, { ident });
    return data;
  },

  async unfollow(ident: string) {
    const { data } = await api.delete(`${base}/profiles/subscribers/follow`, { data: { ident } });
    return data;
  }
}

export default socialRepository;
