import { useState } from "react"

export const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (fieldName: any, fieldValue: any) => {
        setValues({ ...values, [fieldName]: fieldValue })
    }

    return { values, handleChange }
}