import { OutlinedButtonComponent, PrimaryButtonComponent } from 'app/components/ButtonComponent'
import { StepperComponent } from 'app/components/StepperComponent'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { YStack, Text, XStack, Input, Avatar, ScrollView } from 'tamagui'

const MOCK_DATA = [
    { id: '1', name: 'Brad Pitt', details: 'Actor • Model • Movies', avatar: 'https://i.pravatar.cc/150?u=bradpitt' },
    { id: '2', name: 'Brad Garrett', details: 'Actor • Comedian', avatar: 'https://i.pravatar.cc/150?u=bradgarrett' },
    { id: '3', name: 'Bradley Cooper', details: 'Actor • Filmmaker', avatar: 'https://i.pravatar.cc/150?u=bradleycooper' },
    { id: '4', name: 'Tom Cruise', details: 'Actor • Producer', avatar: 'https://i.pravatar.cc/150?u=tomcruise' },
    { id: '5', name: 'Tom Hanks', details: 'Actor • Filmmaker', avatar: 'https://i.pravatar.cc/150?u=tomhanks' },
];

type Person = (typeof MOCK_DATA)[0];

export default function Connect() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Person[]>([])
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults(isFocused ? MOCK_DATA : [])
            return
        }

        const timeoutId = setTimeout(() => {
            const results = MOCK_DATA.filter(person =>
                person.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, isFocused])

    const handleSelectPerson = (person: Person) => {
        setSelectedPerson(person);
        setSearchQuery('');
        setSearchResults([]);
        setIsFocused(false);
    }

    const handleChange = () => {
        setSelectedPerson(null)
    }

    const handleConfirm = () => {
        console.log('Confirmed:', selectedPerson)
        // router.push('/register/review') // Navigate to the next step
    }

    const renderSelectedPerson = () => (
        <YStack flex={1} justify="space-between">
            <YStack gap="$5" mt="$5">
                <XStack style={styles.selectedPersonContainer} justify="center" gap="$4">
                    <Avatar circular size="$6">
                        <Avatar.Image src={selectedPerson!.avatar} />
                        <Avatar.Fallback backgroundColor="blue" />
                    </Avatar>
                    <YStack>
                        <Text style={styles.personName}>{selectedPerson!.name}</Text>
                        <Text style={styles.personDetails}>{selectedPerson!.details}</Text>
                    </YStack>
                    <Text style={styles.changeLink} onPress={handleChange}>Change</Text>
                </XStack>
            </YStack>
            <PrimaryButtonComponent name="Confirm Person & Continue" onPress={handleConfirm} />
        </YStack>
    )

    const renderSearch = () => (
        <YStack flex={1}>
            <Input
                style={styles.searchInput}
                placeholder="Search Name"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {searchResults.length > 0 && (
                <ScrollView style={styles.resultsContainer} keyboardShouldPersistTaps="handled">
                    {searchResults.map((person) => (
                        <TouchableOpacity key={person.id} onPress={() => handleSelectPerson(person)}>
                            <XStack style={styles.resultItem}  gap="$3">
                                <Avatar circular size="$4">
                                    <Avatar.Image src={person.avatar} />
                                    <Avatar.Fallback backgroundColor="gray" />
                                </Avatar>
                                <Text style={styles.personName}>{person.name}</Text>
                            </XStack>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <YStack style={styles.buttonContainer} gap="$3">
                {searchQuery.length > 0 && searchResults.length === 0 && (
                    <OutlinedButtonComponent name="The Person is not listed here" />
                )}
            </YStack>
        </YStack>
    )

    return (
        <YStack style={styles.container}>
            <YStack mt="$5" gap="$2">
                <Text style={styles.title}>Who are you looking for?</Text>
            </YStack>

            {selectedPerson ? renderSelectedPerson() : renderSearch()}
        </YStack>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 30, marginRight: 24, marginLeft: 24, paddingBottom: 24 },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Nunito', color: '#232A38' },
    searchInput: {
        height: 48,
        backgroundColor: '#F1F3F5',
        borderWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginTop: 20
    },
    resultsContainer: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        maxHeight: 250,
    },
    resultItem: { padding: 12, alignItems: 'center' },
    resultItemSelected: {
        backgroundColor: '#E7F1FF',
    },
    personName: { fontFamily: 'Nunito', fontWeight: '600', fontSize: 16 },
    personDetails: { fontFamily: 'Nunito', color: '#616B80' },
    selectedPersonContainer: {
        borderRadius: 8,
        padding: 16,
    },
    changeLink: {
        color: '#0077FF',
        fontWeight: '600',
        marginLeft: 'auto',
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingTop: 20,
    }
}) 