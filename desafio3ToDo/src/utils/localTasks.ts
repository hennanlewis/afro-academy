export const localTasks = {
	setItem: (keyName: string, keyValue: string) => {
		return new Promise<void>((resolve) => {
			resolve(localStorage.setItem(keyName, keyValue))
		})
	},

	getItem: (keyName: string) => {
		return new Promise<string>((resolve, reject) => {
			let values = localStorage.getItem(keyName)
			if (values) resolve(values)
			if (!values) reject("Dados locais estão vazios")
		})
	},
}
