import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, API_ENDPOINTS } from '../services/api'
import { mockApi } from '../services/mockApi'
import { Target, CreateTargetRequest, ApiResponse, PaginatedResponse } from '../types'
import { useToastController } from '@tamagui/toast'

// Query keys for targets
export const targetKeys = {
  all: ['targets'] as const,
  lists: () => [...targetKeys.all, 'list'] as const,
  list: (filters: any) => [...targetKeys.lists(), filters] as const,
  details: () => [...targetKeys.all, 'detail'] as const,
  detail: (id: string) => [...targetKeys.details(), id] as const,
}

export const useTargets = (filters?: any) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  // Get targets list
  const targetsQuery = useQuery({
    queryKey: targetKeys.list(filters),
    queryFn: async (): Promise<Target[]> => {
      // Use mock API for development
      const response = await mockApi.getTargets()
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Get single target
  const useTarget = (id: string) => useQuery({
    queryKey: targetKeys.detail(id),
    queryFn: async (): Promise<Target> => {
      const response = await mockApi.getTarget(id)
      return response.data
    },
    enabled: !!id,
  })

  // Create target mutation
  const createTargetMutation = useMutation({
    mutationFn: async (targetData: CreateTargetRequest): Promise<Target> => {
      const response = await mockApi.createTarget(targetData)
      return response.data
    },
    onSuccess: (newTarget) => {
      // Update the targets list cache
      queryClient.setQueryData(targetKeys.lists(), (oldData: Target[] | undefined) => {
        return oldData ? [newTarget, ...oldData] : [newTarget]
      })
      toast.show('Target created successfully!', {
        theme: 'green',
        duration: 3000
      })
    },
    onError: (error: any) => {
      toast.show(error.message || 'Failed to create target', {
        theme: 'red',
        duration: 3000
      })
    },
  })

  // Update target mutation
  const updateTargetMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateTargetRequest> }): Promise<Target> => {
      // For now, just return the updated data since mock API doesn't have update
      const updatedTarget = { ...data, id } as Target
      return updatedTarget
    },
    onSuccess: (updatedTarget) => {
      // Update both list and detail caches
      queryClient.setQueryData(targetKeys.detail(updatedTarget.id), updatedTarget)
      queryClient.setQueryData(targetKeys.lists(), (oldData: Target[] | undefined) => {
        return oldData?.map(target => 
          target.id === updatedTarget.id ? updatedTarget : target
        ) || [updatedTarget]
      })
      toast.show('Target updated successfully!', {
        theme: 'green',
        duration: 3000
      })
    },
    onError: (error: any) => {
      toast.show(error.message || 'Failed to update target', {
        theme: 'red',
        duration: 3000
      })
    },
  })

  // Delete target mutation
  const deleteTargetMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock delete - just return success
      return Promise.resolve()
    },
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData(targetKeys.lists(), (oldData: Target[] | undefined) => {
        return oldData?.filter(target => target.id !== deletedId) || []
      })
      queryClient.removeQueries({ queryKey: targetKeys.detail(deletedId) })
      toast.show('Target deleted successfully!', {
        theme: 'green',
        duration: 3000
      })
    },
    onError: (error: any) => {
      toast.show(error.message || 'Failed to delete target', {
        theme: 'red',
        duration: 3000
      })
    },
  })

  return {
    // Queries
    targets: targetsQuery.data || [],
    isLoading: targetsQuery.isLoading,
    isError: targetsQuery.isError,
    error: targetsQuery.error,
    refetch: targetsQuery.refetch,
    
    // Mutations
    createTarget: createTargetMutation.mutate,
    updateTarget: updateTargetMutation.mutate,
    deleteTarget: deleteTargetMutation.mutate,
    
    // Mutation states
    isCreating: createTargetMutation.isPending,
    isUpdating: updateTargetMutation.isPending,
    isDeleting: deleteTargetMutation.isPending,
    
    // Individual target hook
    useTarget,
  }
} 

export default useTargets