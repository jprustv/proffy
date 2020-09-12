import { Request, Response } from 'express'

import db from '../database/connection'
import hour2minutes from '../utils/hour2minutes'

interface ScheduleItem {
  week_day : number,
  from : string,
  to : string
}

interface Filters {
  subject? : string,
  week_day? : number,
  time? : string
}

export default class ClassesController {

  async index (req : Request, res : Response) {
    const filters : Filters = req.query

    let classes : any = []

    if (!filters.week_day || !filters.subject || !filters.time) {
      // Se não houver nenhum filtro, mostramos todos os resultados
      classes = await db('classes')
        .join('users', 'users.id', '=', 'classes.user_id')
        .groupBy('users.name')
        .orderBy('classes.id', 'desc')
        .select(['classes.*', 'users.*'])
    } else {
      // Com filtros
      const timeInMinutes = hour2minutes(filters.time)

      classes = await db('classes')
        .whereExists(function() {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where ('classes.subject', '=', filters.subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])
    }

    return res.json(classes)
  }

  async create (req : Request, res : Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body

    const trx = await db.transaction()

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })

      const user_id = insertedUsersIds[0]

      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id
      })

      const class_id = insertedClassesId[0]

      const classSchedule = schedule.map((s : ScheduleItem) => {
        return {
          class_id,
          week_day : s.week_day,
          from : hour2minutes(s.from),
          to : hour2minutes(s.to)
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return res.status(201).json({
        status : 'OK'
      })

    } catch (e) {
      await trx.rollback()
      console.log(e)
      return res.status(400).json({
        error : 'Unexpected error while creating new Class'
      })
    }

  }

}
