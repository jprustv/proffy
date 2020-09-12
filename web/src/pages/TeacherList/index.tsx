import React, { useState, FormEvent, useEffect } from 'react'

import './styles.css'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'

function TeacherList() {
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [ teachers, setTeachers ] = useState([])

  useEffect(() => {
    fetchTeachers()
  }, [])

  async function fetchTeachers() {
    const response = await api.get('classes', {
      params : {
        subject,
        week_day,
        time
      }
    })
    setTeachers(response.data)
  }

  async function searchTeachersClick (e: FormEvent) {
    e.preventDefault()
    await fetchTeachers()
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachersClick}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value : 'Javacript', label : 'Javacript' },
              { value : 'PHP', label : 'PHP' },
              { value : 'C#', label : 'C#' }
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value : '0', label : 'Domingo' },
              { value : '1', label : 'Segunda' },
              { value : '2', label : 'Terça' },
              { value : '3', label : 'Quarta' },
              { value : '4', label : 'Quinta' },
              { value : '5', label : 'Sexta' },
              { value : '6', label : 'Sábado' }
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">
            Filtrar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher : Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}
      </main>

    </div>
  )
}

export default TeacherList
