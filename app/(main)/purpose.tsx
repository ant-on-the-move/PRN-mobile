import { useMemo, useState } from "react";
import { Button, Input, Text, View, XStack, YStack, Image, Select, SelectProps, Adapt, Sheet, getFontSize, FontSizeTokens, TextArea } from "tamagui";
import { Star, X, User2, ChevronDown, ChevronUp, Check } from '@tamagui/lucide-icons';
import { StyleSheet } from "react-native";
import { LinearGradient } from '@tamagui/linear-gradient'
import { useRouter } from "expo-router";

const purposes = ["Product", "Sales", "Business", "Marketing", "Demo"];

export default function Purpose() {
    const [selectedPurpose, setSelectedPurpose] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    return (
        <YStack style={styles.container}>
            {/* Header */}
            <XStack style={styles.headerContainer}>
                <Text fontSize={20} fontWeight="bold">Purpose of connection</Text>
                <Button chromeless>
                    <X size={24} />
                </Button>
            </XStack>

            {/* User 1 */}
            <XStack style={styles.catalystContainer}>
                <XStack style={{alignItems: "center", gap: 10}}>
                    <Image source={{ uri: "https://i.pravatar.cc/40?img=6" }} width={40} height={40} borderRadius={20} />
                    <Text fontWeight="bold" fontSize={16}>George RR Martin</Text>
                </XStack>
                <XStack style={styles.starContainer}>
                    <Star size={16} color="#FFD700" />
                    <Text fontSize={12} color="#666">4.8 (5)</Text>
                </XStack>
            </XStack>

            {/* User 2 */}
            <XStack style={styles.userContainer}>
                <Image source={{ uri: "https://i.pravatar.cc/50?img=47" }} width={40} height={40} borderRadius={20} />
                <Text fontWeight="bold" fontSize={16}>Emilia Clarke</Text>
            </XStack>

            {/* Tags */}
            <XStack flexWrap="wrap" gap={8}>
                {["#Actor", "#Model", "#Theater", "#Game of thrones", "#Movies"].map(tag => (
                    <View
                        key={tag}
                        style={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            marginBottom: 4,
                        }}
                    >
                        <Text fontSize={12} color="#666">{tag}</Text>
                    </View>
                ))}
            </XStack>

            {/* Video Call */}
            <XStack style={styles.videoCallContainer}>
                <User2 size={18} color="#666" />
                <Text color="#666">Video Call</Text>
            </XStack>

            {/* Purpose Select */}
            <SelectDemoItem id="select-demo-1" />

            {/* Message */}
            <TextArea
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
                style={styles.messageContainer}
            />

            {/* Pay & Continue */}
            <XStack style={styles.payContainer}>
                <Button onPress={() => router.push("/transaction")} style={{ backgroundColor: "#007AFF", borderRadius: 8, paddingHorizontal: 24 }}>
                    <Text color="white" fontWeight="bold">Pay & continue</Text>
                </Button>
                <Text fontWeight="bold" fontSize={18}>$12k</Text>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    userContainer: {
        alignItems: "center",
        gap: 10,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    starContainer: {
        alignItems: "center",
        gap: 4,
    },
    tagsContainer: {
        alignItems: "center",
        gap: 10,
    },
    videoCallContainer: {
        alignItems: "center",
        gap: 8,
    },
    payContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 16,
        gap: 10,
    },
    messageContainer: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        minHeight: 180,
        marginTop: 8,
        padding: 0,
    },

    catalystContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

})


export function SelectDemoItem(props: SelectProps & { trigger?: React.ReactNode }) {
    const [val, setVal] = useState('')
  
    return (
      <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
        {props?.trigger || (
          <Select.Trigger iconAfter={ChevronDown}>
            <Select.Value placeholder="Something....." />
          </Select.Trigger>
        )}
  
        <Adapt when="maxMd" platform="touch">
          <Sheet native={!!props.native} modal dismissOnSnapToBottom animation="medium">
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
  
        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              height: 24, // or whatever value $3 resolves to, e.g., 24
            }}
          >
            <YStack style={{ zIndex: 10 }}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              style={{ borderRadius: 4 }}
            />
          </Select.ScrollUpButton>
  
          <Select.Viewport
            style={{ minWidth: 200 }}
          >
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.name}
                        value={item.name.toLowerCase()}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }),
                [items]
              )}
            </Select.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <YStack
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32, // or whatever $4 resolves to
                  pointerEvents: 'none',
                }}
              >
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                />
              </YStack>
            )}
          </Select.Viewport>
  
          <Select.ScrollDownButton
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              height: 24, // or whatever $3 resolves to
            }}
          >
            <YStack style={{ zIndex: 10 }}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              style={{ borderRadius: 4 }}
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    )
  }
  
  const items = [
    { name: 'Apple' },
    { name: 'Pear' },
    { name: 'Blackberry' },
    { name: 'Peach' },
    { name: 'Apricot' },
    { name: 'Melon' },
    { name: 'Honeydew' },
  ]