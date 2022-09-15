import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react"

import { activityDefaultValue } from "../../utils/defaultValues"
import { TaskStateProps } from "../../@types/types"
import { Edit } from "../IconsComponents/Edit"
import plus from "../../assets/plus.svg"
import style from "./style.module.scss"
import { dateFormater } from "../../utils/dateFormater"
import { localTasks } from "../../utils/localTasks"

export const AddButton = (props: TaskStateProps) => {
	const { listArray, setListArray } = props

	const [activity, setActivity] = useState({ ...activityDefaultValue })
	const [formatedDate, setFormatedDate] = useState("")

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		event.target.type = "date"
		setFormatedDate(() => dateFormater("US", activity.deadline))
	}

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		event.target.type = "text"
		setFormatedDate(() => dateFormater("BR", activity.deadline))
	}

	const handleAddActivity = (event: FormEvent) => {
		event.preventDefault()

		if (activity.task) {
			setListArray((values) => {
				let isEditingPosition = values.reduce((acc, item, index) => {
					acc = item.isEditing ? index : acc
					return acc
				}, -1)

				if (isEditingPosition !== -1) {
					values[isEditingPosition] = { ...activity, isEditing: false }

					return [...values]
				}

				return [...values, activity]
			})

			setActivity(() => activityDefaultValue)
			setFormatedDate("")
		}
	}

	const handleTask = (event: ChangeEvent<HTMLInputElement>) => {
		setActivity((value) => {
			return { ...value, task: event.target.value }
		})
	}

	const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setActivity((value) => {
				return {
					...value,
					deadline: new Date(event.target.value),
				}
			})
			setFormatedDate(() => event.target.value)

			return
		}
	}

	useEffect(() => {
		let isEditing = listArray.filter((item) => item.isEditing)[0]
		if (isEditing) {
			setActivity(isEditing)
			return
		}

		if (listArray.length) {
			localTasks
				.setItem("@AfroToDo:tasks", JSON.stringify([...listArray]))
				.then(() => console.log("Tarefas atualizadas com sucesso"))
				.catch((error) => console.log(error))
		}

		setActivity(activityDefaultValue)
	}, [listArray])

	return (
		<form className={style.addButton} onSubmit={handleAddActivity}>
			<input
				type="text"
				onChange={handleTask}
				placeholder="Insira uma nova atividade"
				value={activity.task}
			/>

			<span>
				<input
					type="text"
					onChange={handleDate}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder="Insira a data limite para a atividade"
					value={formatedDate}
				/>

				<button type="submit">
					{activity.isEditing ? <Edit big={true} /> : <img src={plus} alt="" />}
				</button>
			</span>
		</form>
	)
}
