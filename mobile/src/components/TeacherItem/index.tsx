import React, { useState } from 'react'
import { View, Image, Text, Linking, AsyncStorage } from 'react-native'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

export interface Teacher {
  id : number,
  name : string,
  avatar : string,
  bio : string,
  cost : number,
  subject : string,
  whatsapp : string
}

interface TeacherItemProps {
  teacher : Teacher,
  favorited : boolean
}

const TeacherItem : React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

  const [isFavorited, setIsFavorited] = useState(favorited)

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites') || '[]'
    const favoritesArr = JSON.parse(favorites)

    if (isFavorited) {
      const favoriteIndex = favoritesArr.findIndex((teacherItem : Teacher) => {
        return teacherItem.id === teacher.id
      })
      favoritesArr.splice(favoriteIndex, 1)
      setIsFavorited(false)
    } else {
      favoritesArr.push(teacher)
      setIsFavorited(true)
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArr))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri : teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {`   `}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited && styles.favorited
            ]}
          >
            { isFavorited
              ? <Image source={unfavoriteIcon}></Image>
              : <Image source={heartOutlineIcon}></Image>
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
