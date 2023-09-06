import { ContactScheme } from "../types/contacts";
import { makeAutoObservable } from "mobx";
import { ContactsApi } from "../api/contacts";
import { AxiosError } from "axios";

class ContactsStore {
    contacts: ContactScheme[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchContacts = async () => {
        try {
            this.isLoading = true;

            const { data } = await ContactsApi.getContacts();

            this.contacts = data.contacts;
        } catch (e) {
            alert("Ошибка при загрузке списка контактов");
        } finally {
            this.isLoading = false;
        }
    };

    createContact = async (contact: { name: string; phone: string }) => {
        try {
            const { data } = await ContactsApi.createContact({
                name: contact.name,
                phone: contact.phone,
            });
            this.contacts.unshift(data.contact);

            alert("Контакт успешно добавлен")
        } catch (e) {
            if (e instanceof AxiosError) {
                alert("Ошибка валидации")
            } else {
                alert("Ошибка сервера")
            }
        }
    };

    deleteContact = async (contactId: number) => {
        try {
            await ContactsApi.deleteContact(contactId);
            this.contacts = this.contacts.filter((el) => el.id !== contactId);
        } catch (e) {
            alert("Ошибка при удалении контакта")
        }
    };

    editContact = async (contact: ContactScheme) => {
        try {
            const { data } = await ContactsApi.editContact(contact);

            const index = this.contacts.findIndex(({ id }) => id === data.contact.id);
            if (index !== -1) {
                this.contacts[index] = data.contact;
            }
            alert("Контакт успешно изменен")
        } catch (e) {
            if (e instanceof AxiosError) {
                alert("Ошибка валидации")
            } else {
                alert("Ошибка сервера")
            }
        }
    };
}

export default new ContactsStore();
