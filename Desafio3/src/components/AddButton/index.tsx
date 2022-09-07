import { ChangeEvent, FocusEvent, useEffect, useState } from "react"

import { ActivitiesStateProps, activityDefaultValue } from "../../utils/Types"
import plus from "../../assets/plus.svg"
import style from "./style.module.scss"
import { Edit } from "../IconsComponents/Edit"

export const AddButton = (props: ActivitiesStateProps) => {
	const { listArray, setListArray } = props
	const [activity, setActivity] = useState({ ...activityDefaultValue })

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		event.target.type = "date"
	}

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			event.target.type = "text"
			return
		}

		event.target.type = "text"
		setActivity((value) => {
			value = {
				...value,
				limiteDate: new Date(event.target.value).toLocaleDateString("pt-BR"),
			}
			return { ...value }
		})
	}

	const handleAddActivity = () => {
		if (activity.task) {
			setListArray((value) => {
				let isEditingPosition = value.reduce((acc, item, index) => {
					acc = item.isEditing ? index : acc
					return acc
				}, -1)

				if (isEditingPosition !== -1) {
					value[isEditingPosition] = { ...activity, isEditing: false }
					return [...value]
				}

				return [...value, activity]
			})

			setActivity(() => activityDefaultValue)
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
				return { ...value, hasLimiteDate: true, limiteDate: event.target.value }
			})

			return
		}

		setActivity((value) => {
			return { ...value, hasLimiteDate: false }
		})
	}

	useEffect(() => {
		let isEditing = listArray.filter((item) => item.isEditing)[0]
		if (isEditing) {
			setActivity(isEditing)
			return
		}
		setActivity(activityDefaultValue)
	}, [listArray])

	return (
		<div className={style.addButton}>
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
					value={activity.limiteDate}
				/>

				<button onClick={handleAddActivity}>
					{activity.isEditing ? <Edit big={true} /> : <img src={plus} alt="" />}
				</button>
			</span>
		</div>
	)
}
