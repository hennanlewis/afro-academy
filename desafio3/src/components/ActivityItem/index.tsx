import { Dispatch, SetStateAction, ChangeEvent } from "react"

import { Delete } from "../IconsComponents/Delete"
import { Task } from "../../@types/types"
import { Edit } from "../IconsComponents/Edit"

import calendar from "../../assets/calendar.svg"
import complete from "../../assets/complete.svg"
import style from "./style.module.scss"
import { dateFormater } from "../../utils/dateFormater"
import { localTasks } from "../../utils/localTasks"

type ActivityItemProps = {
	setListArray: Dispatch<SetStateAction<Task[]>>
	listItem: Task
	arrayPosition: number
}

export const ActivityItem = (props: ActivityItemProps) => {
	const { arrayPosition, listItem, setListArray } = props

	const handleIsConsluded = (event: ChangeEvent<HTMLInputElement>) => {
		setListArray((values) => {
			values[arrayPosition] = {
				...listItem,
				isConcluded: event.target.checked,
				concludedDate: new Date(),
			}

			return [...values]
		})
	}

	const handleEditActivity = () => {
		setListArray((values) => {
			if (values[arrayPosition].isEditing) {
				values[arrayPosition].isEditing = false
				return [...values]
			}

			const isEditing = values.map((item, index) =>
				index == arrayPosition
					? { ...item, isEditing: true }
					: { ...item, isEditing: false }
			)

			return isEditing
		})
	}

	const handleDeleteActivity = () => {
		setListArray((values) => {
			values = values.filter((item, index) => index != arrayPosition)

			localTasks
				.setItem("@AfroToDo:tasks", [...values])
				.catch((error) => console.log(error))

			return values
		})
	}

	return (
		<>
			<div
				className={listItem.isEditing ? style.editingActivity : style.activity}
			>
				<div className={style.todoOptions}>
					<label>
						<input
							type="checkbox"
							onChange={(event) => handleIsConsluded(event)}
							checked={listItem.isConcluded}
						/>

						<span className={listItem.isConcluded ? style.concluded : ""}>
							{listItem.task}
						</span>
					</label>

					<button className={style.editButton} onClick={handleEditActivity}>
						<Edit />
					</button>

					<button className={style.deleteButton} onClick={handleDeleteActivity}>
						<Delete />
					</button>
				</div>

				<div className={style.todoDate}>
					{listItem.isConcluded && (
						<span className={style.concludedDate}>
							<img src={complete} alt="" />
							<span>Finalizado em</span>
							<span>{dateFormater("BR", listItem.concludedDate)}</span>
						</span>
					)}

					{listItem.deadline && (
						<span className={style.deadline}>
							<img src={calendar} alt="" />
							<span>até</span>
							<span>{dateFormater("BR", listItem.deadline)}</span>
						</span>
					)}
				</div>
			</div>
		</>
	)
}
