export const ValidateFunc = (validateInput: any) => {
    if (validateInput?.ref.name === "name") {
        if (validateInput?.type === "required")
            return "Это поле не может быть пустым";
        if (validateInput?.type === "maxLength")
            return "Это поле должно содержать менее 30 символов";
        if (validateInput?.type === "minLength")
            return "Это поле должно содержать более 2 символов";
    } else if (validateInput?.ref.name === "phone") {
        if (validateInput?.type === "required")
            return "Это поле не может быть пустым";
        if (validateInput?.type === "maxLength" || validateInput?.type === "minLength" || validateInput?.type === 'pattern')
            return "Неверный формат поля, пример: 79999999999";
    }
};