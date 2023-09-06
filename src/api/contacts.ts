import { $http } from "./instance";
import { ContactScheme } from "../types/contacts";

export const ContactsApi = {
    getContacts: () =>
        $http.get(`/api/contact/`),

    createContact: (contact: { phone: string; name: string }) =>
        $http.post(`/api/contact/create`, contact),

    deleteContact: (contactId: number) =>
        $http.delete(`/api/contact/delete`, {
            params: {
                contactId,
            },
        }),

    editContact: (contact: ContactScheme) =>
        $http.post(`/api/contact/edit`, contact),
};
