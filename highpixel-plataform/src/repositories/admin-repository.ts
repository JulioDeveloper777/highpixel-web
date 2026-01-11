import { getAPIClient } from "@/services/api";

const api = getAPIClient();

export const adminRepository = {
  async listTrending() {
    const res = await api.get('/v1/admin/trending');
    return res.data;
  },

  async createTrending(payload: { name: string; subtitle?: string; thumbnail?: string; badge?: string }) {
    const res = await api.post('/v1/admin/trending', payload);
    return res.data;
  },

  async deleteTrending(id: string) {
    const res = await api.delete(`/v1/admin/trending/${id}`);
    return res.data;
  },
  async listSuggestions() {
    const res = await api.get('/v1/admin/suggestions');
    return res.data;
  },

  async createSuggestion(payload: { name: string; username?: string; avatar?: string; subtitle?: string; badges?: string }) {
    const res = await api.post('/v1/admin/suggestions', payload);
    return res.data;
  },

  async deleteSuggestion(id: string) {
    const res = await api.delete(`/v1/admin/suggestions/${id}`);
    return res.data;
  },
};

export default adminRepository;
