import { YStack, XStack, Text, Checkbox, Button, TextArea, Input, ScrollView, Avatar, Select, Adapt, Sheet, getFontSize, FontSizeTokens, SelectProps } from 'tamagui'
import { ArrowLeft, Plus, Check, CheckCircle, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { InputComponent } from '../components/InputComponent'
import { OutlinedButtonComponent, PrimaryButtonComponent } from '../components/ButtonComponent'
import { LinearGradient } from '@tamagui/linear-gradient'

type Target = {
  id: string;
  name: string;
  avatar: string;
  details: string;
  verified: boolean;
};

const MOCK_TARGETS: Target[] = [
  {
    id: '1',
    name: 'Brad Pit',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    details: 'Actor • Model • Movies',
    verified: true,
  },
  {
    id: '2',
    name: 'Brad Pit',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    details: 'Actor • Model • Movies',
    verified: false,
  },
  { 
    id: '3',
    name: 'Brad Pit',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    details: 'Actor • Model • Movies',
    verified: false,
  },
  {
    id: '4',
    name: 'Brad Pit',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    details: 'Actor • Model • Movies',
    verified: false,
  },
]

type Person = (typeof MOCK_TARGETS)[0];

export default function AddTargetScreen() {
    const router = useRouter()
    const { top } = useSafeAreaInsets()
    const [isNegotiable, setIsNegotiable] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Person[]>([])
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [showTagDropdown, setShowTagDropdown] = useState(false)
    const [availableTags] = useState(['Actor', 'Model', 'Theater', 'Director', 'Producer'])
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults(isFocused ? MOCK_TARGETS : [])
            return
        }

        const timeoutId = setTimeout(() => {
            const results = MOCK_TARGETS.filter(person =>
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

    const handleTagSelect = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
        // Optionally close dropdown after selection:
        // setShowTagDropdown(false);
    };

    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const renderSelectedPerson = () => (
        <YStack justify="space-between">
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
        </YStack>
    )

    const renderSearch = () => (
      <YStack>
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
        <YStack flex={1} bg="white" pt={20} px="$4" gap="$5">

            <XStack style={{ alignItems: 'center' }} gap="$3">
                <Button size="$1" icon={<ArrowLeft size="$1" />} chromeless onPress={() => router.back()} />
                <Text fontSize="$5" fontWeight="bold">Create Referal</Text>
            </XStack>

            {/* Form */}
            <YStack gap="$4" flex={1}>
                {selectedPerson ? renderSelectedPerson() : renderSearch()}
                <TextArea
                    placeholder="About the person"
                    style={styles.textArea}
                    height={120}
                />
                <Button
                    chromeless
                    onPress={() => setShowTagDropdown(!showTagDropdown)}
                    style={{ alignSelf: 'flex-start', marginBottom: 0 }}
                >
                    <Text color="#0077FF">+ #Add Tag</Text>
                </Button>

                {showTagDropdown && (
                    <>
                        {/* Overlay to catch outside clicks */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                zIndex: 999, // less than dropdown's zIndex
                            }}
                            activeOpacity={1}
                            onPress={() => setShowTagDropdown(false)}
                        />
                        {/* Dropdown itself */}
                        <YStack style={[styles.tagDropdown, { zIndex: 1000 }]}>
                            {availableTags.map(tag => (
                                <XStack
                                    key={tag}
                                    onPress={() => handleTagSelect(tag)}
                                    style={{
                                        padding: 10,
                                        backgroundColor: selectedTags.includes(tag) ? '#E7F1FF' : 'white',
                                        borderBottomWidth: 1,
                                        borderColor: '#E5E5E5',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Text>{tag}</Text>
                                    {selectedTags.includes(tag) && (
                                        <Text color="#0077FF" ml={8}>✓</Text>
                                    )}
                                </XStack>
                            ))}
                        </YStack>
                    </>
                )}

                <XStack gap="$2" flexWrap="wrap" mb="$2">
                    {selectedTags.map(tag => (
                        <XStack key={tag} style={styles.tagBadge}>
                            <Text>#{tag}</Text>
                            <Button chromeless size="$1" onPress={() => handleRemoveTag(tag)}>×</Button>
                        </XStack>
                    ))}
                </XStack>

                
                <SelectDemoItem id="select-demo-1" />                  
                <SelectDemoItem id="select-demo-2" />                  
                <XStack style={{ alignItems: 'center' }} gap="$2">
                    <Checkbox
                        checked={isNegotiable}
                        onCheckedChange={() => setIsNegotiable(!isNegotiable)}
                        size="$4"
                        id="negotiable-checkbox"
                        value="negotiable"
                        backgroundColor="#F8F9FA"
                    >
                        <Checkbox.Indicator>
                            <Check />
                        </Checkbox.Indicator>
                    </Checkbox>
                    <Text>negotiable</Text>
                </XStack>
            </YStack>

            {/* Submit Button */}
            <YStack mt="auto" mb="$4">
                <PrimaryButtonComponent name="Create Referal" onPress={() => { }} />
            </YStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    textArea: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F8F9FA'
    },

    selectedPersonContainer: {
      borderRadius: 8,
      padding: 16,
    },

    personName: { fontFamily: 'Nunito', fontWeight: '600', fontSize: 16 },
    personDetails: { fontFamily: 'Nunito', color: '#616B80' },
    resultItem: { padding: 12, alignItems: 'center' },
    resultItemSelected: {
        backgroundColor: '#E7F1FF',
    },
    buttonContainer: {
      marginTop: 'auto',
      paddingTop: 20,
    },
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
        maxHeight: 200,
    },
    changeLink: {
        color: '#0077FF',
        fontWeight: '600',
        marginLeft: 'auto',
    },
    tagDropdown: {
        position: 'relative',
 // adjust as needed
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tagBadge: {
        backgroundColor: '#E7F1FF',
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 4,
        marginBottom: 4,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },
}) 

export function SelectDemoItem(props: SelectProps & { trigger?: React.ReactNode }) {
  const [val, setVal] = React.useState('')

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
            {React.useMemo(
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