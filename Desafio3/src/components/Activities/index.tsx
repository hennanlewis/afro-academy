import { ActivitiesStateProps } from "../../utils/Types"
import todoLine from "../../assets/TodoLine.svg"
import { ActivityItem } from "../ActivityItem"
import style from "./style.module.scss"

export const Activities = (props: ActivitiesStateProps) => {
	const { listArray, setListArray } = props

	return (
		<>
			<section className={style.activities}>
				{listArray.length ? (
					<>
						<h3>
							Tarefas concluídas
							<span>{`${
								listArray.filter((item) => item.isConcluded).length
							} de ${listArray.length}`}</span>
						</h3>

						{listArray.map((item, index) => (
							<ActivityItem
								key={index}
								listItem={item}
								arrayPosition={index}
								setListArray={setListArray}
							/>
						))}
					</>
				) : (
					<EmptyList />
				)}
			</section>
		</>
	)
}

const EmptyList = () => {
	return (
		<div className={style.noContentText}>
			<img src={todoLine} alt="" />

			<p>
				Você ainda não possui tarefas no momento.
				<br />
				Adicione novas tarefas para que elas sejam mostradas.
			</p>
		</div>
	)
}
