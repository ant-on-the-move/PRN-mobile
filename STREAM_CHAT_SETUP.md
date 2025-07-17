# Stream Chat Integration Setup

This guide will help you set up Stream Chat in your React Native app.

## 1. Install Dependencies

First, install the required Stream Chat packages:

```bash
npm install stream-chat stream-chat-react-native
# or
yarn add stream-chat stream-chat-react-native
```

## 2. Get Stream Chat API Key

1. Go to [Stream Chat Dashboard](https://dashboard.getstream.io/)
2. Create a new app or use an existing one
3. Copy your API Key from the dashboard
4. Replace `your_stream_api_key_here` in `app/services/streamChat.ts` with your actual API key

## 3. Backend Token Generation

You need to implement token generation on your backend. Here's an example:

### Node.js/Express Example:
```javascript
const StreamChat = require('stream-chat').StreamChat;

const serverClient = StreamChat.getInstance(
  'your_api_key',
  'your_api_secret'
);

app.post('/api/stream/token', async (req, res) => {
  const { userId } = req.body;
  
  const token = serverClient.createToken(userId);
  
  res.json({ token });
});
```

### Update the token generation in `app/services/streamChat.ts`:
```typescript
async generateUserToken(userId: string): Promise<string> {
  const response = await fetch('YOUR_BACKEND_URL/api/stream/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  const { token } = await response.json();
  return token;
}
```

## 4. User Authentication Integration

Update the mock user in `app/(main)/(tabs)/chat.tsx` with your actual user data:

```typescript
// Replace this with actual user data from your auth system
const actualUser: User = {
  id: 'actual_user_id',
  email: 'user@example.com',
  name: 'Actual User Name',
  avatar: 'https://actual-avatar-url.com',
  // ... other user properties
}
```

## 5. Create Channels

To create a new chat channel, use the `createChannel` function:

```typescript
const { createChannel } = useStreamChat();

const newChannel = await createChannel(
  ['user1_id', 'user2_id'], // member IDs
  {
    name: 'Chat Name', // optional
    image: 'https://channel-image.com' // optional
  }
);
```

## 6. Features Implemented

✅ **Real-time messaging** - Messages are sent and received in real-time
✅ **Channel list** - Shows all user's chat channels
✅ **Message history** - Loads and displays previous messages
✅ **User avatars** - Shows user profile pictures
✅ **Message timestamps** - Shows when messages were sent
✅ **Auto-scroll** - Automatically scrolls to new messages
✅ **Loading states** - Shows loading indicators
✅ **Error handling** - Handles connection and message errors
✅ **Authentication integration** - Works with your existing auth system

## 7. Customization

### Styling
All components use Tamagui for styling. You can customize colors, spacing, and layout by modifying the component files.

### Message Types
Currently supports text messages. To add support for images, files, or other message types, extend the `ChatMessage` component.

### Push Notifications
To add push notifications, you'll need to:
1. Set up push notification certificates
2. Configure Stream Chat push notifications
3. Handle notification taps

## 8. Testing

1. Start your development server
2. Navigate to the Chat tab
3. You should see the chat interface
4. Create test channels to verify functionality

## 9. Production Considerations

- **API Key Security**: Never expose your Stream API secret in the client
- **Token Expiration**: Implement token refresh logic
- **Error Handling**: Add retry logic for failed connections
- **Performance**: Implement message pagination for large chat histories
- **Offline Support**: Consider implementing offline message queuing

## 10. Troubleshooting

### Common Issues:

1. **"Client not initialized"** - Make sure you've set the API key
2. **"Failed to connect"** - Check your internet connection and API key
3. **"Token invalid"** - Verify your backend token generation
4. **Messages not appearing** - Check that users are properly connected

### Debug Mode:
Add this to see detailed logs:
```typescript
// In streamChat.ts
this.client = StreamChat.getInstance(STREAM_API_KEY, {
  timeout: 6000,
  logger: (logLevel, message, extraData) => {
    console.log(`[Stream] ${logLevel}: ${message}`, extraData);
  }
});
```

## Support

For Stream Chat specific issues, refer to the [official documentation](https://getstream.io/chat/docs/). 