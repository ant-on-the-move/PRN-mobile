# Data Management Architecture

This document explains the data management structure implemented in the PRN Mobile app using **TanStack Query (React Query) + Zustand**.

## 🏗️ Architecture Overview

### **Why This Approach?**

- **TanStack Query**: Handles server state (API calls, caching, synchronization)
- **Zustand**: Manages client state (UI state, user preferences)
- **Much lighter than Redux** - no boilerplate, no providers
- **Perfect for React Native** - smaller bundle size, better performance
- **TypeScript-first** - excellent type safety

## 📁 File Structure

```
app/
├── services/
│   └── api.ts                 # Centralized API client with axios
├── types/
│   └── index.ts              # TypeScript interfaces for all data
├── stores/
│   ├── authStore.ts          # Authentication state (Zustand)
│   └── uiStore.ts            # UI state (Zustand)
├── hooks/
│   ├── useAuth.ts            # Authentication operations
│   ├── useTargets.ts         # Targets data management
│   └── useRequests.ts        # Requests data management
└── Provider.tsx              # TanStack Query provider
```

## 🔧 Core Components

### 1. API Service (`services/api.ts`)

Centralized HTTP client with:
- Axios instance with interceptors
- Automatic token management
- Error handling
- API endpoint constants

```typescript
import { apiClient, API_ENDPOINTS } from '../services/api'

// Usage
const response = await apiClient.get(API_ENDPOINTS.TARGETS)
```

### 2. Type Definitions (`types/index.ts`)

Complete TypeScript interfaces for:
- User, Target, Request, Payment, Notification
- API request/response types
- Error handling types

### 3. Zustand Stores

#### Auth Store (`stores/authStore.ts`)
- User authentication state
- Token management
- Persistent storage with AsyncStorage

#### UI Store (`stores/uiStore.ts`)
- Loading states
- Modal management
- Toast notifications
- Navigation state

### 4. Custom Hooks

#### Authentication (`hooks/useAuth.ts`)
```typescript
const { login, register, logout, isLoggingIn } = useAuth()

// Usage
login({ email: 'user@example.com', password: 'password' })
```

#### Targets (`hooks/useTargets.ts`)
```typescript
const { targets, createTarget, updateTarget, deleteTarget, isLoading } = useTargets()

// Usage
createTarget({
  name: 'John Doe',
  profession: 'Actor',
  price: 1000,
  // ... other fields
})
```

#### Requests (`hooks/useRequests.ts`)
```typescript
const { requests, createRequest, updateRequestStatus, isLoading } = useRequests()

// Usage
createRequest({
  targetId: 'target-123',
  amount: 500,
  serviceType: 'Video Call'
})
```

## 🚀 Usage Examples

### In a Component

```typescript
import { useTargets } from '../hooks/useTargets'
import { useUIStore } from '../stores/uiStore'

export default function TargetsScreen() {
  const { targets, isLoading, createTarget } = useTargets()
  const { showToast } = useUIStore()

  const handleCreateTarget = async () => {
    try {
      await createTarget({
        name: 'New Target',
        profession: 'Actor',
        price: 1000,
        // ... other fields
      })
    } catch (error) {
      // Error handling is automatic via the hook
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <FlashList
      data={targets}
      renderItem={({ item }) => <TargetCard target={item} />}
      onRefresh={refetch}
    />
  )
}
```

### Authentication Flow

```typescript
import { useAuth } from '../hooks/useAuth'

export default function LoginScreen() {
  const { login, isLoggingIn } = useAuth()

  const handleLogin = async () => {
    await login({
      email: 'user@example.com',
      password: 'password'
    })
    // Navigation is handled automatically in the hook
  }

  return (
    <Button onPress={handleLogin} disabled={isLoggingIn}>
      {isLoggingIn ? 'Logging in...' : 'Login'}
    </Button>
  )
}
```

## 🔄 Data Flow

1. **Component** calls custom hook (e.g., `useTargets()`)
2. **Hook** uses TanStack Query for server state
3. **Zustand Store** manages client state
4. **API Service** handles HTTP requests
5. **Automatic caching** and synchronization

## 🎯 Benefits

### ✅ Advantages
- **Automatic caching** - Data is cached and synchronized
- **Optimistic updates** - UI updates immediately
- **Error handling** - Centralized error management
- **Loading states** - Built-in loading indicators
- **Type safety** - Full TypeScript support
- **Small bundle size** - Much lighter than Redux
- **Easy testing** - Hooks are easily testable

### 🔧 Features
- **Offline support** - Cached data available offline
- **Background refetching** - Data stays fresh
- **Pagination support** - Built-in pagination handling
- **Real-time updates** - Easy to add WebSocket support
- **DevTools** - React Query DevTools for debugging

## 🛠️ Setup Instructions

1. **Install dependencies**:
```bash
yarn add @tanstack/react-query zustand axios @react-native-async-storage/async-storage
```

2. **Configure Provider** (already done in `Provider.tsx`)

3. **Use in components**:
```typescript
import { useTargets } from '../hooks/useTargets'
```

## 🔮 Future Enhancements

- **WebSocket integration** for real-time updates
- **Offline-first** with background sync
- **Advanced caching** strategies
- **Performance monitoring** and analytics
- **Multi-language support** for error messages

## 📚 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

---

This architecture provides a robust, scalable, and maintainable solution for managing both server and client state in your React Native application. 