import React from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de insccrição"
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>
          <Input name="name" label="Nome completo"/>
          <Input name="avatar" label="Avatar"/>
          <Input name="whatsapp" label="Whatsapp"/>
          <Textarea name="bio" label="Biografia"/>
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value : 'Javacript', label : 'Javacript' },
              { value : 'PHP', label : 'PHP' },
              { value : 'C#', label : 'C#' }
            ]}
          />
          <Input name="cost" label="Custo da sa hora por aula"/>
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button">
              + Novo horário
            </button>
          </legend>
          <div className="schedule-item">
            <Select
              name="week_day"
              label="Dia da semana"
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
            <Input name="from" label="Das" type="time"></Input>
            <Input name="to" label="Até" type="time"></Input>
          </div>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="button">
            Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  )
}

export default TeacherForm
