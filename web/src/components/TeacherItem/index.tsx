import React from 'react'

import { Link } from 'react-router-dom'

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

interface TeacherItemProps {
  title? : string
}

const TeacherItem : React.FC<TeacherItemProps> = (props) => {
  return (
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
  )
}

export default TeacherItem
