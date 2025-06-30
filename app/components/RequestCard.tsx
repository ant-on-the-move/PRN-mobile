import { Avatar, Button, Image, Separator, Text, XStack, YStack } from 'tamagui'
import { Bookmark, MoreHorizontal, MoreVertical, Share } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'

const MOCK_TAGS = ['Actor', 'Model', 'Theater']

export function RequestCard() {
    return (
        <YStack style={styles.cardContainer}>
            <XStack style={styles.headerContainer}>
                <XStack style={styles.avatarContainer}>
                    <Avatar circular size="$4">
                        <Avatar.Image src="https://i.pravatar.cc/150?u=george" />
                    </Avatar>
                    <Text fontWeight="bold" fontSize="$4">George RR Martin</Text>
                </XStack>
                <XStack style={styles.ratingContainer}>
                    <Text>⭐ 4.8 (5)</Text>
                    <Button size="$1" chromeless icon={<Share size="$1" />} style={{ padding: 0 }} />
                    <Button size="$1" chromeless icon={<Bookmark size="$1" />} style={{ padding: 0 }} />
                    <Button size="$1" chromeless icon={<MoreVertical size="$1" />} style={{ padding: 0 }} />
                </XStack>
            </XStack>
            <Separator style={{ marginVertical: 10 }} />
            <YStack style={styles.personContainer}>
                <XStack style={styles.personHeader}>
                    <Avatar circular size="$3">
                        <Avatar.Image src="https://i.pravatar.cc/150?u=bradpitt" />
                    </Avatar>
                    <Text fontWeight="bold">Emilia Clarke</Text>
                    <XStack style={styles.tagsContainer}>
                        {MOCK_TAGS.map(tag => (
                            <Button key={tag} size="$2" disabled>#{tag}</Button>
                        ))}
                    </XStack>
                </XStack>
                <Image source={require("../../assets/images/image 1.png")} style={styles.cardImage}/>
                <Text style={styles.descriptionText}>
                    I have known Emilia Clarke from days of game of thrones from 2010 to 2018. He played john snow in game of thrones which was produced by HBO studios. great guy good to work with
                </Text>
                <XStack style={styles.footerContainer}>
                    <XStack style={styles.footerTextContainer}>
                        <Text fontSize="$5" fontWeight="bold">$12k</Text>
                        <Text color="#616B80" fontSize="$2">Video Call · 2d ago</Text>
                    </XStack>
                    <Button size="$3" bg="#0077FF" color="white">Invite</Button>
                </XStack>
            </YStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        margin: 'auto',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        padding: 16,
    },
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    actionButtons: {
        justifyContent: 'flex-end',
        gap: 8
    },
    personContainer: {
        gap: 12
    },
    personHeader: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
    },
    tagsContainer: {
        gap: 8,
        flexWrap: 'wrap'
    },
    footerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descriptionText: {
        color: '#616B80',
        fontSize: 14,
        lineHeight: 20
    },
    ratingContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5
    },
    footerTextContainer: {
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        width: 203,
        height: 147,
        borderRadius: 8,
        marginBottom: 8
    }
}) 