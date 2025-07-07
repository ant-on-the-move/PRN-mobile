import { Adapt, Avatar, Button, Popover, PopoverProps, Separator, Text, XStack, YStack, AlertDialog } from 'tamagui'
import { Bookmark, Info, MoreHorizontal, MoreVertical, Share } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useToastController } from '@tamagui/toast'

const MOCK_TAGS = ['Actor', 'Model', 'Theater']
const MODAL_TAGS = ['Delete', 'Hide', 'Report Issue']

export function ProfileCard({ shouldAdapt = true, ...props }: PopoverProps & { shouldAdapt?: boolean }) {
    const router = useRouter()
    const toast = useToastController()
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <>
        <YStack style={styles.cardContainer}>
            <XStack style={styles.headerContainer}>
                <XStack style={styles.avatarContainer}>
                    <Avatar circular size={32}>
                        <Avatar.Image src='https://randomuser.me/api/portraits/men/10.jpg' />
                    </Avatar>
                    <Text fontWeight="bold" fontSize="$4">George RR Martin</Text>
                </XStack>
                <XStack style={styles.ratingContainer}>
                    <Text>⭐ 4.8 (5)</Text>
                    <Button size="$1" chromeless icon={<Share size="$1" />} style={{ padding: 0 }} />
                    <Button size="$1" chromeless icon={<Bookmark size="$1" />} style={{ padding: 0 }} />
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <Popover.Trigger asChild>
                            <Button size="$1" chromeless icon={<MoreVertical size="$1" />} style={{ padding: 0 }} />
                        </Popover.Trigger>
                        <Popover.Content
                            style={{ minWidth: 140, padding: 0, borderRadius: 8, borderWidth: 1, borderColor: '#E5E5E5', backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, marginRight: 24 }}
                        >
                            <YStack>
                                <Button 
                                    chromeless
                                    style={{ justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', borderRadius: 0 }}
                                    onPress={() => { 
                                        setPopoverOpen(false); 
                                        setDialogOpen(true);                                         
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    chromeless
                                    style={{ justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', borderRadius: 0 }}
                                    onPress={() => { 
                                        setPopoverOpen(false);
                                        toast.show('Target Hidden!', {
                                            theme: 'green',
                                            duration: 3000
                                        })   
                                    }}
                                >
                                    Hide
                                </Button>
                                <Button
                                    chromeless
                                    style={{ justifyContent: 'flex-start', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 0 }}
                                    onPress={() => { 
                                        setPopoverOpen(false);
                                        toast.show('Issue Reported!', {
                                            theme: 'red',
                                            duration: 4000,
                                            message: 'We will review this issue within 24 hours.'
                                        });
                                    }}
                                >
                                    Report Issue
                                </Button>
                            </YStack>
                        </Popover.Content>
                    </Popover>
                </XStack>
            </XStack>
            <YStack style={styles.personContainer}>
                <XStack style={styles.personHeader} mt={5}>
                    <XStack style={styles.tagsContainer}>
                        {MOCK_TAGS.map(tag => (
                            <Button key={tag} size="$2" disabled>#{tag}</Button>
                        ))}
                    </XStack>
                </XStack>
                <Text style={styles.descriptionText}>
                    I have known Emilia Clarke from days of game of thrones from 2010 to 2018. He played john snow in game of thrones which was produced by HBO studios. great guy good to work with
                </Text>
                <XStack style={styles.footerContainer}>
                    <Button onPress={() => {} } size="$3" bg="#0077FF" color="white">Edit</Button>
                    <XStack style={styles.footerTextContainer}>
                        <Text fontSize="$5" fontWeight="bold">$12k</Text>
                        <Text color="#616B80" fontSize="$2">Video Call · 2d ago</Text>
                    </XStack>
                </XStack>
            </YStack>
        </YStack>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
                <AlertDialog.Content style={{ backgroundColor: 'white', borderRadius: 12, padding: 24, width: 340, maxWidth: '90%' }}>
                    <AlertDialog.Title style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                        Are you sure you want to delete this target?
                    </AlertDialog.Title>
                    <XStack style={{ alignItems: 'center', gap: 12, marginBottom: 12 }} >
                        <Avatar circular size={40}>
                            <Avatar.Image src="https://i.pravatar.cc/150?u=emilia" />
                        </Avatar>
                        <YStack>
                            <Text fontWeight="bold" fontSize={16}>Emilia Clarke</Text>
                            <XStack gap={4} mt={2}>
                                {MODAL_TAGS.map(tag => (
                                    <Button key={tag} size="$2" disabled>#{tag}</Button>
                                ))}
                            </XStack>
                        </YStack>
                    </XStack>
                    <XStack gap={12} mt={8}>
                        <AlertDialog.Action asChild key="delete">
                            <Button bg="#F35B5B" color="white" flex={1} onPress={() => { setDialogOpen(false); toast.show('Target Deleted!', { theme: 'red', duration: 3000 }) }}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                        <AlertDialog.Cancel asChild key="cancel">
                            <Button bg="#E5E5E5" color="#0077FF" flex={1} onPress={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                    </XStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog> 
        </>
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
    }
})

export default ProfileCard 