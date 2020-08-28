import React from 'react'

import './styles.css'

import PageHeader from '../../components/PageHeader'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject"/>
          </div>
          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day"/>
          </div>
          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time"/>
          </div>
        </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/11440704?s=460&u=47b433d1818ef1f3deddaa35ed9a830dfef8a2ba&v=4" alt="Jonathan Prust Vernizzi"/>
            <div>
              <strong>Jonathan Prust Vernizzi</strong>
              <span>Unity 3D</span>
            </div>
          </header>
          <p>
            Ensina desenvolvimento de jogos utilizando Unity3D e linguagem de programação C#.
            <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu sem at est vulputate tincidunt vitae id ante. Pellentesque at tortor tincidunt, interdum tellus id, luctus nibh. Praesent lobortis leo.
          </p>
          <footer>
            <p>
              Preço/Hora
              <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="Whatsapp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
      </main>

    </div>
  )
}

export default TeacherList
