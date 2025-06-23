import { Activity } from "@tamagui/lucide-icons";
import { StyleSheet } from "react-native";
import { Button, YStack, Text, Image } from "tamagui";

export function PrimaryButtonComponent({ name, ...props }) {
    const styles = StyleSheet.create({
        buttonStyle: {
            height: 48,
            borderRadius: 8,
            paddingTop: 8,
            paddingRight: 16,
            paddingBottom: 8,
            paddingLeft: 16,
            backgroundColor: '#0077FF',
        },
        nameStyle: {
            color: '#ffffff',
            fontFamily: 'Nunito',
            fontWeight: '900',
            fontSize: 16,
            lineHeight: 19.2
        }
    })
    return (
        <YStack>
            <Button style={styles.buttonStyle} {...props}>
                <Text style={styles.nameStyle} >
                    {name}
                </Text>
            </Button>
        </YStack>
    )
}

export function OutlinedButtonComponent({ name, ...props }) {
    const styles = StyleSheet.create({
        buttonStyle: {
            height: 48,
            borderRadius: 8,
            paddingTop: 8,
            paddingRight: 16,
            paddingBottom: 8,
            paddingLeft: 16,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#0077FF',
        },
        nameStyle: {
            color: '#0077FF',
            fontFamily: 'Nunito',
            fontWeight: '900',
            fontSize: 16,
            lineHeight: 19.2,
        },
    })
    return (
        <YStack>
            <Button style={styles.buttonStyle} {...props}>
                <Text style={styles.nameStyle}>{name}</Text>
            </Button>
        </YStack>
    )
}

export function GoogleButtonComponent({ }) {
    const styles = StyleSheet.create({
        googleButtonStyle: {
            height: 48,
            borderRadius: 8,
            paddingTop: 8,
            paddingRight: 16,
            paddingBottom: 8,
            paddingLeft: 16,
            borderWidth: 1,
            borderColor: '#616B80',
            backgroundColor: '#ffffff'
        },
        nameStyle: {
            fontFamily: 'Nunito',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: 16.8

        }
    })
    return (
        <YStack>
            <Button
                style={styles.googleButtonStyle}
                icon={<Image source={require("../../assets/images/social media logo (2).png")} />}>
                <Text style={styles.nameStyle} >Signup with Google</Text>
            </Button>
        </YStack>
    )
}

