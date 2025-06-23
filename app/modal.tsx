import { Activity } from '@tamagui/lucide-icons'
import { Anchor, Button, Paragraph, View, XStack } from 'tamagui'

export default function ModalScreen() {
  return (
    <View flex={1} items="center" justify="center">
      <XStack gap="$2">
        <Paragraph text="center">Made by</Paragraph>
        <Anchor color="$blue10" href="https://twitter.com/natebirdman" target="_blank">
          @natebirdman,
        </Anchor>
        <Anchor
          color="$accent10"
          href="https://github.com/tamagui/tamagui"
          target="_blank"
          rel="noreferrer"
        >
          gasdfive it a ⭐️
        </Anchor>
      </XStack>
      <Button theme="blue">asdfasdfasd</Button>
    </View>
  )
}
