import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, AsyncStorage, Picker, Keyboard, TouchableWithoutFeedback } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import DateTimePicker from '@react-native-community/datetimepicker';

import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

function TeacherList () {

  const [favorites, setFavorites] = useState<number[]>([])

  const [isFiltersVisibble, setIsFiltersVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [timeInDate, setTimeInDate] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)

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

  function onChangeTime (event : any, selectedDate : any) {
    setShowTimePicker(false)
    setTimeInDate(selectedDate)
    let hours : string = selectedDate.getHours().toString()
    hours = hours.length == 1 ? `0${hours}` : hours
    let minutes : string = selectedDate.getMinutes().toString()
    minutes = minutes.length == 1 ? `0${minutes}` : minutes
    setTime(`${hours}:${minutes}`)
  };

   function onTimeInputPress() {
    setShowTimePicker(true)
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
            <View style={styles.input}>
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
                <View style={styles.input}>
                  <Picker
                    selectedValue={week_day}
                    onValueChange={(itemValue) => setWeekDay(itemValue)}
                  >
                    <Picker.Item label="Qual o dia?" value="" />
                    <Picker.Item label="Domingo" value="0" />
                    <Picker.Item label="Segunda" value="1" />
                    <Picker.Item label="Terça" value="2" />
                    <Picker.Item label="Quarta" value="3" />
                    <Picker.Item label="Quinta" value="4" />
                    <Picker.Item label="Sexta" value="5" />
                    <Picker.Item label="Sábado" value="6" />
                  </Picker>
                </View>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TouchableWithoutFeedback
                  onPress={onTimeInputPress}
                >
                  <View style={styles.input}>
                    <Text>{time ? time : 'Qual o horário?'}</Text>
                  </View>

                  {/*
                    <TextInput
                      style={styles.input}
                      value={time}
                      onChangeText={text => setTime(text)}
                      onFocus={onTimeInputPress}
                      placeholder="Qual o horário?"
                      placeholderTextColor="#c1bccc"
                    />
                    */}
                </TouchableWithoutFeedback>
                {showTimePicker && (
                  <DateTimePicker
                    value={timeInDate}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                  />
                )}
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
