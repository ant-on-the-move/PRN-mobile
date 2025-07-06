import { Activity, Pencil, Users2 } from "@tamagui/lucide-icons";
import { ProfileCard } from "app/components/ProfileCard";
import { TargetCard } from "app/components/TargetCard";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, XStack, YStack, Avatar, Button, Paragraph } from "tamagui";

export default function Profile() {
    const tags = ['Writer', 'Author', 'Game of Thrones', 'Fantasy', 'Science Fiction'];
    const connections = [
        { name: 'Emilia Clarke', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Kit H.', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
        { name: 'Lena Headey', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { name: 'Maisie Williams', image: 'https://randomuser.me/api/portraits/men/14.jpg' },
        { name: 'Nathalie Emmanue', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
      ]
    return (
        <ScrollView>
            <YStack style={styles.container}>
                <YStack style={styles.profileHeader}>
                    <XStack style={styles.profileHeaderContent}>
                        <XStack flex={1}>
                            <Avatar circular size="$8" >
                                <Avatar.Image src='https://randomuser.me/api/portraits/men/10.jpg'/>
                            </Avatar>
                        </XStack>                        
                        <TouchableOpacity onPress={() => router.push('/edit-profile') }>
                        <XStack flex={1} style={styles.editProfileButton}>
                            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                            <Pencil size={12} color="#0077FF" />
                        </XStack>
                        </TouchableOpacity>
                    </XStack>                
                    <YStack style={styles.profileHeaderTitle}>
                        <XStack style={styles.profileHeaderTitleName}>
                            <Text fontSize="$6" fontWeight="bold">George RR Martin</Text>    
                            <Text>⭐ 4.8 (35)</Text>
                        </XStack>
                        <Text >Writer</Text>
                        <Paragraph mt={10}>
                            George R.R. Martin is a renowned author known for his epic fantasy series "A Song of Ice and Fire," which inspired the hit TV show "Game of Thrones."
                        </Paragraph>
                    </YStack>
                    <XStack style={styles.tags} mt={10}>
                        {tags.map(tag => (
                            <Button key={tag} size="$2" disabled  variant="outlined">#{tag}</Button>
                        ))} 
                    </XStack>
                </YStack>
                <YStack style={styles.profileContent} mt={10}>
                    <XStack style={styles.connectionContainerHeader}>
                        <XStack style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4}} >
                            <Text style={styles.connectionText}>Connections</Text>
                            <Users2 size={16} />
                        </XStack>
                        <XStack style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4}} >
                            <Text style={styles.connectionText}>request</Text>
                            <Users2 size={16} />
                        </XStack>
                    </XStack>
                    <XStack style={styles.connectionContainerRelations} mt={10}>
                        {connections.map(connection => (
                            <Button key={connection.name} size="$3"   variant="outlined">
                                <Avatar key={connection.name} circular size={24} >
                                    <Avatar.Image src={connection.image} />
                                </Avatar>
                                <Text>{connection.name}</Text>
                            </Button>
                        ))}
                    </XStack>
                    <YStack mt={10} gap={10}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <ProfileCard key={index} />
                        ))}
                    </YStack>
                </YStack>
            </YStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    profileHeader: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    profileHeaderTitle: {
        gap: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    profileHeaderTitleName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
    },
    profileHeaderContent: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,        
    },
    editProfileButtonText: {
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 120,
        letterSpacing: 0,
        color: '#0077FF',
        textDecorationLine: 'underline',
        textDecorationColor: '#0077FF',
        textDecorationStyle: 'solid'
    },
    tags: {
        gap: 8,
        flexWrap: 'wrap'
    },
    profileContent: {
        paddingHorizontal: 24,
    },
    connectionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
        textDecorationLine: 'underline',
    },
    connectionContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    connectionContainerRelations: {
        gap: 8,
        flexWrap: 'wrap'
    }
});