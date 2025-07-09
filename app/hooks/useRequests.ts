import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, API_ENDPOINTS } from '../services/api'
import { Request, CreateRequestRequest, ApiResponse } from '../types'
import { useUIStore } from '../stores/uiStore'

// Query keys for requests
export const requestKeys = {
  all: ['requests'] as const,
  lists: () => [...requestKeys.all, 'list'] as const,
  list: (filters: any) => [...requestKeys.lists(), filters] as const,
  details: () => [...requestKeys.all, 'detail'] as const,
  detail: (id: string) => [...requestKeys.details(), id] as const,
}

export const useRequests = (filters?: any) => {
  const { showToast } = useUIStore()
  const queryClient = useQueryClient()

  // Get requests list
  const requestsQuery = useQuery({
    queryKey: requestKeys.list(filters),
    queryFn: async (): Promise<Request[]> => {
      const response = await apiClient.get<ApiResponse<Request[]>>(API_ENDPOINTS.REQUESTS, {
        params: filters,
      })
      return response.data.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (requests change more frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  })

  // Get single request
  const useRequest = (id: string) => useQuery({
    queryKey: requestKeys.detail(id),
    queryFn: async (): Promise<Request> => {
      const response = await apiClient.get<ApiResponse<Request>>(API_ENDPOINTS.REQUEST_DETAILS(id))
      return response.data.data
    },
    enabled: !!id,
  })

  // Create request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (requestData: CreateRequestRequest): Promise<Request> => {
      const response = await apiClient.post<ApiResponse<Request>>(
        API_ENDPOINTS.CREATE_REQUEST,
        requestData
      )
      return response.data.data
    },
    onSuccess: (newRequest) => {
      // Update the requests list cache
      queryClient.setQueryData(requestKeys.lists(), (oldData: Request[] | undefined) => {
        return oldData ? [newRequest, ...oldData] : [newRequest]
      })
      showToast('Request created successfully!', 'success')
    },
    onError: (error: any) => {
      showToast(error.response?.data?.message || 'Failed to create request', 'error')
    },
  })

  // Update request status mutation
  const updateRequestStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Request['status'] }): Promise<Request> => {
      const response = await apiClient.patch<ApiResponse<Request>>(
        API_ENDPOINTS.UPDATE_REQUEST(id),
        { status }
      )
      return response.data.data
    },
    onSuccess: (updatedRequest) => {
      // Update both list and detail caches
      queryClient.setQueryData(requestKeys.detail(updatedRequest.id), updatedRequest)
      queryClient.setQueryData(requestKeys.lists(), (oldData: Request[] | undefined) => {
        return oldData?.map(request => 
          request.id === updatedRequest.id ? updatedRequest : request
        ) || [updatedRequest]
      })
      showToast('Request status updated!', 'success')
    },
    onError: (error: any) => {
      showToast(error.response?.data?.message || 'Failed to update request', 'error')
    },
  })

  // Delete request mutation
  const deleteRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.DELETE_REQUEST(id))
    },
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData(requestKeys.lists(), (oldData: Request[] | undefined) => {
        return oldData?.filter(request => request.id !== deletedId) || []
      })
      queryClient.removeQueries({ queryKey: requestKeys.detail(deletedId) })
      showToast('Request deleted successfully!', 'success')
    },
    onError: (error: any) => {
      showToast(error.response?.data?.message || 'Failed to delete request', 'error')
    },
  })

  return {
    // Queries
    requests: requestsQuery.data || [],
    isLoading: requestsQuery.isLoading,
    isError: requestsQuery.isError,
    error: requestsQuery.error,
    refetch: requestsQuery.refetch,
    
    // Mutations
    createRequest: createRequestMutation.mutate,
    updateRequestStatus: updateRequestStatusMutation.mutate,
    deleteRequest: deleteRequestMutation.mutate,
    
    // Mutation states
    isCreating: createRequestMutation.isPending,
    isUpdating: updateRequestStatusMutation.isPending,
    isDeleting: deleteRequestMutation.isPending,
    
    // Individual request hook
    useRequest,
  }
} 

export default useRequests