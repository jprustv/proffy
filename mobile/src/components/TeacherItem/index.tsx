import React from 'react'
import { View, Image, Text } from 'react-native'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavorite from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

const TeacherItem = ( ) => {

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri : 'https://github.com/jprustv.png' }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Jonathan Prust Vernizzi</Text>
          <Text style={styles.subject}>Javascript</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Tech Lead @ FlipFlopLab
        {'\n\n'}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis tempus augue, at auctor elit. Nullam quis sem.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {`   `}
          <Text style={styles.priceValue}>R$ 80,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={styles.favoriteButton}>
            <Image source={heartOutlineIcon}></Image>
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem