import {Card, Text, Button, Group, Modal, TextInput, Stack} from '@mantine/core';
import {modals} from "@mantine/modals";
import {useDisclosure} from "@mantine/hooks";
import { useForm, SubmitHandler } from "react-hook-form"
import {ValidateFunc} from "../../utils/contact-scheme.ts";
import {ContactScheme} from "../../types/contacts.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import ContactsStore from "../../store/contactsStore.ts";

type Inputs = {
    name: string
    phone: string
}
type Props = {
    contact: ContactScheme;
};

export const ContactCard = observer(({ contact }: Props) => {
    const { editContact } = ContactsStore;
    const { deleteContact } = ContactsStore;
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()
    useEffect(() => {
        setValue("phone", contact.phone);
        setValue("name", contact.name);
    }, []);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true);
        editContact({
            phone: data.phone,
            name: data.name,
            id: contact.id,
        })
            .then(() => {
                close();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const [opened, { open, close }] = useDisclosure(false);

    const removeContact = () => {
        setIsLoading(true);
        deleteContact(contact.id)
            .then(() => {
                close();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Удаление контакта',
            centered: true,
            children: (
                <Text size="sm">
                    Вы уверены что хотите удалить контакт?
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Отмена" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => removeContact(),
        });
    return (
        <div>
            <Modal opened={opened} onClose={close} title="Добавление" centered={true}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput label={'Введите имя'} {...register('name', {required: true, minLength: 2, maxLength: 30})}/>
                    {errors.name && <Text color={'red'}>{ValidateFunc(errors.name)}!</Text>}
                    <TextInput label={'Введите номер телефона'} {...register('phone', {required: true, minLength: 11, maxLength: 11, pattern:/^\d+$/})}/>
                    {errors.phone && <Text color={'red'}>{ValidateFunc(errors.phone)}!</Text>}
                    <Group position={'center'} mt={10}>
                        <Button type={'submit'}>Сохранить</Button>
                        <Button color={'red'} onClick={close}>Отмена</Button>
                    </Group>
                </form>
            </Modal>
            <Card shadow="xl" padding="lg" radius="md" withBorder>
               <Stack>
                   <Stack>
                       <Text size={'xl'} weight={500}>{contact.name}</Text>
                       <Text size={'xl'} weight={500}>{contact.phone}</Text>
                   </Stack>
                   <Group>
                       <Button onClick={open} variant="filled" color="blue" mt="md" radius="md">
                           Редактировать
                       </Button>
                       <Button onClick={openDeleteModal} variant="filled" color="red" mt="md" radius="md">
                           Удалить
                       </Button>
                   </Group>
               </Stack>
            </Card>
        </div>
    );
});
