import { DateLocalType } from "../@types/types"

export const dateFormater = (inputType: DateLocalType, date?: Date) => {
	if (!date) return ""

	const day = String(new Date(date).getUTCDate()).padStart(2, "0")
	const month = String(new Date(date).getUTCMonth() + 1).padStart(2, "0")
	const year = new Date(date).getUTCFullYear()

	if (inputType == "BR") {
		return [day, month, year].join("/")
	}

	return [year, month, day].join("-")
}
