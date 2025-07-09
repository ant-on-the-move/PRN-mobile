import { Toast, useToastState } from "@tamagui/toast"
import { StyleSheet } from "react-native"
import { Image, Text, XStack, YStack } from "tamagui"
import { CheckCircle, AlertCircle, Info, XCircle } from '@tamagui/lucide-icons'

export default function ToastComponent() {
    const currentToast = useToastState()
  
    if (!currentToast || currentToast.isHandledNatively) return null

    // Get theme-based styling
    const getThemeStyle = () => {
        switch (currentToast.theme) {
            case 'red':
                return {
                    backgroundColor: '#FEF2F2',
                    borderColor: '#FECACA',
                    icon: <XCircle size={20} color="#DC2626" />,
                    textColor: '#DC2626'
                }
            case 'green':
                return {
                    backgroundColor: '#FFFFFF',
                    borderColor: '#BBF7D0',
                    icon: <Image source={require('../../assets/images/Vector.png')} style={{ width: 20, height: 20 }} />,
                    textColor: '#000000'
                }
            case 'yellow':
                return {
                    backgroundColor: '#FFFBEB',
                    borderColor: '#FED7AA',
                    icon: <AlertCircle size={20} color="#D97706" />,
                    textColor: '#D97706'
                }
            case 'blue':
                return {
                    backgroundColor: '#EFF6FF',
                    borderColor: '#BFDBFE',
                    icon: <Info size={20} color="#2563EB" />,
                    textColor: '#2563EB'
                }
            default:
                return {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                    icon: <Info size={20} color="#64748B" />,
                    textColor: '#64748B'
                }
        }
    }

    const themeStyle = getThemeStyle()
  
    return (
      <Toast
        key={currentToast.id}
        duration={currentToast.duration}
        viewportName={currentToast.viewportName}
        enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
        exitStyle={{ opacity: 0, scale: 1, y: -20 }}
        theme={currentToast.theme}
        rounded="$6"
        animation="quick"
        style={[styles.toast, {
            backgroundColor: themeStyle.backgroundColor,
            borderColor: themeStyle.borderColor,
            borderWidth: 1,
        }]}
      >
        <YStack items="center" p="$3" gap="$2">
          <Toast.Title fontWeight="bold">
            <XStack style={styles.toastTitle}>
                {themeStyle.icon}
                <Text 
                    fontSize="$2" 
                    fontWeight="bold" 
                    style={[styles.toastTitleText, { color: themeStyle.textColor }]}
                >
                    {currentToast.title}
                </Text>
            </XStack>         
          </Toast.Title>
          {!!currentToast.message && (
            <Toast.Description style={{ color: themeStyle.textColor }}>
                {currentToast.message}
            </Toast.Description>
          )}
        </YStack>
      </Toast>
    )
}

const styles = StyleSheet.create({
    toast: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    toastTitle: {
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    toastTitleText: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 14,
    },
})