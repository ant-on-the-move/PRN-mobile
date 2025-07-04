import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button, Checkbox, H4, Image, Input, Label, Select, Separator, Sheet, Stack, Text, TextArea, TextAreaFrame, XStack, YStack } from 'tamagui'
import { ArrowLeft, FileInput, UploadCloud } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import { GoogleButtonComponent } from 'app/components/ButtonComponent'

export default function EditProfileScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null)
    const [selected, setSelected] = useState<string[]>([])
    const [availableTags] = useState(['Actor', 'Model', 'Theater', 'Director', 'Producer'])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [showTagDropdown, setShowTagDropdown] = useState(false)

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission is required to access images.')
        }
    }

    useEffect(() => {
        requestPermission()
    }, [])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        })
      
        if (!result.canceled) {
          setImageUri(result.assets[0].uri)
        }
    }

    const [open, setOpen] = useState(false)

  const toggle = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
};

const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
        handleRemoveTag(tag);
    } else {
        setSelectedTags([...selectedTags, tag]);
    }
};
  return (
    <ScrollView>
      <YStack style={styles.container}>
        {/* Header */}
        <XStack style={styles.headerContainer}>
          <Button icon={ArrowLeft} size={40} chromeless style={styles.backButton} />
          <Text style={styles.headerText}>Edit Profile</Text>
        </XStack>
        <XStack style={styles.profileContainer}>
            <Avatar circular size={46} >
                <Avatar.Image src={imageUri ?? 'https://randomuser.me/api/portraits/men/10.jpg'} />
            </Avatar>
            <Button onPress={pickImage} iconAfter={<UploadCloud color='#0077FF' />} style={styles.uploadButton} size={46} >
                <Text style={styles.uploadButtonText}>Upload Image</Text>
            </Button>
        </XStack>
        <XStack style={styles.buttonContainer}>
            <Button style={styles.googleButton} size={46}
                icon={<Image source={require("../../assets/images/social media logo (2).png")} />} >
                <Text style={styles.googleButtonText}>Connected</Text>
            </Button>
            <Button style={styles.googleButton} size={46}
                icon={<Image source={require("../../assets/images/linkedin (2).png")} />} >
                <Text style={styles.googleButtonText}>Connected</Text>
            </Button>
        </XStack>
        <YStack style={styles.inputContainer}>
            <Text style={styles.title}>Basic Details</Text>
            <Input placeholder='Name' style={styles.inputField} />
            <Input placeholder='Job Title' style={styles.inputField} />
            <TextArea size="$4" placeholder='About you' style={styles.inputField} />
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
        </YStack>
        <YStack style={styles.inputContainer}>
            <Text style={styles.title}>Profile Links</Text>
            <Input placeholder='LinkedIn' style={styles.inputField} />
            <Input placeholder='Other Link' style={styles.inputField} />
        </YStack>
        <YStack style={styles.inputContainer}>
            <Text style={styles.title}>Location</Text>
            <Input placeholder='City' style={styles.inputField} />
            <Input placeholder='State' style={styles.inputField} />
            <Input placeholder='Country' style={styles.inputField} />
        </YStack>
        <YStack style={styles.inputContainer}>
            <Text style={styles.title}>Contact</Text>
            <Input placeholder='Mobile' style={styles.inputField} />
            <Input placeholder='Email' style={styles.inputField} />
        </YStack>
        <Button style={styles.saveButton} >
            <Text style={styles.saveButtonText}>Save Profile</Text>
        </Button>
      </YStack>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
    gap: 15,
    height: '100%'
  },
  headerText: {
    fontFamily: 'Lora',
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: 0,
    color: '#232A38',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 0,
    margin: 0,
  },
  uploadButton: {
    backgroundColor: 'transparent',
  },
  uploadButtonText: {
    fontFamily: 'Nunito',
    fontWeight: 700,
    fontSize: 14,
    color: '#0077FF',    
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flex:1
  },
  googleButtonText: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 16.8,
    color: '#232A38',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 16,
    marginBottom: 10,
    gap: 10,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0,
    color: '#232A38',
  },
  inputField: {
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: 0,
    color: '#232A38',
    backgroundColor: 'transparent',
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
saveButton: {
    backgroundColor: '#0077FF',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    height: 46,
    fontFamily: 'Nunito',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 16.8,
    letterSpacing: 0,
},
saveButtonText: {
    fontFamily: 'Nunito',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 16.8,
    letterSpacing: 0,
    color: '#ffffff',
},
});