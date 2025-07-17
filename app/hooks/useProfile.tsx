import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS, apiClient } from "app/services/api"

export const getProfileById = async (userId: number) => {
  const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE(userId))
  return response.data
}
