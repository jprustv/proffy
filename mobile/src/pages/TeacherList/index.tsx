import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, AsyncStorage, Picker } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

function TeacherList () {

  const [favorites, setFavorites] = useState<number[]>([])

  const [isFiltersVisibble, setIsFiltersVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [ teachers, setTeachers ] = useState([])

  useEffect(() => {
    fetchTeachers()
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher : Teacher) => {
          return teacher.id
        })
        setFavorites(favoritedTeachersIds)
      }
    })
  }, [teachers])

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisibble)
  }

  async function fetchTeachers() {
    const response = await api.get('classes', {
      params : {
        subject,
        week_day,
        time
      }
    })

    setIsFiltersVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={40} color="#fff"></Feather>
          </BorderlessButton>
        )}
      >
        {isFiltersVisibble && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={subject}
                onValueChange={(itemValue) => setSubject(itemValue)}
              >
                <Picker.Item label="Qual a matéria?" value="" />
                <Picker.Item label="JavaScript" value="Javascript" />
                <Picker.Item label="PHP" value="PHP" />
                <Picker.Item label="C#" value="C#" />
              </Picker>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={fetchTeachers}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal : 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher : Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>

    </View>
  )
}

export default TeacherList
